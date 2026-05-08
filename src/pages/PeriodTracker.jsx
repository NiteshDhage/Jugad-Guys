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
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message);

      setFormData({
        cycleLength: "",
        periodDate: "",
        symptoms: ""
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save cycle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      
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
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes glow {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0.6;
            }
          }

          @keyframes pulseButton {
            0% {
              box-shadow: 0 0 0px rgba(236,72,153,0.5);
            }
            50% {
              box-shadow: 0 0 25px rgba(236,72,153,0.8);
            }
            100% {
              box-shadow: 0 0 0px rgba(236,72,153,0.5);
            }
          }

          .animate-fade {
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

          .input-focus:focus {
            border-color: #ec4899 !important;
            box-shadow: 0 0 15px rgba(236,72,153,0.3);
          }
        `}
      </style>

      {/* Background Glow Effects */}
      <div style={styles.bgGlow1} className="glow"></div>
      <div style={styles.bgGlow2} className="glow"></div>

      <div style={styles.mainContainer} className="animate-fade">

        {/* Hero Section */}
        <div style={styles.heroSection}>
          
          <div style={styles.heroContent}>
            <span style={styles.heroIcon} className="floating">
              🌸
            </span>

            <h1 style={styles.heroTitle}>
              Track Your <br />
              <span style={styles.heroAccent}>Flow & Rhythm</span>
            </h1>

            <p style={styles.heroText}>
              Consistent logging helps predict your cycle accurately and
              monitor your wellness journey beautifully.
            </p>
          </div>

          {/* Floating Decorative Shapes */}
          <div style={styles.circle1} className="floating"></div>
          <div style={styles.circle2} className="floating"></div>
        </div>

        {/* Form Section */}
        <div style={styles.formSection}>
          <div style={styles.formContainer}>

            <h2 style={styles.formHeading}>
              Health Log
            </h2>

            <p style={styles.formSubheading}>
              Update your latest cycle details below
            </p>

            <form onSubmit={handleSubmit}>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Average Cycle Length
                </label>

                <input
                  type="number"
                  name="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  placeholder="e.g. 28"
                  style={styles.input}
                  className="input-focus"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Last Period Start Date
                </label>

                <input
                  type="date"
                  name="periodDate"
                  value={formData.periodDate}
                  onChange={handleChange}
                  style={styles.input}
                  className="input-focus"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Symptoms & Mood
                </label>

                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="How are you feeling today?"
                  style={styles.textarea}
                  className="input-focus"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={
                  loading
                    ? { ...styles.button, opacity: 0.7 }
                    : styles.button
                }
                className="pulse-btn"
              >
                {loading ? "Saving..." : "Record Data"}
              </button>

            </form>

            {message && (
              <div style={styles.messageBox}>
                <p style={styles.messageText}>
                  {message}
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #be185d 100%)",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    position: "relative",
    padding: "20px"
  },

  bgGlow1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(236,72,153,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px"
  },

  bgGlow2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(168,85,247,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "-100px",
    right: "-100px"
  },

  mainContainer: {
    width: "1100px",
    minHeight: "680px",
    display: "flex",
    borderRadius: "32px",
    overflow: "hidden",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
  },

  heroSection: {
    flex: 1.1,
    position: "relative",
    padding: "60px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background:
      "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.25))",
    overflow: "hidden"
  },

  heroContent: {
    position: "relative",
    zIndex: 2
  },

  heroIcon: {
    fontSize: "60px",
    display: "inline-block",
    marginBottom: "20px"
  },

  heroTitle: {
    fontSize: "52px",
    color: "#fff",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "24px"
  },

  heroAccent: {
    color: "#f9a8d4"
  },

  heroText: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.8",
    maxWidth: "420px"
  },

  circle1: {
    position: "absolute",
    top: "50px",
    right: "50px",
    width: "140px",
    height: "140px",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "50%",
    backdropFilter: "blur(10px)"
  },

  circle2: {
    position: "absolute",
    bottom: "50px",
    left: "30px",
    width: "220px",
    height: "220px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    backdropFilter: "blur(10px)"
  },

  formSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(25px)"
  },

  formContainer: {
    width: "100%",
    maxWidth: "420px"
  },

  formHeading: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px"
  },

  formSubheading: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: "35px"
  },

  inputGroup: {
    marginBottom: "24px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#fbcfe8",
    fontWeight: "600",
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease"
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease"
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  },

  messageBox: {
    marginTop: "24px",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    textAlign: "center"
  },

  messageText: {
    margin: 0,
    color: "#fff",
    fontWeight: "600"
  }
};

export default Tracker;