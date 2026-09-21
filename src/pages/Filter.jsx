import React from "react";

const Filter = ({
  search = "",
  setSearch,

  status,
  setStatus,

  source,
  setSource,

  course,
  setCourse,

  assignedTo,
  setAssignedTo,

  city = "All",
  setCity,

  date,
  setDate,

  onApply,
  onReset,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Filter Leads
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Search and filter leads according to your requirements
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-sm text-blue-600 font-semibold hover:underline"
        >
          Reset All
        </button>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="mb-5">

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search Lead
        </label>

        <div className="relative">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            placeholder="Search by lead name, phone number or lead ID..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <span className="absolute left-3 top-3 text-gray-400">
            🔍
          </span>

        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

        {/* STATUS */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* SOURCE */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lead Source
          </label>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Sources</option>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Google">Google</option>
            <option value="Referral">Referral</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* COURSE */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Interested
          </label>

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Courses</option>

            <option value="Full Stack Development">
              Full Stack Development
            </option>

            <option value="Data Science & AI">
              Data Science & AI
            </option>

            <option value="Python">
              Python
            </option>

            <option value="Java">
              Java
            </option>

            <option value="Data Analytics">
              Data Analytics
            </option>

            <option value="Digital Marketing">
              Digital Marketing
            </option>

          </select>
        </div>

        {/* ASSIGNED TO */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Assigned To
          </label>

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">
              All Employees
            </option>

            <option value="Amit">
              Amit
            </option>

            <option value="Neha">
              Neha
            </option>

            <option value="Rahul">
              Rahul
            </option>

            <option value="Priya">
              Priya
            </option>

            <option value="Unassigned">
              Unassigned
            </option>

          </select>
        </div>

        {/* CITY */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City
          </label>

          <select
            value={city}
            onChange={(e) =>
              setCity && setCity(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-3 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">
              All Cities
            </option>

            <option value="Bhopal">
              Bhopal
            </option>

            <option value="Indore">
              Indore
            </option>

            <option value="Jabalpur">
              Jabalpur
            </option>

            <option value="Gwalior">
              Gwalior
            </option>

            <option value="Other">
              Other
            </option>

          </select>
        </div>

      </div>

      {/* ================= DATE ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

        {/* CREATED DATE */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Created Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FOLLOW-UP DATE */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Follow-up Date
          </label>

          <input
            type="date"
            className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* ================= ACTIVE FILTERS ================= */}

      <div className="flex flex-wrap gap-2 mt-5">

        {status !== "All" && (
          <FilterBadge label={`Status: ${status}`} />
        )}

        {source !== "All" && (
          <FilterBadge label={`Source: ${source}`} />
        )}

        {course !== "All" && (
          <FilterBadge label={`Course: ${course}`} />
        )}

        {assignedTo !== "All" && (
          <FilterBadge label={`Assigned: ${assignedTo}`} />
        )}

        {city !== "All" && (
          <FilterBadge label={`City: ${city}`} />
        )}

      </div>

      {/* ================= BUTTONS ================= */}

      <div className="flex justify-end gap-3 mt-6 pt-5 border-t">

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={onApply}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Apply Filter
        </button>

      </div>

    </div>
  );
};


// ===============================
// FILTER BADGE
// ===============================

const FilterBadge = ({ label }) => {
  return (
    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
      {label}
    </span>
  );
};

export default Filter;