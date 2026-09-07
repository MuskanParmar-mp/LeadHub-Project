import React, { useMemo, useState } from "react";

import Layout from "../components/layout/Layout";

import LeadFilter from "../components/leads/LeadFilter";
import LeadsTable from "../components/leads/LeadsTable";
import AssignLead from "../components/leads/AssignLead";
import LeadCharts from "../components/leads/LeadCharts";


function Leads() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);


  // Temporary demo data
  // Later Django API se replace karenge
  const [leads] = useState([
    {
      id: 1001,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      status: "New",
      source: "Website",
      assignedTo: "Amit",
    },

    {
      id: 1002,
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "+91 91234 56789",
      status: "Positive",
      source: "Campaign",
      assignedTo: "Neha",
    },

    {
      id: 1003,
      name: "Aman Singh",
      email: "aman@example.com",
      phone: "+91 99887 66554",
      status: "In Process",
      source: "Referral",
      assignedTo: "Rahul",
    },

    {
      id: 1004,
      name: "Sneha Patel",
      email: "sneha@example.com",
      phone: "+91 90123 45678",
      status: "Converted",
      source: "Website",
      assignedTo: "Priya",
    },

    {
      id: 1005,
      name: "Rohit Gupta",
      email: "rohit@example.com",
      phone: "+91 98761 23456",
      status: "Lost",
      source: "Campaign",
      assignedTo: "Amit",
    },

    {
      id: 1006,
      name: "Anjali Mehta",
      email: "anjali@example.com",
      phone: "+91 87654 32109",
      status: "New",
      source: "Referral",
      assignedTo: "Neha",
    },
  ]);


  // Search + Status filtering
  const filteredLeads = useMemo(() => {

    return leads.filter((lead) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(searchText) ||
        lead.email.toLowerCase().includes(searchText) ||
        lead.phone.includes(searchText);

      const matchesStatus =
        status === "All" ||
        lead.status === status;

      return matchesSearch && matchesStatus;

    });

  }, [leads, search, status]);


  return (
    <Layout>

      {/* ================= HEADER ================= */}

      <div className="mb-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F33]">
          Leads
        </h2>

        <p className="mt-1 text-sm sm:text-base text-gray-500">
          Manage and track all your leads.
        </p>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Leads
          </p>

          <h3 className="text-2xl font-bold text-[#0B1F33] mt-2">
            {leads.length}
          </h3>
        </div>


        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">
            New Leads
          </p>

          <h3 className="text-2xl font-bold text-[#16A3D3] mt-2">
            {leads.filter((lead) => lead.status === "New").length}
          </h3>
        </div>


        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">
            Positive Leads
          </p>

          <h3 className="text-2xl font-bold text-[#F28A3B] mt-2">
            {leads.filter((lead) => lead.status === "Positive").length}
          </h3>
        </div>


        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">
            Converted
          </p>

          <h3 className="text-2xl font-bold text-green-600 mt-2">
            {leads.filter((lead) => lead.status === "Converted").length}
          </h3>
        </div>

      </div>


      {/* ================= FILTER ================= */}

      <LeadFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />


      {/* ================= LEADS TABLE ================= */}

      <LeadsTable
        leads={filteredLeads}
        onAssign={(lead) => setSelectedLead(lead)}
      />

      <LeadCharts leads={leads} />


      {/* ================= ASSIGN MODAL ================= */}

      {selectedLead && (
        <AssignLead
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}

    </Layout>
  );
}

export default Leads;