import React from "react";

function StatsCard({ title, value, icon, subtitle, iconBg }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition duration-300">

      <div className="flex items-start justify-between">

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#0B1F33]">
            {value}
          </h3>

          <p className="mt-2 text-xs text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center text-xl`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;