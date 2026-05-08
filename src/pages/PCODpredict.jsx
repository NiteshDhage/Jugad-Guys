import React, { useState } from "react";
import axios from "axios";

function PCODPredict() {
  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    weight: "",
    cycleLength: "",
    irregularPeriods: "0",
    weightGain: "0",
    hairLoss: "0",
    acne: "0",
    stress: "0"
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

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
        "http://127.0.0.1:5000/pcod-predict",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPrediction(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.icon}>💖</span>
          <h2 style={styles.heading}>PCOD Risk Assessment</h2>
          <p style={styles.subHeading}>AI-driven analysis based on your symptoms and lifestyle.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            {/* Column 1: Vital Stats */}
            <div style={styles.column}>
              <h4 style={styles.columnTitle}>Vital Statistics</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} style={styles.input} placeholder="e.g. 22" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Current Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={styles.input} placeholder="Weight" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>BMI Value</label>
                <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} style={styles.input} placeholder="BMI" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Cycle Length (Days)</label>
                <input type="number" name="cycleLength" value={formData.cycleLength} onChange={handleChange} style={styles.input} placeholder="e.g. 28" required />
              </div>
            </div>

            {/* Column 2: Observations */}
            <div style={styles.column}>
              <h4 style={styles.columnTitle}>Health Observations</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Irregular Periods?</label>
                <select name="irregularPeriods" value={formData.irregularPeriods} onChange={handleChange} style={styles.select}>
                  <option value="0">No / Regular</option>
                  <option value="1">Yes / Irregular</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Sudden Weight Gain?</label>
                <select name="weightGain" value={formData.weightGain} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Significant Hair Loss?</label>
                <select name="hairLoss" value={formData.hairLoss} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Persistent Acne?</label>
                <select name="acne" value={formData.acne} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>High Stress Levels?</label>
                <select name="stress" value={formData.stress} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Generate Analysis "}
          </button>
        </form>

        {prediction && (
          <div style={{...styles.resultBox, borderColor: prediction.prediction === "High Risk" ? "#FF85A2" : "#81C784"}}>
            <h3 style={styles.resultTitle}>Prediction Results</h3>
            <div style={styles.resultRow}>
              <p style={styles.resultText}>Status:</p>
              <span style={{...styles.badge, background: prediction.prediction === "High Risk" ? "#FFE5EB" : "#E8F5E9", color: prediction.prediction === "High Risk" ? "#FF6B95" : "#2E7D32"}}>
                {prediction.prediction}
              </span>
            </div>
            <div style={styles.resultRow}>
              <p style={styles.resultText}>AI Confidence Level:</p>
              <span style={styles.confidenceText}>{prediction.confidence}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PCODPredict;

// ✅ Advanced Two-Column Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF2F5 0%, #F8E7ED 100%)",
    padding: "60px 20px",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    maxWidth: "900px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(20px)",
    padding: "50px",
    borderRadius: "32px",
    boxShadow: "0 25px 50px rgba(255, 133, 162, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.7)"
  },
  header: { textAlign: "center", marginBottom: "45px" },
  icon: { fontSize: "42px", display: "block", marginBottom: "12px" },
  heading: { fontSize: "34px", color: "#4A4A4A", fontWeight: "700", margin: 0 },
  subHeading: { color: "#999", fontSize: "15px", marginTop: "10px" },
  formGrid: { display: "flex", gap: "50px", marginBottom: "40px", flexWrap: "wrap" },
  column: { flex: 1, minWidth: "320px" },
  columnTitle: { 
    fontSize: "17px", 
    color: "#FF85A2", 
    marginBottom: "25px", 
    borderBottom: "2px solid #FFF0F3", 
    paddingBottom: "12px", 
    fontWeight: "600",
    letterSpacing: "0.5px"
  },
  inputGroup: { marginBottom: "22px" },
  label: { display: "block", marginBottom: "10px", fontWeight: "500", color: "#666", fontSize: "13px" },
  input: {
    width: "100%", padding: "14px 18px", borderRadius: "14px", border: "1px solid rgba(255, 133, 162, 0.2)",
    fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "0.3s"
  },
  select: {
    width: "100%", padding: "14px 18px", borderRadius: "14px", border: "1px solid rgba(255, 133, 162, 0.2)",
    fontSize: "14px", outline: "none", cursor: "pointer", background: "#fff", boxSizing: "border-box"
  },
  button: {
    width: "100%", padding: "18px", border: "none", borderRadius: "18px",
    background: "linear-gradient(110deg, #FF85A2 0%, #FF6B95 100%)",
    color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer",
    boxShadow: "0 10px 25px rgba(255, 107, 149, 0.4)", transition: "all 0.3s ease"
  },
  resultBox: {
    marginTop: "40px", padding: "30px", borderRadius: "24px", background: "#fff",
    border: "2px dashed #EEE", textAlign: "center"
  },
  resultTitle: { margin: "0 0 20px 0", color: "#4A4A4A", fontSize: "20px", fontWeight: "600" },
  resultRow: { display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "12px" },
  resultText: { margin: 0, color: "#777", fontSize: "15px" },
  badge: { padding: "8px 20px", borderRadius: "50px", fontWeight: "700", fontSize: "15px", letterSpacing: "0.5px" },
  confidenceText: { fontWeight: "700", color: "#4A4A4A", fontSize: "16px" }
};