import React from "react";

const dailyData = {
  points: 450,
  tasks: [
    { id: 1, title: "Completed a trade", completed: true },
    { id: 2, title: "Watched a tutorial", completed: true },
    { id: 3, title: "Participated in a contest", completed: false },
    { id: 4, title: "Analyzed market trends", completed: true },
  ],
  completionPercentage: 75,
};

const DailyProgress = ({ onBack }) => {
  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        Back
      </button>
      <h2>Daily Progress</h2>
      <div style={styles.card}>
        <p>
          <strong>Points earned today:</strong> {dailyData.points}
        </p>
        <h3>Tasks:</h3>
        <ul style={styles.taskList}>
          {dailyData.tasks.map((task) => (
            <li
              key={task.id}
              style={{
                ...styles.taskItem,
                backgroundColor: task.completed ? "#d4edda" : "#f8d7da",
              }}
            >
              <span>{task.title}</span>
              <span>{task.completed ? "✔️" : "❌"}</span>
            </li>
          ))}
        </ul>
        <p>
          <strong>Completion percentage:</strong>{" "}
          {dailyData.completionPercentage}%
        </p>
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
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: "16px 0",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
};

export default DailyProgress;
