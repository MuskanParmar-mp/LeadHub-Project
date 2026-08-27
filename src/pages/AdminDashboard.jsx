import React from "react";

import Layout from "../components/layout/Layout";

import StatsCard from "../components/dashboard/StatsCard";

import LeadsOverview from "../components/dashboard/LeadsOverview";

import LeadStatusChart from "../components/dashboard/LeadStatusChart";


function AdminDashboard() {

  return (
    <Layout>

      {/* ================= HEADER ================= */}

      <div className="mb-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F33]">
          Admin Dashboard
        </h2>

        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Monitor your CRM performance and activities.
        </p>

      </div>


      {/* ================= STATS CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

        <StatsCard
          title="Active Employees"
          value="24"
          subtitle="Currently active"
          icon="👥"
          iconBg="bg-[#72B8D8]/20"
        />


        <StatsCard
          title="Logged In"
          value="18"
          subtitle="Executives online"
          icon="🟢"
          iconBg="bg-green-100"
        />


        <StatsCard
          title="Leads Allocated"
          value="1,248"
          subtitle="Total assigned leads"
          icon="📋"
          iconBg="bg-[#16A3D3]/15"
        />


        <StatsCard
          title="Positive Leads"
          value="186"
          subtitle="Interested leads"
          icon="👍"
          iconBg="bg-[#F9B65F]/25"
        />


        <StatsCard
          title="In Process"
          value="342"
          subtitle="Currently processing"
          icon="🔄"
          iconBg="bg-[#F28A3B]/15"
        />

      </div>


      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

        {/* Leads Overview */}
        <div className="xl:col-span-2">

          <LeadsOverview />

        </div>


        {/* Lead Status */}
        <div>

          <LeadStatusChart />

        </div>

      </div>


    </Layout>
  );
}

export default AdminDashboard;