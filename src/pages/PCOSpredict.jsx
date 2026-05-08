// src/pages/PCOSPredict.jsx

import React, { useState } from "react";
import axios from "axios";

function PCOSPredict() {

  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    weight: "",
    cycleLength: "",
    hairGrowth: "0",
    skinDarkening: "0",
    pimples: "0",
    fastFood: "0"
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Submit Prediction
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPrediction(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Prediction failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.heading}>
          PCOS Prediction
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Age */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* BMI */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>BMI</label>

            <input
              type="number"
              step="0.1"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Weight */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Weight (kg)</label>

            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Cycle Length */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Cycle Length (days)
            </label>

            <input
              type="number"
              name="cycleLength"
              value={formData.cycleLength}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Hair Growth */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Excess Hair Growth
            </label>

            <select
              name="hairGrowth"
              value={formData.hairGrowth}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Skin Darkening */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Skin Darkening
            </label>

            <select
              name="skinDarkening"
              value={formData.skinDarkening}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Pimples */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Pimples
            </label>

            <select
              name="pimples"
              value={formData.pimples}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Fast Food */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Frequent Fast Food
            </label>

            <select
              name="fastFood"
              value={formData.fastFood}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Predicting..."
              : "Predict PCOS"}
          </button>

        </form>

        {/* Prediction Result */}
        {prediction && (

          <div style={styles.resultBox}>

            <h3 style={styles.resultTitle}>
              Prediction Result
            </h3>

            <p style={styles.resultText}>
              Risk Level:
              <span
                style={{
                  color:
                    prediction.prediction === "High Risk"
                      ? "red"
                      : "green",
                  fontWeight: "bold",
                  marginLeft: "8px"
                }}
              >
                {prediction.prediction}
              </span>
            </p>

            <p style={styles.resultText}>
              Confidence:
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {prediction.confidence}%
              </span>
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default PCOSPredict;

// ✅ Styles
const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7f6",
    padding: "20px"
  },

  card: {
    width: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#2e7d32"
  },

  inputGroup: {
    marginBottom: "18px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#2e7d32",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f1f8f4",
    border: "1px solid #c8e6c9"
  },

  resultTitle: {
    marginBottom: "10px",
    color: "#2e7d32"
  },

  resultText: {
    marginBottom: "8px",
    fontSize: "16px"
  }
};