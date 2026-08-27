import React from "react";

function Navbar({ setIsOpen }) {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile / Tablet Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden w-10 h-10 rounded-lg bg-[#0B1F33] text-white flex items-center justify-center text-xl hover:bg-[#16A3D3] transition"
        >
          ☰
        </button>

        {/* Page Heading */}
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#0B1F33]">
            Dashboard
          </h1>

          <p className="hidden sm:block text-xs sm:text-sm text-gray-500">
            Welcome back, Admin
          </p>
        </div>

      </div>


      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notification */}
        <button
          className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg hover:bg-[#72B8D8]/20 transition"
        >
          🔔

          {/* Notification Dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E85A0F] rounded-full border-2 border-white"></span>
        </button>


        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-gray-200"></div>


        {/* Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">

          {/* Avatar */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#16A3D3] text-white flex items-center justify-center font-bold">
            A
          </div>

          {/* Admin Details */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#0B1F33]">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          {/* Dropdown Arrow */}
          <span className="hidden sm:block text-gray-400 text-xs">
            ▼
          </span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;