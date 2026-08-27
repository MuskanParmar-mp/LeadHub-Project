import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


function LeadStatusChart() {

  const data = {

    labels: [
      "New",
      "In Process",
      "Positive",
      "Follow Up",
      "Converted",
      "Lost",
    ],

    datasets: [
      {
        data: [
          320,
          342,
          186,
          250,
          150,
          100,
        ],

        backgroundColor: [
          "#72B8D8",
          "#16A3D3",
          "#F9B65F",
          "#F28A3B",
          "#E85A0F",
          "#0B1F33",
        ],

        borderWidth: 0,

        hoverOffset: 6,
      },
    ],
  };


  const options = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {

      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,

          padding: 15,

          font: {
            size: 11,
          },
        },
      },

      tooltip: {
        backgroundColor: "#0B1F33",

        padding: 12,
      },
    },
  };


  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="mb-4">

        <h3 className="text-lg font-bold text-[#0B1F33]">
          Lead Status
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Current lead distribution
        </p>

      </div>


      {/* Chart */}
      <div className="h-[300px]">

        <Doughnut
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default LeadStatusChart;