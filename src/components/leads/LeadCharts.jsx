import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut, Bar } from "react-chartjs-2";


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);


function LeadCharts({ leads }) {

  // =========================
  // STATUS COUNTS
  // =========================

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const followUpLeads = leads.filter(
    (lead) => lead.status === "Follow Up"
  ).length;

  const interestedLeads = leads.filter(
    (lead) => lead.status === "Interested"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;


  // =========================
  // DOUGHNUT CHART
  // =========================

  const statusData = {
    labels: [
      "New",
      "Follow Up",
      "Interested",
      "Converted",
      "Lost",
    ],

    datasets: [
      {
        data: [
          newLeads,
          followUpLeads,
          interestedLeads,
          convertedLeads,
          lostLeads,
        ],

        backgroundColor: [
          "#72B8D8",
          "#16A3D3",
          "#F9B65F",
          "#22C55E",
          "#E85A0F",
        ],

        borderWidth: 0,
      },
    ],
  };


  // =========================
  // WEEKLY LEADS TREND
  // =========================

  const trendData = {
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
        label: "Leads",

        data: [
          120,
          180,
          150,
          220,
          280,
          240,
          310,
        ],

        borderColor: "#16A3D3",

        backgroundColor: "rgba(22, 163, 211, 0.10)",

        tension: 0.4,

        fill: true,

        pointRadius: 4,

        pointHoverRadius: 6,
      },
    ],
  };


  // =========================
  // ASSIGNED / UNASSIGNED
  // =========================

  const assignedLeads = leads.filter(
    (lead) => lead.assignedTo
  ).length;

  const unassignedLeads = leads.filter(
    (lead) => !lead.assignedTo
  ).length;


  const assignmentData = {
    labels: [
      "Assigned",
      "Unassigned",
    ],

    datasets: [
      {
        label: "Leads",

        data: [
          assignedLeads,
          unassignedLeads,
        ],

        backgroundColor: [
          "#16A3D3",
          "#F28A3B",
        ],

        borderRadius: 8,

        barThickness: 45,
      },
    ],
  };


  // =========================
  // COMMON OPTIONS
  // =========================

  const doughnutOptions = {
    responsive: true,

    maintainAspectRatio: false,

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
    },
  };


  const lineOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#EEF2F5",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };


  const barOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
        },

        grid: {
          color: "#EEF2F5",
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
    <div className="space-y-5 mt-6">

      {/* ========================= */}
      {/* TOP CHARTS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">


        {/* STATUS CHART */}

        <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="mb-4">

            <h3 className="text-lg font-bold text-[#0B1F33]">
              Lead Status
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Current lead distribution
            </p>

          </div>


          <div className="h-[280px] flex items-center justify-center">

            <Doughnut
              data={statusData}
              options={doughnutOptions}
            />

          </div>

        </div>


        {/* TREND CHART */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="mb-4">

            <h3 className="text-lg font-bold text-[#0B1F33]">
              Leads Trend
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Lead activity during this week
            </p>

          </div>


          <div className="h-[280px]">

            <Line
              data={trendData}
              options={lineOptions}
            />

          </div>

        </div>

      </div>


      {/* ========================= */}
      {/* ASSIGNMENT CHART */}
      {/* ========================= */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <div className="mb-4">

          <h3 className="text-lg font-bold text-[#0B1F33]">
            Lead Assignment
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Assigned vs unassigned leads
          </p>

        </div>


        <div className="h-[260px]">

          <Bar
            data={assignmentData}
            options={barOptions}
          />

        </div>

      </div>

    </div>
  );
}

export default LeadCharts;