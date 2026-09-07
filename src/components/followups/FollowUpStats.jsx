import React from "react";

function FollowUpStats({ stats }) {
  const cards = [
    {
      title: "Total Follow Ups",
      value: stats.total,
      icon: "📋",
      bg: "bg-[#72B8D8]/20",
    },
    {
      title: "Today's Follow Ups",
      value: stats.today,
      icon: "📅",
      bg: "bg-[#16A3D3]/15",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "⏳",
      bg: "bg-[#F9B65F]/25",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "✓",
      bg: "bg-green-100",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: "⚠️",
      bg: "bg-red-100",
    },
    {
      title: "Rescheduled",
      value: stats.rescheduled,
      icon: "↻",
      bg: "bg-[#F28A3B]/15",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                {card.title}
              </p>

              <h3 className="text-2xl font-bold text-[#0B1F33] mt-2">
                {card.value}
              </h3>
            </div>

            <div
              className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center text-lg`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FollowUpStats;