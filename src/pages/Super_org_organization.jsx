import React, { useEffect, useMemo, useState } from "react";
import API from "../api";
import {
  Search,
  Plus,
  Building2,
  Users,
  CreditCard,
  Eye,
  Ban,
  Filter,
  X,
  CheckCircle2,
  TrendingUp,
  MoreHorizontal,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const PLAN_LIMITS = {
  Starter: 5,
  Growth: 20,
  Business: 50,
};

const PLAN_COLORS = {
  Starter: "#16A6CE",
  Growth: "#8B5CF6",
  Business: "#22C55E",
};

const INITIAL_FORM = {
  name: "",
  email: "",
  plan: "Starter",
  billing: "Monthly",
};

function Super_org_organization() {
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");

  // Convert backend organization records into the format used by this UI.
  const normalizeOrganization = (item) => {
    const backendPlan = String(item.plan || "starter").toLowerCase();
    const planMap = {
      starter: "Starter",
      professional: "Growth",
      growth: "Growth",
      enterprise: "Business",
      business: "Business",
    };
    const plan = planMap[backendPlan] || "Starter";
    const backendStatus = String(item.status || "active").toLowerCase();
    const backendBilling = String(
      item.billing_cycle || item.billing || "monthly"
    ).toLowerCase();

    return {
      ...item,
      id: item.id,
      name: item.name || item.organization_name || "Unnamed organization",
      email: item.admin_email || item.email || "",
      plan,
      users: Number(
        item.users_count ??
          item.user_count ??
          item.employee_count ??
          item.total_users ??
          item.users ??
          1
      ),
      limit: Number(item.user_limit ?? item.limit ?? PLAN_LIMITS[plan]),
      billing: backendBilling === "yearly" ? "Yearly" : "Monthly",
      status:
        backendStatus === "suspended" || backendStatus === "inactive"
          ? "Suspended"
          : "Active",
    };
  };

  const fetchOrganizations = async () => {
    setLoadingOrganizations(true);
    try {
      const response = await API.get("/organizations/");
      const payload = response.data;
      const records = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload?.organizations)
            ? payload.organizations
            : [];
      setOrganizations(records.map(normalizeOrganization));
    } catch (err) {
      console.error("Fetch organizations error:", err.response?.data || err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Organizations load nahi ho paayin. Backend API check karo."
      );
    } finally {
      setLoadingOrganizations(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    // Fetch once when this page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter organizations
  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        org.name.toLowerCase().includes(searchText) ||
        org.email.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || org.status === statusFilter;

      const matchesPlan =
        planFilter === "All" || org.plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [organizations, search, statusFilter, planFilter]);

  // Statistics
  const totalOrganizations = organizations.length;

  const activeOrganizations = organizations.filter(
    (org) => org.status === "Active"
  ).length;

  const suspendedOrganizations = organizations.filter(
    (org) => org.status === "Suspended"
  ).length;

  const totalUsers = organizations.reduce(
    (total, org) => total + org.users,
    0
  );

  const totalUserCapacity = organizations.reduce(
    (total, org) => total + org.limit,
    0
  );

  // Dynamic plan distribution graph
  const planData = ["Starter", "Growth", "Business"]
    .map((plan) => ({
      name: plan,
      value: organizations.filter((org) => org.plan === plan).length,
      color: PLAN_COLORS[plan],
    }))
    .filter((plan) => plan.value > 0);

  // Dynamic organization status graph
  const statusData = [
    {
      name: "Active",
      value: activeOrganizations,
      color: "#22C55E",
    },
    {
      name: "Suspended",
      value: suspendedOrganizations,
      color: "#F97316",
    },
  ];

  // Sample monthly growth data.
  // Replace this with backend API data when available.
  const growthData = [
    { month: "May", organizations: 18 },
    { month: "Jun", organizations: 25 },
    { month: "Jul", organizations: 32 },
    { month: "Aug", organizations: 28 },
    { month: "Sep", organizations: 42 },
    { month: "Oct", organizations: 48 },
  ];

  const stats = [
    {
      title: "Total Organizations",
      value: totalOrganizations,
      description: "All registered organizations",
      icon: Building2,
      iconStyle: "bg-sky-100 text-sky-600",
    },
    {
      title: "Active Organizations",
      value: activeOrganizations,
      description: "Currently active",
      icon: CheckCircle2,
      iconStyle: "bg-green-100 text-green-600",
    },
    {
      title: "Total Users",
      value: totalUsers,
      description: `Capacity: ${totalUserCapacity} users`,
      icon: Users,
      iconStyle: "bg-purple-100 text-purple-600",
    },
    {
      title: "Suspended",
      value: suspendedOrganizations,
      description: "Suspended organizations",
      icon: Ban,
      iconStyle: "bg-orange-100 text-orange-600",
    },
  ];

  // Create organization
  const handleCreateOrganization = async (e) => {
  e.preventDefault();
  setError("");

  const organizationName = form.name.trim();
  const organizationEmail = form.email.trim().toLowerCase();

  if (!organizationName || !organizationEmail) {
    setError("Please enter the organization name and email.");
    return;
  }

  const planMap = {
    Starter: "starter",
    Growth: "professional",
    Business: "enterprise",
  };

  const billingMap = {
    Monthly: "monthly",
    Yearly: "yearly",
  };

  try {
    const response = await API.post("/organizations/", {
      name: organizationName,
      admin_email: organizationEmail,
      plan: planMap[form.plan],
      billing_cycle: billingMap[form.billing],
      status: "active",
    });

    // Refresh list from the database
    await fetchOrganizations();

    setForm(INITIAL_FORM);
    setShowModal(false);
    setSearch("");
    setStatusFilter("All");
    setPlanFilter("All");

    if (response.data.email_sent === false) {
      setError(
        "Organization created, but email was not sent. Check backend email settings."
      );
    }
  } 
  
catch (err) {
  console.error("Create organization error:", err);
  console.error("Response data:", err.response?.data);
  console.error("Status:", err.response?.status);

  const responseData = err.response?.data;

  if (
    err.response?.status === 503 &&
    responseData?.email_sent === false
  ) {
    // Organization create ho chuki hai, sirf email fail hui hai
    try {
      await fetchOrganizations();
    } catch (refreshError) {
      console.error("Organization refresh error:", refreshError);
    }

    setError(
      "Organization created successfully, but the email could not be sent. Please check backend email settings."
    );
    return;
  }

  setError(
    responseData?.error ||
    responseData?.detail ||
    responseData?.message ||
    err.message ||
    "Organization create nahi hui. Backend logs check karo."
  );
}

};

  // Activate / suspend organization
  const toggleStatus = async (id) => {
  const org = organizations.find((item) => item.id === id);
  if (!org) return;

  const newStatus =
    org.status === "Active" ? "suspended" : "active";

  try {
    await API.patch(`organizations/${id}/`, {
      status: newStatus,
    });

    await fetchOrganizations();

    setSelectedOrg((current) =>
      current?.id === id
        ? {
            ...current,
            status: newStatus === "active" ? "Active" : "Suspended",
          }
        : current
    );
  } catch (err) {
    console.error("Update status error:", err.response?.data || err);
    setError(
      err.response?.data?.detail ||
      "Organization status update nahi hua."
    );
  }
};

  const closeModal = () => {
    setShowModal(false);
    setForm(INITIAL_FORM);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 text-[#0B1F33] sm:p-6 lg:p-7">
      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Building2 size={16} />
            <span>Super Admin</span>
            <span>/</span>
            <span className="text-[#16A6CE]">Organizations</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Organization Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage organizations, subscriptions, users and account status.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#16A6CE] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1093B8]"
        >
          <Plus size={19} />
          Create Organization
        </button>
      </div>

      {/* STATISTICS CARDS */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* ANALYTICS GRAPHS */}
      <div className="mb-7">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Organization Analytics</h2>
          <p className="mt-1 text-sm text-slate-500">
            Visual overview of organization growth, plans and account status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* GRAPH 1: ORGANIZATION GROWTH */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">Organization Growth</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Monthly organization trend
                </p>
              </div>

              <div className="rounded-xl bg-sky-50 p-2.5 text-[#16A6CE]">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="organizationGrowth"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#16A6CE"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#16A6CE"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EDF3"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="organizations"
                    name="Organizations"
                    stroke="#16A6CE"
                    strokeWidth={3}
                    fill="url(#organizationGrowth)"
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* GRAPH 2: SUBSCRIPTION DISTRIBUTION */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="font-bold">Subscription Distribution</h3>
              <p className="mt-1 text-xs text-slate-500">
                Organizations by subscription plan
              </p>
            </div>

            <div className="h-[280px] w-full">
              {planData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={58}
                      outerRadius={90}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {planData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value, name) => [
                        `${value} organizations`,
                        name,
                      ]}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #E2E8F0",
                      }}
                    />

                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      wrapperStyle={{ fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No subscription data available.
                </div>
              )}
            </div>
          </div>

          {/* GRAPH 3: ACTIVE VS SUSPENDED */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">Organization Status</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Active and suspended organization comparison
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-2.5 text-green-600">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{
                    top: 10,
                    right: 15,
                    left: -20,
                    bottom: 5,
                  }}
                  barSize={55}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EDF3"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${value} organizations`,
                      "Count",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    name="Organizations"
                    radius={[8, 8, 0, 0]}
                  >
                    {statusData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ORGANIZATION TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-lg font-bold">All Organizations</h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage companies registered on LeadHub CRM.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search organizations..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#16A6CE] sm:w-60"
              />
            </div>

            {/* STATUS FILTER */}
            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-[#16A6CE] sm:w-40"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* PLAN FILTER */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#16A6CE] sm:w-44"
            >
              <option value="All">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Growth">Growth</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Organization</th>
                <th className="px-5 py-4">Plan</th>
                <th className="px-5 py-4">Users / Limit</th>
                <th className="px-5 py-4">Billing</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loadingOrganizations && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    Loading organizations...
                  </td>
                </tr>
              )}
              {!loadingOrganizations && filteredOrganizations.map((org) => {
                const usagePercentage =
                  org.limit > 0
                    ? Math.min((org.users / org.limit) * 100, 100)
                    : 0;

                return (
                  <tr
                    key={org.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#16A6CE]">
                          <Building2 size={20} />
                        </div>

                        <div>
                          <p className="font-semibold">{org.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {org.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                        style={{
                          backgroundColor: `${PLAN_COLORS[org.plan]}15`,
                          color: PLAN_COLORS[org.plan],
                        }}
                      >
                        {org.plan}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold">
                        {org.users} / {org.limit}
                      </p>

                      <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            usagePercentage >= 100
                              ? "bg-orange-500"
                              : "bg-[#16A6CE]"
                          }`}
                          style={{ width: `${usagePercentage}%` }}
                        />
                      </div>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {Math.round(usagePercentage)}% used
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <CreditCard size={16} />
                        {org.billing}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          org.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {org.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          title="View organization"
                          onClick={() => setSelectedOrg(org)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-sky-50 hover:text-sky-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          title={
                            org.status === "Active"
                              ? "Suspend organization"
                              : "Activate organization"
                          }
                          onClick={() => toggleStatus(org.id)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                        >
                          {org.status === "Active" ? (
                            <Ban size={17} />
                          ) : (
                            <CheckCircle2 size={17} />
                          )}
                        </button>

                        <button
                          type="button"
                          title="Organization options"
                          onClick={() => setSelectedOrg(org)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!loadingOrganizations && filteredOrganizations.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No organizations found. Try changing your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
          Showing {filteredOrganizations.length} of{" "}
          {organizations.length} organizations
        </div>
      </div>

      {/* CREATE ORGANIZATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0B1F33]/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-xl font-bold">
                  Create Organization
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add a new company to LeadHub CRM.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleCreateOrganization}
              className="space-y-5 p-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Organization Name
                </label>

                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter company name"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Organization Admin Email
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="admin@company.com"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Use the email address of the organization administrator.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Subscription Plan
                  </label>

                  <select
                    value={form.plan}
                    onChange={(e) =>
                      setForm({ ...form, plan: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#16A6CE]"
                  >
                    <option value="Starter">Starter · 5 users</option>
                    <option value="Growth">Growth · 20 users</option>
                    <option value="Business">Business · 50 users</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Billing Cycle
                  </label>

                  <select
                    value={form.billing}
                    onChange={(e) =>
                      setForm({ ...form, billing: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#16A6CE]"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-sky-50 p-4">
                <div className="flex items-center gap-2 text-sky-800">
                  <Users size={18} />
                  <p className="text-sm font-semibold">
                    Plan user limit: {PLAN_LIMITS[form.plan]} users
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-sky-700">
                  The organization admin is included in the selected plan's
                  user limit. User-limit enforcement must also be implemented
                  in the backend.
                </p>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#16A6CE] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1093B8]"
                >
                  <Plus size={17} />
                  Create Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORGANIZATION DETAILS MODAL */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F33]/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-lg font-bold">
                  Organization Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Account overview
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrg(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-3 text-[#16A6CE]">
                  <Building2 size={24} />
                </div>

                <div>
                  <h3 className="font-bold">{selectedOrg.name}</h3>
                  <p className="text-sm text-slate-500">
                    {selectedOrg.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Subscription Plan
                  </p>
                  <p className="mt-2 font-semibold">
                    {selectedOrg.plan}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Billing Cycle
                  </p>
                  <p className="mt-2 flex items-center gap-2 font-semibold">
                    <CalendarDays size={16} />
                    {selectedOrg.billing}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Users</p>
                  <p className="mt-2 font-semibold">
                    {selectedOrg.users} / {selectedOrg.limit}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Status</p>
                  <p
                    className={`mt-2 font-semibold ${
                      selectedOrg.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedOrg.status}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  toggleStatus(selectedOrg.id);
                  setSelectedOrg((current) => ({
                    ...current,
                    status:
                      current.status === "Active"
                        ? "Suspended"
                        : "Active",
                  }));
                }}
                className="w-full rounded-lg bg-[#0B1F33] px-4 py-3 text-sm font-semibold text-white hover:bg-[#163753]"
              >
                {selectedOrg.status === "Active"
                  ? "Suspend Organization"
                  : "Activate Organization"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Super_org_organization;
