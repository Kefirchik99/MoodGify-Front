import React from "react";

const achievements = [
  { id: 1, title: "Risk Taker", description: "Open a trade after a loss", icon: "🔥" },
  { id: 2, title: "Restrained", description: "Exit a losing position with minimal damage", icon: "🛡️" },
  { id: 3, title: "Contest Winner", description: "Win a weekly contest", icon: "🏆" },
  { id: 4, title: "Secret Asset", description: "Invest in a currency that suddenly becomes popular", icon: "🔑" },
  { id: 5, title: "Old-Timer", description: "Trade for over a year", icon: "📅" },
  // Add more achievements here
];

const AchievementList = ({ onSelectAchievement }) => {
  return (
    <div style={styles.container}>
      <h1>All Achievements</h1>
      <div style={styles.grid}>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            style={styles.card}
            onClick={() => onSelectAchievement(achievement)}
          >
            <span style={styles.icon}>{achievement.icon}</span>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    fontSize: "2rem",
  },
};

export default AchievementList;
