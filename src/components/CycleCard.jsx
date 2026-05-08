import React from "react";

function CycleCard({
  cycleLength,
  periodDate,
  symptoms,
  nextCycle,
  status
}) {
  return (
    <div style={styles.card}>
      {/* Header with Status Badge */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Cycle Summary</h3>
          <p style={styles.subtitle}>Overview of your recent patterns</p>
        </div>
        <span
          style={{
            ...styles.status,
            background: status === "Regular" ? "#E8F5E9" : "#FFF8E1",
            color: status === "Regular" ? "#2E7D32" : "#F9A825",
            border: `1px solid ${status === "Regular" ? "#C8E6C9" : "#FFECB3"}`
          }}
        >
          {status}
        </span>
      </div>

      <div style={styles.mainGrid}>
        {/* Left Column: Key Stats */}
        <div style={styles.statsColumn}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Cycle Length</span>
            <span style={styles.value}>{cycleLength} Days</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Last Period</span>
            <span style={styles.value}>{periodDate}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Symptoms</span>
            <span style={styles.valueText}>{symptoms || "None logged"}</span>
          </div>
        </div>

        {/* Right Column: Highlight Box */}
        <div style={styles.highlightBox}>
          <p style={styles.highlightLabel}>Next Expected Cycle</p>
          <h2 style={styles.highlightDate}>{nextCycle}</h2>
          <div style={styles.predictionBadge}>AI Predicted</div>
        </div>
      </div>
    </div>
  );
}

export default CycleCard;

// ✅ Modern Dashboard Component Styles
const styles = {
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(255, 133, 162, 0.08)",
    marginBottom: "25px",
    border: "1px solid rgba(255, 133, 162, 0.1)",
    transition: "transform 0.2s ease",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    color: "#4A4A4A",
    fontSize: "24px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "4px 0 0 0",
    color: "#999",
    fontSize: "14px",
  },

  status: {
    padding: "6px 16px",
    borderRadius: "50px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  mainGrid: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap", // For mobile responsiveness
  },

  statsColumn: {
    flex: 1,
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  label: {
    fontSize: "12px",
    color: "#AAA",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },

  value: {
    fontSize: "18px",
    color: "#4A4A4A",
    fontWeight: "600",
  },

  valueText: {
    fontSize: "15px",
    color: "#666",
    lineHeight: "1.4",
  },

  highlightBox: {
    flex: "0 0 200px",
    background: "linear-gradient(135deg, #FF85A2 0%, #FF6B95 100%)",
    padding: "20px",
    borderRadius: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(255, 107, 149, 0.25)",
  },

  highlightLabel: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.9,
    fontWeight: "500",
  },

  highlightDate: {
    margin: "8px 0",
    fontSize: "22px",
    fontWeight: "700",
  },

  predictionBadge: {
    fontSize: "10px",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "4px 8px",
    borderRadius: "4px",
    alignSelf: "center",
    fontWeight: "600",
  }
};