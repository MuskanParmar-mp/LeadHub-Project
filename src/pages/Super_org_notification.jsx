
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Bell,
  CheckCheck,
  Trash2,
  Search,
  Building2,
  CreditCard,
  ShieldAlert,
  Users,
  Settings,
  Check,
  Clock,
  Filter,
  BellRing,
  Mail,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New Organization Registered",
    message:
      "TechNova Solutions has registered on the LeadHub platform.",
    category: "Organizations",
    time: "5 minutes ago",
    date: "2026-10-12",
    unread: true,
    icon: Building2,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    id: 2,
    title: "Subscription Payment Failed",
    message:
      "A subscription payment requires attention. Review the billing records.",
    category: "Billing",
    time: "25 minutes ago",
    date: "2026-10-12",
    unread: true,
    icon: CreditCard,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    id: 3,
    title: "Unusual Login Activity",
    message:
      "Review a security alert and verify the associated account activity.",
    category: "Security",
    time: "1 hour ago",
    date: "2026-10-12",
    unread: true,
    icon: ShieldAlert,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: 4,
    title: "New Users Added",
    message:
      "Bright Future CRM has added new users to its organization.",
    category: "Users",
    time: "3 hours ago",
    date: "2026-10-12",
    unread: false,
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: 5,
    title: "Subscription Expiring Soon",
    message:
      "A customer subscription is approaching its expiry date.",
    category: "Billing",
    time: "Yesterday",
    date: "2026-10-11",
    unread: false,
    icon: CreditCard,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: 6,
    title: "Platform Settings Updated",
    message:
      "Platform configuration was updated. Review the audit log if needed.",
    category: "System",
    time: "Yesterday",
    date: "2026-10-11",
    unread: false,
    icon: Settings,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
];

const weeklyData = [
  { day: "Mon", received: 12, read: 8 },
  { day: "Tue", received: 18, read: 14 },
  { day: "Wed", received: 15, read: 10 },
  { day: "Thu", received: 24, read: 19 },
  { day: "Fri", received: 20, read: 16 },
  { day: "Sat", received: 13, read: 11 },
  { day: "Sun", received: 17, read: 12 },
];

const categories = [
  "All",
  "Organizations",
  "Billing",
  "Security",
  "Users",
  "System",
];

function Super_org_notification() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter((item) => item.unread).length;
  const readCount = notifications.length - unreadCount;

  const filteredNotifications = useMemo(() => {
    const term = search.trim().toLowerCase();

    return notifications.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.message.toLowerCase().includes(term);

      const matchesUnread = !showUnreadOnly || item.unread;

      return matchesCategory && matchesSearch && matchesUnread;
    });
  }, [notifications, activeCategory, search, showUnreadOnly]);

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, unread: false }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const clearReadNotifications = () => {
    setNotifications((previous) =>
      previous.filter((item) => item.unread)
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#16A6CE]">
            Super Admin / Notifications
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
              Notification Center
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Monitor platform alerts, subscriptions and organization activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0B1F33] transition hover:border-[#16A6CE] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={17} />
            Mark All Read
          </button>

          <button
            onClick={clearReadNotifications}
            disabled={readCount === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#153653] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={17} />
            Clear Read
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total Notifications"
          value={notifications.length}
          icon={Bell}
          iconColor="text-cyan-600"
          iconBg="bg-cyan-50"
        />

        <SummaryCard
          title="Unread Notifications"
          value={unreadCount}
          icon={BellRing}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />

        <SummaryCard
          title="Read Notifications"
          value={readCount}
          icon={CheckCheck}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      {/* Activity Graph */}
      <div className="mb-7 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="rounded-xl bg-cyan-50 p-3">
            <Bell size={21} className="text-[#16A6CE]" />
          </div>
          <div>
            <h2 className="font-bold text-[#0B1F33]">
              Notification Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sample notifications received and read during the week
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient
                  id="receivedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#16A6CE"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#16A6CE"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="readGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#10B981"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#10B981"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="received"
                name="Received"
                stroke="#16A6CE"
                strokeWidth={2.5}
                fill="url(#receivedGradient)"
              />
              <Area
                type="monotone"
                dataKey="read"
                name="Read"
                stroke="#10B981"
                strokeWidth={2.5}
                fill="url(#readGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <Mail size={20} className="text-[#16A6CE]" />
            <h2 className="font-bold text-[#0B1F33]">
              All Notifications
            </h2>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A6CE]"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={16} className="mr-1 text-slate-400" />

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#0B1F33] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}

            <button
              onClick={() => setShowUnreadOnly((previous) => !previous)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                showUnreadOnly
                  ? "bg-cyan-100 text-cyan-800"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Unread only
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredNotifications.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`flex gap-3 p-4 transition hover:bg-slate-50 sm:gap-4 sm:p-5 ${
                  item.unread ? "bg-cyan-50/30" : "bg-white"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon size={21} className={item.color} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0B1F33]">
                      {item.title}
                    </h3>

                    {item.unread && (
                      <span className="h-2 w-2 rounded-full bg-[#16A6CE]" />
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.message}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={13} />
                      {item.time}
                    </span>

                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-center gap-2 sm:flex-row sm:items-start">
                  {item.unread && (
                    <button
                      title="Mark as read"
                      onClick={() => markAsRead(item.id)}
                      className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                    >
                      <Check size={17} />
                    </button>
                  )}

                  <button
                    title="Delete notification"
                    onClick={() => deleteNotification(item.id)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Bell
                size={34}
                className="mx-auto mb-3 text-slate-300"
              />
              <h3 className="font-semibold text-slate-600">
                No notifications found
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Try another category or search term.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
          Showing {filteredNotifications.length} of {notifications.length} notifications · Demo data
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, iconColor, iconBg }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
            {value}
          </h2>
        </div>
        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon size={23} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default Super_org_notification;
