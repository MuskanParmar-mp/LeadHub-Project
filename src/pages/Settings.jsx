import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Lead Status");

  const [leadStatuses, setLeadStatuses] = useState([
    "New",
    "Contacted",
    "Interested",
    "Follow-up",
    "Converted",
    "Lost",
  ]);

  const [callOutcomes, setCallOutcomes] = useState([
    "Interested",
    "Not Interested",
    "Busy",
    "Wrong Number",
    "Call Later",
    "Others",
  ]);

  const [followUpTypes, setFollowUpTypes] = useState([
    "Call",
    "WhatsApp",
    "Email",
    "Meeting",
  ]);

  const [users, setUsers] = useState([
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Employee",
      status: "Active",
    },
    {
      name: "Priya Singh",
      email: "priya@example.com",
      role: "Employee",
      status: "Active",
    },
    {
      name: "Admin",
      email: "admin@example.com",
      role: "Owner / Admin",
      status: "Active",
    },
  ]);

  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;

    if (activeTab === "Lead Status") {
      setLeadStatuses([...leadStatuses, newItem]);
    }

    if (activeTab === "Call Outcomes") {
      setCallOutcomes([...callOutcomes, newItem]);
    }

    if (activeTab === "Follow-up Types") {
      setFollowUpTypes([...followUpTypes, newItem]);
    }

    setNewItem("");
  };

  const deleteItem = (index) => {
    if (activeTab === "Lead Status") {
      setLeadStatuses(leadStatuses.filter((_, i) => i !== index));
    }

    if (activeTab === "Call Outcomes") {
      setCallOutcomes(callOutcomes.filter((_, i) => i !== index));
    }

    if (activeTab === "Follow-up Types") {
      setFollowUpTypes(followUpTypes.filter((_, i) => i !== index));
    }
  };

  const getItems = () => {
    if (activeTab === "Lead Status") return leadStatuses;
    if (activeTab === "Call Outcomes") return callOutcomes;
    return followUpTypes;
  };

  const tabs = [
    "Lead Status",
    "Call Outcomes",
    "Follow-up Types",
    "Users & Roles",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage CRM settings, lead status, call outcomes and users
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">

        {/* Tabs */}
        <div className="border-b px-6">
          <div className="flex gap-8 overflow-x-auto">

            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}

          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Lead Status / Call Outcomes / Follow-up */}
          {activeTab !== "Users & Roles" && (
            <div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {activeTab}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add, edit or remove {activeTab.toLowerCase()}
                  </p>
                </div>

                {/* Add New */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={`Add ${activeTab}`}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={addItem}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    + Add
                  </button>
                </div>

              </div>

              {/* List */}
              <div className="border rounded-lg overflow-hidden">

                {getItems().map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                        {index + 1}
                      </div>

                      <span className="font-medium text-gray-700">
                        {item}
                      </span>

                    </div>

                    <div className="flex gap-2">

                      <button
                        className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteItem(index)}
                        className="px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )}

          {/* Users & Roles */}
          {activeTab === "Users & Roles" && (
            <div>

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Users & Roles
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Manage CRM users and their access
                  </p>
                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                  + Add User
                </button>

              </div>

              {/* Role Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                <div className="border rounded-xl p-5 bg-purple-50">
                  <h3 className="font-semibold text-purple-800">
                    Owner / Admin
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    Full access to CRM, leads, employees, reports and settings.
                  </p>

                  <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    Full Access
                  </span>
                </div>

                <div className="border rounded-xl p-5 bg-green-50">
                  <h3 className="font-semibold text-green-800">
                    Employee / Telecaller
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    Access only to assigned leads, calls and follow-ups.
                  </p>

                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Limited Access
                  </span>
                </div>

              </div>

              {/* Users Table */}
              <div className="border rounded-lg overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="bg-gray-50">
                    <tr className="text-sm text-gray-500">
                      <th className="px-5 py-4">User</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Role</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {users.map((user, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="px-5 py-4 font-medium text-gray-800">
                          {user.name}
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          {user.email}
                        </td>

                        <td className="px-5 py-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                            {user.role}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {user.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex gap-2">

                            <button className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm">
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                setUsers(
                                  users.filter((_, i) => i !== index)
                                )
                              }
                              className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm"
                            >
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* Common Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 p-6">

        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          General Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CRM Name
            </label>

            <input
              type="text"
              defaultValue="CyBrom CRM"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Follow-up Days
            </label>

            <input
              type="number"
              defaultValue="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="flex justify-end mt-6">

          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;