import React from "react";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-[#0B1F33] text-white
          flex flex-col
          shadow-xl

          transform transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >

        {/* ================= LOGO ================= */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">

          <div className="flex items-center gap-3">

            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#16A3D3] flex items-center justify-center font-bold text-xl shadow-lg">
              C
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-wide">
                LeadHub
              </h2>

              <p className="text-[10px] tracking-[3px] text-[#72B8D8]">
                CRM
              </p>
            </div>

          </div>


          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-300 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>


        {/* ================= MENU ================= */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">

          <p className="px-3 mb-3 text-[11px] font-semibold tracking-[2px] text-[#72B8D8]">
            MAIN MENU
          </p>


          {/* Dashboard */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              bg-[#16A3D3]
              text-white
              shadow-md shadow-cyan-900/30
              transition-all duration-200
            "
          >
            <span className="text-lg">▣</span>
            <span className="text-sm font-medium">
              Dashboard
            </span>
          </button>


          {/* Uploads */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">↑</span>
            <span className="text-sm">
              Uploads
            </span>
          </button>


          {/* Leads */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">♙</span>
            <span className="text-sm">
              Leads
            </span>
          </button>


          {/* Reports */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">▥</span>
            <span className="text-sm">
              Reports
            </span>
          </button>


          {/* Calls */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">☎</span>
            <span className="text-sm">
              Calls
            </span>
          </button>


          {/* Employees */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">♙</span>
            <span className="text-sm">
              Employees
            </span>
          </button>


          {/* Follow Ups */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">↻</span>
            <span className="text-sm">
              Follow Ups
            </span>
          </button>


          {/* Filter */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">⌕</span>
            <span className="text-sm">
              Filter
            </span>
          </button>

        </nav>


        {/* ================= BOTTOM MENU ================= */}
        <div className="px-3 py-4 border-t border-white/10">

          {/* Settings */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 mb-1
              rounded-xl
              text-gray-300
              hover:bg-white/10 hover:text-white
              transition-all duration-200
            "
          >
            <span className="text-lg">⚙</span>
            <span className="text-sm">
              Settings
            </span>
          </button>


          {/* Logout */}
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-[#F28A3B]
              hover:bg-[#F28A3B]/10
              transition-all duration-200
            "
          >
            <span className="text-lg">↪</span>
            <span className="text-sm font-medium">
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;