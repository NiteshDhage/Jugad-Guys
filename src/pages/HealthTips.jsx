import React from "react";

function HealthTips() {
  const tips = [
    {
      title: "Stay Hydrated",
      icon: "💧",
      description:
        "Drink at least 2–3 liters of water daily to maintain hormonal balance and improve skin elasticity."
    },
    {
      title: "Regular Exercise",
      icon: "🏃‍♀️",
      description:
        "Exercise helps regulate menstrual cycles, reduce stress, and improve insulin sensitivity through movement."
    },
    {
      title: "Healthy Diet",
      icon: "🥗",
      description:
        "Focus on anti-inflammatory foods like leafy greens, berries, and omega-3 rich seeds to support your endocrine system."
    },
    {
      title: "Sleep Well",
      icon: "😴",
      description:
        "Aim for 7-8 hours of quality sleep. Melatonin production is key to regulating your reproductive hormones."
    },
    {
      title: "Track Your Cycle",
      icon: "📅",
      description:
        "Monitoring your cycle helps detect irregularities early and provides data for your AI health assessments."
    },
    {
      title: "Reduce Stress",
      icon: "🧘‍♀️",
      description:
        "High cortisol can disrupt ovulation. Practice mindfulness or gentle yoga to keep your stress response in check."
    },
    {
      title: "Avoid Junk Food",
      icon: "🍔",
      description:
        "Processed sugars can trigger insulin spikes, which are directly linked to worsening PCOS/PCOD symptoms."
    },
    {
      title: "Consult a Doctor",
      icon: "👩‍⚕️",
      description:
        "Our AI is a guide, but a medical professional can provide clinical diagnosis and personalized treatment plans."
    }
  ];

  return (
    <div style={styles.container}>

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
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0.5;
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

          .card-hover {
            transition: all 0.35s ease;
          }

          .card-hover:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(236,72,153,0.25);
          }

          .icon-hover:hover {
            transform: rotate(10deg) scale(1.1);
          }
        `}
      </style>

      {/* Background Glow */}
      <div style={styles.glow1} className="glow"></div>
      <div style={styles.glow2} className="glow"></div>

      {/* Floating Circles */}
      <div style={styles.circle1} className="floating"></div>
      <div style={styles.circle2} className="floating"></div>

      {/* Header */}
      <div style={styles.header} className="fade-animation">

        <h1 style={styles.heading}>
          Wellness Sanctuary
        </h1>

        <div style={styles.underline}></div>

        <p style={styles.subHeading}>
          Expert-curated lifestyle adjustments to harmonize your body and mind.
        </p>

      </div>

      {/* Tips Grid */}
      <div style={styles.grid}>

        {tips.map((tip, index) => (

          <div
            key={index}
            style={{
              ...styles.card,
              animationDelay: `${index * 0.1}s`
            }}
            className="fade-animation card-hover"
          >

            <div
              style={styles.iconCircle}
              className="floating icon-hover"
            >
              {tip.icon}
            </div>

            <h3 style={styles.cardTitle}>
              {tip.title}
            </h3>

            <p style={styles.cardDescription}>
              {tip.description}
            </p>

            <div style={styles.cardFooter}>
              Wellness Tip #{index + 1}
            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default HealthTips;

/* Purple Pink Animated Styles */

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #be185d 100%)",
    padding: "70px 40px",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden"
  },

  glow1: {
    position: "absolute",
    width: "320px",
    height: "320px",
    background: "rgba(236,72,153,0.25)",
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px"
  },

  glow2: {
    position: "absolute",
    width: "300px",
    height: "300px",
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

  header: {
    textAlign: "center",
    marginBottom: "70px",
    position: "relative",
    zIndex: 2
  },

  heading: {
    color: "#fff",
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "15px",
    letterSpacing: "-1px"
  },

  underline: {
    width: "80px",
    height: "5px",
    background: "linear-gradient(90deg, #ec4899, #a855f7)",
    margin: "0 auto 22px",
    borderRadius: "10px"
  },

  subHeading: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "18px",
    maxWidth: "650px",
    margin: "0 auto",
    lineHeight: "1.7"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1300px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    padding: "35px",
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
    opacity: 0
  },

  iconCircle: {
    width: "70px",
    height: "70px",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "32px",
    marginBottom: "22px",
    transition: "0.3s ease"
  },

  cardTitle: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "16px"
  },

  cardDescription: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "24px"
  },

  cardFooter: {
    marginTop: "auto",
    fontSize: "12px",
    color: "#f9a8d4",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px"
  }
};