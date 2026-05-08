// src/pages/Tracker.jsx

import React, { useState } from "react";
import axios from "axios";

function Tracker() {

  const [formData, setFormData] = useState({
    cycleLength: "",
    periodDate: "",
    symptoms: ""
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // ✅ Handle Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Submit Cycle Data
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5000/save-cycle",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message);

      // Reset Form
      setFormData({
        cycleLength: "",
        periodDate: "",
        symptoms: ""
      });

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Failed to save cycle"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.heading}>
          Period Tracker
        </h2>

        <form onSubmit={handleSubmit}>

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
              placeholder="Enter cycle length"
              style={styles.input}
              required
            />
          </div>

          {/* Period Start Date */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Last Period Date
            </label>

            <input
              type="date"
              name="periodDate"
              value={formData.periodDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Symptoms */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Symptoms
            </label>

            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="e.g cramps, headache, fatigue"
              style={styles.textarea}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Cycle"}
          </button>

        </form>

        {/* Message */}
        {message && (
          <p style={styles.message}>
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default Tracker;

// ✅ Styles
const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7f6"
  },

  card: {
    width: "450px",
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

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "none"
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

  message: {
    marginTop: "20px",
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "500"
  }
};