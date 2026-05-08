import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

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

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
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

          @keyframes pulse {
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
            animation: pulse 3s infinite;
          }

          .card-hover {
            transition: all 0.35s ease;
          }

          .card-hover:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(236,72,153,0.25);
          }

          .action-hover:hover {
            transform: translateY(-12px);
            box-shadow: 0 20px 40px rgba(168,85,247,0.25);
          }
        `}
      </style>

      {/* Background Glow Effects */}
      <div style={styles.glow1} className="glow"></div>
      <div style={styles.glow2} className="glow"></div>

      {/* Floating Circles */}
      <div style={styles.circle1} className="floating"></div>
      <div style={styles.circle2} className="floating"></div>

      <div style={styles.container}>

        {/* Hero Section */}
        <div style={styles.heroCard} className="fade-animation">

          <div style={styles.heroContent}>

            <h1 style={styles.heroTitle}>
              Hello,{" "}
              <span style={styles.heroAccent}>
                {user?.name || "Patient"}
              </span>
            </h1>

            <p style={styles.heroText}>
              Your wellness journey is looking bright today.
              Here’s your personal health snapshot and
              AI-driven insights.
            </p>

            <button
              style={styles.primaryBtn}
              className="pulse-btn"
            >
              VIEW FULL REPORT
            </button>

          </div>

          <div
            style={styles.heroDecoration}
            className="floating"
          >
            ✨
          </div>

        </div>

        {/* Health Snapshot */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Health Snapshot
          </h2>
        </div>

        <div style={styles.statsGrid}>

          <div
            style={styles.statCard}
            className="fade-animation card-hover"
          >
            <p style={styles.statLabel}>
              Next Cycle
            </p>

            <h3 style={styles.statValue}>
              In 5 Days
            </h3>

            <div style={styles.progressContainer}>
              <div
                style={{
                  ...styles.progressFill,
                  width: "70%"
                }}
              ></div>
            </div>
          </div>

          <div
            style={styles.statCard}
            className="fade-animation card-hover"
          >
            <p style={styles.statLabel}>
              Health Score
            </p>

            <h3 style={styles.statValue}>
              82%
            </h3>

            <div style={styles.progressContainer}>
              <div
                style={{
                  ...styles.progressFill,
                  width: "82%",
                  background:
                    "linear-gradient(90deg,#a855f7,#ec4899)"
                }}
              ></div>
            </div>
          </div>

          <div
            style={styles.statCard}
            className="fade-animation card-hover"
          >
            <p style={styles.statLabel}>
              AI Prediction
            </p>

            <h3
              style={{
                ...styles.statValue,
                color: "#f9a8d4"
              }}
            >
              Medium Risk
            </h3>

            <p style={styles.statSubText}>
              Based on recent logs
            </p>
          </div>

        </div>

        {/* Daily Essentials */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Daily Essentials
          </h2>
        </div>

        <div style={styles.actionGrid}>

          {[
            {
              to: "/predictor",
              title: "AI Predictor",
              desc: "Smart PCOS risk analysis",
              icon: "🧠"
            },
            {
              to: "/tracker",
              title: "Cycle Tracker",
              desc: "Log and monitor flow",
              icon: "📅"
            },
            {
              to: "/tips",
              title: "Wellness Tips",
              desc: "Curated for your body",
              icon: "🌸"
            }
          ].map((item, index) => (

            <Link
              key={index}
              to={item.to}
              style={{
                ...styles.actionCard,
                animationDelay: `${index * 0.1}s`
              }}
              className="fade-animation action-hover"
            >

              <div
                style={styles.actionIcon}
                className="floating"
              >
                {item.icon}
              </div>

              <h4 style={styles.actionTitle}>
                {item.title}
              </h4>

              <p style={styles.actionDesc}>
                {item.desc}
              </p>

            </Link>

          ))}

        </div>

        {/* Daily Mantras */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Daily Mantras
          </h2>
        </div>

        <div style={styles.mantraGrid}>

          {[
            "💧 Hydrate with 2L of water",
            "🧘‍♀️ 10 mins of gentle yoga",
            "🍏 Prioritize colorful foods"
          ].map((item, index) => (

            <div
              key={index}
              style={{
                ...styles.mantraCard,
                animationDelay: `${index * 0.2}s`
              }}
              className="fade-animation card-hover"
            >
              {item}
            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;

/* Purple Pink Animated Dashboard */

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #be185d 100%)",
    fontFamily: "'Poppins', sans-serif",
    padding: "40px 20px",
    overflow: "hidden",
    position: "relative"
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(236,72,153,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px"
  },

  glow2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background: "rgba(168,85,247,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "-100px",
    right: "-100px"
  },

  circle1: {
    position: "absolute",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    top: "120px",
    right: "100px",
    backdropFilter: "blur(10px)"
  },

  circle2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    bottom: "50px",
    left: "50px",
    backdropFilter: "blur(10px)"
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2
  },

  heroCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    padding: "55px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "45px",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    overflow: "hidden"
  },

  heroContent: {
    maxWidth: "550px",
    zIndex: 2
  },

  heroTitle: {
    fontSize: "48px",
    color: "#fff",
    fontWeight: "800",
    margin: 0
  },

  heroAccent: {
    color: "#f9a8d4"
  },

  heroText: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.8",
    margin: "20px 0 30px"
  },

  primaryBtn: {
    padding: "14px 30px",
    background:
      "linear-gradient(135deg,#ec4899,#a855f7)",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px"
  },

  heroDecoration: {
    fontSize: "100px",
    opacity: 0.3
  },

  sectionHeader: {
    marginBottom: "20px"
  },

  sectionTitle: {
    fontSize: "26px",
    color: "#fff",
    fontWeight: "700"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px",
    marginBottom: "50px"
  },

  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    padding: "30px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  statLabel: {
    fontSize: "13px",
    color: "#fbcfe8",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "10px"
  },

  statValue: {
    fontSize: "34px",
    color: "#fff",
    fontWeight: "800",
    margin: 0
  },

  statSubText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.65)",
    marginTop: "8px"
  },

  progressContainer: {
    height: "8px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
    marginTop: "20px",
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background:
      "linear-gradient(90deg,#ec4899,#a855f7)",
    borderRadius: "10px"
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
    marginBottom: "50px"
  },

  actionCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    padding: "40px 30px",
    borderRadius: "26px",
    textDecoration: "none",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "0.3s ease",
    opacity: 0
  },

  actionIcon: {
    fontSize: "50px",
    marginBottom: "20px"
  },

  actionTitle: {
    fontSize: "22px",
    color: "#fff",
    marginBottom: "10px",
    fontWeight: "700"
  },

  actionDesc: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.75)",
    lineHeight: "1.7"
  },

  mantraGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px"
  },

  mantraCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    padding: "22px",
    borderRadius: "18px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    borderLeft: "5px solid #f9a8d4",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    opacity: 0
  }
};