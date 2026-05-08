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
      alert(error.response?.data?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-18px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes glow {
            0% {
              transform: scale(1);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.08);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0.5;
            }
          }

          @keyframes pulseButton {
            0% {
              box-shadow: 0 0 0px rgba(236,72,153,0.4);
            }
            50% {
              box-shadow: 0 0 30px rgba(236,72,153,0.8);
            }
            100% {
              box-shadow: 0 0 0px rgba(236,72,153,0.4);
            }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .fade-animation {
            animation: fadeInUp 0.8s ease forwards;
          }

          .floating {
            animation: float 5s ease-in-out infinite;
          }

          .glow {
            animation: glow 6s ease-in-out infinite;
          }

          .pulse-btn {
            animation: pulseButton 3s infinite;
          }

          .card-hover {
            transition: all 0.3s ease;
          }

          .card-hover:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px rgba(236,72,153,0.25);
          }

          .input-focus:focus {
            border-color: #ec4899 !important;
            box-shadow: 0 0 15px rgba(236,72,153,0.3);
          }

          .spinner {
            width: 24px;
            height: 24px;
            border: 3px solid rgba(255,255,255,0.2);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: auto;
          }
        `}
      </style>

      {/* Background Glow Effects */}
      <div style={styles.bgGlow1} className="glow"></div>
      <div style={styles.bgGlow2} className="glow"></div>

      {/* Floating Decorative Shapes */}
      <div style={styles.floatCircle1} className="floating"></div>
      <div style={styles.floatCircle2} className="floating"></div>

      {/* Main Card */}
      <div style={styles.card} className="fade-animation">

        {/* Header */}
        <div style={styles.header}>

          <span style={styles.icon} className="floating">
            🔬
          </span>

          <h2 style={styles.heading}>
            AI PCOS Assessment
          </h2>

          <p style={styles.subHeading}>
            Fill in your details for a personalized AI-powered risk analysis
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div style={styles.formGrid}>

            {/* Left Column */}
            <div style={styles.column}>

              <h4 style={styles.columnTitle}>
                Physical Metrics
              </h4>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  style={styles.input}
                  className="input-focus"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Weight (kg)</label>

                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  style={styles.input}
                  className="input-focus"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>BMI</label>

                <input
                  type="number"
                  step="0.1"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  placeholder="BMI"
                  style={styles.input}
                  className="input-focus"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Cycle Length (days)
                </label>

                <input
                  type="number"
                  name="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  placeholder="Avg length"
                  style={styles.input}
                  className="input-focus"
                  required
                />
              </div>

            </div>

            {/* Right Column */}
            <div style={styles.column}>

              <h4 style={styles.columnTitle}>
                Symptoms & Lifestyle
              </h4>

              {[
                {
                  label: "Excessive Hair Growth?",
                  name: "hairGrowth"
                },
                {
                  label: "Skin Darkening?",
                  name: "skinDarkening"
                },
                {
                  label: "Frequent Acne/Pimples?",
                  name: "pimples"
                },
                {
                  label: "Frequent Fast Food?",
                  name: "fastFood"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={styles.inputGroup}
                >

                  <label style={styles.label}>
                    {item.label}
                  </label>

                  <select
                    name={item.name}
                    value={formData[item.name]}
                    onChange={handleChange}
                    style={styles.select}
                    className="input-focus"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>

                </div>
              ))}

            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            style={
              loading
                ? { ...styles.button, opacity: 0.7 }
                : styles.button
            }
            disabled={loading}
            className="pulse-btn"
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              "Analyze Health Data"
            )}
          </button>

        </form>

        {/* Prediction Result */}
        {prediction && (

          <div
            style={{
              ...styles.resultBox,
              borderColor:
                prediction.prediction === "High Risk"
                  ? "#ec4899"
                  : "#8b5cf6"
            }}
            className="fade-animation card-hover"
          >

            <h3 style={styles.resultTitle}>
              Analysis Result
            </h3>

            <div style={styles.resultRow}>

              <p style={styles.resultText}>
                Risk Level:
              </p>

              <span
                style={{
                  ...styles.badge,
                  background:
                    prediction.prediction === "High Risk"
                      ? "rgba(236,72,153,0.2)"
                      : "rgba(168,85,247,0.2)",
                  color:
                    prediction.prediction === "High Risk"
                      ? "#f9a8d4"
                      : "#d8b4fe"
                }}
              >
                {prediction.prediction}
              </span>

            </div>

            <div style={styles.resultRow}>

              <p style={styles.resultText}>
                Model Confidence:
              </p>

              <span style={styles.confidenceText}>
                {prediction.confidence}%
              </span>

            </div>

          </div>

        )}
      </div>
    </div>
  );
}

export default PCOSPredict;

/* Purple Pink Glassmorphism Styles */

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #be185d 100%)",
    padding: "60px 20px",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative"
  },

  bgGlow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(236,72,153,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px"
  },

  bgGlow2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background: "rgba(168,85,247,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "-100px",
    right: "-100px"
  },

  floatCircle1: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    top: "100px",
    right: "120px",
    backdropFilter: "blur(10px)"
  },

  floatCircle2: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    bottom: "60px",
    left: "60px",
    backdropFilter: "blur(10px)"
  },

  card: {
    maxWidth: "900px",
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "50px",
    borderRadius: "32px",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
    position: "relative",
    zIndex: 2
  },

  header: {
    textAlign: "center",
    marginBottom: "40px"
  },

  icon: {
    fontSize: "50px",
    display: "inline-block",
    marginBottom: "15px"
  },

  heading: {
    fontSize: "38px",
    color: "#fff",
    fontWeight: "800",
    margin: 0
  },

  subHeading: {
    color: "rgba(255,255,255,0.75)",
    marginTop: "10px",
    fontSize: "15px"
  },

  formGrid: {
    display: "flex",
    gap: "40px",
    marginBottom: "35px",
    flexWrap: "wrap"
  },

  column: {
    flex: 1,
    minWidth: "300px"
  },

  columnTitle: {
    fontSize: "18px",
    color: "#f9a8d4",
    marginBottom: "25px",
    borderBottom: "2px solid rgba(255,255,255,0.1)",
    paddingBottom: "12px",
    fontWeight: "700"
  },

  inputGroup: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600",
    color: "#fbcfe8",
    fontSize: "13px"
  },

  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "0.3s"
  },

  select: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "0.3s"
  },

  button: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },

  resultBox: {
    marginTop: "35px",
    padding: "28px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.08)",
    border: "2px solid",
    backdropFilter: "blur(10px)",
    textAlign: "center"
  },

  resultTitle: {
    margin: "0 0 18px 0",
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700"
  },

  resultRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    marginBottom: "12px"
  },

  resultText: {
    margin: 0,
    color: "rgba(255,255,255,0.8)",
    fontSize: "15px"
  },

  badge: {
    padding: "8px 18px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px"
  },

  confidenceText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: "16px"
  }
};