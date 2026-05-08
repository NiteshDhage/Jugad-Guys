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

      const response = await axios.get(
        "http://127.0.0.1:5000/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data.history);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      {/* Animations */}
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

          @keyframes pulseCard {
            0% {
              box-shadow: 0 0 0px rgba(236,72,153,0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(236,72,153,0.25);
            }
            100% {
              box-shadow: 0 0 0px rgba(236,72,153,0.2);
            }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
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

          .history-card {
            animation: fadeInUp 0.6s ease forwards;
            transition: all 0.3s ease;
          }

          .history-card:hover {
            transform: translateY(-6px) scale(1.01);
            box-shadow: 0 15px 40px rgba(236,72,153,0.25);
          }

          .pulse-card {
            animation: pulseCard 4s infinite;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.2);
            border-top: 4px solid #f9a8d4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
        `}
      </style>

      {/* Background Glow Effects */}
      <div style={styles.bgGlow1} className="glow"></div>
      <div style={styles.bgGlow2} className="glow"></div>

      {/* Floating Decorative Circles */}
      <div style={styles.floatCircle1} className="floating"></div>
      <div style={styles.floatCircle2} className="floating"></div>

      <div style={styles.card} className="fade-animation pulse-card">

        {/* Header */}
        <div style={styles.header}>
          <span style={styles.icon} className="floating">
            🌸
          </span>

          <h2 style={styles.heading}>
            Your Cycle Journey
          </h2>

          <p style={styles.subHeading}>
            Past logs and AI-tracked wellness trends
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div className="spinner"></div>

            <p style={styles.loadingText}>
              Fetching your records...
            </p>
          </div>

        ) : history.length === 0 ? (

          /* Empty State */
          <div style={styles.emptyState}>
            <span
              style={{ fontSize: "60px" }}
              className="floating"
            >
              🌷
            </span>

            <p style={styles.noData}>
              No records found yet. Start tracking your wellness journey.
            </p>
          </div>

        ) : (

          /* History Cards */
          <div style={styles.historyList}>
            {history.map((item, index) => (
              <div
                key={index}
                style={styles.historyCard}
                className="history-card"
              >

                <div style={styles.cardHeader}>

                  <span style={styles.dateBadge}>
                    {item.period_date}
                  </span>

                  <span style={styles.cycleBadge}>
                    {item.cycle_length} Days
                  </span>

                </div>

                <div style={styles.detailsGrid}>

                  <div style={styles.detailItem}>
                    <span style={styles.label}>
                      Symptoms Recorded
                    </span>

                    <p style={styles.value}>
                      {item.symptoms || "No symptoms logged"}
                    </p>
                  </div>

                  <div style={styles.detailItem}>
                    <span style={styles.label}>
                      Entry Date
                    </span>

                    <p style={styles.value}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
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

/* Purple Pink Animated Styles */

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #be185d 100%)",
    padding: "60px 20px",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  bgGlow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(236,72,153,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px",
  },

  bgGlow2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background: "rgba(168,85,247,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "-100px",
    right: "-100px",
  },

  floatCircle1: {
    position: "absolute",
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    top: "100px",
    right: "100px",
    backdropFilter: "blur(10px)",
  },

  floatCircle2: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    bottom: "80px",
    left: "50px",
    backdropFilter: "blur(10px)",
  },

  card: {
    maxWidth: "850px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "45px",
    borderRadius: "32px",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    position: "relative",
    zIndex: 2,
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  icon: {
    fontSize: "60px",
    display: "inline-block",
    marginBottom: "15px",
  },

  heading: {
    fontSize: "38px",
    color: "#fff",
    fontWeight: "800",
    margin: 0,
  },

  subHeading: {
    color: "rgba(255,255,255,0.75)",
    marginTop: "10px",
    fontSize: "16px",
  },

  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  historyCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "24px",
    borderRadius: "22px",
    backdropFilter: "blur(12px)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingBottom: "14px",
  },

  dateBadge: {
    background: "rgba(255,255,255,0.12)",
    color: "#f9a8d4",
    padding: "8px 18px",
    borderRadius: "999px",
    fontWeight: "600",
    fontSize: "14px",
  },

  cycleBadge: {
    color: "#fff",
    fontWeight: "700",
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
    color: "#fbcfe8",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px",
    fontWeight: "600",
  },

  value: {
    margin: 0,
    color: "rgba(255,255,255,0.85)",
    lineHeight: "1.6",
    fontSize: "15px",
  },

  loadingContainer: {
    textAlign: "center",
    padding: "50px",
  },

  loadingText: {
    color: "#f9a8d4",
    fontWeight: "600",
    fontSize: "16px",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },

  noData: {
    color: "rgba(255,255,255,0.75)",
    marginTop: "20px",
    fontSize: "17px",
  },
};