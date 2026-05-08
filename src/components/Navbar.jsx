// src/components/Navbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <nav style={styles.navbar}>

      {/* Logo */}
      <div style={styles.logo}>
        FemCare AI
      </div>

      {/* Navigation Links */}
      <div style={styles.navLinks}>

        {token ? (

          <>
            <Link
              to="/dashboard"
              style={styles.link}
            >
              Dashboard
            </Link>

            <Link
              to="/PTracker"
              style={styles.link}
            >
              Period_Tracker
            </Link>

            <Link
              to="/CycleHistory"
              style={styles.link}
            >
              Cycle_History
            </Link>

            <Link
              to="/PCODpredict"
              style={styles.link}
            >
              PCOD
            </Link>

            <Link
              to="/PCOSpredict"
              style={styles.link}
            >
              PCOS
            </Link>
            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              style={styles.link}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={styles.link}
            >
              Signup
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;

// ✅ Styles
const styles = {

  navbar: {
    width: "100%",
    height: "70px",
    background: "#2e7d32",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    boxSizing: "border-box",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  logo: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold"
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500"
  },

  logoutBtn: {
    background: "#fff",
    color: "#2e7d32",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  }
};