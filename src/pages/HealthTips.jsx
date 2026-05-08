import React from "react";

function HealthTips() {
  const tips = [
    {
      title: "Stay Hydrated",
      icon: "💧",
      description: "Drink at least 2–3 liters of water daily to maintain hormonal balance and improve skin elasticity."
    },
    {
      title: "Regular Exercise",
      icon: "🏃‍♀️",
      description: "Exercise helps regulate menstrual cycles, reduce stress, and improve insulin sensitivity through movement."
    },
    {
      title: "Healthy Diet",
      icon: "🥗",
      description: "Focus on anti-inflammatory foods like leafy greens, berries, and omega-3 rich seeds to support your endocrine system."
    },
    {
      title: "Sleep Well",
      icon: "😴",
      description: "Aim for 7-8 hours of quality sleep. Melatonin production is key to regulating your reproductive hormones."
    },
    {
      title: "Track Your Cycle",
      icon: "📅",
      description: "Monitoring your cycle helps detect irregularities early and provides data for your AI health assessments."
    },
    {
      title: "Reduce Stress",
      icon: "🧘‍♀️",
      description: "High cortisol can disrupt ovulation. Practice mindfulness or gentle yoga to keep your stress response in check."
    },
    {
      title: "Avoid Junk Food",
      icon: "🍔",
      description: "Processed sugars can trigger insulin spikes, which are directly linked to worsening PCOS/PCOD symptoms."
    },
    {
      title: "Consult a Doctor",
      icon: "👩‍⚕️",
      description: "Our AI is a guide, but a medical professional can provide clinical diagnosis and personalized treatment plans."
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Wellness Sanctuary</h1>
        <div style={styles.underline}></div>
        <p style={styles.subHeading}>
          Expert-curated lifestyle adjustments to harmonize your body and mind.
        </p>
      </div>

      {/* Modern Tips Grid */}
      <div style={styles.grid}>
        {tips.map((tip, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconCircle}>{tip.icon}</div>
            <h3 style={styles.cardTitle}>{tip.title}</h3>
            <p style={styles.cardDescription}>{tip.description}</p>
            <div style={styles.cardFooter}>Wellness Tip #{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthTips;

// ✅ Modern Aesthetic Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF2F5 0%, #F8E7ED 100%)",
    padding: "60px 40px",
    fontFamily: "'Poppins', sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "60px",
  },

  heading: {
    color: "#4A4A4A",
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "10px",
    letterSpacing: "-1px",
  },

  underline: {
    width: "60px",
    height: "4px",
    background: "#FF85A2",
    margin: "0 auto 20px",
    borderRadius: "2px",
  },

  subHeading: {
    color: "#888",
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.5",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    padding: "35px",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 10px 20px rgba(255, 133, 162, 0.05)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
  },

  iconCircle: {
    width: "60px",
    height: "60px",
    background: "#FFF",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(255, 133, 162, 0.1)",
  },

  cardTitle: {
    color: "#4A4A4A",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "15px",
  },

  cardDescription: {
    color: "#666",
    fontSize: "15px",
    lineHeight: "1.7",
    marginBottom: "20px",
  },

  cardFooter: {
    marginTop: "auto",
    fontSize: "12px",
    color: "#FF85A2",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
  }
};