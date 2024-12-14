import React from "react";

const AchievementDetail = ({ achievement, onBack }) => {
  if (!achievement) return null;

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        Back
      </button>
      <div style={styles.card}>
        <span style={styles.icon}>{achievement.icon}</span>
        <h2>{achievement.title}</h2>
        <p>{achievement.description}</p>
        <div style={styles.stats}>
          <p>
            <strong>Experience points:</strong> 450
          </p>
          <p>
            <strong>Goal achieved:</strong> 95%
          </p>
        </div>
        <button style={styles.button}>Achievement Overview</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  backButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    background: "#ddd",
    cursor: "pointer",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
    width: "300px",
  },
  icon: {
    fontSize: "3rem",
  },
  stats: {
    margin: "16px 0",
  },
  button: {
    padding: "10px 20px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AchievementDetail;
