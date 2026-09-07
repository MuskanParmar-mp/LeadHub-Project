import React from "react";

function FollowUpFilters({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
  priority,
  setPriority,
  type,
}) {
  const filters = [
    "All",
    "Today",
    "Upcoming",
    "Overdue",
    "Completed",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">

      <div className="flex flex-col xl:flex-row gap-4">

        {/* Search */}

        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lead, phone or employee..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3] focus:ring-2 focus:ring-[#16A3D3]/10"
          />
        </div>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Type */}

        <select
          value={type}
          onChange={(e) => type.setType(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
        >
          <option value="All">All Types</option>
          <option value="Call">Call</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
          <option value="Meeting">Meeting</option>
          <option value="Callback">Callback</option>
        </select>

      </div>

      <div className="flex gap-2 overflow-x-auto mt-4 pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              activeFilter === filter
                ? "bg-[#0B1F33] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-[#16A3D3]/10 hover:text-[#16A3D3]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

    </div>
  );
}

export default FollowUpFilters;