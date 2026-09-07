import React from "react";

function FollowUpTimeline({ followUps }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

      <div className="mb-5">
        <h3 className="font-bold text-[#0B1F33]">
          Today's Timeline
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Your scheduled customer interactions
        </p>
      </div>

      <div className="space-y-5">

        {followUps.map((item) => (

          <div
            key={item.id}
            className="flex gap-4"
          >

            <div className="w-20 text-sm font-semibold text-[#0B1F33]">
              {item.time}
            </div>

            <div className="relative flex-1">

              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#16A3D3] ring-4 ring-[#16A3D3]/10" />

              <div className="border-l-2 border-[#72B8D8]/30 pl-7 pb-5">

                <div className="bg-gray-50 rounded-xl p-4">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                    <div>
                      <h4 className="font-semibold text-[#0B1F33]">
                        {item.lead}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.type} • {item.employee}
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-[#F9B65F]/20 text-[#E85A0F]">
                      {item.priority}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default FollowUpTimeline;