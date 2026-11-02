
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import {
  LifeBuoy,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Eye,
  X,
  Building2,
  UserRound,
  CalendarDays,
  Send,
  Filter,
} from "lucide-react";

const initialTickets = [
  {
    id: "TKT-1001",
    subject: "Unable to add new employees",
    organization: "TechNova Solutions",
    requester: "Rahul Sharma",
    email: "rahul@technova.example",
    category: "Technical",
    priority: "High",
    status: "Open",
    created: "2026-10-12",
    description:
      "The organization admin cannot add new employees from the user management page.",
    replies: 2,
  },
  {
    id: "TKT-1002",
    subject: "Subscription payment issue",
    organization: "Bright Future CRM",
    requester: "Priya Verma",
    email: "priya@brightfuture.example",
    category: "Billing",
    priority: "Urgent",
    status: "In Progress",
    created: "2026-10-11",
    description:
      "The payment appears to have failed, but the subscription page still shows a pending status.",
    replies: 4,
  },
  {
    id: "TKT-1003",
    subject: "Dashboard loading slowly",
    organization: "Digital Edge",
    requester: "Amit Patel",
    email: "amit@digitaledge.example",
    category: "Performance",
    priority: "Medium",
    status: "Open",
    created: "2026-10-10",
    description:
      "The organization dashboard takes a long time to load when viewing reports.",
    replies: 1,
  },
  {
    id: "TKT-1004",
    subject: "Request to upgrade subscription",
    organization: "NextGen Systems",
    requester: "Neha Singh",
    email: "neha@nextgen.example",
    category: "Billing",
    priority: "Low",
    status: "Resolved",
    created: "2026-10-09",
    description:
      "The customer requested information about upgrading from Growth to Business.",
    replies: 3,
  },
  {
    id: "TKT-1005",
    subject: "Login verification problem",
    organization: "CloudBridge Tech",
    requester: "Karan Mehta",
    email: "karan@cloudbridge.example",
    category: "Account",
    priority: "High",
    status: "In Progress",
    created: "2026-10-08",
    description:
      "The user is unable to complete the account verification process.",
    replies: 2,
  },
  {
    id: "TKT-1006",
    subject: "Report export not working",
    organization: "TechNova Solutions",
    requester: "Riya Jain",
    email: "riya@technova.example",
    category: "Technical",
    priority: "Medium",
    status: "Closed",
    created: "2026-10-07",
    description:
      "CSV export was failing. The requester confirmed that the issue was resolved.",
    replies: 5,
  },
];

const priorityStyles = {
  Urgent: "bg-rose-50 text-rose-700",
  High: "bg-orange-50 text-orange-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-slate-100 text-slate-600",
};

const statusStyles = {
  Open: "bg-cyan-50 text-cyan-700",
  "In Progress": "bg-indigo-50 text-indigo-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Closed: "bg-slate-100 text-slate-600",
};

function Super_org_support_ticket() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    organization: "",
    requester: "",
    email: "",
    category: "Technical",
    priority: "Medium",
    description: "",
  });

  const filteredTickets = useMemo(() => {
    const term = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch = [
        ticket.id,
        ticket.subject,
        ticket.organization,
        ticket.requester,
      ].some((value) => value.toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const stats = [
    {
      label: "Total Tickets",
      value: tickets.length,
      icon: MessageSquare,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Open Tickets",
      value: tickets.filter((t) => t.status === "Open").length,
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "In Progress",
      value: tickets.filter((t) => t.status === "In Progress").length,
      icon: Clock,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Resolved",
      value: tickets.filter(
        (t) => t.status === "Resolved" || t.status === "Closed"
      ).length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const statusChart = [
    {
      name: "Open",
      value: tickets.filter((t) => t.status === "Open").length,
      color: "#16A6CE",
    },
    {
      name: "In Progress",
      value: tickets.filter((t) => t.status === "In Progress").length,
      color: "#6366F1",
    },
    {
      name: "Resolved",
      value: tickets.filter((t) => t.status === "Resolved").length,
      color: "#10B981",
    },
    {
      name: "Closed",
      value: tickets.filter((t) => t.status === "Closed").length,
      color: "#94A3B8",
    },
  ];

  const categoryChart = ["Technical", "Billing", "Account", "Performance"].map(
    (category) => ({
      category,
      tickets: tickets.filter((t) => t.category === category).length,
    })
  );

  const updateStatus = (ticketId, status) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket
      )
    );

    setSelectedTicket((previous) =>
      previous?.id === ticketId ? { ...previous, status } : previous
    );
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();

    const ticket = {
      ...newTicket,
      id: `TKT-${1001 + tickets.length}`,
      status: "Open",
      created: new Date().toISOString().slice(0, 10),
      replies: 0,
    };

    setTickets((previous) => [ticket, ...previous]);
    setShowCreateModal(false);
    setNewTicket({
      subject: "",
      organization: "",
      requester: "",
      email: "",
      category: "Technical",
      priority: "Medium",
      description: "",
    });
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedTicket) return;

    const updated = {
      ...selectedTicket,
      replies: selectedTicket.replies + 1,
    };

    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === updated.id ? updated : ticket
      )
    );
    setSelectedTicket(updated);
    setReply("");
    alert("Demo reply added locally. Connect the backend to send a real reply.");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#16A6CE]">
            Super Admin / Support Tickets
          </p>
          <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
            Support Center
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage customer issues, priorities and ticket resolution.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#153653]"
        >
          <Plus size={18} />
          Create Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
                    {stat.value}
                  </h2>
                </div>
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon size={23} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Tickets by Status</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current support workload
          </p>

          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChart}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {statusChart.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {statusChart.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Tickets by Category</h2>
          <p className="mt-1 text-sm text-slate-500">
            Identify common customer issues
          </p>

          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 11 }}
                  interval={0}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="tickets"
                  name="Tickets"
                  fill="#16A6CE"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">All Support Tickets</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search and filter tickets by status or priority.
          </p>

          <div className="mt-5 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket, organization or requester..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A6CE]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
                <Filter size={16} className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent py-3 text-sm outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#16A6CE]"
              >
                <option value="All">All Priorities</option>
                <option>Urgent</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Ticket</th>
                <th className="px-5 py-4">Organization</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#0B1F33]">
                      {ticket.subject}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{ticket.id}</p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 size={16} className="text-slate-400" />
                      {ticket.organization}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {ticket.requester}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {ticket.category}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${priorityStyles[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={ticket.status}
                      onChange={(e) =>
                        updateStatus(ticket.id, e.target.value)
                      }
                      className={`rounded-full border-0 px-2.5 py-1.5 text-xs font-semibold outline-none ${statusStyles[ticket.status]}`}
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {ticket.created}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#0B1F33] transition hover:border-[#16A6CE] hover:text-[#16A6CE]"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <LifeBuoy
                      size={32}
                      className="mx-auto mb-3 text-slate-300"
                    />
                    <p className="font-semibold text-slate-600">
                      No tickets found
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
          Showing {filteredTickets.length} of {tickets.length} tickets · Demo data
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold text-[#16A6CE]">
                  {selectedTicket.id}
                </p>
                <h2 className="mt-2 pr-3 text-xl font-bold text-[#0B1F33]">
                  {selectedTicket.subject}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedTicket(null);
                  setReply("");
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close ticket details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedTicket.status]}`}
                >
                  {selectedTicket.status}
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${priorityStyles[selectedTicket.priority]}`}
                >
                  {selectedTicket.priority} Priority
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                  {selectedTicket.category}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Organization</p>
                  <p className="mt-1 font-semibold text-[#0B1F33]">
                    {selectedTicket.organization}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Requester</p>
                  <p className="mt-1 font-semibold text-[#0B1F33]">
                    {selectedTicket.requester}
                  </p>
                  <p className="mt-1 break-all text-xs text-slate-500">
                    {selectedTicket.email}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Created On</p>
                  <p className="mt-1 flex items-center gap-2 font-semibold text-[#0B1F33]">
                    <CalendarDays size={16} />
                    {selectedTicket.created}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Replies</p>
                  <p className="mt-1 flex items-center gap-2 font-semibold text-[#0B1F33]">
                    <MessageSquare size={16} />
                    {selectedTicket.replies}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold text-[#0B1F33]">
                  Issue Description
                </h3>
                <p className="rounded-xl border border-slate-100 p-4 text-sm leading-6 text-slate-600">
                  {selectedTicket.description}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0B1F33]">
                  Add Internal Reply
                </label>
                <form onSubmit={handleReply}>
                  <textarea
                    rows={3}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write a response or internal note..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#16A6CE]"
                  />
                  <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) =>
                        updateStatus(selectedTicket.id, e.target.value)
                      }
                      className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>

                    <button
                      type="submit"
                      disabled={!reply.trim()}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#153653] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={16} />
                      Add Reply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form
            onSubmit={handleCreateTicket}
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F33]">
                  Create Support Ticket
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add a ticket to the local demo list.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close create ticket modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["subject", "Subject"],
                ["organization", "Organization"],
                ["requester", "Requester Name"],
                ["email", "Requester Email"],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-600">
                    {label}
                  </span>
                  <input
                    required
                    type={key === "email" ? "email" : "text"}
                    value={newTicket[key]}
                    onChange={(e) =>
                      setNewTicket((previous) => ({
                        ...previous,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#16A6CE]"
                  />
                </label>
              ))}

              <label>
                <span className="mb-1.5 block text-sm font-medium text-slate-600">
                  Category
                </span>
                <select
                  value={newTicket.category}
                  onChange={(e) =>
                    setNewTicket((previous) => ({
                      ...previous,
                      category: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#16A6CE]"
                >
                  <option>Technical</option>
                  <option>Billing</option>
                  <option>Account</option>
                  <option>Performance</option>
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-sm font-medium text-slate-600">
                  Priority
                </span>
                <select
                  value={newTicket.priority}
                  onChange={(e) =>
                    setNewTicket((previous) => ({
                      ...previous,
                      priority: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#16A6CE]"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-600">
                Description
              </span>
              <textarea
                required
                rows={4}
                value={newTicket.description}
                onChange={(e) =>
                  setNewTicket((previous) => ({
                    ...previous,
                    description: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#16A6CE]"
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#0B1F33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153653]"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Super_org_support_ticket;
