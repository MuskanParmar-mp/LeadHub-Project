import React from "react";

function UploadHistory() {

  const history = [
    {
      file: "Leads_August.xlsx",
      rows: 1250,
      uploadedBy: "Admin",
      date: "05 Sep 2026",
      status: "Completed",
    },
    {
      file: "Website_Leads.csv",
      rows: 845,
      uploadedBy: "Admin",
      date: "03 Sep 2026",
      status: "Completed",
    },
    {
      file: "Campaign_Leads.xlsx",
      rows: 620,
      uploadedBy: "Admin",
      date: "01 Sep 2026",
      status: "Processing",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

      <div className="p-5 border-b">
        <h3 className="font-bold text-[#0B1F33]">
          Upload History
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Previously uploaded lead files
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-5 py-3 text-left">
                File
              </th>

              <th className="px-5 py-3 text-left">
                Rows
              </th>

              <th className="px-5 py-3 text-left">
                Uploaded By
              </th>

              <th className="px-5 py-3 text-left">
                Date
              </th>

              <th className="px-5 py-3 text-left">
                Status
              </th>

              <th className="px-5 py-3 text-left">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {history.map((item, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4 font-medium text-[#0B1F33]">
                  📄 {item.file}
                </td>

                <td className="px-5 py-4">
                  {item.rows}
                </td>

                <td className="px-5 py-4">
                  {item.uploadedBy}
                </td>

                <td className="px-5 py-4 text-gray-500">
                  {item.date}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-[#F9B65F]/25 text-[#E85A0F]"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <button className="text-[#16A3D3] hover:text-[#0B1F33] font-medium">
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UploadHistory;