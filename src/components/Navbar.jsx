import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo with a soft glow */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🌸</span> FemCare <span style={styles.logoAccent}>AI</span>
      </div>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/PTracker" style={styles.link}>Period Tracker</Link>
            <Link to="/CycleHistory" style={styles.link}>History</Link>
            <Link to="/PCOD" style={styles.link}>PCOD</Link>
            <Link to="/PCOS" style={styles.link}>PCOS</Link>
            <Link to="/HealthTips" style={styles.link}>Tips</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.signupBtn}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  navbar: {
    width: "100%",
    height: "80px",
    background: "rgba(255, 255, 255, 0.8)", 
    backdropFilter: "blur(15px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10%",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(255, 133, 162, 0.2)",
  },

  logo: {
    color: "#4A4A4A",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logoAccent: {
    color: "#FF85A2",
  },

  logoIcon: {
    fontSize: "28px",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  link: {
    color: "#666",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.3s ease",
    position: "relative",
  },

  
  logoutBtn: {
    background: "transparent",
    color: "#FF6B95",
    border: "1px solid #FF6B95",
    padding: "8px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  signupBtn: {
    background: "linear-gradient(110deg, #FF85A2 0%, #FF6B95 100%)",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 25px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(255, 133, 162, 0.3)",
  }
};