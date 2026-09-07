import React from "react";

function UploadPreview({ rows }) {

  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-[#0B1F33]">
          File Preview
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Upload a file to see the preview.
        </p>
      </div>
    );
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

      <div className="p-5 border-b">
        <h3 className="font-bold text-[#0B1F33]">
          File Preview
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Showing first 10 records
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-[#0B1F33] text-white">

            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {rows.slice(0, 10).map((row, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-4 py-3 whitespace-nowrap text-gray-600"
                  >
                    {row[column] || "-"}
                  </td>
                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UploadPreview;