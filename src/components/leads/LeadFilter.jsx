import React from "react";

function LeadFilter({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">

      <div className="flex flex-col lg:flex-row gap-3 justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-md">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="
              w-full
              pl-11 pr-4 py-3
              rounded-xl
              border border-gray-200
              outline-none
              text-sm
              focus:border-[#16A3D3]
              focus:ring-2
              focus:ring-[#16A3D3]/10
            "
          />

        </div>


        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full lg:w-48
            px-4 py-3
            rounded-xl
            border border-gray-200
            bg-white
            text-sm
            text-gray-600
            outline-none
            focus:border-[#16A3D3]
          "
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Positive">Positive</option>
          <option value="In Process">In Process</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>

      </div>

    </div>
  );
}

export default LeadFilter;