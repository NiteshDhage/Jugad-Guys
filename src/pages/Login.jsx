// src/pages/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes floatAnimation {
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

          @keyframes pulseGlow {
            0% {
              box-shadow: 0 0 0 rgba(236,72,153,0.2);
            }
            50% {
              box-shadow: 0 0 50px rgba(168,85,247,0.35);
            }
            100% {
              box-shadow: 0 0 0 rgba(236,72,153,0.2);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          .animate-main {
            animation: fadeInUp 0.9s ease forwards;
          }

          .animate-float {
            animation: floatAnimation 6s ease-in-out infinite;
          }

          .glow-circle {
            animation: pulseGlow 5s infinite ease-in-out;
          }

          .hover-input:focus {
            border-color: #c026d3 !important;
            box-shadow: 0 0 0 4px rgba(192,38,211,0.12);
            background: #ffffff !important;
            transform: scale(1.01);
          }

          .hover-button:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 18px 35px rgba(192,38,211,0.35);
          }

          .card-hover:hover {
            transform: translateY(-5px);
          }

          .shine-effect {
            background-size: 200% auto;
            animation: shimmer 4s linear infinite;
          }
        `}
      </style>

      <div
        style={styles.mainContainer}
        className="animate-main"
      >

        {/* Left Hero Section */}
        <div style={styles.heroSection}>

          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>
              Women Wellness Portal
            </span>

            <h1 style={styles.heroTitle}>
              Welcome back to <br />
              <span style={styles.heroAccent}>
                Good Hands
              </span>
            </h1>

            <p style={styles.heroText}>
              Your secure space for tracking wellness,
              monitoring health insights, and receiving
              AI-powered support designed for women’s care.
            </p>

            <div style={styles.featureRow}>
              <div style={styles.featureCard}>
                💖 AI Health Insights
              </div>

              <div style={styles.featureCard}>
                🌸 Cycle Tracking
              </div>
            </div>
          </div>

          {/* Decorative Animated Elements */}
          <div
            style={styles.decorativeCircleOne}
            className="animate-float glow-circle"
          ></div>

          <div
            style={styles.decorativeCircleTwo}
            className="animate-float"
          ></div>

          <div
            style={styles.blurBlob}
            className="shine-effect"
          ></div>

        </div>

        {/* Right Login Form */}
        <div style={styles.formSection}>

          <div
            style={styles.formContainer}
            className="card-hover"
          >

            <h2 style={styles.formHeading}>
              Login
            </h2>

            <p style={styles.formSubheading}>
              Enter your details to continue your
              wellness journey.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  className="hover-input"
                />

                {errors.email && (
                  <p style={styles.error}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  className="hover-input"
                />

                {errors.password && (
                  <p style={styles.error}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                style={
                  loading
                    ? {
                        ...styles.button,
                        opacity: 0.7
                      }
                    : styles.button
                }
                className="hover-button"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

            <p style={styles.footerText}>
              Don't have an account?{" "}

              <Link
                to="/signup"
                style={styles.link}
              >
                Sign Up
              </Link>
            </p>

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
      "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #f3e8ff 100%)",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    overflow: "hidden"
  },

  mainContainer: {
    display: "flex",
    width: "1100px",
    minHeight: "680px",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(18px)",
    borderRadius: "35px",
    overflow: "hidden",
    boxShadow:
      "0 25px 60px rgba(168,85,247,0.15)",
    border:
      "1px solid rgba(255,255,255,0.4)",
    opacity: 0
  },

  heroSection: {
    flex: 1.2,
    background:
      "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    position: "relative",
    padding: "60px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden"
  },

  heroContent: {
    zIndex: 2,
    maxWidth: "430px"
  },

  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "50px",
    fontSize: "13px",
    marginBottom: "24px",
    backdropFilter: "blur(10px)",
    letterSpacing: "0.5px"
  },

  heroTitle: {
    fontSize: "48px",
    color: "#fff",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "22px"
  },

  heroAccent: {
    color: "#fbcfe8"
  },

  heroText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "17px",
    lineHeight: "1.7",
    marginBottom: "35px"
  },

  featureRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  featureCard: {
    background: "rgba(255,255,255,0.15)",
    padding: "12px 18px",
    borderRadius: "16px",
    color: "#fff",
    fontSize: "14px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.2)"
  },

  decorativeCircleOne: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    top: "-100px",
    right: "-100px",
    filter: "blur(30px)"
  },

  decorativeCircleTwo: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    bottom: "-60px",
    left: "-60px",
    filter: "blur(20px)"
  },

  blurBlob: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
    top: "-150px",
    left: "-150px",
    borderRadius: "50%",
    filter: "blur(50px)"
  },

  formSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  formContainer: {
    width: "100%",
    maxWidth: "390px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(15px)",
    padding: "45px",
    borderRadius: "28px",
    boxShadow:
      "0 15px 35px rgba(236,72,153,0.08)",
    transition: "0.3s ease"
  },

  formHeading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#581c87",
    marginBottom: "8px"
  },

  formSubheading: {
    color: "#7e748d",
    fontSize: "15px",
    marginBottom: "35px",
    lineHeight: "1.6"
  },

  inputGroup: {
    marginBottom: "22px"
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b21a8",
    marginBottom: "8px"
  },

  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "16px",
    border: "1px solid #e9d5ff",
    outline: "none",
    fontSize: "15px",
    background: "#faf5ff",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "16px",
    background:
      "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "18px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.3s ease",
    boxShadow:
      "0 12px 30px rgba(168,85,247,0.3)"
  },

  error: {
    color: "#e11d48",
    fontSize: "12px",
    marginTop: "6px"
  },

  footerText: {
    textAlign: "center",
    marginTop: "28px",
    color: "#6b7280",
    fontSize: "14px"
  },

  link: {
    color: "#c026d3",
    fontWeight: "700",
    textDecoration: "none"
  }
};

export default Login;