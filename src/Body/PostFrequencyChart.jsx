import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PostFrequencyChart = ({ data }) => {
 
  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "Posts",
        data: data.map((item) => item.count), 
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Post frequency by day</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PostFrequencyChart;
