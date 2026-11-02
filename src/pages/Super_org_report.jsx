
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  FileBarChart,
  Building2,
  Users,
  IndianRupee,
  TrendingUp,
  Download,
  CalendarDays,
  Activity,
  CheckCircle2,
} from "lucide-react";

function Super_org_report() {
  const [period, setPeriod] = useState("6 Months");

  const monthlyData = [
    { month: "May", organizations: 18, users: 240, revenue: 24000 },
    { month: "Jun", organizations: 24, users: 310, revenue: 32000 },
    { month: "Jul", organizations: 29, users: 390, revenue: 41000 },
    { month: "Aug", organizations: 35, users: 460, revenue: 48000 },
    { month: "Sep", organizations: 42, users: 570, revenue: 59000 },
    { month: "Oct", organizations: 49, users: 680, revenue: 72000 },
  ];

  const planData = [
    { name: "Starter", value: 42, color: "#16A6CE" },
    { name: "Growth", value: 35, color: "#6366F1" },
    { name: "Business", value: 23, color: "#10B981" },
  ];

  const activityData = [
    { name: "Mon", logins: 120, calls: 340 },
    { name: "Tue", logins: 160, calls: 420 },
    { name: "Wed", logins: 145, calls: 390 },
    { name: "Thu", logins: 190, calls: 510 },
    { name: "Fri", logins: 220, calls: 580 },
    { name: "Sat", logins: 135, calls: 300 },
    { name: "Sun", logins: 95, calls: 210 },
  ];

  const organizations = [
    {
      name: "TechNova Solutions",
      plan: "Business",
      users: 86,
      status: "Active",
      revenue: 14999,
    },
    {
      name: "Bright Future CRM",
      plan: "Growth",
      users: 54,
      status: "Active",
      revenue: 7999,
    },
    {
      name: "Digital Edge",
      plan: "Starter",
      users: 22,
      status: "Active",
      revenue: 2999,
    },
    {
      name: "CloudBridge Tech",
      plan: "Growth",
      users: 41,
      status: "Suspended",
      revenue: 7999,
    },
    {
      name: "NextGen Systems",
      plan: "Business",
      users: 73,
      status: "Active",
      revenue: 14999,
    },
  ];

  const filteredMonthlyData = useMemo(() => {
    if (period === "3 Months") return monthlyData.slice(-3);
    if (period === "12 Months") {
      return [
        { month: "Nov", organizations: 8, users: 100, revenue: 10000 },
        { month: "Dec", organizations: 11, users: 145, revenue: 15000 },
        { month: "Jan", organizations: 13, users: 170, revenue: 18000 },
        { month: "Feb", organizations: 15, users: 205, revenue: 21000 },
        { month: "Mar", organizations: 16, users: 220, revenue: 22000 },
        { month: "Apr", organizations: 17, users: 230, revenue: 23000 },
        ...monthlyData,
      ];
    }
    return monthlyData;
  }, [period]);

  const stats = [
    {
      title: "Total Organizations",
      value: "49",
      change: "+16.7%",
      icon: Building2,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Total Users",
      value: "2,650",
      change: "+12.4%",
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹72,000",
      change: "+22.1%",
      icon: IndianRupee,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Active Organizations",
      value: "44",
      change: "+8.2%",
      icon: Activity,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const exportCSV = () => {
    const headers = [
      "Organization",
      "Plan",
      "Users",
      "Status",
      "Monthly Revenue",
    ];

    const rows = organizations.map((org) => [
      org.name,
      org.plan,
      org.users,
      org.status,
      org.revenue,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "super-admin-organization-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#16A6CE]">
            <FileBarChart size={18} />
            Super Admin / Reports
          </div>

          <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor organizations, users, subscriptions and revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
            <CalendarDays size={17} className="text-slate-500" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent text-sm font-medium text-[#0B1F33] outline-none"
            >
              <option>3 Months</option>
              <option>6 Months</option>
              <option>12 Months</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153653]"
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-[#0B1F33]">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconBg}`}>
                  <Icon size={22} className={stat.iconColor} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <TrendingUp size={15} />
                {stat.change}
                <span className="font-normal text-slate-400">
                  vs previous period
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Organization Growth + Revenue */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
          <div className="mb-6">
            <h2 className="font-bold text-[#0B1F33]">
              Platform Growth
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Organization and user growth over time
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredMonthlyData}>
                <defs>
                  <linearGradient id="orgGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A6CE" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#16A6CE" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="organizations"
                  name="Organizations"
                  stroke="#16A6CE"
                  fill="url(#orgGradient)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#6366F1"
                  fill="url(#userGradient)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">
            Subscription Distribution
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Organizations by plan
          </p>

          <div className="mt-3 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                >
                  {planData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {planData.map((plan) => (
              <div
                key={plan.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                  <span className="text-slate-600">{plan.name}</span>
                </div>
                <span className="font-semibold text-[#0B1F33]">
                  {plan.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue + Activity */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Revenue Overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Monthly subscription revenue
          </p>

          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#16A6CE"
                  radius={[7, 7, 0, 0]}
                  maxBarSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Weekly User Activity</h2>
          <p className="mt-1 text-sm text-slate-500">
            Platform logins and calls
          </p>

          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="logins"
                  name="Logins"
                  fill="#6366F1"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="calls"
                  name="Calls"
                  fill="#10B981"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Organization Report Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 className="font-bold text-[#0B1F33]">
              Organization Performance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Subscription and usage summary
            </p>
          </div>

          <span className="w-fit rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
            {organizations.length} organizations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Organization</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Total Users</th>
                <th className="px-6 py-4 font-semibold">Monthly Revenue</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {organizations.map((org) => (
                <tr
                  key={org.name}
                  className="transition hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1F33] text-sm font-bold text-white">
                        {org.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#0B1F33]">
                        {org.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">
                      {org.plan}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-700">
                    {org.users}
                  </td>

                  <td className="px-6 py-4 font-semibold text-[#0B1F33]">
                    {formatCurrency(org.revenue)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                        org.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {org.status === "Active" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <Activity size={13} />
                      )}
                      {org.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
          Report values are sample data. Connect the backend APIs for live analytics.
        </div>
      </div>
    </div>
  );
}

export default Super_org_report;
