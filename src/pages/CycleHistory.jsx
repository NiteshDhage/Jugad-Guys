// src/pages/CycleHistory.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

function CycleHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch History
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
            Authorization: `Bearer ${token}`
          }
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

      <div style={styles.card}>

        <h2 style={styles.heading}>
          Cycle History
        </h2>

        {loading ? (

          <p style={styles.loading}>
            Loading...
          </p>

        ) : history.length === 0 ? (

          <p style={styles.noData}>
            No cycle history found
          </p>

        ) : (

          <div style={styles.historyContainer}>

            {history.map((item, index) => (

              <div
                key={index}
                style={styles.historyCard}
              >

                <div style={styles.row}>
                  <span style={styles.label}>
                    Cycle Length:
                  </span>

                  <span>
                    {item.cycle_length} days
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Period Date:
                  </span>

                  <span>
                    {item.period_date}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Symptoms:
                  </span>

                  <span>
                    {item.symptoms || "None"}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>
                    Added On:
                  </span>

                  <span>
                    {item.created_at}
                  </span>
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

// ✅ Styles
const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7f6",
    padding: "20px"
  },

  card: {
    width: "700px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#2e7d32"
  },

  loading: {
    textAlign: "center"
  },

  noData: {
    textAlign: "center",
    color: "#999"
  },

  historyContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  historyCard: {
    padding: "18px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  label: {
    fontWeight: "600",
    color: "#2e7d32"
  }
};