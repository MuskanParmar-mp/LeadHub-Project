
import React, { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  CalendarDays,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  RefreshCw,
  X,
} from "lucide-react";

function Super_org_subcripation() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      organization: "Tech Solutions",
      email: "admin@techsolutions.com",
      plan: "Business",
      billing: "Yearly",
      amount: 29990,
      startDate: "2026-01-15",
      renewalDate: "2027-01-15",
      paymentStatus: "Paid",
      status: "Active",
    },
    {
      id: 2,
      organization: "Digital World",
      email: "admin@digitalworld.com",
      plan: "Starter",
      billing: "Monthly",
      amount: 499,
      startDate: "2026-09-20",
      renewalDate: "2026-10-20",
      paymentStatus: "Pending",
      status: "Active",
    },
    {
      id: 3,
      organization: "Smart Enterprises",
      email: "admin@smartenterprises.com",
      plan: "Growth",
      billing: "Yearly",
      amount: 14990,
      startDate: "2026-03-10",
      renewalDate: "2027-03-10",
      paymentStatus: "Paid",
      status: "Active",
    },
    {
      id: 4,
      organization: "NextGen Services",
      email: "admin@nextgen.com",
      plan: "Starter",
      billing: "Monthly",
      amount: 499,
      startDate: "2026-08-01",
      renewalDate: "2026-09-01",
      paymentStatus: "Failed",
      status: "Expired",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [billingFilter, setBillingFilter] = useState("All");
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const matchesSearch =
        subscription.organization.toLowerCase().includes(search.toLowerCase()) ||
        subscription.email.toLowerCase().includes(search.toLowerCase()) ||
        subscription.plan.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || subscription.status === statusFilter;

      const matchesBilling =
        billingFilter === "All" || subscription.billing === billingFilter;

      return matchesSearch && matchesStatus && matchesBilling;
    });
  }, [subscriptions, search, statusFilter, billingFilter]);

  const activeCount = subscriptions.filter(
    (item) => item.status === "Active"
  ).length;

  const expiredCount = subscriptions.filter(
    (item) => item.status === "Expired"
  ).length;

  const pendingCount = subscriptions.filter(
    (item) => item.paymentStatus === "Pending"
  ).length;

  const totalRevenue = subscriptions
    .filter((item) => item.paymentStatus === "Paid")
    .reduce((total, item) => {
      return total + item.amount;
    }, 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusStyle = (status) => {
    const styles = {
      Active: "bg-emerald-50 text-emerald-700",
      Expired: "bg-red-50 text-red-700",
      Suspended: "bg-orange-50 text-orange-700",
      Paid: "bg-emerald-50 text-emerald-700",
      Pending: "bg-amber-50 text-amber-700",
      Failed: "bg-red-50 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  const updateSubscription = (id, updates) => {
    setSubscriptions((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );

    setSelectedSubscription((previous) =>
      previous?.id === id ? { ...previous, ...updates } : previous
    );
  };

  const renewSubscription = (subscription) => {
    const newRenewalDate = new Date(
      `${subscription.renewalDate}T00:00:00`
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newRenewalDate < today) {
      newRenewalDate.setTime(today.getTime());
    }

    if (subscription.billing === "Yearly") {
      newRenewalDate.setFullYear(newRenewalDate.getFullYear() + 1);
    } else {
      newRenewalDate.setMonth(newRenewalDate.getMonth() + 1);
    }

    const formattedDate = [
      newRenewalDate.getFullYear(),
      String(newRenewalDate.getMonth() + 1).padStart(2, "0"),
      String(newRenewalDate.getDate()).padStart(2, "0"),
    ].join("-");

    updateSubscription(subscription.id, {
      renewalDate: formattedDate,
      status: "Active",
      paymentStatus: "Paid",
    });
  };

  const stats = [
    {
      title: "Total Subscriptions",
      value: subscriptions.length,
      icon: CreditCard,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Active Subscriptions",
      value: activeCount,
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pending Payments",
      value: pendingCount,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Paid Amount",
      value: formatCurrency(totalRevenue),
      icon: CreditCard,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-[#16a6ce]">
            SUPER ADMIN / BILLING
          </p>
          <h1 className="text-2xl font-bold text-[#0b1f33] sm:text-3xl">
            Subscription Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage organization plans, renewals and payment status.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
          <CalendarDays size={18} className="text-[#16a6ce]" />
          <span>{new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#0b1f33]">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconBg}`}>
                  <Icon size={23} className={stat.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expiry notice */}
      <div className="mb-7 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle
          size={21}
          className="mt-0.5 shrink-0 text-amber-600"
        />
        <div>
          <h3 className="font-semibold text-amber-900">
            Subscription monitoring
          </h3>
          <p className="mt-1 text-sm text-amber-800">
            Review pending payments and upcoming renewals regularly to avoid
            service interruptions.
          </p>
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="text-lg font-bold text-[#0b1f33]">
            Organization Subscriptions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage subscription details for every organization.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search organization, email, plan..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#16a6ce] focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
            >
              <option value="All">All Subscription Statuses</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select
              value={billingFilter}
              onChange={(e) => setBillingFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16a6ce]"
            >
              <option value="All">All Billing Cycles</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-semibold">Organization</th>
                <th className="px-5 py-4 font-semibold">Plan</th>
                <th className="px-5 py-4 font-semibold">Billing</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Renewal Date</th>
                <th className="px-5 py-4 font-semibold">Payment</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSubscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e7f7fc] text-[#1389ad]">
                        <Building2 size={19} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0b1f33]">
                          {subscription.organization}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {subscription.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                      {subscription.plan}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {subscription.billing}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[#0b1f33]">
                    {formatCurrency(subscription.amount)}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {formatDate(subscription.renewalDate)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                        subscription.paymentStatus
                      )}`}
                    >
                      {subscription.paymentStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                        subscription.status
                      )}`}
                    >
                      {subscription.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedSubscription(subscription)}
                        title="View details"
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-[#1389ad]"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => renewSubscription(subscription)}
                        title="Mark paid and renew"
                        className="rounded-lg border border-gray-200 p-2 text-emerald-600 transition hover:bg-emerald-50"
                      >
                        <RefreshCw size={17} />
                      </button>

                      <button
                        onClick={() =>
                          updateSubscription(subscription.id, {
                            status:
                              subscription.status === "Suspended"
                                ? "Active"
                                : "Suspended",
                          })
                        }
                        title={
                          subscription.status === "Suspended"
                            ? "Activate"
                            : "Suspend"
                        }
                        className={`rounded-lg border border-gray-200 p-2 transition ${
                          subscription.status === "Suspended"
                            ? "text-emerald-600 hover:bg-emerald-50"
                            : "text-orange-600 hover:bg-orange-50"
                        }`}
                      >
                        {subscription.status === "Suspended" ? (
                          <CheckCircle size={17} />
                        ) : (
                          <XCircle size={17} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredSubscriptions.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No subscriptions found. Try changing your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-[#0b1f33]">
            {filteredSubscriptions.length}
          </span>{" "}
          of {subscriptions.length} subscriptions
        </div>
      </div>

      {/* Subscription detail modal */}
      {selectedSubscription && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1f33]/50 p-4"
          onClick={() => setSelectedSubscription(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-[#0b1f33]">
                  Subscription Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedSubscription.organization}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubscription(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              {[
                ["Organization", selectedSubscription.organization],
                ["Admin Email", selectedSubscription.email],
                ["Plan", selectedSubscription.plan],
                ["Billing Cycle", selectedSubscription.billing],
                ["Amount", formatCurrency(selectedSubscription.amount)],
                ["Start Date", formatDate(selectedSubscription.startDate)],
                ["Renewal Date", formatDate(selectedSubscription.renewalDate)],
                ["Payment Status", selectedSubscription.paymentStatus],
                ["Subscription Status", selectedSubscription.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-gray-50 p-3"
                >
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-[#0b1f33]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 p-5">
              <button
                onClick={() => setSelectedSubscription(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                onClick={() => renewSubscription(selectedSubscription)}
                className="rounded-xl bg-[#0b1f33] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153956]"
              >
                Renew Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Super_org_subcripation;
