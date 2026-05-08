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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
          <span style={styles.icon}>🔬</span>
          <h2 style={styles.heading}>AI PCOS Assessment</h2>
          <p style={styles.subHeading}>Fill in your details for a personalized risk analysis.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            {/* Column 1: Physical Metrics */}
            <div style={styles.column}>
              <h4 style={styles.columnTitle}>Physical Metrics</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} style={styles.input} placeholder="e.g. 24" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={styles.input} placeholder="Weight" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>BMI</label>
                <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} style={styles.input} placeholder="BMI" required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Cycle Length (days)</label>
                <input type="number" name="cycleLength" value={formData.cycleLength} onChange={handleChange} style={styles.input} placeholder="Avg length" required />
              </div>
            </div>

            {/* Column 2: Symptoms & Lifestyle */}
            <div style={styles.column}>
              <h4 style={styles.columnTitle}>Symptoms & Lifestyle</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Excessive Hair Growth?</label>
                <select name="hairGrowth" value={formData.hairGrowth} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Skin Darkening?</label>
                <select name="skinDarkening" value={formData.skinDarkening} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Frequent Acne/Pimples?</label>
                <select name="pimples" value={formData.pimples} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Frequent Fast Food?</label>
                <select name="fastFood" value={formData.fastFood} onChange={handleChange} style={styles.select}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Health Data"}
          </button>
        </form>

        {prediction && (
          <div style={{...styles.resultBox, borderColor: prediction.prediction === "High Risk" ? "#FF85A2" : "#81C784"}}>
            <h3 style={styles.resultTitle}>Analysis Result</h3>
            <div style={styles.resultRow}>
              <p style={styles.resultText}>Risk Level:</p>
              <span style={{...styles.badge, background: prediction.prediction === "High Risk" ? "#FFE5EB" : "#E8F5E9", color: prediction.prediction === "High Risk" ? "#FF6B95" : "#2E7D32"}}>
                {prediction.prediction}
              </span>
            </div>
            <div style={styles.resultRow}>
              <p style={styles.resultText}>Model Confidence:</p>
              <span style={styles.confidenceText}>{prediction.confidence}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PCOSPredict;

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
    maxWidth: "850px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(15px)",
    padding: "45px",
    borderRadius: "30px",
    boxShadow: "0 20px 40px rgba(255, 133, 162, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.6)"
  },
  header: { textAlign: "center", marginBottom: "40px" },
  icon: { fontSize: "40px", display: "block", marginBottom: "10px" },
  heading: { fontSize: "32px", color: "#4A4A4A", fontWeight: "700", margin: 0 },
  subHeading: { color: "#888", fontSize: "15px", marginTop: "8px" },
  formGrid: { display: "flex", gap: "40px", marginBottom: "35px", flexWrap: "wrap" },
  column: { flex: 1, minWidth: "300px" },
  columnTitle: { fontSize: "16px", color: "#FF85A2", marginBottom: "20px", borderBottom: "2px solid #FFF0F3", paddingBottom: "10px", fontWeight: "600" },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "8px", fontWeight: "500", color: "#666", fontSize: "13px" },
  input: {
    width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255, 133, 162, 0.2)",
    fontSize: "14px", outline: "none", boxSizing: "border-box"
  },
  select: {
    width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255, 133, 162, 0.2)",
    fontSize: "14px", outline: "none", cursor: "pointer", background: "#fff", boxSizing: "border-box"
  },
  button: {
    width: "100%", padding: "16px", border: "none", borderRadius: "16px",
    background: "linear-gradient(110deg, #FF85A2 0%, #FF6B95 100%)",
    color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer",
    boxShadow: "0 8px 20px rgba(255, 107, 149, 0.3)", transition: "0.3s"
  },
  resultBox: {
    marginTop: "35px", padding: "25px", borderRadius: "20px", background: "#fff",
    border: "2px solid #EEE", textAlign: "center"
  },
  resultTitle: { margin: "0 0 15px 0", color: "#4A4A4A", fontSize: "18px" },
  resultRow: { display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "10px" },
  resultText: { margin: 0, color: "#666" },
  badge: { padding: "6px 16px", borderRadius: "50px", fontWeight: "700", fontSize: "14px" },
  confidenceText: { fontWeight: "700", color: "#4A4A4A" }
};