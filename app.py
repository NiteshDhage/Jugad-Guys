from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector
import bcrypt
import jwt
import datetime

# =========================
# Flask App
# =========================
app = Flask(__name__)

CORS(app)

# =========================
# SECRET KEY
# =========================
SECRET_KEY = "super_secret_key"

# =========================
# DATABASE CONNECTION
# =========================
def get_db():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="femcare"
    )

# =========================================================
# SIGNUP API
# =========================================================
@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # =========================
    # Validation
    # =========================
    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    try:

        conn = get_db()
        cursor = conn.cursor()

        # =========================
        # Check Existing User
        # =========================
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "message": "Email already exists"
            }), 409

        # =========================
        # Hash Password
        # =========================
        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        # =========================
        # Insert User
        # =========================
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

# =========================================================
# LOGIN API
# =========================================================
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

        # =========================
        # Get User
        # =========================
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
# RUN APP
# =========================================================
if __name__ == "__main__":

    app.run(debug=True)