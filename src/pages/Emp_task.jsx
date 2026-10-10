
import { useMemo, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Search,
  Plus,
  CalendarDays,
  Circle,
  CheckCircle,
  ListTodo,
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

const initialTasks = [
  {
    id: 1,
    title: "Call interested leads",
    description: "Contact leads interested in the demo.",
    dueDate: "2026-10-09",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Follow up with Rahul Sharma",
    description: "Discuss pricing and product requirements.",
    dueDate: "2026-10-09",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Update lead information",
    description: "Verify contact details in the CRM.",
    dueDate: "2026-10-10",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 4,
    title: "Submit daily calling report",
    description: "Update call outcomes and daily activity.",
    dueDate: "2026-10-08",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 5,
    title: "Schedule product demo",
    description: "Coordinate a demo with an interested customer.",
    dueDate: "2026-10-11",
    priority: "Low",
    status: "Pending",
  },
  {
    id: 6,
    title: "Review missed follow-ups",
    description: "Check pending follow-ups and plan callbacks.",
    dueDate: "2026-10-08",
    priority: "High",
    status: "Pending",
  },
];

const weeklyData = [
  { day: "Mon", completed: 5, pending: 3 },
  { day: "Tue", completed: 7, pending: 2 },
  { day: "Wed", completed: 4, pending: 4 },
  { day: "Thu", completed: 8, pending: 2 },
  { day: "Fri", completed: 6, pending: 3 },
  { day: "Sat", completed: 3, pending: 1 },
  { day: "Sun", completed: 2, pending: 1 },
];

const COLORS = ["#10B981", "#F59E0B", "#3B82F6"];

function Emp_task() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "2026-10-09",
    priority: "Medium",
  });

  const today = "2026-10-09";

  const stats = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const overdue = tasks.filter(
      (task) => task.status !== "Completed" && task.dueDate < today
    ).length;

    return {
      total: tasks.length,
      completed,
      pending,
      inProgress,
      overdue,
    };
  }, [tasks]);

  const statusData = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
  ].filter((item) => item.value > 0);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const updateStatus = (id, status) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const addTask = (event) => {
    event.preventDefault();

    if (!newTask.title.trim() || !newTask.dueDate) return;

    setTasks((previous) => [
      {
        id: Date.now(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        status: "Pending",
      },
      ...previous,
    ]);

    setNewTask({
      title: "",
      description: "",
      dueDate: today,
      priority: "Medium",
    });

    setShowForm(false);
  };

  const statusStyle = {
    Completed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    "In Progress": "bg-blue-50 text-blue-700",
  };

  const priorityStyle = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-orange-50 text-orange-700",
    Low: "bg-slate-100 text-slate-600",
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
            <h1 className="mt-1 text-2xl font-bold text-[#0B1F33] sm:text-3xl">
              My Tasks
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Organize your daily work and track task performance.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1264DB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Task
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <form
            onSubmit={addTask}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="mb-4 text-lg font-bold text-[#0B1F33]">
              Create New Task
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Task title"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                required
                type="date"
                min={today}
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    description: e.target.value,
                  })
                }
                placeholder="Task description"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:col-span-2"
              />

              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <button
                type="submit"
                className="rounded-xl bg-[#1264DB] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Task
              </button>
            </div>
          </form>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Tasks",
              value: stats.total,
              icon: ClipboardList,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Completed",
              value: stats.completed,
              icon: CheckCircle2,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Pending",
              value: stats.pending,
              icon: Clock3,
              color: "bg-amber-50 text-amber-600",
            },
            {
              title: "Overdue",
              value: stats.overdue,
              icon: AlertTriangle,
              color: "bg-red-50 text-red-600",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
                      {item.value}
                    </h2>
                  </div>
                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5">
              <h2 className="font-bold text-[#0B1F33]">
                Weekly Task Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Completed versus pending tasks each day
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="#10B981"
                    radius={[5, 5, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="#F59E0B"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#0B1F33]">Task Status</h2>
            <p className="mt-1 text-sm text-slate-500">
              Current task distribution
            </p>

            {statusData.length > 0 ? (
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                    >
                      {statusData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            COLORS[
                              ["Completed", "Pending", "In Progress"].indexOf(
                                entry.name
                              )
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                No tasks available
              </div>
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5">
            <div>
              <h2 className="font-bold text-[#0B1F33]">Task List</h2>
              <p className="mt-1 text-sm text-slate-500">
                View and update your assigned tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Task</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Update Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-blue-600">
                          {task.status === "Completed" ? (
                            <CheckCircle size={19} />
                          ) : (
                            <Circle size={19} />
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              task.status === "Completed"
                                ? "text-slate-400 line-through"
                                : "text-[#0B1F33]"
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="mt-1 max-w-xs text-xs text-slate-500">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={15} />
                        {task.dueDate}
                      </span>
                      {task.status !== "Completed" && task.dueDate < today && (
                        <p className="mt-1 text-xs font-semibold text-red-600">
                          Overdue
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${priorityStyle[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(task.id, e.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-blue-500"
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}

                {filteredTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      <ListTodo className="mx-auto mb-2" size={28} />
                      No tasks match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emp_task;

