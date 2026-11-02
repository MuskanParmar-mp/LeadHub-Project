
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  UserRound,
  Settings,
  LockKeyhole,
  LogOut,
  ChevronDown,
  CheckCheck,
  UserPlus,
  CalendarClock,
  PhoneCall,
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New student lead",
    message: "A new student lead has been uploaded.",
    time: "5 min ago",
    icon: UserPlus,
    unread: true,
  },
  {
    id: 2,
    title: "Follow-up reminder",
    message: "A student follow-up is pending.",
    time: "15 min ago",
    icon: CalendarClock,
    unread: true,
  },
  {
    id: 3,
    title: "Calling report updated",
    message: "Today's call records have been updated.",
    time: "Today",
    icon: PhoneCall,
    unread: true,
  },
];

export default function AdminHeader({
  adminName = "Admin",
  adminRole = "Administrator",
  onProfile,
  onSettings,
  onChangePassword,
  onLogout,
  onViewAllNotifications,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const headerRef = useRef(null);

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  // Close menus when clicking outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
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
        item.id === id ? { ...item, unread: false } : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false }))
    );
  }

  function handleAction(callback) {
    setActiveMenu(null);
    callback?.();
  }

  return (
    <header
      ref={headerRef}
      className="relative z-30 flex items-center justify-end gap-4"
    >
      {/* Notification Bell */}
      <div className="relative">
        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={activeMenu === "notifications"}
          onClick={() => toggleMenu("notifications")}
          className="relative flex h-10 w-10 items-center justify-center
          rounded-full text-slate-600 transition hover:bg-slate-100
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Bell size={21} />

          {unreadCount > 0 && (
            <span
              className="absolute right-1 top-1 flex h-4 min-w-4
              items-center justify-center rounded-full bg-red-500
              px-1 text-[10px] font-bold text-white"
            >
              {unreadCount}
            </span>
          )}
        </button>

        {activeMenu === "notifications" && (
          <div
            className="absolute right-0 top-12 w-[min(360px,calc(100vw-2rem))]
            overflow-hidden rounded-xl border border-slate-200
            bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h3 className="font-semibold text-slate-800">
                  Notifications
                </h3>
                <p className="text-xs text-slate-500">
                  {unreadCount} unread notifications
                </p>
              </div>

              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs
                font-medium text-blue-600 hover:text-blue-800"
              >
                <CheckCheck size={15} />
                Mark all read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-500">
                  No notifications yet.
                </p>
              ) : (
                notifications.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className={`flex w-full items-start gap-3 border-b
                      border-slate-100 p-4 text-left transition
                      hover:bg-slate-50 ${
                        item.unread ? "bg-blue-50/60" : "bg-white"
                      }`}
                    >
                      <span className="mt-1 rounded-lg bg-blue-100
                      p-2 text-blue-600">
                        <ItemIcon size={17} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold
                          text-slate-800">
                            {item.title}
                          </span>

                          {item.unread && (
                            <span className="h-2 w-2 rounded-full
                            bg-blue-600" />
                          )}
                        </span>

                        <span className="mt-1 block text-xs
                        leading-5 text-slate-600">
                          {item.message}
                        </span>

                        <span className="mt-1 block text-[11px]
                        text-slate-400">
                          {item.time}
                        </span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                handleAction(onViewAllNotifications)
              }
              className="w-full p-3 text-sm font-semibold
              text-blue-600 transition hover:bg-slate-50"
            >
              View all notifications
            </button>
          </div>
        )}
      </div>

      {/* Admin Profile */}
      <div className="relative">
        <button
          type="button"
          aria-expanded={activeMenu === "profile"}
          onClick={() => toggleMenu("profile")}
          className="flex items-center gap-2 rounded-lg p-2
          transition hover:bg-slate-100 focus:outline-none
          focus:ring-2 focus:ring-blue-500"
        >
          <span className="flex h-10 w-10 items-center
          justify-center rounded-full bg-cyan-500 text-lg
          font-semibold text-white">
            {adminName.charAt(0).toUpperCase()}
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold
            text-slate-800">
              {adminName}
            </span>
            <span className="block text-xs text-slate-500">
              {adminRole}
            </span>
          </span>

          <ChevronDown
            size={16}
            className={`hidden text-slate-500 transition sm:block ${
              activeMenu === "profile" ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeMenu === "profile" && (
          <div className="absolute right-0 top-14 w-60
          overflow-hidden rounded-xl border border-slate-200
          bg-white py-2 shadow-xl">
            <div className="border-b px-4 py-3">
              <p className="font-semibold text-slate-800">
                {adminName}
              </p>
              <p className="text-xs text-slate-500">
                {adminRole}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAction(onProfile)}
              className="flex w-full items-center gap-3 px-4 py-3
              text-sm text-slate-700 hover:bg-slate-50"
            >
              <UserRound size={17} />
              My Profile
            </button>

            <button
              type="button"
              onClick={() => handleAction(onSettings)}
              className="flex w-full items-center gap-3 px-4 py-3
              text-sm text-slate-700 hover:bg-slate-50"
            >
              <Settings size={17} />
              Account Settings
            </button>

            <button
              type="button"
              onClick={() => handleAction(onChangePassword)}
              className="flex w-full items-center gap-3 px-4 py-3
              text-sm text-slate-700 hover:bg-slate-50"
            >
              <LockKeyhole size={17} />
              Change Password
            </button>

            <div className="my-1 border-t" />

            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to logout?")
                ) {
                  handleAction(onLogout);
                }
              }}
              className="flex w-full items-center gap-3 px-4 py-3
              text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
