
import { useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCheck,
  Search,
  Trash2,
  PhoneCall,
  Users,
  CalendarClock,
  ClipboardList,
  Info,
  CheckCircle2,
  AlertCircle,
  Mail,
  Filter,
  MoreVertical,
  Clock3,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New Lead Assigned",
    message:
      "A new lead, Rahul Sharma, has been assigned to your account. Contact the lead as soon as possible.",
    category: "Leads",
    time: "5 minutes ago",
    date: "2026-10-09",
    read: false,
    icon: Users,
    color: "blue",
  },
  {
    id: 2,
    title: "Follow-up Reminder",
    message:
      "Your follow-up with Priya Verma is scheduled for today. Don't forget to contact the customer.",
    category: "Follow-ups",
    time: "20 minutes ago",
    date: "2026-10-09",
    read: false,
    icon: CalendarClock,
    color: "amber",
  },
  {
    id: 3,
    title: "Daily Calling Target",
    message:
      "You have completed 35 out of your 50 daily calls. Keep going to achieve your target.",
    category: "Performance",
    time: "1 hour ago",
    date: "2026-10-09",
    read: false,
    icon: PhoneCall,
    color: "emerald",
  },
  {
    id: 4,
    title: "Task Deadline Approaching",
    message:
      "Your daily calling report is due soon. Please complete and update your task.",
    category: "Tasks",
    time: "2 hours ago",
    date: "2026-10-09",
    read: true,
    icon: ClipboardList,
    color: "purple",
  },
  {
    id: 5,
    title: "Manager Announcement",
    message:
      "The weekly team performance review will take place on Monday at 10:00 AM.",
    category: "Announcements",
    time: "Yesterday",
    date: "2026-10-08",
    read: true,
    icon: Info,
    color: "blue",
  },
  {
    id: 6,
    title: "Call Follow-up Missed",
    message:
      "A scheduled customer follow-up is overdue. Review your follow-up list and update its status.",
    category: "Follow-ups",
    time: "Yesterday",
    date: "2026-10-08",
    read: false,
    icon: AlertCircle,
    color: "red",
  },
];

const categoryStyles = {
  Leads: "bg-blue-50 text-blue-700",
  "Follow-ups": "bg-amber-50 text-amber-700",
  Performance: "bg-emerald-50 text-emerald-700",
  Tasks: "bg-purple-50 text-purple-700",
  Announcements: "bg-slate-100 text-slate-700",
};

const iconStyles = {
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
};

function Emp_notification() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const todayCount = notifications.filter(
    (notification) => notification.date === "2026-10-09"
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        notification.title.toLowerCase().includes(searchText) ||
        notification.message.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || notification.category === category;

      const matchesView =
        view === "All" ||
        (view === "Unread" && !notification.read) ||
        (view === "Read" && notification.read);

      return matchesSearch && matchesCategory && matchesView;
    });
  }, [notifications, search, category, view]);

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );

    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const clearReadNotifications = () => {
    setNotifications((previous) =>
      previous.filter((notification) => !notification.read)
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Employee Workspace
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                  {unreadCount} Unread
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Stay updated with leads, tasks, follow-ups and team activity.
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1264DB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={18} />
            Mark All as Read
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Notifications
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
                  {notifications.length}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Bell size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Unread</p>
                <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
                  {unreadCount}
                </h2>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <BellRing size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Today's Notifications
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
                  {todayCount}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Clock3 size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notifications..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Categories</option>
                <option value="Leads">Leads</option>
                <option value="Follow-ups">Follow-ups</option>
                <option value="Performance">Performance</option>
                <option value="Tasks">Tasks</option>
                <option value="Announcements">Announcements</option>
              </select>
            </div>

            <select
              value={view}
              onChange={(event) => setView(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Notifications</option>
              <option value="Unread">Unread Only</option>
              <option value="Read">Read Only</option>
            </select>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Unread", "Read"].map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  view === item
                    ? "bg-[#0B1F33] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
                {item === "Unread" && (
                  <span className="ml-2 opacity-80">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification List */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[#0B1F33]">
                Recent Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredNotifications.length} notification(s) found
              </p>
            </div>

            <button
              onClick={clearReadNotifications}
              disabled={!notifications.some((item) => item.read)}
              className="flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
            >
              <Trash2 size={16} />
              Clear Read
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const isSelected = selectedId === notification.id;

              return (
                <div
                  key={notification.id}
                  className={`p-4 transition sm:p-5 ${
                    !notification.read
                      ? "bg-blue-50/40"
                      : "bg-white hover:bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        iconStyles[notification.color]
                      }`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-sm ${
                            notification.read
                              ? "font-semibold text-slate-700"
                              : "font-bold text-[#0B1F33]"
                          }`}
                        >
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {notification.message}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            categoryStyles[notification.category]
                          }`}
                        >
                          {notification.category}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 size={13} />
                          {notification.time}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Notification Details
                          </p>
                          <p className="mt-2 text-sm text-slate-700">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-slate-400">
                            Date: {notification.date}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            setSelectedId(isSelected ? null : notification.id)
                          }
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          {isSelected ? "Hide Details" : "View Details"}
                        </button>

                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1.5 rounded-lg border border-blue-100 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            <CheckCheck size={14} />
                            Mark as Read
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          aria-label={`Delete ${notification.title}`}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedId(isSelected ? null : notification.id)
                      }
                      aria-label="Toggle notification details"
                      className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 sm:block"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Mail size={26} />
                </div>

                <h3 className="mt-4 font-semibold text-[#0B1F33]">
                  No notifications found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
            Showing {filteredNotifications.length} of{" "}
            {notifications.length} notifications
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-blue-600"
          />
          <div>
            <p className="text-sm font-semibold text-[#0B1F33]">
              Stay on top of your work
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Check your lead assignments, follow-up reminders and task
              deadlines regularly to keep your CRM activity up to date.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Emp_notification;

