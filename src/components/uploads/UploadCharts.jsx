import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { PolarArea, Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function UploadCharts({ stats }) {

  const polarData = {
    labels: [
      "CSV",
      "Excel",
      "Manual",
      "API",
    ],

    datasets: [
      {
        data: [
          65,
          25,
          7,
          3,
        ],

        backgroundColor: [
          "#16A3D3",
          "#72B8D8",
          "#F28A3B",
          "#F9B65F",
        ],

        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: [
      "Valid Rows",
      "Assigned",
      "Duplicates",
      "Missing Data",
      "Errors",
    ],

    datasets: [
      {
        label: "File Quality",
        data: [
          stats.valid,
          stats.assigned,
          stats.duplicates,
          stats.missing,
          stats.errors,
        ],

        backgroundColor: "rgba(22, 163, 211, 0.18)",
        borderColor: "#16A3D3",
        pointBackgroundColor: "#F28A3B",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

        <div className="mb-4">
          <h3 className="font-bold text-[#0B1F33]">
            Upload Sources
          </h3>

          <p className="text-sm text-gray-500">
            Distribution of lead upload sources
          </p>
        </div>

        <div className="h-[300px] flex justify-center">
          <PolarArea
            data={polarData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

      </div>


      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

        <div className="mb-4">
          <h3 className="font-bold text-[#0B1F33]">
            File Quality
          </h3>

          <p className="text-sm text-gray-500">
            Validation overview of uploaded data
          </p>
        </div>

        <div className="h-[300px]">
          <Radar
            data={radarData}
            options={{
              maintainAspectRatio: false,
              scales: {
                r: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

      </div>

    </div>
  );
}

export default UploadCharts;