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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:5000/save-cycle",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage(response.data.message);
      setFormData({ cycleLength: "", periodDate: "", symptoms: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save cycle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.headerContainer}>
          <span style={styles.icon}>📅</span>
          <h2 style={styles.heading}>Track Your Cycle</h2>
          <p style={styles.subHeading}>Keeping a log helps AI provide better insights.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Cycle Length */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Average Cycle Length</label>
            <input
              type="number"
              name="cycleLength"
              value={formData.cycleLength}
              onChange={handleChange}
              placeholder="e.g. 28 days"
              style={styles.input}
              required
            />
          </div>

          {/* Period Start Date */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>When did your last period start?</label>
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
            <label style={styles.label}>How are you feeling?</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Cramps, moods, energy levels..."
              style={styles.textarea}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={loading ? {...styles.button, opacity: 0.7} : styles.button}
            disabled={loading}
          >
            {loading ? "Recording..." : "Save My Data"}
          </button>
        </form>

        {message && (
          <div style={styles.messageBox}>
            <p style={styles.messageText}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracker;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #FDF2F5 0%, #F8E7ED 100%)",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 15px 35px rgba(255, 133, 162, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
  },

  headerContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },

  icon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },

  heading: {
    margin: 0,
    fontSize: "28px",
    color: "#4A4A4A",
    fontWeight: "700",
  },

  subHeading: {
    fontSize: "14px",
    color: "#888",
    marginTop: "5px",
  },

  inputGroup: {
    marginBottom: "22px"
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600",
    color: "#666",
    fontSize: "14px",
    paddingLeft: "4px",
  },

  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255, 133, 162, 0.3)",
    fontSize: "15px",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    color: "#4A4A4A",
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255, 133, 162, 0.3)",
    fontSize: "15px",
    background: "#fff",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    color: "#4A4A4A",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(110deg, #FF85A2 0%, #FF6B95 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(255, 107, 149, 0.3)",
    transition: "transform 0.2s ease",
  },

  messageBox: {
    marginTop: "25px",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255, 133, 162, 0.1)",
    border: "1px solid rgba(255, 133, 162, 0.2)",
  },

  messageText: {
    textAlign: "center",
    color: "#FF6B95",
    fontWeight: "600",
    margin: 0,
    fontSize: "14px",
  }
};