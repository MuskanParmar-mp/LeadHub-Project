
import { useMemo, useState } from "react";
import {
  BarChart3,
  PhoneCall,
  Target,
  TrendingUp,
  Users,
  Download,
  CalendarDays,
  CheckCircle2,
  Clock,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  calls: "#0B1F33",
  connected: "#16A6D1",
  conversions: "#16A34A",
  interested: "#8B5CF6",
  pending: "#F59E0B",
  lost: "#EF4444",
};

const weeklyData = [
  { day: "Mon", calls: 35, connected: 26, conversions: 4 },
  { day: "Tue", calls: 42, connected: 31, conversions: 6 },
  { day: "Wed", calls: 38, connected: 29, conversions: 5 },
  { day: "Thu", calls: 50, connected: 39, conversions: 8 },
  { day: "Fri", calls: 45, connected: 34, conversions: 7 },
  { day: "Sat", calls: 30, connected: 21, conversions: 3 },
  { day: "Sun", calls: 20, connected: 14, conversions: 2 },
];

const dailyData = [
  { date: "Oct 03", calls: 28 },
  { date: "Oct 04", calls: 35 },
  { date: "Oct 05", calls: 31 },
  { date: "Oct 06", calls: 42 },
  { date: "Oct 07", calls: 38 },
  { date: "Oct 08", calls: 46 },
  { date: "Oct 09", calls: 50 },
];

const leadStatusData = [
  { name: "Converted", value: 18, color: COLORS.conversions },
  { name: "Interested", value: 32, color: COLORS.interested },
  { name: "Follow-up", value: 25, color: COLORS.pending },
  { name: "Not Interested", value: 12, color: COLORS.lost },
  { name: "New Leads", value: 13, color: COLORS.connected },
];

const reportRows = [
  {
    day: "Monday",
    calls: 35,
    connected: 26,
    followUps: 8,
    conversions: 4,
  },
  {
    day: "Tuesday",
    calls: 42,
    connected: 31,
    followUps: 10,
    conversions: 6,
  },
  {
    day: "Wednesday",
    calls: 38,
    connected: 29,
    followUps: 7,
    conversions: 5,
  },
  {
    day: "Thursday",
    calls: 50,
    connected: 39,
    followUps: 12,
    conversions: 8,
  },
  {
    day: "Friday",
    calls: 45,
    connected: 34,
    followUps: 9,
    conversions: 7,
  },
  {
    day: "Saturday",
    calls: 30,
    connected: 21,
    followUps: 6,
    conversions: 3,
  },
  {
    day: "Sunday",
    calls: 20,
    connected: 14,
    followUps: 4,
    conversions: 2,
  },
];

function ReportStat({ title, value, detail, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-[#0B1F33]">
            {value}
          </h3>
          <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function Emp_reports() {
  const [period, setPeriod] = useState("7");

  // The selected period controls the demo summary values.
  const report = useMemo(() => {
    const rows =
      period === "7"
        ? reportRows
        : period === "30"
          ? [...reportRows, ...reportRows, ...reportRows, ...reportRows]
          : [...reportRows, ...reportRows, ...reportRows, ...reportRows];

    const calls = rows.reduce((sum, row) => sum + row.calls, 0);
    const connected = rows.reduce((sum, row) => sum + row.connected, 0);
    const conversions = rows.reduce(
      (sum, row) => sum + row.conversions,
      0
    );
    const followUps = rows.reduce((sum, row) => sum + row.followUps, 0);

    return {
      calls,
      connected,
      conversions,
      followUps,
      connectionRate: calls
        ? Math.round((connected / calls) * 100)
        : 0,
      conversionRate: calls
        ? Math.round((conversions / calls) * 100)
        : 0,
    };
  }, [period]);

  const handleExport = () => {
    const headers = [
      "Day",
      "Calls",
      "Connected",
      "Follow-ups",
      "Conversions",
      "Conversion Rate",
    ];

    const csvRows = [
      headers.join(","),
      ...reportRows.map((row) =>
        [
          row.day,
          row.calls,
          row.connected,
          row.followUps,
          row.conversions,
          `${Math.round((row.conversions / row.calls) * 100)}%`,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employee-performance-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <BarChart3 size={16} />
              Sales Executive / Reports
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1F33] sm:text-3xl">
              Performance Reports
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track calling performance, lead outcomes and conversion trends.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <CalendarDays size={17} className="text-[#16A6D1]" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 outline-none"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#163956]"
            >
              <Download size={17} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ReportStat
            title="Total Calls"
            value={report.calls.toLocaleString()}
            detail="Calls recorded in report data"
            icon={PhoneCall}
            color="bg-sky-50 text-sky-600"
          />

          <ReportStat
            title="Connected Calls"
            value={report.connected.toLocaleString()}
            detail={`${report.connectionRate}% connection rate`}
            icon={CheckCircle2}
            color="bg-green-50 text-green-600"
          />

          <ReportStat
            title="Conversions"
            value={report.conversions.toLocaleString()}
            detail={`${report.conversionRate}% of total calls`}
            icon={Target}
            color="bg-violet-50 text-violet-600"
          />

          <ReportStat
            title="Follow-ups"
            value={report.followUps.toLocaleString()}
            detail="Follow-ups in sample report data"
            icon={Clock}
            color="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Weekly performance chart */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Weekly Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Calls, connections and conversions by day.
              </p>
            </div>

            <span className="self-start rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">
              Activity overview
            </span>
          </div>

          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E8EEF5"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  dy={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12, paddingBottom: 20 }}
                />
                <Bar
                  dataKey="calls"
                  name="Total Calls"
                  fill={COLORS.calls}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={30}
                />
                <Bar
                  dataKey="connected"
                  name="Connected"
                  fill={COLORS.connected}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={30}
                />
                <Bar
                  dataKey="conversions"
                  name="Conversions"
                  fill={COLORS.conversions}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Daily trend + lead status charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-3">
            <h2 className="text-lg font-bold text-[#0B1F33]">
              Daily Call Trend
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Changes in calling activity over the last seven days.
            </p>

            <div className="mt-6 h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyData}
                  margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EEF5"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #E2E8F0",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    name="Total Calls"
                    stroke={COLORS.connected}
                    strokeWidth={3}
                    dot={{ r: 4, fill: COLORS.connected }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <h2 className="text-lg font-bold text-[#0B1F33]">
              Lead Status Distribution
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Breakdown of leads by their current status.
            </p>

            <div className="mt-3 h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {leadStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #E2E8F0",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {leadStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-600">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Performance table */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <Users size={21} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0B1F33]">
                  Daily Performance Report
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Detailed calling activity and conversion summary.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 font-semibold">Day</th>
                  <th className="px-5 py-4 font-semibold">Total Calls</th>
                  <th className="px-5 py-4 font-semibold">Connected</th>
                  <th className="px-5 py-4 font-semibold">Follow-ups</th>
                  <th className="px-5 py-4 font-semibold">Conversions</th>
                  <th className="px-5 py-4 font-semibold">Conversion Rate</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reportRows.map((row) => {
                  const rate = Math.round(
                    (row.conversions / row.calls) * 100
                  );

                  return (
                    <tr key={row.day} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                        {row.day}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {row.calls}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {row.connected}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {row.followUps}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-green-50 px-2.5 py-1.5 text-sm font-semibold text-green-700">
                          {row.conversions}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#16A6D1]"
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {rate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
            LeadHub · Employee Performance Reports
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">
          Sample report data · Connect your Django APIs to display live metrics.
        </p>
      </div>
    </div>
  );
}

export default Emp_reports;