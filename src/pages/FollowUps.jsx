import React, { useMemo, useState } from "react";

import Layout from "../components/layout/Layout";

import FollowUpStats from "../components/followups/FollowUpStats";
import FollowUpFilters from "../components/followups/FollowUpFilters";
import FollowUpTable from "../components/followups/FollowUpTable";
import FollowUpTimeline from "../components/followups/FollowUpTimeline";
import AddFollowUpModal from "../components/followups/AddFollowUpModal";

function FollowUps() {

  const [showModal, setShowModal] = useState(false);

  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  const [priority, setPriority] = useState("All");

  const [selectedType, setSelectedType] = useState("All");

  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      lead: "Rahul Sharma",
      phone: "9876543210",
      employee: "Aman",
      date: "07 Sep 2026",
      time: "10:30 AM",
      type: "Call",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      lead: "Priya Singh",
      phone: "9123456789",
      employee: "Neha",
      date: "07 Sep 2026",
      time: "12:00 PM",
      type: "WhatsApp",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 3,
      lead: "Amit Patel",
      phone: "9988776655",
      employee: "Rahul",
      date: "07 Sep 2026",
      time: "02:30 PM",
      type: "Meeting",
      priority: "High",
      status: "Completed",
    },
    {
      id: 4,
      lead: "Neha Verma",
      phone: "9876543211",
      employee: "Priya",
      date: "06 Sep 2026",
      time: "04:00 PM",
      type: "Callback",
      priority: "Low",
      status: "Overdue",
    },
    {
      id: 5,
      lead: "Vikas Jain",
      phone: "9988123456",
      employee: "Aman",
      date: "08 Sep 2026",
      time: "11:00 AM",
      type: "Email",
      priority: "Medium",
      status: "Rescheduled",
    },
  ]);

  const stats = useMemo(() => {

    return {
      total: followUps.length,

      today: followUps.filter(
        (item) => item.date === "07 Sep 2026"
      ).length,

      pending: followUps.filter(
        (item) => item.status === "Pending"
      ).length,

      completed: followUps.filter(
        (item) => item.status === "Completed"
      ).length,

      overdue: followUps.filter(
        (item) => item.status === "Overdue"
      ).length,

      rescheduled: followUps.filter(
        (item) => item.status === "Rescheduled"
      ).length,
    };

  }, [followUps]);

  const filteredFollowUps = useMemo(() => {

    return followUps.filter((item) => {

      const matchesSearch =
        item.lead.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search) ||
        item.employee.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priority === "All" ||
        item.priority === priority;

      const matchesType =
        selectedType === "All" ||
        item.type === selectedType;

      let matchesFilter = true;

      if (activeFilter === "Today") {
        matchesFilter = item.date === "07 Sep 2026";
      }

      if (activeFilter === "Completed") {
        matchesFilter = item.status === "Completed";
      }

      if (activeFilter === "Overdue") {
        matchesFilter = item.status === "Overdue";
      }

      if (activeFilter === "Upcoming") {
        matchesFilter =
          item.status === "Pending" ||
          item.status === "Rescheduled";
      }

      return (
        matchesSearch &&
        matchesPriority &&
        matchesType &&
        matchesFilter
      );
    });

  }, [
    followUps,
    search,
    priority,
    selectedType,
    activeFilter,
  ]);

  const handleComplete = (id) => {

    setFollowUps((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Completed",
            }
          : item
      )
    );
  };

  const handleAddFollowUp = (newFollowUp) => {
  setFollowUps((prev) => {
    if (editData) {
      return prev.map((item) =>
        item.id === newFollowUp.id
          ? newFollowUp
          : item
      );
    }

    return [...prev, newFollowUp];
  });

  setEditData(null);
  setShowModal(false);
};

  const handleReschedule = (item) => {
  setEditData(item);
  setShowModal(true);
};

  const todayTimeline = followUps.filter(
    (item) => item.date === "07 Sep 2026"
  );

  return (
    <Layout>

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F33]">
            Follow Ups
          </h2>

          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Manage and track your customer follow-up activities.
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            ↻ Refresh
          </button>

          <button
            
            onClick={() => {
  setEditData(null);
  setShowModal(true);
}}
            className="px-4 py-2.5 rounded-xl bg-[#16A3D3] text-white font-semibold hover:bg-[#0B1F33] transition"
          >
            + Add Follow Up
          </button>

        </div>

      </div>


      {/* STATS */}

      <FollowUpStats stats={stats} />


      {/* FILTERS */}

      <div className="mt-6">

        <FollowUpFilters
          search={search}
          setSearch={setSearch}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          priority={priority}
          setPriority={setPriority}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

      </div>


      {/* TIMELINE */}

      <div className="mt-6">

        <FollowUpTimeline
          followUps={todayTimeline}
        />

      </div>


      {/* TABLE */}

      <div className="mt-6">

        <FollowUpTable
          followUps={filteredFollowUps}
          onComplete={handleComplete}
          onReschedule={handleReschedule}
        />

      </div>


      {/* MODAL */}

      {showModal && (
  <AddFollowUpModal
    onClose={() => {
      setShowModal(false);
      setEditData(null);
    }}
    onAdd={handleAddFollowUp}
    editData={editData}
  />
)}

    </Layout>
  );
}

export default FollowUps;