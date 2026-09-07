import React from "react";

function UploadStats({ stats }) {
  const cards = [
    {
      title: "Total Rows",
      value: stats.total,
      icon: "📋",
      bg: "bg-[#72B8D8]/20",
    },
    {
      title: "Valid Rows",
      value: stats.valid,
      icon: "✓",
      bg: "bg-green-100",
    },
    {
      title: "Duplicates",
      value: stats.duplicates,
      icon: "♻️",
      bg: "bg-[#F9B65F]/25",
    },
    {
      title: "Errors",
      value: stats.errors,
      icon: "⚠️",
      bg: "bg-[#F28A3B]/15",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between"
        >

          <div>
            <p className="text-sm text-gray-500">
              {card.title}
            </p>

            <h3 className="text-2xl font-bold text-[#0B1F33] mt-1">
              {card.value}
            </h3>
          </div>

          <div
            className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center text-xl`}
          >
            {card.icon}
          </div>

        </div>
      ))}

    </div>
  );
}

export default UploadStats;