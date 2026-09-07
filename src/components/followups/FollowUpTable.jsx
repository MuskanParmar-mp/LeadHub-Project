import React from "react";

function FollowUpTable({
  followUps,
  onComplete,
  onReschedule,
}) {
  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-600";
    }

    if (priority === "Medium") {
      return "bg-[#F9B65F]/20 text-[#E85A0F]";
    }

    return "bg-green-50 text-green-600";
  };

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Overdue") {
      return "bg-red-50 text-red-600";
    }

    if (status === "Rescheduled") {
      return "bg-[#72B8D8]/20 text-[#0B1F33]";
    }

    return "bg-[#16A3D3]/10 text-[#16A3D3]";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      <div className="p-5 border-b border-gray-100">
        <h3 className="font-bold text-[#0B1F33]">
          Follow Up Schedule
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Manage your customer follow-up activities
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-5 py-4 text-left">Lead</th>
              <th className="px-5 py-4 text-left">Assigned To</th>
              <th className="px-5 py-4 text-left">Date & Time</th>
              <th className="px-5 py-4 text-left">Type</th>
              <th className="px-5 py-4 text-left">Priority</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {followUps.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >

                <td className="px-5 py-4">

                  <div>
                    <p className="font-semibold text-[#0B1F33]">
                      {item.lead}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.phone}
                    </p>
                  </div>

                </td>

                <td className="px-5 py-4">
                  {item.employee}
                </td>

                <td className="px-5 py-4">

                  <p className="font-medium text-[#0B1F33]">
                    {item.date}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.time}
                  </p>

                </td>

                <td className="px-5 py-4">
                  {item.type}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2">

                    {item.status !== "Completed" && (
                      <button
                        onClick={() => onComplete(item.id)}
                        title="Mark completed"
                        className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                      >
                        ✓
                      </button>
                    )}

                    <button
                      onClick={() => onReschedule(item)}
                      title="Reschedule"
                      className="w-8 h-8 rounded-lg bg-[#16A3D3]/10 text-[#16A3D3] hover:bg-[#16A3D3]/20"
                    >
                      ↻
                    </button>

                    <button
                      title="Call"
                      className="w-8 h-8 rounded-lg bg-[#F9B65F]/20 text-[#E85A0F] hover:bg-[#F9B65F]/30"
                    >
                      📞
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FollowUpTable;