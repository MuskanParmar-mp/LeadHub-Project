
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ setIsOpen }) {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Student Lead",
      message: "A new student lead has been added.",
      time: "Recently",
      unread: true,
    },
    {
      id: 2,
      title: "Follow-up Reminder",
      message: "A student follow-up is pending.",
      time: "Today",
      unread: true,
    },
    {
      id: 3,
      title: "Calling Report",
      message: "Calling records have been updated.",
      time: "Today",
      unread: true,
    },
  ]);

  const navbarRef = useRef(null);

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleMenu(menu) {
    setActiveMenu((current) =>
      current === menu ? null : menu
    );
  }

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  }

  function handleProfileOption(label) {
    setActiveMenu(null);

    if (label === "My Profile") {
      navigate("/profile");
    } else {
      alert(label + " page is not connected yet.");
    }
  }

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      setActiveMenu(null);
      alert(
        "Connect your authentication logout function here."
      );
    }
  }

  return (
    <header
      ref={navbarRef}
      className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="lg:hidden w-10 h-10 rounded-lg bg-[#0B1F33] text-white flex items-center justify-center text-xl hover:bg-[#16A3D3] transition"
          aria-label="Open menu"
        >
          ☰
        </button>

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
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("notifications")}
            aria-label="Open notifications"
            aria-expanded={activeMenu === "notifications"}
            className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg hover:bg-[#72B8D8]/20 transition"
          >
            🔔

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#E85A0F] rounded-full border-2 border-white text-white text-[10px] flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {activeMenu === "notifications" && (
            <div className="absolute right-0 top-12 w-[min(340px,calc(100vw-2rem))] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-[60]">
              <div className="p-4 border-b flex items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold text-[#0B1F33]">
                    Notifications
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {unreadCount} unread
                  </p>
                </div>

                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      item.unread ? "bg-sky-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">
                        {item.unread ? "●" : "○"}
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-[#0B1F33]">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-600 mt-1">
                          {item.message}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-2">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  alert(
                    "Notifications page is not connected yet."
                  );
                }}
                className="w-full p-3 text-sm font-semibold text-blue-600 hover:bg-gray-50"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div className="hidden sm:block h-8 w-px bg-gray-200" />

        {/* Admin Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("profile")}
            aria-expanded={activeMenu === "profile"}
            className="flex items-center gap-2 sm:gap-3 rounded-lg cursor-pointer hover:bg-gray-50 p-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#16A3D3] text-white flex items-center justify-center font-bold">
              A
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#0B1F33]">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <span className="hidden sm:block text-gray-400 text-xs">
              {activeMenu === "profile" ? "▲" : "▼"}
            </span>
          </button>

          {activeMenu === "profile" && (
            <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-[60]">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-[#0B1F33]">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              {[
                "My Profile",
                "Account Settings",
                "Change Password",
              ].map((label) => (
                <button 
                  type="button" 
                  key={label}
                  onClick={() => handleProfileOption(label)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}

              <div className="border-t border-gray-100 my-1" />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
