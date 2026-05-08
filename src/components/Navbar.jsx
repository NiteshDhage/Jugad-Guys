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
    <>
      {/* Animations */}
      <style>
        {`
          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes glowPulse {
            0% {
              box-shadow: 0 0 0 rgba(255,107,149,0.2);
            }
            50% {
              box-shadow: 0 0 25px rgba(255,107,149,0.35);
            }
            100% {
              box-shadow: 0 0 0 rgba(255,107,149,0.2);
            }
          }

          @keyframes floatLogo {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .animate-navbar {
            animation: fadeDown 0.8s ease forwards;
          }

          .animate-logo {
            animation: floatLogo 4s ease-in-out infinite;
          }

          .animate-glow {
            animation: glowPulse 4s ease-in-out infinite;
          }

          .nav-link-hover:hover {
            color: #FF6B95 !important;
          }

          .nav-link-hover::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -6px;
            width: 0%;
            height: 2px;
            background: #FF6B95;
            border-radius: 10px;
            transition: width 0.3s ease;
          }

          .nav-link-hover:hover::after {
            width: 100%;
          }

          .logout-hover:hover {
            background: #FF6B95 !important;
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255,107,149,0.25);
          }

          .signup-hover:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 25px rgba(255,107,149,0.35);
          }
        `}
      </style>

      <nav style={styles.navbar} className="animate-navbar">
        
        {/* Logo */}
        <div
          style={styles.logo}
          className="animate-logo"
        >
          <span style={styles.logoIcon}>🌸</span>
          FemCare
          <span style={styles.logoAccent}>AI</span>
        </div>

        {/* Navigation */}
        <div style={styles.navLinks}>
          {token ? (
            <>
              <Link
                to="/dashboard"
                style={styles.link}
                className="nav-link-hover"
              >
                Dashboard
              </Link>

              <Link
                to="/PTracker"
                style={styles.link}
                className="nav-link-hover"
              >
                Period Tracker
              </Link>

              <Link
                to="/CycleHistory"
                style={styles.link}
                className="nav-link-hover"
              >
                History
              </Link>

              <Link
                to="/PCOD"
                style={styles.link}
                className="nav-link-hover"
              >
                PCOD
              </Link>

              <Link
                to="/PCOS"
                style={styles.link}
                className="nav-link-hover"
              >
                PCOS
              </Link>

              <Link
                to="/HealthTips"
                style={styles.link}
                className="nav-link-hover"
              >
                Tips
              </Link>

              <button
                onClick={handleLogout}
                style={styles.logoutBtn}
                className="logout-hover"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={styles.link}
                className="nav-link-hover"
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={styles.signupBtn}
                className="signup-hover animate-glow"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

const styles = {
  navbar: {
    width: "100%",
    height: "80px",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(18px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10%",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(255, 133, 162, 0.15)",
    boxShadow: "0 8px 20px rgba(255, 133, 162, 0.05)",
  },

  logo: {
    color: "#4A4A4A",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  logoAccent: {
    color: "#FF6B95",
  },

  logoIcon: {
    fontSize: "30px",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },

  link: {
    color: "#666",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    position: "relative",
  },

  logoutBtn: {
    background: "transparent",
    color: "#FF6B95",
    border: "1px solid #FF6B95",
    padding: "10px 22px",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  signupBtn: {
    background: "linear-gradient(110deg, #d946ef 0%, #FF6B95 100%)",
    color: "#fff",
    textDecoration: "none",
    padding: "11px 26px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 18px rgba(255, 107, 149, 0.3)",
  },
};