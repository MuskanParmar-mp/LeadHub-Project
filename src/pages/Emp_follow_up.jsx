
import { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Search,
  Filter,
  Phone,
  Check,
  RotateCcw,
} from "lucide-react";

import {
  ResponsiveContainer,
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

function Emp_follow_up() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      lead: "Rahul Sharma",
      phone: "+91 98765 43210",
      purpose: "Discuss course details",
      date: "2026-10-09",
      time: "10:30 AM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      lead: "Priya Verma",
      phone: "+91 98765 12345",
      purpose: "Share pricing information",
      date: "2026-10-09",
      time: "12:00 PM",
      priority: "Medium",
      status: "Completed",
    },
    {
      id: 3,
      lead: "Amit Patel",
      phone: "+91 91234 56789",
      purpose: "Schedule product demo",
      date: "2026-10-09",
      time: "03:00 PM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 4,
      lead: "Neha Singh",
      phone: "+91 99887 76655",
      purpose: "Confirm admission",
      date: "2026-10-08",
      time: "04:00 PM",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 5,
      lead: "Vikas Gupta",
      phone: "+91 90909 80808",
      purpose: "Call back regarding offer",
      date: "2026-10-08",
      time: "11:00 AM",
      priority: "High",
      status: "Overdue",
    },
    {
      id: 6,
      lead: "Pooja Jain",
      phone: "+91 98760 12345",
      purpose: "Answer customer questions",
      date: "2026-10-10",
      time: "01:30 PM",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 7,
      lead: "Karan Mehta",
      phone: "+91 98111 22334",
      purpose: "Follow up after consultation",
      date: "2026-10-11",
      time: "02:00 PM",
      priority: "Low",
      status: "Pending",
    },
  ]);

  // Statistics
  const stats = useMemo(
    () => [
      {
        title: "Total Follow-ups",
        value: followUps.length,
        icon: CalendarClock,
        color: "text-sky-600",
        bg: "bg-sky-50",
      },
      {
        title: "Pending",
        value: followUps.filter(
          (item) => item.status === "Pending"
        ).length,
        icon: Clock3,
        color: "text-orange-500",
        bg: "bg-orange-50",
      },
      {
        title: "Completed",
        value: followUps.filter(
          (item) => item.status === "Completed"
        ).length,
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-50",
      },
      {
        title: "Overdue",
        value: followUps.filter(
          (item) => item.status === "Overdue"
        ).length,
        icon: AlertTriangle,
        color: "text-red-500",
        bg: "bg-red-50",
      },
    ],
    [followUps]
  );

  // Weekly graph data (sample data)
  const weeklyData = [
    { day: "Mon", scheduled: 5, completed: 3 },
    { day: "Tue", scheduled: 7, completed: 5 },
    { day: "Wed", scheduled: 4, completed: 3 },
    { day: "Thu", scheduled: 8, completed: 6 },
    { day: "Fri", scheduled: 6, completed: 4 },
    { day: "Sat", scheduled: 3, completed: 2 },
    { day: "Sun", scheduled: 2, completed: 1 },
  ];

  // Pie chart data
  const statusData = [
    {
      name: "Pending",
      value: followUps.filter(
        (item) => item.status === "Pending"
      ).length,
      color: "#F59E0B",
    },
    {
      name: "Completed",
      value: followUps.filter(
        (item) => item.status === "Completed"
      ).length,
      color: "#16A34A",
    },
    {
      name: "Overdue",
      value: followUps.filter(
        (item) => item.status === "Overdue"
      ).length,
      color: "#EF4444",
    },
  ].filter((item) => item.value > 0);

  // Search and status filter
  const filteredFollowUps = followUps.filter((item) => {
    const text =
      `${item.lead} ${item.phone} ${item.purpose}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Complete follow-up
  const markCompleted = (id) => {
    setFollowUps((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Completed" }
          : item
      )
    );
  };

  // Reschedule follow-up
  const reschedule = (id) => {
    const newDate = window.prompt(
      "Enter new date (YYYY-MM-DD):",
      "2026-10-12"
    );

    if (!newDate) return;

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(newDate) ||
      Number.isNaN(Date.parse(newDate))
    ) {
      window.alert("Please enter a valid date.");
      return;
    }

    setFollowUps((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              date: newDate,
              status: "Pending",
            }
          : item
      )
    );
  };

  const statusStyle = {
    Pending: "bg-orange-100 text-orange-700",
    Completed: "bg-green-100 text-green-700",
    Overdue: "bg-red-100 text-red-700",
  };

  const priorityStyle = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] p-4 sm:p-6 lg:p-8">

      {/* Page Heading */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1f33]">
            Follow-ups
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage callbacks and track your follow-up tasks.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <CalendarClock
            size={18}
            className="text-[#16a6d1]"
          />
          Sales Executive
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <span className={`rounded-xl p-2 ${item.bg}`}>
                  <Icon size={20} className={item.color} />
                </span>
              </div>

              <p className={`mt-3 text-3xl font-bold ${item.color}`}>
                {item.value}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Your follow-up activity
              </p>
            </div>
          );
        })}
      </div>

      {/* Graphs */}
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Weekly Bar Chart */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="font-semibold text-[#0b1f33]">
            Weekly Follow-up Activity
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Scheduled vs completed follow-ups
          </p>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 10,
                  right: 8,
                  left: -18,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e9eef3"
                />

                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip />
                <Legend iconType="circle" />

                <Bar
                  dataKey="scheduled"
                  name="Scheduled"
                  fill="#16A6D1"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#16A34A"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Status Pie Chart */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#0b1f33]">
            Follow-up Status
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Current task distribution
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="47%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-xs text-gray-500">
            Chart updates when a follow-up is completed.
          </p>
        </section>
      </div>

      {/* Search and Filter */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search lead, phone, or purpose..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#16a6d1] focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="relative w-full md:w-52">
          <Filter
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm text-gray-600 outline-none focus:border-[#16a6d1]"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>
      </div>

      {/* Follow-up Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#0b1f33]">
            My Follow-up Schedule
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Showing {filteredFollowUps.length} of {followUps.length} follow-ups
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#f7f9fb]">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Lead</th>
                <th className="px-5 py-4">Purpose</th>
                <th className="px-5 py-4">Date & Time</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredFollowUps.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-sky-50/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f3f9] font-semibold text-[#159cc5]">
                        {item.lead.charAt(0)}
                      </div>

                      <div>
                        <p className="whitespace-nowrap text-sm font-semibold text-[#0b1f33]">
                          {item.lead}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.purpose}
                  </td>

                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm text-gray-700">
                      {item.date}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.time}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${priorityStyle[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {item.status !== "Completed" && (
                        <button
                          type="button"
                          onClick={() => markCompleted(item.id)}
                          title="Mark completed"
                          className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-100"
                        >
                          <Check size={15} />
                          Complete
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => reschedule(item.id)}
                        title="Reschedule follow-up"
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                      >
                        <RotateCcw size={15} />
                      </button>

                      <a
                        href={`tel:${item.phone.replace(/[^+\d]/g, "")}`}
                        title="Call lead"
                        className="rounded-lg bg-sky-50 p-2 text-sky-600 transition hover:bg-sky-100"
                      >
                        <Phone size={15} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredFollowUps.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No follow-ups found. Try another search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
          Demo data only — connect your Django API to load and save real follow-ups.
        </div>
      </section>
    </div>
  );
}

export default Emp_follow_up;