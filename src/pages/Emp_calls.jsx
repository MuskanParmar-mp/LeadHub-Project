
import { useMemo, useState } from "react";
import {
  Phone,
  PhoneCall,
  PhoneMissed,
  Target,
  Search,
  CalendarDays,
  Clock,
  CheckCircle2,
  Pencil,
  Save,
  X,
  RotateCcw,
  FileText,
  TrendingUp,
  Headphones,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const INITIAL_CALLS = [
  {
    id: 1,
    lead: "Rahul Sharma",
    phone: "9876543210",
    date: "2026-10-09",
    time: "10:30 AM",
    duration: "05:20",
    status: "Connected",
    notes: "Interested in the course. Share the fee structure.",
  },
  {
    id: 2,
    lead: "Priya Verma",
    phone: "9876543211",
    date: "2026-10-09",
    time: "11:15 AM",
    duration: "00:00",
    status: "No Answer",
    notes: "Try again in the afternoon.",
  },
  {
    id: 3,
    lead: "Amit Patel",
    phone: "9876543212",
    date: "2026-10-09",
    time: "12:00 PM",
    duration: "08:45",
    status: "Interested",
    notes: "Wants a demo session this week.",
  },
  {
    id: 4,
    lead: "Neha Singh",
    phone: "9876543213",
    date: "2026-10-08",
    time: "02:20 PM",
    duration: "00:00",
    status: "Busy",
    notes: "Customer was busy. Call tomorrow.",
  },
  {
    id: 5,
    lead: "Rohit Jain",
    phone: "9876543214",
    date: "2026-10-08",
    time: "03:10 PM",
    duration: "12:10",
    status: "Converted",
    notes: "Enrollment confirmed.",
  },
  {
    id: 6,
    lead: "Sneha Gupta",
    phone: "9876543215",
    date: "2026-10-07",
    time: "04:30 PM",
    duration: "04:15",
    status: "Connected",
    notes: "Follow-up required next week.",
  },
  {
    id: 7,
    lead: "Karan Mehta",
    phone: "9876543216",
    date: "2026-10-06",
    time: "11:45 AM",
    duration: "00:00",
    status: "No Answer",
    notes: "No response. Try another time.",
  },
  {
    id: 8,
    lead: "Anjali Gupta",
    phone: "9876543217",
    date: "2026-10-05",
    time: "01:30 PM",
    duration: "06:35",
    status: "Interested",
    notes: "Requested more information.",
  },
];

const OUTCOMES = [
  "Connected",
  "Interested",
  "Converted",
  "No Answer",
  "Busy",
];

const OUTCOME_COLORS = {
  Connected: "#16A6D1",
  Interested: "#16A34A",
  Converted: "#8B5CF6",
  "No Answer": "#EF4444",
  Busy: "#F59E0B",
};

const STATUS_STYLES = {
  Connected: "bg-sky-50 text-sky-700",
  Interested: "bg-green-50 text-green-700",
  Converted: "bg-violet-50 text-violet-700",
  "No Answer": "bg-red-50 text-red-700",
  Busy: "bg-amber-50 text-amber-700",
};

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h3>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function Emp_calls() {
  const [calls, setCalls] = useState(INITIAL_CALLS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [draftNotes, setDraftNotes] = useState("");

  // Dashboard statistics
  const stats = useMemo(() => {
    const total = calls.length;
    const connected = calls.filter((c) =>
      ["Connected", "Interested", "Converted"].includes(c.status)
    ).length;
    const missed = calls.filter((c) =>
      ["No Answer", "Busy"].includes(c.status)
    ).length;
    const converted = calls.filter(
      (c) => c.status === "Converted"
    ).length;

    return { total, connected, missed, converted };
  }, [calls]);

  // Pie chart data updates when call outcomes change.
  const outcomeData = useMemo(() => {
    return OUTCOMES.map((name) => ({
      name,
      value: calls.filter((c) => c.status === name).length,
    })).filter((item) => item.value > 0);
  }, [calls]);

  // Demo weekly data. Replace with API data when backend is connected.
  const weeklyCallData = [
    { day: "Mon", total: 25, connected: 18 },
    { day: "Tue", total: 32, connected: 24 },
    { day: "Wed", total: 28, connected: 20 },
    { day: "Thu", total: 40, connected: 31 },
    { day: "Fri", total: 35, connected: 27 },
    { day: "Sat", total: 22, connected: 16 },
    { day: "Sun", total: 15, connected: 10 },
  ];

  const filteredCalls = useMemo(() => {
    const query = search.toLowerCase().trim();

    return calls.filter((call) => {
      const matchesSearch =
        call.lead.toLowerCase().includes(query) ||
        call.phone.includes(query) ||
        call.notes.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || call.status === statusFilter;

      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && call.date === "2026-10-09") ||
        (dateFilter === "Previous" && call.date !== "2026-10-09");

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [calls, search, statusFilter, dateFilter]);

  const updateOutcome = (id, status) => {
    setCalls((previous) =>
      previous.map((call) =>
        call.id === id ? { ...call, status } : call
      )
    );
  };

  const startEditing = (call) => {
    setEditingId(call.id);
    setDraftNotes(call.notes);
  };

  const saveNotes = (id) => {
    setCalls((previous) =>
      previous.map((call) =>
        call.id === id ? { ...call, notes: draftNotes } : call
      )
    );
    setEditingId(null);
    setDraftNotes("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraftNotes("");
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setDateFilter("All");
  };

  const connectedRate = stats.total
    ? Math.round((stats.connected / stats.total) * 100)
    : 0;

  const conversionRate = stats.total
    ? Math.round((stats.converted / stats.total) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Headphones size={16} />
              <span>Sales Executive / Calls</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1F33] sm:text-3xl">
              Call History
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track your calls, review outcomes and monitor your performance.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:self-auto">
            <CalendarDays size={17} className="text-[#16A6D1]" />
            <span>Call Activity Dashboard</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Calls"
            value={stats.total}
            subtitle="Calls in this list"
            icon={Phone}
            color="bg-sky-50 text-sky-600"
          />
          <StatCard
            title="Connected Calls"
            value={stats.connected}
            subtitle={`${connectedRate}% connection rate`}
            icon={PhoneCall}
            color="bg-green-50 text-green-600"
          />
          <StatCard
            title="Missed / Busy"
            value={stats.missed}
            subtitle="Calls needing another attempt"
            icon={PhoneMissed}
            color="bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Conversions"
            value={stats.converted}
            subtitle={`${conversionRate}% conversion rate`}
            icon={Target}
            color="bg-violet-50 text-violet-600"
          />
        </div>

        {/* Graphs replace Calling Overview and Best Practices */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Weekly calls graph */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-[#0B1F33]">
                  Weekly Call Activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Compare total calls with successfully connected calls.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">
                <TrendingUp size={15} />
                Weekly report
              </div>
            </div>

            <div className="mt-6 h-[290px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyCallData}
                  margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
                  barGap={6}
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
                    wrapperStyle={{ fontSize: 12, paddingBottom: 18 }}
                  />
                  <Bar
                    dataKey="total"
                    name="Total Calls"
                    fill="#0B1F33"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="connected"
                    name="Connected"
                    fill="#16A6D1"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Call outcome pie chart */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Call Outcomes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Distribution of recorded call results.
              </p>
            </div>

            <div className="relative mt-2 h-[235px] w-full">
              {calls.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={57}
                      outerRadius={88}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {outcomeData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={OUTCOME_COLORS[entry.name]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [value, name]}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #E2E8F0",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No call data available
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#0B1F33]">
                  {stats.total}
                </span>
                <span className="text-xs text-slate-500">Total calls</span>
              </div>
            </div>

            <div className="mt-2 space-y-3">
              {OUTCOMES.map((name) => {
                const count = calls.filter(
                  (call) => call.status === name
                ).length;
                const percentage = stats.total
                  ? Math.round((count / stats.total) * 100)
                  : 0;

                return (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: OUTCOME_COLORS[name] }}
                      />
                      <span className="truncate text-sm text-slate-600">
                        {name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-800">
                        {count}
                      </span>
                      <span className="w-10 text-right text-xs text-slate-400">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Performance indicators */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Connection Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-[#0B1F33]">
                  {connectedRate}%
                </p>
              </div>
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <PhoneCall size={22} />
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#16A6D1] transition-all"
                style={{ width: `${connectedRate}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Connected, interested and converted outcomes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Conversion Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-[#0B1F33]">
                  {conversionRate}%
                </p>
              </div>
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <Target size={22} />
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${conversionRate}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Converted calls divided by all recorded calls.
            </p>
          </div>
        </div>

        {/* Call history */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-[#0B1F33]">
                  Call History
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review calls and update their outcomes.
                </p>
              </div>

              <span className="self-start rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                {filteredCalls.length} records
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative xl:col-span-2">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search lead, phone or notes..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#16A6D1] focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-[#16A6D1]"
              >
                <option value="All">All Outcomes</option>
                {OUTCOMES.map((outcome) => (
                  <option key={outcome} value={outcome}>
                    {outcome}
                  </option>
                ))}
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-[#16A6D1]"
              >
                <option value="All">All Dates</option>
                <option value="Today">Today (Demo)</option>
                <option value="Previous">Previous Dates</option>
              </select>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <RotateCcw size={15} />
                Reset filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 font-semibold">Lead</th>
                  <th className="px-5 py-4 font-semibold">Call Date</th>
                  <th className="px-5 py-4 font-semibold">Duration</th>
                  <th className="px-5 py-4 font-semibold">Outcome</th>
                  <th className="px-5 py-4 font-semibold">Call Notes</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCalls.map((call) => (
                  <tr
                    key={call.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1F33] text-sm font-bold text-white">
                          {call.lead
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {call.lead}
                          </p>
                          <a
                            href={`tel:${call.phone}`}
                            className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#16A6D1]"
                          >
                            <Phone size={12} />
                            {call.phone}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {call.date}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={12} />
                        {call.time}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {call.duration}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={call.status}
                        onChange={(e) =>
                          updateOutcome(call.id, e.target.value)
                        }
                        className={`max-w-[150px] rounded-lg border-0 px-3 py-2 text-xs font-semibold outline-none ring-1 ring-inset ring-transparent focus:ring-[#16A6D1] ${
                          STATUS_STYLES[call.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {OUTCOMES.map((outcome) => (
                          <option key={outcome} value={outcome}>
                            {outcome}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="max-w-[310px] px-5 py-4">
                      {editingId === call.id ? (
                        <div className="min-w-[230px] space-y-2">
                          <textarea
                            value={draftNotes}
                            onChange={(e) => setDraftNotes(e.target.value)}
                            rows={3}
                            placeholder="Enter call notes..."
                            className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-[#16A6D1] focus:ring-2 focus:ring-sky-100"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => saveNotes(call.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#0B1F33] px-3 py-2 text-xs font-semibold text-white hover:bg-[#163956]"
                            >
                              <Save size={13} />
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                              <X size={13} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="line-clamp-2 min-w-[180px] text-sm leading-5 text-slate-500">
                          {call.notes || "No notes added"}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`tel:${call.phone}`}
                          title="Call lead"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-[#16A6D1]"
                        >
                          <Phone size={16} />
                        </a>

                        {editingId !== call.id && (
                          <button
                            type="button"
                            onClick={() => startEditing(call)}
                            title="Edit notes"
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-[#16A6D1]"
                          >
                            <Pencil size={16} />
                          </button>
                        )}

                        {call.status === "Converted" && (
                          <span
                            title="Converted"
                            className="rounded-lg bg-green-50 p-2 text-green-600"
                          >
                            <CheckCircle2 size={16} />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCalls.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <FileText size={22} />
                      </div>
                      <p className="mt-3 font-semibold text-slate-700">
                        No calls found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-3 text-sm font-semibold text-[#16A6D1] hover:underline"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
            <span>
              Showing {filteredCalls.length} of {calls.length} calls
            </span>
            <span>LeadHub · Sales Executive</span>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">
          Demo data is stored in component state and resets on page refresh.
        </p>
      </div>
    </div>
  );
}

export default Emp_calls;