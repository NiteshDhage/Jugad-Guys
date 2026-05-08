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

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Validation
  const validate = () => {

    let newErrors = {};

    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number, special character and 8+ length";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
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

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.heading}>Create Account</h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && (
              <p style={styles.error}>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && (
              <p style={styles.error}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && (
              <p style={styles.error}>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.confirmPassword && (
              <p style={styles.error}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;

// ✅ Inline Styling
const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7f6"
  },

  card: {
    width: "400px",
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

  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px"
  },

  loginText: {
    marginTop: "18px",
    textAlign: "center"
  },

  link: {
    color: "#2e7d32",
    textDecoration: "none",
    fontWeight: "bold"
  }
};