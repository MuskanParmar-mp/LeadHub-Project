
import React, { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Building2,
  ShieldCheck,
  Eye,
  Pencil,
  X,
  CheckCircle,
  Clock,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const CHART_COLORS = ["#16a6ce", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function Super_org_user() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@techsolutions.com",
      phone: "+91 9876543210",
      organization: "Tech Solutions",
      role: "Admin",
      status: "Active",
      joined: "2026-01-15",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@techsolutions.com",
      phone: "+91 9876543211",
      organization: "Tech Solutions",
      role: "Employee",
      status: "Active",
      joined: "2026-02-10",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@digitalworld.com",
      phone: "+91 9876543212",
      organization: "Digital World",
      role: "Admin",
      status: "Active",
      joined: "2026-03-20",
    },
    {
      id: 4,
      name: "Neha Singh",
      email: "neha@digitalworld.com",
      phone: "+91 9876543213",
      organization: "Digital World",
      role: "Employee",
      status: "Inactive",
      joined: "2026-04-05",
    },
    {
      id: 5,
      name: "Vikas Jain",
      email: "vikas@smartenterprises.com",
      phone: "+91 9876543214",
      organization: "Smart Enterprises",
      role: "Manager",
      status: "Active",
      joined: "2026-05-12",
    },
    {
      id: 6,
      name: "Anjali Gupta",
      email: "anjali@smartenterprises.com",
      phone: "+91 9876543215",
      organization: "Smart Enterprises",
      role: "Employee",
      status: "Suspended",
      joined: "2026-06-18",
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [organizationFilter, setOrganizationFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "Employee",
  });

  const organizations = useMemo(
    () => [...new Set(users.map((user) => user.organization))],
    [users]
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();

      return (
        (user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.organization.toLowerCase().includes(query)) &&
        (roleFilter === "All" || user.role === roleFilter) &&
        (statusFilter === "All" || user.status === statusFilter) &&
        (organizationFilter === "All" ||
          user.organization === organizationFilter)
      );
    });
  }, [users, search, roleFilter, statusFilter, organizationFilter]);

  const activeCount = users.filter((u) => u.status === "Active").length;
  const inactiveCount = users.filter((u) => u.status === "Inactive").length;
  const suspendedCount = users.filter((u) => u.status === "Suspended").length;
  const adminCount = users.filter((u) => u.role === "Admin").length;

  // Graph 1: Organization-wise user distribution
  const organizationChartData = organizations.map((organization) => {
    const organizationUsers = users.filter(
      (user) => user.organization === organization
    );

    return {
      organization:
        organization.length > 17
          ? `${organization.slice(0, 17)}...`
          : organization,
      total: organizationUsers.length,
      active: organizationUsers.filter((u) => u.status === "Active").length,
      inactive: organizationUsers.filter((u) => u.status === "Inactive").length,
      suspended: organizationUsers.filter((u) => u.status === "Suspended").length,
    };
  });

  // Graph 2: Status distribution
  const statusChartData = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
    { name: "Suspended", value: suspendedCount },
  ];

  // Graph 3: Registrations grouped by joining month
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const registrationChartData = monthLabels.map((month, index) => {
    const count = users.filter(
      (user) => new Date(`${user.joined}T00:00:00`).getMonth() === index &&
        new Date(`${user.joined}T00:00:00`).getFullYear() === 2026
    ).length;

    return { month, users: count };
  });

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const statusStyle = (status) => ({
    Active: "bg-emerald-50 text-emerald-700",
    Inactive: "bg-gray-100 text-gray-600",
    Suspended: "bg-red-50 text-red-700",
  }[status] || "bg-gray-100 text-gray-600");

  const roleStyle = (role) => ({
    Admin: "bg-violet-50 text-violet-700",
    Manager: "bg-blue-50 text-blue-700",
    Employee: "bg-cyan-50 text-cyan-700",
  }[role] || "bg-gray-100 text-gray-600");

  const toggleUserStatus = (user) => {
    const nextStatus = user.status === "Active" ? "Inactive" : "Active";

    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id ? { ...item, status: nextStatus } : item
      )
    );

    setSelectedUser((previous) =>
      previous?.id === user.id
        ? { ...previous, status: nextStatus }
        : previous
    );
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      organization: user.organization,
      role: user.role,
    });
  };

  const saveUser = (event) => {
    event.preventDefault();

    const normalizedEmail = editForm.email.trim().toLowerCase();

    if (
      users.some(
        (user) =>
          user.id !== editingUser.id &&
          user.email.toLowerCase() === normalizedEmail
      )
    ) {
      window.alert("This email address is already assigned to another user.");
      return;
    }

    const updatedUser = {
      ...editingUser,
      ...editForm,
      name: editForm.name.trim(),
      email: normalizedEmail,
      phone: editForm.phone.trim(),
    };

    setUsers((previous) =>
      previous.map((user) =>
        user.id === editingUser.id ? updatedUser : user
      )
    );

    setSelectedUser((previous) =>
      previous?.id === editingUser.id ? updatedUser : previous
    );

    setEditingUser(null);
  };

  const statCards = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Active Users",
      value: activeCount,
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Inactive Users",
      value: inactiveCount,
      icon: UserX,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Admin Users",
      value: adminCount,
      icon: ShieldCheck,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-semibold text-[#16a6ce]">
            SUPER ADMIN / USERS
          </p>
          <h1 className="text-2xl font-bold text-[#0b1f33] sm:text-3xl">
            User Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage users, roles, organizations and account status.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
          <Clock size={18} className="text-[#16a6ce]" />
          <span>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#0b1f33]">
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

      {/* Analytics Graphs */}
      <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Organization bar chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-bold text-[#0b1f33]">
              Organization-wise Users
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Total and active users for each organization
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={organizationChartData}
                margin={{ top: 8, right: 8, left: -18, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="organization"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total Users" fill="#16a6ce" radius={[5, 5, 0, 0]} />
                <Bar dataKey="active" name="Active Users" fill="#10b981" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status donut chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-bold text-[#0b1f33]">
              User Status Distribution
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Breakdown of active, inactive and suspended accounts
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="47%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CHART_COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Registration line chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-5">
            <h2 className="font-bold text-[#0b1f33]">
              Monthly User Registrations
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Users grouped by their joining month in 2026
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={registrationChartData}
                margin={{ top: 8, right: 15, left: -18, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="New Registrations"
                  stroke="#16a6ce"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#16a6ce" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Organization Overview */}
      <div className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="font-bold text-[#0b1f33]">Organization Overview</h2>
            <p className="text-sm text-gray-500">
              Select an organization to filter the user table
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {organizations.map((organization) => {
            const organizationUsers = users.filter(
              (user) => user.organization === organization
            );
            const activeOrganizationUsers = organizationUsers.filter(
              (user) => user.status === "Active"
            ).length;

            return (
              <button
                key={organization}
                onClick={() =>
                  setOrganizationFilter(
                    organizationFilter === organization ? "All" : organization
                  )
                }
                className={`rounded-xl border p-4 text-left transition ${
                  organizationFilter === organization
                    ? "border-[#16a6ce] bg-cyan-50"
                    : "border-gray-100 hover:border-cyan-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[#0b1f33]">{organization}</p>
                  <Building2 size={18} className="shrink-0 text-[#16a6ce]" />
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  {organizationUsers.length} users · {activeOrganizationUsers} active
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="text-lg font-bold text-[#0b1f33]">All Users</h2>
          <p className="mt-1 text-sm text-gray-500">
            Search and filter users across all organizations.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative sm:col-span-2 xl:col-span-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#16a6ce] focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <select
              value={organizationFilter}
              onChange={(event) => setOrganizationFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
            >
              <option value="All">All Organizations</option>
              {organizations.map((organization) => (
                <option key={organization} value={organization}>
                  {organization}
                </option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Organization</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f7fc] font-bold text-[#1389ad]">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0b1f33]">{user.name}</p>
                        <p className="mt-1 text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {user.organization}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${roleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {formatDate(user.joined)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(user.status)}`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        title="View user"
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => openEditModal(user)}
                        title="Edit user"
                        className="rounded-lg border border-gray-200 p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => toggleUserStatus(user)}
                        title={user.status === "Active" ? "Deactivate user" : "Activate user"}
                        className={`rounded-lg border border-gray-200 p-2 ${
                          user.status === "Active"
                            ? "text-orange-600 hover:bg-orange-50"
                            : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {user.status === "Active" ? (
                          <UserX size={17} />
                        ) : (
                          <CheckCircle size={17} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-sm text-gray-500">
                    No users found. Try changing your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-[#0b1f33]">
            {filteredUsers.length}
          </span>{" "}
          of {users.length} users
          <span className="ml-3 text-red-600">{suspendedCount} suspended</span>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1f33]/50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-[#0b1f33]">User Details</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Account information and access status
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 p-5">
              {[
                ["Full Name", selectedUser.name],
                ["Email", selectedUser.email],
                ["Phone", selectedUser.phone],
                ["Organization", selectedUser.organization],
                ["Role", selectedUser.role],
                ["Account Status", selectedUser.status],
                ["Joined Date", formatDate(selectedUser.joined)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 rounded-xl bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="break-all text-sm font-semibold text-[#0b1f33]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const user = selectedUser;
                  setSelectedUser(null);
                  openEditModal(user);
                }}
                className="rounded-xl bg-[#0b1f33] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#153956]"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b1f33]/50 p-4"
          onClick={() => setEditingUser(null)}
        >
          <form
            onSubmit={saveUser}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-[#0b1f33]">Edit User</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update user details and assigned role.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {[
                ["name", "Full Name", "Enter full name"],
                ["email", "Email Address", "Enter email address"],
                ["phone", "Phone Number", "Enter phone number"],
              ].map(([field, label, placeholder]) => (
                <div key={field}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    required
                    type={field === "email" ? "email" : "text"}
                    value={editForm[field]}
                    onChange={(event) =>
                      setEditForm((previous) => ({
                        ...previous,
                        [field]: event.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce] focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              ))}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Organization
                </label>
                <select
                  value={editForm.organization}
                  onChange={(event) =>
                    setEditForm((previous) => ({
                      ...previous,
                      organization: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
                >
                  {organizations.map((organization) => (
                    <option key={organization} value={organization}>
                      {organization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={editForm.role}
                  onChange={(event) =>
                    setEditForm((previous) => ({
                      ...previous,
                      role: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#0b1f33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153956]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Super_org_user;
