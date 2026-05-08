import React, { useEffect, useState } from "react";
import axios from "axios";

function CycleHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:5000/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Your Cycle Journey</h2>
          <p style={styles.subHeading}>Past logs and AI-tracked health trends</p>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Fetching your records...</p>
          </div>
        ) : history.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={{ fontSize: "50px" }}>🌸</span>
            <p style={styles.noData}>No records found yet. Start tracking to see your history!</p>
          </div>
        ) : (
          <div style={styles.historyList}>
            {history.map((item, index) => (
              <div key={index} style={styles.historyCard}>
                <div style={styles.cardHeader}>
                  <span style={styles.dateBadge}>{item.period_date}</span>
                  <span style={styles.cycleBadge}>{item.cycle_length} Days</span>
                </div>
                
                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.label}>Symptoms Recorded</span>
                    <p style={styles.value}>{item.symptoms || "No symptoms logged"}</p>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.label}>Entry Date</span>
                    <p style={styles.value}>{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CycleHistory;

// ✅ Modern Feminine Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF2F5 0%, #F8E7ED 100%)",
    padding: "60px 20px",
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "30px",
    boxShadow: "0 10px 30px rgba(255, 133, 162, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "32px",
    color: "#4A4A4A",
    fontWeight: "700",
    margin: 0,
  },

  subHeading: {
    color: "#888",
    fontSize: "16px",
    marginTop: "8px",
  },

  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  historyCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    border: "1px solid #F0F0F0",
    transition: "transform 0.2s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "1px solid #FAF2F5",
    paddingBottom: "12px",
  },

  dateBadge: {
    background: "#FFF0F3",
    color: "#FF6B95",
    padding: "6px 16px",
    borderRadius: "50px",
    fontWeight: "600",
    fontSize: "14px",
  },

  cycleBadge: {
    color: "#4A4A4A",
    fontWeight: "600",
    fontSize: "15px",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  detailItem: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "12px",
    color: "#AAA",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },

  value: {
    margin: 0,
    color: "#555",
    fontSize: "15px",
    lineHeight: "1.5",
  },

  loadingContainer: {
    textAlign: "center",
    padding: "40px",
  },

  loadingText: {
    color: "#FF85A2",
    fontWeight: "500",
  },

  emptyState: {
    textAlign: "center",
    padding: "50px 20px",
  },

  noData: {
    color: "#999",
    marginTop: "15px",
    fontSize: "16px",
  }
};