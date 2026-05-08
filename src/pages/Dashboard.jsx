import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      {/* Welcome Section with Gradient */}
      <div style={styles.welcomeCard}>
        <div style={styles.welcomeContent}>
          <h1 style={styles.heading}>
            Hello, {user?.name || "Beautiful"} <span style={styles.emoji}>✨</span>
          </h1>
          <p style={styles.subText}>
            Your wellness journey is looking bright today. Here’s your personal health snapshot.
          </p>
        </div>
      </div>

      {/* Stats Cards with Glassmorphism */}
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Next Cycle</h3>
          <p style={styles.cardValue}>In 5 Days</p>
          <div style={styles.progressBar}><div style={{...styles.progressFill, width: '70%'}}></div></div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Health Score</h3>
          <p style={styles.cardValue}>82%</p>
          <div style={styles.progressBar}><div style={{...styles.progressFill, width: '82%', background: '#FF85A2'}}></div></div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>PCOS Risk</h3>
          <p style={{ ...styles.cardValue, color: "#E91E63" }}>Medium</p>
          <p style={styles.cardLabel}>AI Predicted</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickSection}>
        <h2 style={styles.sectionTitle}>Daily Essentials</h2>
        <div style={styles.actionContainer}>
          {[
            { to: "/predictor", title: "AI Predictor", desc: "Smart PCOS risk analysis", icon: "🧠" },
            { to: "/tracker", title: "Cycle Tracker", desc: "Log and monitor flow", icon: "📅" },
            { to: "/tips", title: "Wellness Tips", desc: "Curated for your body", icon: "🌸" }
          ].map((item, index) => (
            <Link key={index} to={item.to} style={styles.actionCard} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={styles.actionIcon}>{item.icon}</div>
              <h3 style={styles.actionTitle}>{item.title}</h3>
              <p style={styles.actionDesc}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Health Tips Preview */}
      <div style={styles.tipSection}>
        <h2 style={styles.sectionTitle}>Daily Mantras</h2>
        <div style={styles.tipGrid}>
          <div style={styles.tipCard}>💧 Hydrate with 2L of infused water</div>
          <div style={styles.tipCard}>🧘‍♀️ 10 mins of gentle morning yoga</div>
          <div style={styles.tipCard}>🍏 Prioritize whole, colorful foods</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// ✅ Modern Advanced Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF2F5 0%, #F8E7ED 100%)",
    padding: "40px 10%",
    fontFamily: "'Poppins', sans-serif",
  },

  welcomeCard: {
    background: "linear-gradient(110deg, #FF85A2 0%, #FF6B95 100%)",
    color: "#fff",
    padding: "40px",
    borderRadius: "24px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(255, 133, 162, 0.3)",
    position: "relative",
    overflow: "hidden",
  },

  heading: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },

  subText: {
    marginTop: "12px",
    fontSize: "18px",
    opacity: 0.9,
    maxWidth: "500px",
    lineHeight: "1.6",
  },

  statsContainer: {
    display: "flex",
    gap: "25px",
    marginBottom: "50px",
    flexWrap: "wrap",
  },

  card: {
    flex: 1,
    minWidth: "240px",
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  },

  cardTitle: {
    color: "#888",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "10px",
  },

  cardValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#4A4A4A",
    margin: "5px 0",
  },

  progressBar: {
    height: "6px",
    background: "#EEE",
    borderRadius: "10px",
    marginTop: "15px",
  },

  progressFill: {
    height: "100%",
    background: "#FF85A2",
    borderRadius: "10px",
  },

  sectionTitle: {
    fontSize: "24px",
    color: "#4A4A4A",
    marginBottom: "25px",
    fontWeight: "600",
  },

  actionContainer: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
  },

  actionCard: {
    flex: 1,
    minWidth: "260px",
    background: "#fff",
    padding: "35px 25px",
    borderRadius: "20px",
    textDecoration: "none",
    color: "#333",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    transition: "all 0.3s ease",
    textAlign: "center",
    border: "1px solid transparent",
  },

  actionIcon: {
    fontSize: "40px",
    marginBottom: "15px",
  },

  actionTitle: {
    fontSize: "20px",
    marginBottom: "8px",
    color: "#FF6B95",
  },

  actionDesc: {
    fontSize: "14px",
    color: "#777",
  },

  tipGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  tipCard: {
    background: "rgba(255, 255, 255, 0.5)",
    padding: "20px",
    borderRadius: "15px",
    borderLeft: "5px solid #FF85A2",
    fontSize: "15px",
    color: "#555",
    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
  },
};