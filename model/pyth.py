# =========================================================
# PCOS AI MODEL TRAINING
# Random Forest + Gradient Descent
# =========================================================

import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import SGDClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# =========================================================
# LOAD DATASET
# =========================================================

df = pd.read_csv("PCOS_data.csv")

# =========================================================
# CLEAN COLUMN NAMES
# =========================================================

df.columns = df.columns.str.strip()

# =========================================================
# SELECT FEATURES
# =========================================================

features = [

    "Age (yrs)",
    "Weight (Kg)",
    "BMI",
    "Cycle length(days)",
    "hair growth(Y/N)",
    "Skin darkening (Y/N)",
    "Pimples(Y/N)",
    "Fast food (Y/N)"

]

# =========================================================
# TARGET COLUMN
# =========================================================

target = "PCOS (Y/N)"

# =========================================================
# KEEP REQUIRED COLUMNS
# =========================================================

df = df[features + [target]]

# =========================================================
# REPLACE STRING VALUES
# =========================================================

df = df.replace("Yes", 1)
df = df.replace("No", 0)

df = df.replace("Y", 1)
df = df.replace("N", 0)

df = df.replace("YES", 1)
df = df.replace("NO", 0)

# =========================================================
# CONVERT TO NUMERIC
# =========================================================

for col in df.columns:

    df[col] = pd.to_numeric(
        df[col],
        errors="coerce"
    )

# =========================================================
# HANDLE MISSING VALUES
# =========================================================

df = df.fillna(
    df.mean(numeric_only=True)
)

# =========================================================
# SPLIT FEATURES + TARGET
# =========================================================

X = df[features]

y = df[target]

# =========================================================
# FEATURE SCALING
# =========================================================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

# Save scaler
joblib.dump(
    scaler,
    "scaler.pkl"
)

print("\nScaler saved.")

# =========================================================
# TRAIN TEST SPLIT
# =========================================================

X_train, X_test, y_train, y_test = train_test_split(

    X_scaled,
    y,

    test_size=0.2,

    random_state=42

)

# =========================================================
# RANDOM FOREST MODEL
# =========================================================

rf_model = RandomForestClassifier(

    n_estimators=300,

    max_depth=10,

    random_state=42

)

rf_model.fit(
    X_train,
    y_train
)

# =========================================================
# RANDOM FOREST PREDICTION
# =========================================================

rf_pred = rf_model.predict(X_test)

print("\n===================================")
print(" RANDOM FOREST RESULTS ")
print("===================================")

print("\nAccuracy:\n")

print(
    accuracy_score(
        y_test,
        rf_pred
    )
)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        rf_pred
    )
)

print("\nConfusion Matrix:\n")

print(
    confusion_matrix(
        y_test,
        rf_pred
    )
)

# =========================================================
# SAVE RANDOM FOREST MODEL
# =========================================================

joblib.dump(

    rf_model,

    "pcod_rf_model.pkl"

)

print("\nRandom Forest model saved.")

# =========================================================
# GRADIENT DESCENT MODEL
# =========================================================

gd_model = SGDClassifier(

    loss="log_loss",

    max_iter=1000,

    learning_rate="optimal",

    random_state=42

)

gd_model.fit(

    X_train,

    y_train

)

# =========================================================
# GRADIENT DESCENT PREDICTION
# =========================================================

gd_pred = gd_model.predict(X_test)

print("\n===================================")
print(" GRADIENT DESCENT RESULTS ")
print("===================================")

print("\nAccuracy:\n")

print(
    accuracy_score(
        y_test,
        gd_pred
    )
)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        gd_pred
    )
)

print("\nConfusion Matrix:\n")

print(
    confusion_matrix(
        y_test,
        gd_pred
    )
)

# =========================================================
# SAVE GD MODEL
# =========================================================

joblib.dump(

    gd_model,

    "pcod_gd_model.pkl"

)

print("\nGradient Descent model saved.")

# =========================================================
# FEATURE IMPORTANCE
# =========================================================

importance = rf_model.feature_importances_

feature_importance = pd.DataFrame({

    "Feature": features,

    "Importance": importance

})

feature_importance = feature_importance.sort_values(

    by="Importance",

    ascending=False

)

print("\n===================================")
print(" FEATURE IMPORTANCE ")
print("===================================\n")

print(feature_importance)

# =========================================================
# DONE
# =========================================================

print("\n===================================")
print(" AI TRAINING COMPLETED ")
print("===================================")
# import pandas as pd
# import numpy as np
# import joblib

# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report

# # =========================================================
# # LOAD DATASET
# # =========================================================

# df = pd.read_csv("PCOS_data.csv")

# # =========================================================
# # CLEAN COLUMN NAMES
# # =========================================================

# df.columns = df.columns.str.strip()

# # =========================================================
# # SELECT FEATURES
# # =========================================================

# features = [

#     "Age (yrs)",
#     "Weight (Kg)",
#     "BMI",
#     "Cycle length(days)",
#     "Weight gain(Y/N)",
#     "Hair loss(Y/N)",
#     "Pimples(Y/N)",
#     "Fast food (Y/N)"

# ]

# # TARGET COLUMN
# target = "PCOS (Y/N)"

# # =========================================================
# # HANDLE MISSING VALUES
# # =========================================================

# df = df[features + [target]]

# df = df.replace("Yes", 1)
# df = df.replace("No", 0)

# df = df.replace("Y", 1)
# df = df.replace("N", 0)

# df = df.replace("YES", 1)
# df = df.replace("NO", 0)

# df = df.fillna(df.mean(numeric_only=True))

# # =========================================================
# # FEATURES + TARGET
# # =========================================================

# X = df[features]
# y = df[target]

# # =========================================================
# # TRAIN TEST SPLIT
# # =========================================================

# X_train, X_test, y_train, y_test = train_test_split(

#     X,
#     y,
#     test_size=0.2,
#     random_state=42

# )

# # =========================================================
# # RANDOM FOREST MODEL
# # =========================================================

# model = RandomForestClassifier(

#     n_estimators=200,
#     random_state=42

# )

# model.fit(X_train, y_train)

# # =========================================================
# # PREDICTIONS
# # =========================================================

# y_pred = model.predict(X_test)

# accuracy = accuracy_score(y_test, y_pred)

# print("\nAccuracy:\n")
# print(accuracy)

# print("\nClassification Report:\n")
# print(classification_report(y_test, y_pred))

# # =========================================================
# # SAVE MODEL
# # =========================================================

# joblib.dump(model, "pcod_model.pkl")

# print("\nModel saved as pcod_model.pkl")