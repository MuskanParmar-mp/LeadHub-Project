import React, { useState } from "react";
import Layout from "../components/layout/Layout";

const Calls = () => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [calls, setCalls] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      date: "08 Sep 2026",
      time: "10:30 AM",
      type: "Incoming",
      status: "Completed",
    },
    {
      id: 2,
      name: "Priya Singh",
      phone: "9123456780",
      date: "08 Sep 2026",
      time: "12:00 PM",
      type: "Outgoing",
      status: "Scheduled",
    },
    {
      id: 3,
      name: "Aman Verma",
      phone: "9988776655",
      date: "07 Sep 2026",
      time: "03:30 PM",
      type: "Outgoing",
      status: "Missed",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    type: "Outgoing",
    status: "Scheduled",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCall = (e) => {
    e.preventDefault();

    const formatDate = (dateValue) => {
      if (!dateValue) return "";
      const [year, month, day] = dateValue.split("-");
      const date = new Date(Number(year), Number(month) - 1, Number(day));

      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    const formatTime = (timeValue) => {
      if (!timeValue) return "";
      const [hours, minutes] = timeValue.split(":");
      const date = new Date();
      date.setHours(Number(hours), Number(minutes));

      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const newCall = {
      id: Date.now(),
      ...formData,
      date: formatDate(formData.date),
      time: formatTime(formData.time),
    };

    setCalls((previousCalls) => [newCall, ...previousCalls]);

    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      type: "Outgoing",
      status: "Scheduled",
    });

    setShowForm(false);
  };

  const deleteCall = (id) => {
    setCalls((previousCalls) =>
      previousCalls.filter((call) => call.id !== id)
    );
  };

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.name.toLowerCase().includes(search.toLowerCase()) ||
      call.phone.includes(search);

    const matchesFilter =
      filter === "All" || call.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Calls
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and track all your calls
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Call
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Calls</p>
            <h2 className="text-2xl font-bold mt-2">
              {calls.length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              {calls.filter((call) => call.status === "Completed").length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Scheduled</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-2">
              {calls.filter((call) => call.status === "Scheduled").length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500">Missed</p>
            <h2 className="text-2xl font-bold text-red-600 mt-2">
              {calls.filter((call) => call.status === "Missed").length}
            </h2>
          </div>

        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>

          </div>
        </div>

        {/* Calls Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">

              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCalls.length > 0 ? (
                  filteredCalls.map((call) => (
                    <tr
                      key={call.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {call.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {call.phone}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {call.date}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {call.time}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            call.type === "Incoming"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {call.type}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            call.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : call.status === "Missed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {call.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteCall(call.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-500"
                    >
                      No calls found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Add Call Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Call
                </h2>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 text-xl hover:text-gray-800"
                  aria-label="Close form"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={addCall} className="space-y-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Contact Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="Outgoing">Outgoing</option>
                  <option value="Incoming">Incoming</option>
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Missed">Missed</option>
                </select>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    Add Call
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Calls;