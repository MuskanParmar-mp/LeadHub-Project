
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Activity,
  Search,
  ShieldCheck,
  Users,
  AlertTriangle,
  Download,
  LogIn,
  LogOut,
  Building2,
  CreditCard,
  Settings,
  Pencil,
  Trash2,
  Eye,
  RefreshCw,
  CalendarDays,
  Filter,
  X,
  FileText,
} from "lucide-react";

const initialLogs = [
  {
    id: "AUD-1001",
    actor: "Sumit Rajak",
    email: "sumit@example.com",
    role: "Super Admin",
    action: "Login",
    module: "Authentication",
    description: "User logged in successfully",
    ip: "192.168.1.10",
    date: "2026-10-12",
    time: "09:15:22",
    status: "Success",
  },
  {
    id: "AUD-1002",
    actor: "Sumit Rajak",
    email: "sumit@example.com",
    role: "Super Admin",
    action: "Create",
    module: "Organizations",
    description: "Created a new organization",
    ip: "192.168.1.10",
    date: "2026-10-12",
    time: "09:32:10",
    status: "Success",
  },
  {
    id: "AUD-1003",
    actor: "Aman Sharma",
    email: "aman@example.com",
    role: "Organization Admin",
    action: "Update",
    module: "Users",
    description: "Updated an employee profile",
    ip: "192.168.1.22",
    date: "2026-10-12",
    time: "10:05:44",
    status: "Success",
  },
  {
    id: "AUD-1004",
    actor: "Priya Verma",
    email: "priya@example.com",
    role: "Sales Executive",
    action: "View",
    module: "Reports",
    description: "Accessed the sales performance report",
    ip: "192.168.1.35",
    date: "2026-10-12",
    time: "10:42:03",
    status: "Success",
  },
  {
    id: "AUD-1005",
    actor: "Rahul Singh",
    email: "rahul@example.com",
    role: "Organization Admin",
    action: "Delete",
    module: "Users",
    description: "Attempted to delete a user record",
    ip: "192.168.1.41",
    date: "2026-10-12",
    time: "11:10:18",
    status: "Failed",
  },
  {
    id: "AUD-1006",
    actor: "Sumit Rajak",
    email: "sumit@example.com",
    role: "Super Admin",
    action: "Update",
    module: "Plans & Pricing",
    description: "Updated subscription plan details",
    ip: "192.168.1.10",
    date: "2026-10-12",
    time: "11:30:50",
    status: "Success",
  },
  {
    id: "AUD-1007",
    actor: "Aman Sharma",
    email: "aman@example.com",
    role: "Organization Admin",
    action: "Logout",
    module: "Authentication",
    description: "User logged out",
    ip: "192.168.1.22",
    date: "2026-10-11",
    time: "17:20:05",
    status: "Success",
  },
  {
    id: "AUD-1008",
    actor: "Neha Patel",
    email: "neha@example.com",
    role: "Support Agent",
    action: "View",
    module: "Support Tickets",
    description: "Viewed a support ticket",
    ip: "192.168.1.54",
    date: "2026-10-11",
    time: "14:25:30",
    status: "Success",
  },
  {
    id: "AUD-1009",
    actor: "Rahul Singh",
    email: "rahul@example.com",
    role: "Organization Admin",
    action: "Login",
    module: "Authentication",
    description: "Invalid login attempt",
    ip: "192.168.1.41",
    date: "2026-10-11",
    time: "08:55:15",
    status: "Failed",
  },
  {
    id: "AUD-1010",
    actor: "Sumit Rajak",
    email: "sumit@example.com",
    role: "Super Admin",
    action: "Update",
    module: "Settings",
    description: "Changed platform configuration",
    ip: "192.168.1.10",
    date: "2026-10-10",
    time: "16:40:00",
    status: "Success",
  },
];

const activityTrend = [
  { day: "Mon", activities: 42, failed: 3 },
  { day: "Tue", activities: 58, failed: 5 },
  { day: "Wed", activities: 49, failed: 2 },
  { day: "Thu", activities: 71, failed: 6 },
  { day: "Fri", activities: 65, failed: 4 },
  { day: "Sat", activities: 35, failed: 2 },
  { day: "Sun", activities: 46, failed: 3 },
];

const actionColors = {
  Login: "bg-emerald-100 text-emerald-700",
  Logout: "bg-slate-100 text-slate-700",
  Create: "bg-cyan-100 text-cyan-700",
  Update: "bg-blue-100 text-blue-700",
  Delete: "bg-rose-100 text-rose-700",
  View: "bg-violet-100 text-violet-700",
};

function Super_org_audit_log() {
  const [logs, setLogs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch = [
        log.id,
        log.actor,
        log.email,
        log.role,
        log.action,
        log.module,
        log.description,
        log.ip,
      ].some((value) => value.toLowerCase().includes(term));

      const matchesAction =
        actionFilter === "All" || log.action === actionFilter;

      const matchesStatus =
        statusFilter === "All" || log.status === statusFilter;

      const matchesDate = !dateFilter || log.date === dateFilter;

      return (
        matchesSearch &&
        matchesAction &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [logs, search, actionFilter, statusFilter, dateFilter]);

  const successCount = logs.filter(
    (log) => log.status === "Success"
  ).length;

  const failedCount = logs.filter(
    (log) => log.status === "Failed"
  ).length;

  const loginCount = logs.filter(
    (log) => log.action === "Login"
  ).length;

  const actionDistribution = [
    { name: "Login", value: logs.filter((l) => l.action === "Login").length },
    { name: "Create", value: logs.filter((l) => l.action === "Create").length },
    { name: "Update", value: logs.filter((l) => l.action === "Update").length },
    { name: "Delete", value: logs.filter((l) => l.action === "Delete").length },
    { name: "View", value: logs.filter((l) => l.action === "View").length },
    { name: "Logout", value: logs.filter((l) => l.action === "Logout").length },
  ].filter((item) => item.value > 0);

  const actionPalette = [
    "#16A6CE",
    "#10B981",
    "#6366F1",
    "#F43F5E",
    "#8B5CF6",
    "#94A3B8",
  ];

  const userActivity = Object.values(
    logs.reduce((acc, log) => {
      if (!acc[log.actor]) {
        acc[log.actor] = {
          name: log.actor,
          activities: 0,
          failed: 0,
        };
      }

      acc[log.actor].activities += 1;

      if (log.status === "Failed") {
        acc[log.actor].failed += 1;
      }

      return acc;
    }, {})
  ).sort((a, b) => b.activities - a.activities);

  const exportCSV = () => {
    const headers = [
      "ID",
      "Actor",
      "Email",
      "Role",
      "Action",
      "Module",
      "Description",
      "IP Address",
      "Date",
      "Time",
      "Status",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredLogs.map((log) =>
      [
        log.id,
        log.actor,
        log.email,
        log.role,
        log.action,
        log.module,
        log.description,
        log.ip,
        log.date,
        log.time,
        log.status,
      ]
        .map(escapeCSV)
        .join(",")
    );

    const csv = [headers.map(escapeCSV).join(","), ...rows].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "leadhub-audit-logs.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setActionFilter("All");
    setStatusFilter("All");
    setDateFilter("");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#16A6CE]">
            Super Admin / Security
          </p>
          <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
            Audit Logs
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review platform activity, account events and security-related actions.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#153653]"
        >
          <Download size={17} />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Activities"
          value={logs.length}
          icon={Activity}
          bg="bg-cyan-50"
          color="text-cyan-600"
        />
        <StatCard
          label="Successful Actions"
          value={successCount}
          icon={ShieldCheck}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />
        <StatCard
          label="Failed Actions"
          value={failedCount}
          icon={AlertTriangle}
          bg="bg-rose-50"
          color="text-rose-600"
        />
        <StatCard
          label="Login Events"
          value={loginCount}
          icon={Users}
          bg="bg-violet-50"
          color="text-violet-600"
        />
      </div>

      {/* Activity Trend */}
      <div className="mb-7 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="font-bold text-[#0B1F33]">
            Weekly Activity Trend
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Illustrative weekly activity and failed-event counts
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityTrend}>
              <defs>
                <linearGradient
                  id="auditActivityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#16A6CE" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#16A6CE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="activities"
                name="Activities"
                stroke="#16A6CE"
                strokeWidth={2.5}
                fill="url(#auditActivityGradient)"
              />
              <Area
                type="monotone"
                dataKey="failed"
                name="Failed Events"
                stroke="#F43F5E"
                strokeWidth={2}
                fill="#F43F5E"
                fillOpacity={0.08}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Graphs */}
      <div className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Action Distribution</h2>
          <p className="mt-1 text-sm text-slate-500">
            Breakdown of actions in the sample audit records
          </p>

          {actionDistribution.length > 0 ? (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={actionDistribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={88}
                      paddingAngle={3}
                    >
                      {actionDistribution.map((item, index) => (
                        <Cell
                          key={item.name}
                          fill={actionPalette[index % actionPalette.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <EmptyGraph />
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Activity by User</h2>
          <p className="mt-1 text-sm text-slate-500">
            Sample event counts and failed actions by actor
          </p>

          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivity}
                margin={{ left: -15, right: 8, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="activities"
                  name="Activities"
                  fill="#16A6CE"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="failed"
                  name="Failed"
                  fill="#F43F5E"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-[#16A6CE]" />
          <h2 className="font-bold text-[#0B1F33]">Filter Audit Records</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, action, IP..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-3 text-sm outline-none focus:border-[#16A6CE]"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#16A6CE]"
          >
            <option value="All">All Actions</option>
            <option value="Login">Login</option>
            <option value="Logout">Logout</option>
            <option value="Create">Create</option>
            <option value="Update">Update</option>
            <option value="Delete">Delete</option>
            <option value="View">View</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#16A6CE]"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>

          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full min-w-0 rounded-xl border border-slate-200 py-3 pl-9 pr-2 text-sm outline-none focus:border-[#16A6CE]"
              />
            </div>

            <button
              onClick={clearFilters}
              title="Reset filters"
              className="rounded-xl border border-slate-200 px-3 text-slate-500 hover:bg-slate-50"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-[#0B1F33]">Audit Trail</h2>
            <p className="mt-1 text-sm text-slate-500">
              Review individual recorded events and their details.
            </p>
          </div>
          <span className="text-sm text-slate-500">
            {filteredLogs.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Event ID</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Action</th>
                <th className="px-5 py-4">Module</th>
                <th className="px-5 py-4">Date & Time</th>
                <th className="px-5 py-4">IP Address</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-[#16A6CE]">
                    {log.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#0B1F33]">
                      {log.actor}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {log.role}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                        actionColors[log.action] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {log.module}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-slate-700">{log.date}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {log.time}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-500">{log.ip}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                        log.status === "Success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-[#16A6CE] hover:text-[#16A6CE]"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-14 text-center">
                    <FileText
                      size={32}
                      className="mx-auto mb-3 text-slate-300"
                    />
                    <p className="font-semibold text-slate-600">
                      No audit records found
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Try changing the search or filter options.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
          Demo records only · Data is not yet connected to Django
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <p className="text-xs font-medium text-[#16A6CE]">
                  AUDIT EVENT DETAILS
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#0B1F33]">
                  {selectedLog.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <DetailItem label="User" value={selectedLog.actor} />
              <DetailItem label="Email" value={selectedLog.email} />
              <DetailItem label="Role" value={selectedLog.role} />
              <DetailItem label="Action" value={selectedLog.action} />
              <DetailItem label="Module" value={selectedLog.module} />
              <DetailItem
                label="Status"
                value={selectedLog.status}
              />
              <DetailItem label="Date" value={selectedLog.date} />
              <DetailItem label="Time" value={selectedLog.time} />
              <DetailItem label="IP Address" value={selectedLog.ip} />
              <div className="sm:col-span-2">
                <DetailItem
                  label="Description"
                  value={selectedLog.description}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 p-5">
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-xl bg-[#0B1F33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153653]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, bg, color }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
            {value}
          </h2>
        </div>
        <div className={`rounded-xl p-3 ${bg}`}>
          <Icon size={23} className={color} />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#0B1F33]">
        {value}
      </p>
    </div>
  );
}

function EmptyGraph() {
  return (
    <div className="flex h-64 items-center justify-center text-sm text-slate-400">
      No action data available.
    </div>
  );
}

export default Super_org_audit_log;
