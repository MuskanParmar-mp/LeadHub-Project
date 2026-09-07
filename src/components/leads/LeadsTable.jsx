import React from "react";

function LeadsTable({ leads, onAssign }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Table Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-[#0B1F33]">
          All Leads
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Manage and track your leads
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">

          <thead className="bg-[#F7FAFC]">
            <tr className="text-left">

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Lead
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Email
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Phone
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Source
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Assigned To
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-gray-500">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-10 text-center text-gray-400 text-sm"
                >
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (

                <tr
                  key={lead.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* Lead */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-[#72B8D8]/20 flex items-center justify-center font-semibold text-[#0B1F33]">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#0B1F33]">
                          {lead.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          Lead #{lead.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {lead.email}
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {lead.phone}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          lead.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : lead.status === "Positive"
                            ? "bg-green-100 text-green-700"
                            : lead.status === "In Process"
                            ? "bg-orange-100 text-orange-700"
                            : lead.status === "Converted"
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {lead.status}
                    </span>

                  </td>

                  {/* Source */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {lead.source}
                  </td>

                  {/* Assigned */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {lead.assignedTo || "Not Assigned"}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => onAssign(lead)}
                        className="
                          px-3 py-1.5
                          rounded-lg
                          text-xs
                          bg-[#16A3D3]/10
                          text-[#128eb8]
                          hover:bg-[#16A3D3]/20
                          transition
                        "
                      >
                        Assign
                      </button>

                      <button
                        className="
                          px-3 py-1.5
                          rounded-lg
                          text-xs
                          bg-gray-100
                          text-gray-600
                          hover:bg-gray-200
                          transition
                        "
                      >
                        Edit
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default LeadsTable;