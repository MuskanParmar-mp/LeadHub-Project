
import { useMemo, useState } from "react";
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
} from "recharts";
import {
  ShieldCheck,
  Shield,
  Users,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  LockKeyhole,
  Check,
  Building2,
  Eye,
  Settings,
  UserPlus,
  FileBarChart,
  CreditCard,
  Headset,
  AlertTriangle,
} from "lucide-react";

const defaultRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full platform-level access",
    scope: "Platform",
    users: 1,
    color: "bg-violet-100 text-violet-700",
    permissions: {
      dashboard: true,
      organizations: true,
      users: true,
      subscriptions: true,
      reports: true,
      billing: true,
      support: true,
      settings: true,
      manageRoles: true,
    },
    system: true,
  },
  {
    id: 2,
    name: "Organization Admin",
    description: "Manages a single organization",
    scope: "Organization",
    users: 8,
    color: "bg-cyan-100 text-cyan-700",
    permissions: {
      dashboard: true,
      organizations: false,
      users: true,
      subscriptions: true,
      reports: true,
      billing: false,
      support: true,
      settings: true,
      manageRoles: false,
    },
    system: true,
  },
  {
    id: 3,
    name: "Sales Executive",
    description: "Manages assigned leads and follow-ups",
    scope: "Organization",
    users: 24,
    color: "bg-emerald-100 text-emerald-700",
    permissions: {
      dashboard: true,
      organizations: false,
      users: false,
      subscriptions: false,
      reports: true,
      billing: false,
      support: false,
      settings: false,
      manageRoles: false,
    },
    system: true,
  },
  {
    id: 4,
    name: "Support Agent",
    description: "Handles customer support tickets",
    scope: "Organization",
    users: 6,
    color: "bg-orange-100 text-orange-700",
    permissions: {
      dashboard: true,
      organizations: false,
      users: false,
      subscriptions: false,
      reports: false,
      billing: false,
      support: true,
      settings: false,
      manageRoles: false,
    },
    system: false,
  },
];

const permissionItems = [
  { key: "dashboard", label: "Dashboard", icon: Eye },
  { key: "organizations", label: "Organizations", icon: Building2 },
  { key: "users", label: "User Management", icon: Users },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "reports", label: "Reports & Analytics", icon: FileBarChart },
  { key: "billing", label: "Billing & Payments", icon: CreditCard },
  { key: "support", label: "Support Tickets", icon: Headset },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "manageRoles", label: "Manage Roles", icon: ShieldCheck },
];

const roleColors = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-violet-100 text-violet-700",
];

function Super_org_role_and_permission() {
  const [roles, setRoles] = useState(defaultRoles);
  const [search, setSearch] = useState("");
  const [scopeFilter, setScopeFilter] = useState("All");
  const [selectedRoleId, setSelectedRoleId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    scope: "Organization",
    permissions: Object.fromEntries(
      permissionItems.map((item) => [item.key, false])
    ),
  });

  const filteredRoles = useMemo(() => {
    const term = search.trim().toLowerCase();

    return roles.filter((role) => {
      const matchesSearch =
        role.name.toLowerCase().includes(term) ||
        role.description.toLowerCase().includes(term);

      const matchesScope =
        scopeFilter === "All" || role.scope === scopeFilter;

      return matchesSearch && matchesScope;
    });
  }, [roles, search, scopeFilter]);

  const selectedRole =
    roles.find((role) => role.id === selectedRoleId) || null;

  const totalUsers = roles.reduce((sum, role) => sum + role.users, 0);

  const permissionCount = (role) =>
    permissionItems.filter((item) => role.permissions[item.key]).length;

  const stats = [
    {
      label: "Total Roles",
      value: roles.length,
      icon: ShieldCheck,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Assigned Users",
      value: totalUsers,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Platform Roles",
      value: roles.filter((role) => role.scope === "Platform").length,
      icon: Shield,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Custom Roles",
      value: roles.filter((role) => !role.system).length,
      icon: Settings,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const roleChart = roles.map((role) => ({
    name: role.name,
    users: role.users,
    permissions: permissionCount(role),
  }));

  const scopeChart = [
    {
      name: "Platform",
      value: roles.filter((role) => role.scope === "Platform").length,
      color: "#8B5CF6",
    },
    {
      name: "Organization",
      value: roles.filter((role) => role.scope === "Organization").length,
      color: "#16A6CE",
    },
  ];

  const openCreateModal = () => {
    setEditingRole(null);
    setForm({
      name: "",
      description: "",
      scope: "Organization",
      permissions: Object.fromEntries(
        permissionItems.map((item) => [item.key, false])
      ),
    });
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setForm({
      name: role.name,
      description: role.description,
      scope: role.scope,
      permissions: { ...role.permissions },
    });
    setShowModal(true);
  };

  const saveRole = (e) => {
    e.preventDefault();

    if (editingRole) {
      setRoles((previous) =>
        previous.map((role) =>
          role.id === editingRole.id
            ? {
                ...role,
                name: form.name.trim(),
                description: form.description.trim(),
                scope: role.system ? role.scope : form.scope,
                permissions: { ...form.permissions },
              }
            : role
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        name: form.name.trim(),
        description: form.description.trim(),
        scope: form.scope,
        users: 0,
        color: roleColors[roles.length % roleColors.length],
        permissions: { ...form.permissions },
        system: false,
      };

      setRoles((previous) => [...previous, newRole]);
      setSelectedRoleId(newRole.id);
    }

    setShowModal(false);
  };

  const deleteRole = (role) => {
    if (role.system) {
      alert("System roles cannot be deleted.");
      return;
    }

    if (role.users > 0) {
      alert("Reassign this role's users before deleting it.");
      return;
    }

    if (!window.confirm(`Delete the role "${role.name}"?`)) return;

    setRoles((previous) =>
      previous.filter((item) => item.id !== role.id)
    );

    if (selectedRoleId === role.id) {
      setSelectedRoleId(roles.find((item) => item.id !== role.id)?.id ?? null);
    }
  };

  const togglePermission = (key) => {
    if (!selectedRole || selectedRole.name === "Super Admin") {
      alert("Super Admin permissions cannot be changed here.");
      return;
    }

    setRoles((previous) =>
      previous.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [key]: !role.permissions[key],
              },
            }
          : role
      )
    );
  };

  const toggleAllPermissions = (enabled) => {
    if (!selectedRole || selectedRole.name === "Super Admin") {
      alert("Super Admin permissions cannot be changed here.");
      return;
    }

    setRoles((previous) =>
      previous.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              permissions: Object.fromEntries(
                permissionItems.map((item) => [item.key, enabled])
              ),
            }
          : role
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-[#16A6CE]">
            Super Admin / Access Control
          </p>
          <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
            Roles & Permissions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage platform roles and their access permissions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#153653]"
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* Security notice */}
      <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={20} />
        <div>
          <p className="text-sm font-semibold text-amber-900">
            Permission security
          </p>
          <p className="mt-1 text-sm leading-5 text-amber-800">
            These controls currently update local UI state. Enforce every
            permission in Django APIs as well; hiding a frontend menu is not
            sufficient access control.
          </p>
        </div>
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

      {/* Graphs */}
      <div className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">
            Users by Role
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sample assignment counts for each role
          </p>

          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleChart} margin={{ bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-12}
                  textAnchor="end"
                  height={55}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="users"
                  name="Assigned Users"
                  fill="#16A6CE"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">
            Role Scope Distribution
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Platform-wide versus organization-level roles
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scopeChart}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={88}
                  paddingAngle={4}
                  label
                >
                  {scopeChart.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-5">
            {scopeChart.map((item) => (
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
      </div>

      {/* Role List */}
      <div className="mb-7 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="font-bold text-[#0B1F33]">Available Roles</h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a role to inspect and manage its permissions.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#16A6CE]"
              />
            </div>

            <select
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
            >
              <option>All</option>
              <option>Platform</option>
              <option>Organization</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`rounded-xl border p-4 text-left transition ${
                selectedRoleId === role.id
                  ? "border-[#16A6CE] bg-cyan-50/50 ring-1 ring-[#16A6CE]"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-2">
                <span className={`rounded-lg p-2 ${role.color}`}>
                  <ShieldCheck size={20} />
                </span>
                {role.system && (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                    SYSTEM
                  </span>
                )}
              </div>

              <h3 className="font-bold text-[#0B1F33]">{role.name}</h3>
              <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                {role.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={14} />
                  {role.users} users
                </span>
                <span className="text-xs font-semibold text-[#16A6CE]">
                  {permissionCount(role)}/{permissionItems.length} access
                </span>
              </div>
            </button>
          ))}

          {filteredRoles.length === 0 && (
            <div className="col-span-full py-10 text-center text-sm text-slate-500">
              No roles match your search.
            </div>
          )}
        </div>
      </div>

      {/* Permission Matrix */}
      {selectedRole && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-xs font-medium text-[#16A6CE]">
                PERMISSION MATRIX
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#0B1F33]">
                {selectedRole.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedRole.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => openEditModal(selectedRole)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-[#0B1F33] hover:border-[#16A6CE]"
              >
                <Pencil size={15} />
                Edit Role
              </button>

              <button
                onClick={() => deleteRole(selectedRole)}
                disabled={selectedRole.system || selectedRole.users > 0}
                title={
                  selectedRole.system
                    ? "System roles cannot be deleted"
                    : selectedRole.users > 0
                    ? "Reassign users before deleting"
                    : "Delete role"
                }
                className="flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <LockKeyhole size={17} />
              <span>
                {permissionCount(selectedRole)} of {permissionItems.length} permissions enabled
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleAllPermissions(true)}
                disabled={selectedRole.name === "Super Admin"}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40"
              >
                Enable All
              </button>
              <button
                onClick={() => toggleAllPermissions(false)}
                disabled={selectedRole.name === "Super Admin"}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40"
              >
                Disable All
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {permissionItems.map((item) => {
              const Icon = item.icon;
              const enabled = selectedRole.permissions[item.key];

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0B1F33]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {enabled ? "Access enabled" : "Access restricted"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    disabled={selectedRole.name === "Super Admin"}
                    onClick={() => togglePermission(item.key)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      enabled ? "bg-[#16A6CE]" : "bg-slate-300"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span
                      className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-all ${
                        enabled ? "left-[22px]" : "left-0.5"
                      }`}
                    >
                      {enabled && (
                        <Check size={12} className="text-[#16A6CE]" />
                      )}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 p-4 text-xs leading-5 text-slate-500">
            Demo mode: permission changes are held in React state only and are
            not persisted to the server.
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form
            onSubmit={saveRole}
            className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F33]">
                  {editingRole ? "Edit Role" : "Create New Role"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Configure the role and its permissions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close role modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">
                  Role Name
                </span>
                <input
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Sales Manager"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#16A6CE]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">
                  Description
                </span>
                <textarea
                  required
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe what this role is allowed to do..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#16A6CE]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-600">
                  Access Scope
                </span>
                <select
                  value={form.scope}
                  disabled={Boolean(editingRole?.system)}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      scope: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#16A6CE] disabled:bg-slate-100"
                >
                  <option>Organization</option>
                  <option>Platform</option>
                </select>
                <p className="mt-1 text-xs text-slate-400">
                  Platform scope can grant cross-organization access; restrict
                  it to trusted platform roles.
                </p>
              </label>

              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#0B1F33]">
                    Permissions
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((previous) => ({
                        ...previous,
                        permissions: Object.fromEntries(
                          permissionItems.map((item) => [
                            item.key,
                            true,
                          ])
                        ),
                      }))
                    }
                    className="text-xs font-semibold text-[#16A6CE]"
                  >
                    Select All
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {permissionItems.map((item) => (
                    <label
                      key={item.key}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(form.permissions[item.key])}
                        onChange={(e) =>
                          setForm((previous) => ({
                            ...previous,
                            permissions: {
                              ...previous.permissions,
                              [item.key]: e.target.checked,
                            },
                          }))
                        }
                        className="h-4 w-4 accent-[#16A6CE]"
                      />
                      <span className="text-sm text-slate-700">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-5 sm:px-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#0B1F33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153653]"
              >
                {editingRole ? "Save Changes" : "Create Role"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Super_org_role_and_permission;
