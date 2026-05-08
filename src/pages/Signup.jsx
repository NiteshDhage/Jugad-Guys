// src/pages/Signup.jsx

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    if (formData.name.trim().length < 3) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number, special character and 8+ length";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
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
        style={styles.mainCard}
        className="animate-main"
      >

        {/* Left Hero Section */}
        <div style={styles.heroSection}>

          <div style={styles.heroContent}>

            <span style={styles.heroBadge}>
              Women Wellness Portal
            </span>

            <h1 style={styles.heroTitle}>
              You are in <br />
              <span style={styles.heroHighlight}>
                good hands
              </span>
            </h1>

            <p style={styles.heroText}>
              Join today and experience a
              smarter, secure, and personalized
              way to manage your wellness,
              health insights, and lifestyle.
            </p>

            <div style={styles.featureRow}>
              <div style={styles.featureCard}>
                🌸 Cycle Tracking
              </div>

              <div style={styles.featureCard}>
                💖 Wellness Insights
              </div>
            </div>

          </div>

          {/* Decorative Elements */}
          <div
            style={styles.decorationPulse}
            className="animate-float glow-circle"
          ></div>

          <div
            style={styles.decorationCircle}
            className="animate-float"
          ></div>

          <div
            style={styles.blurBlob}
            className="shine-effect"
          ></div>

        </div>

        {/* Right Form Section */}
        <div style={styles.formSection}>

          <div
            style={styles.formContainer}
            className="card-hover"
          >

            <h2 style={styles.formHeading}>
              Create Account
            </h2>

            <p style={styles.formSubheading}>
              Start your wellness journey with us
            </p>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.inputField}
                  className="hover-input"
                />

                {errors.name && (
                  <span style={styles.errorText}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.inputField}
                  className="hover-input"
                />

                {errors.email && (
                  <span style={styles.errorText}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.inputField}
                  className="hover-input"
                />

                {errors.password && (
                  <span style={styles.errorText}>
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={styles.inputField}
                  className="hover-input"
                />

                {errors.confirmPassword && (
                  <span style={styles.errorText}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                style={
                  loading
                    ? {
                        ...styles.submitBtn,
                        opacity: 0.7
                      }
                    : styles.submitBtn
                }
                className="hover-button"
              >
                {loading
                  ? "Creating..."
                  : "Sign Up"}
              </button>

            </form>

            <p style={styles.footerText}>
              Already have an account?{" "}

              <Link
                to="/login"
                style={styles.footerLink}
              >
                Login
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
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #f3e8ff 100%)",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    overflow: "hidden"
  },

  mainCard: {
    display: "flex",
    width: "1100px",
    maxWidth: "95vw",
    minHeight: "720px",
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
    display: "flex",
    alignItems: "center",
    padding: "60px",
    overflow: "hidden"
  },

  heroContent: {
    zIndex: 2,
    maxWidth: "420px"
  },

  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.18)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "50px",
    fontSize: "13px",
    marginBottom: "24px",
    backdropFilter: "blur(10px)",
    letterSpacing: "0.5px"
  },

  heroTitle: {
    fontSize: "50px",
    color: "#fff",
    lineHeight: "1.1",
    marginBottom: "22px",
    fontWeight: "800"
  },

  heroHighlight: {
    color: "#fbcfe8"
  },

  heroText: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.9)",
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

  formSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: "34px",
    fontWeight: "800",
    color: "#581c87",
    marginBottom: "8px"
  },

  formSubheading: {
    color: "#7e748d",
    fontSize: "15px",
    marginBottom: "35px"
  },

  inputWrapper: {
    marginBottom: "22px"
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b21a8",
    marginBottom: "8px"
  },

  inputField: {
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

  submitBtn: {
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

  errorText: {
    color: "#e11d48",
    fontSize: "12px",
    marginTop: "6px",
    display: "block"
  },

  footerText: {
    textAlign: "center",
    marginTop: "28px",
    fontSize: "14px",
    color: "#6b7280"
  },

  footerLink: {
    color: "#c026d3",
    fontWeight: "700",
    textDecoration: "none"
  },

  decorationPulse: {
    position: "absolute",
    right: "-80px",
    top: "-80px",
    width: "350px",
    height: "350px",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "50%",
    filter: "blur(30px)"
  },

  decorationCircle: {
    position: "absolute",
    bottom: "-60px",
    left: "-60px",
    width: "220px",
    height: "220px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "50%",
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
  }
};

export default Signup;