from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import mysql.connector
import bcrypt
import jwt
import datetime

import numpy as np

app = Flask(__name__)

CORS(app)
model = joblib.load("pcod_model.pkl")

SECRET_KEY = "super_secret_key"

def get_db():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="femcare"
    )

@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")


    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    try:

        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "message": "Email already exists"
            }), 409


        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        cursor.execute(
            """
            INSERT INTO users (name, email, password)
            VALUES (%s, %s, %s)
            """,
            (
                name,
                email,
                hashed_password
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Account created successfully"
        }), 201

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Server error"
        }), 500

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "All fields required"
        }), 400

    try:

        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT id, name, password
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if not user:
            return jsonify({
                "message": "Invalid credentials"
            }), 401

        user_id = user[0]
        user_name = user[1]
        stored_password = user[2]

        # =========================
        # Password Check
        # =========================
        if not bcrypt.checkpw(
            password.encode("utf-8"),
            stored_password.encode("utf-8")
            if isinstance(stored_password, str)
            else stored_password
        ):

            return jsonify({
                "message": "Invalid credentials"
            }), 401

        # =========================
        # JWT TOKEN
        # =========================
        token = jwt.encode({

            "user_id": user_id,

            "exp":
            datetime.datetime.now(
                datetime.timezone.utc
            ) + datetime.timedelta(hours=2)

        },
        SECRET_KEY,
        algorithm="HS256")

        return jsonify({

            "message": "Login successful",

            "token": token,

            "user": {
                "id": user_id,
                "name": user_name,
                "email": email
            }

        }), 200

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Server error"
        }), 500

# =========================================================
# PROTECTED ROUTE
# =========================================================
@app.route("/protected", methods=["GET"])
def protected():

    token = request.headers.get("Authorization")

    if not token:
        return jsonify({
            "message": "Token missing"
        }), 401

    try:

        token = token.split(" ")[1]

        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return jsonify({
            "message": "Access granted",
            "user_id": decoded["user_id"]
        })

    except jwt.ExpiredSignatureError:

        return jsonify({
            "message": "Token expired"
        }), 401

    except jwt.InvalidTokenError:

        return jsonify({
            "message": "Invalid token"
        }), 401


# =========================================================
# SAVE CYCLE API
# =========================================================
@app.route("/save-cycle", methods=["POST"])
def save_cycle():

    # =========================
    # GET TOKEN
    # =========================
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        # =========================
        # DECODE JWT
        # =========================
        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        user_id = decoded["user_id"]

    except jwt.ExpiredSignatureError:

        return jsonify({
            "message": "Token expired"
        }), 401

    except jwt.InvalidTokenError:

        return jsonify({
            "message": "Invalid token"
        }), 401

    # =========================
    # GET DATA
    # =========================
    data = request.get_json()

    cycle_length = data.get("cycleLength")
    period_date = data.get("periodDate")
    symptoms = data.get("symptoms")

    # =========================
    # VALIDATION
    # =========================
    if not cycle_length or not period_date:

        return jsonify({
            "message": "Required fields missing"
        }), 400

    try:

        conn = get_db()
        cursor = conn.cursor()

        # =========================
        # INSERT DATA
        # =========================
        cursor.execute(
            """
            INSERT INTO cycle_tracker
            (
                user_id,
                cycle_length,
                period_date,
                symptoms
            )
            VALUES
            (%s, %s, %s, %s)
            """,
            (
                user_id,
                cycle_length,
                period_date,
                symptoms
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Cycle data saved successfully"
        }), 201

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Server error"
        }), 500
    
# =========================================================
# GET CYCLE HISTORY
# =========================================================
@app.route("/history", methods=["GET"])
def history():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        user_id = decoded["user_id"]

        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                cycle_length,
                period_date,
                symptoms,
                created_at
            FROM cycle_tracker
            WHERE user_id = %s
            ORDER BY created_at DESC
            """,
            (user_id,)
        )

        history = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({
            "history": history
        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Server error"
        }), 500
    

@app.route("/pcod-predict", methods=["POST"])
def pcod_predict():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        user_id = decoded["user_id"]

    except:
        return jsonify({
            "message": "Invalid token"
        }), 401

    # =====================================================
    # GET DATA
    # =====================================================

    data = request.get_json()

    age = float(data["age"])
    weight = float(data["weight"])
    bmi = float(data["bmi"])
    cycle = float(data["cycleLength"])

    weight_gain = int(data["weightGain"])
    hair_loss = int(data["hairLoss"])
    pimples = int(data["acne"])
    stress = int(data["stress"])

    # =====================================================
    # MODEL INPUT
    # =====================================================

    features = np.array([[
        age,
        weight,
        bmi,
        cycle,
        weight_gain,
        hair_loss,
        pimples,
        stress
    ]])

    # =====================================================
    # PREDICT
    # =====================================================

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0][1]

    result = "High Risk" if prediction == 1 else "Low Risk"

    confidence = round(probability * 100, 2)

    # =====================================================
    # SAVE TO DATABASE
    # =====================================================

    try:

        conn = get_db()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO pcod_predictions (

                user_id,
                age,
                weight,
                bmi,
                cycle_length,

                weight_gain,
                hair_loss,
                pimples,
                stress,

                prediction,
                confidence

            )

            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,

            (
                user_id,
                age,
                weight,
                bmi,
                cycle,

                weight_gain,
                hair_loss,
                pimples,
                stress,

                result,
                confidence
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Database save failed"
        }), 500

    # =====================================================
    # RESPONSE
    # =====================================================

    return jsonify({

        "prediction": result,

        "confidence": confidence

    })

@app.route("/predict", methods=["POST"])
def predict():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        user_id = decoded["user_id"]

    except jwt.ExpiredSignatureError:

        return jsonify({
            "message": "Token expired"
        }), 401

    except jwt.InvalidTokenError:

        return jsonify({
            "message": "Invalid token"
        }), 401

    # =====================================================
    # GET DATA
    # =====================================================

    data = request.get_json()

    try:

        age = float(data["age"])

        weight = float(data["weight"])

        bmi = float(data["bmi"])

        cycle_length = float(data["cycleLength"])

        hair_growth = int(data["hairGrowth"])

        skin_darkening = int(data["skinDarkening"])

        pimples = int(data["pimples"])

        fast_food = int(data["fastFood"])

    except:

        return jsonify({
            "message": "Invalid input data"
        }), 400

    # =====================================================
    # PREPARE FEATURES
    # =====================================================

    features = np.array([[
        age,
        weight,
        bmi,
        cycle_length,
        hair_growth,
        skin_darkening,
        pimples,
        fast_food
    ]])

    # =====================================================
    # SCALE FEATURES
    # =====================================================

    features_scaled = scaler.transform(features)

    # =====================================================
    # PREDICTION
    # =====================================================

    prediction = model.predict(features_scaled)[0]

    probability = model.predict_proba(features_scaled)[0][1]

    result = "High Risk" if prediction == 1 else "Low Risk"

    confidence = round(probability * 100, 2)

    # =====================================================
    # SAVE TO DATABASE
    # =====================================================

    try:

        conn = get_db()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO pcos_predictions (

                user_id,
                age,
                weight,
                bmi,
                cycle_length,

                hair_growth,
                skin_darkening,
                pimples,
                fast_food,

                prediction,
                confidence

            )

            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,

            (
                user_id,
                age,
                weight,
                bmi,
                cycle_length,

                hair_growth,
                skin_darkening,
                pimples,
                fast_food,

                result,
                confidence
            )
        )

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Database save failed"
        }), 500

    # =====================================================
    # RESPONSE
    # =====================================================

    return jsonify({

        "prediction": result,

        "confidence": confidence

    })

@app.route("/dashboard-stats", methods=["GET"])
def dashboard_stats():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        user_id = decoded["user_id"]

    except:
        return jsonify({
            "message": "Invalid token"
        }), 401

    try:

        conn = get_db()

        cursor = conn.cursor(dictionary=True)

        # ====================================================
        # GET LATEST CYCLE
        # ====================================================

        cursor.execute("""
            SELECT cycle_length, period_date
            FROM cycle_tracker
            WHERE user_id = %s
            ORDER BY id DESC
            LIMIT 1
        """, (user_id,))

        cycle_data = cursor.fetchone()

        next_cycle_days = "No Data"

        health_score = 50

        if cycle_data:

            cycle_length = cycle_data["cycle_length"]

            period_date = cycle_data["period_date"]

            next_date = period_date + datetime.timedelta(days=int(cycle_length))

            remaining_days = (next_date - datetime.date.today()).days

            next_cycle_days = f"In {remaining_days} Days"

            # better cycle consistency = better score
            if cycle_length >= 26 and cycle_length <= 32:
                health_score += 20

        # ====================================================
        # GET LATEST PCOS PREDICTION
        # ====================================================

        cursor.execute("""
            SELECT prediction, confidence
            FROM pcos_predictions
            WHERE user_id = %s
            ORDER BY id DESC
            LIMIT 1
        """, (user_id,))

        pcos = cursor.fetchone()

        ai_prediction = "No Prediction"

        if pcos:

            ai_prediction = pcos["prediction"]

            confidence = pcos["confidence"]

            # Lower confidence risk = better health score
            if ai_prediction == "Low Risk":
                health_score += 30
            else:
                health_score -= 10

        else:
            confidence = 0

        # ====================================================
        # LIMIT SCORE
        # ====================================================

        if health_score > 100:
            health_score = 100

        if health_score < 0:
            health_score = 0

        cursor.close()
        conn.close()

        return jsonify({

            "nextCycle": next_cycle_days,

            "healthScore": health_score,

            "aiPrediction": ai_prediction,

            "confidence": confidence

        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Server error"
        }), 500
    
if __name__ == "__main__":

    app.run(debug=True)