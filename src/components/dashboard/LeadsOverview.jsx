import React from "react";
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

import { Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function LeadsOverview() {

  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {
        label: "Total Leads",
        data: [120, 180, 150, 220, 280, 240, 310],

        borderColor: "#16A3D3",
        backgroundColor: "rgba(22, 163, 211, 0.12)",

        tension: 0.4,

        fill: true,

        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };


  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,

        labels: {
          usePointStyle: true,
        },
      },

      tooltip: {
        backgroundColor: "#0B1F33",
        padding: 12,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };


  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="mb-5">

        <h3 className="text-lg font-bold text-[#0B1F33]">
          Leads Overview
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Lead activity during this week
        </p>

      </div>


      {/* Chart */}
      <div className="h-[280px] sm:h-[320px]">

        <Line
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default LeadsOverview;