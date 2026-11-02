
import React, { useState } from "react";
import {
  Check,
  X,
  Plus,
  Pencil,
  Trash2,
  CreditCard,
  Users,
  Building2,
  Zap,
  ShieldCheck,
  CalendarDays,
  Star,
} from "lucide-react";

const initialPlans = [
  {
    id: 1,
    name: "Starter",
    description: "For small teams getting started",
    monthlyPrice: 499,
    yearlyPrice: 4990,
    userLimit: 5,
    color: "#16A6CE",
    popular: false,
    status: "Active",
    features: {
      "Lead Management": true,
      "Call Management": true,
      "Follow-up Reminders": true,
      "Reports & Analytics": false,
      "Excel Export": false,
      "Priority Support": false,
    },
  },
  {
    id: 2,
    name: "Growth",
    description: "For growing sales teams",
    monthlyPrice: 1499,
    yearlyPrice: 14990,
    userLimit: 20,
    color: "#8B5CF6",
    popular: true,
    status: "Active",
    features: {
      "Lead Management": true,
      "Call Management": true,
      "Follow-up Reminders": true,
      "Reports & Analytics": true,
      "Excel Export": true,
      "Priority Support": false,
    },
  },
  {
    id: 3,
    name: "Business",
    description: "For larger organizations",
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    userLimit: 50,
    color: "#16A34A",
    popular: false,
    status: "Active",
    features: {
      "Lead Management": true,
      "Call Management": true,
      "Follow-up Reminders": true,
      "Reports & Analytics": true,
      "Excel Export": true,
      "Priority Support": true,
    },
  },
];

const featureNames = [
  "Lead Management",
  "Call Management",
  "Follow-up Reminders",
  "Reports & Analytics",
  "Excel Export",
  "Priority Support",
];

const EMPTY_FORM = {
  name: "",
  description: "",
  monthlyPrice: "",
  yearlyPrice: "",
  userLimit: "",
};

function Super_org_plane_and_price() {
  const [plans, setPlans] = useState(initialPlans);
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [showModal, setShowModal] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const activePlans = plans.filter(
    (plan) => plan.status === "Active"
  ).length;

  const averageMonthlyPrice =
    plans.length > 0
      ? Math.round(
          plans.reduce((total, plan) => total + plan.monthlyPrice, 0) /
            plans.length
        )
      : 0;

  const openCreateModal = () => {
    setEditingPlanId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (plan) => {
    setEditingPlanId(plan.id);
    setForm({
      name: plan.name,
      description: plan.description,
      monthlyPrice: String(plan.monthlyPrice),
      yearlyPrice: String(plan.yearlyPrice),
      userLimit: String(plan.userLimit),
    });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlanId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    setFormError("");

    const name = form.name.trim();

    if (!name) {
      setFormError("Please enter a plan name.");
      return;
    }

    const duplicateName = plans.some(
      (plan) =>
        plan.name.toLowerCase() === name.toLowerCase() &&
        plan.id !== editingPlanId
    );

    if (duplicateName) {
      setFormError("A plan with this name already exists.");
      return;
    }

    const monthlyPrice = Number(form.monthlyPrice);
    const yearlyPrice = Number(form.yearlyPrice);
    const userLimit = Number(form.userLimit);

    if (
      form.monthlyPrice === "" ||
      form.yearlyPrice === "" ||
      form.userLimit === "" ||
      !Number.isFinite(monthlyPrice) ||
      !Number.isFinite(yearlyPrice) ||
      !Number.isInteger(userLimit) ||
      monthlyPrice < 0 ||
      yearlyPrice < 0 ||
      userLimit < 1
    ) {
      setFormError(
        "Enter valid prices and a user limit of at least 1."
      );
      return;
    }

    if (editingPlanId !== null) {
      setPlans((previous) =>
        previous.map((plan) =>
          plan.id === editingPlanId
            ? {
                ...plan,
                name,
                description: form.description.trim(),
                monthlyPrice,
                yearlyPrice,
                userLimit,
              }
            : plan
        )
      );
    } else {
      setPlans((previous) => [
        ...previous,
        {
          id: Date.now(),
          name,
          description: form.description.trim(),
          monthlyPrice,
          yearlyPrice,
          userLimit,
          color: "#16A6CE",
          popular: false,
          status: "Active",
          features: Object.fromEntries(
            featureNames.map((feature) => [feature, false])
          ),
        },
      ]);
    }

    closeModal();
  };

  const togglePlanStatus = (id) => {
    setPlans((previous) =>
      previous.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status:
                plan.status === "Active" ? "Inactive" : "Active",
            }
          : plan
      )
    );
  };

  const deletePlan = (id) => {
    const plan = plans.find((item) => item.id === id);

    if (!plan) return;

    const confirmed = window.confirm(
      `Delete the ${plan.name} plan? This only removes it from this page's current state.`
    );

    if (confirmed) {
      setPlans((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  const currency = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 text-[#0B1F33] sm:p-6 lg:p-7">
      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm text-slate-500">
            Super Admin / Plans & Pricing
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Plans & Pricing
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Configure subscription plans, pricing and user limits.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#16A6CE] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1093B8]"
        >
          <Plus size={19} />
          Create New Plan
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Plans",
            value: plans.length,
            icon: CreditCard,
            style: "bg-sky-100 text-sky-600",
            description: "Configured subscription plans",
          },
          {
            title: "Active Plans",
            value: activePlans,
            icon: ShieldCheck,
            style: "bg-green-100 text-green-600",
            description: "Available for assignment",
          },
          {
            title: "Average Monthly Price",
            value: currency(averageMonthlyPrice),
            icon: Zap,
            style: "bg-purple-100 text-purple-600",
            description: "Across configured plans",
          },
          {
            title: "Billing Options",
            value: "2",
            icon: CalendarDays,
            style: "bg-orange-100 text-orange-600",
            description: "Monthly and yearly",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-3 ${stat.style}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* BILLING CYCLE SWITCH */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold">Subscription Plans</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose a billing cycle to compare plan prices.
          </p>
        </div>

        <div className="inline-flex w-fit rounded-xl border border-slate-200 bg-white p-1">
          {["Monthly", "Yearly"].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                billingCycle === cycle
                  ? "bg-[#0B1F33] text-white shadow-sm"
                  : "text-slate-500 hover:text-[#0B1F33]"
              }`}
            >
              {cycle}
              {cycle === "Yearly" && (
                <span className="ml-2 text-xs text-green-500">
                  Save more
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* PLAN CARDS */}
      {plans.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white px-5 py-16 text-center">
          <CreditCard
            size={38}
            className="mx-auto text-slate-300"
          />
          <h3 className="mt-4 font-bold">No plans created yet</h3>
          <p className="mt-2 text-sm text-slate-500">
            Create a subscription plan to get started.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-5 rounded-lg bg-[#16A6CE] px-5 py-3 text-sm font-semibold text-white"
          >
            Create Your First Plan
          </button>
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const price =
              billingCycle === "Monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                  plan.popular && plan.status === "Active"
                    ? "border-[#16A6CE] ring-1 ring-[#16A6CE]"
                    : "border-slate-100"
                } ${
                  plan.status === "Inactive" ? "opacity-70" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-5 flex items-center gap-1 rounded-full bg-[#16A6CE] px-3 py-1 text-xs font-semibold text-white">
                    <Star size={12} />
                    Popular Plan
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div
                    className="rounded-xl p-3"
                    style={{
                      backgroundColor: `${plan.color}18`,
                      color: plan.color,
                    }}
                  >
                    <Building2 size={23} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      plan.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {plan.status}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{plan.name}</h3>

                <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {currency(price)}
                  </span>
                  <span className="text-sm text-slate-500">
                    / {billingCycle === "Monthly" ? "month" : "year"}
                  </span>
                </div>

                {billingCycle === "Yearly" && (
                  <p className="mt-2 text-xs text-green-600">
                    Equivalent to{" "}
                    {currency(Math.round(plan.yearlyPrice / 12))}/month
                  </p>
                )}

                <div className="my-5 border-t border-slate-100" />

                <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <Users size={19} className="text-[#16A6CE]" />
                  <div>
                    <p className="text-sm font-semibold">
                      Up to {plan.userLimit} users
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Organization admin included
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  {featureNames.map((feature) => {
                    const enabled = Boolean(plan.features?.[feature]);

                    return (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm"
                      >
                        {enabled ? (
                          <Check
                            size={17}
                            className="shrink-0 text-green-600"
                          />
                        ) : (
                          <X
                            size={17}
                            className="shrink-0 text-slate-300"
                          />
                        )}

                        <span
                          className={
                            enabled
                              ? "text-slate-700"
                              : "text-slate-400"
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                  <button
                    onClick={() => openEditModal(plan)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() => togglePlanStatus(plan.id)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      plan.status === "Active"
                        ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {plan.status === "Active" ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Delete Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FEATURE COMPARISON TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold">Plan Feature Comparison</h2>
          <p className="mt-1 text-sm text-slate-500">
            Compare included features across all subscription plans.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Features</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="px-5 py-4 text-center">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-5 py-4 text-sm font-medium">
                  Monthly Price
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-center text-sm font-semibold"
                  >
                    {currency(plan.monthlyPrice)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-5 py-4 text-sm font-medium">
                  Yearly Price
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-center text-sm font-semibold"
                  >
                    {currency(plan.yearlyPrice)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-5 py-4 text-sm font-medium">
                  Maximum Users
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-center text-sm"
                  >
                    {plan.userLimit}
                  </td>
                ))}
              </tr>

              {featureNames.map((feature) => (
                <tr key={feature}>
                  <td className="px-5 py-4 text-sm font-medium">
                    {feature}
                  </td>

                  {plans.map((plan) => (
                    <td key={plan.id} className="px-5 py-4">
                      <div className="flex justify-center">
                        {plan.features?.[feature] ? (
                          <Check
                            size={19}
                            className="text-green-600"
                          />
                        ) : (
                          <X
                            size={19}
                            className="text-slate-300"
                          />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PLAN MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0B1F33]/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-xl font-bold">
                  {editingPlanId !== null ? "Edit Plan" : "Create New Plan"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Configure pricing and user limits.
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

            <form onSubmit={handleSavePlan} className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Plan Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g. Enterprise"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>
                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe this subscription plan"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Monthly Price (₹)
                  </label>
                  <input
                    required
                    min="0"
                    type="number"
                    value={form.monthlyPrice}
                    onChange={(e) =>
                      setForm({ ...form, monthlyPrice: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Yearly Price (₹)
                  </label>
                  <input
                    required
                    min="0"
                    type="number"
                    value={form.yearlyPrice}
                    onChange={(e) =>
                      setForm({ ...form, yearlyPrice: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Maximum Users
                </label>
                <input
                  required
                  min="1"
                  step="1"
                  type="number"
                  value={form.userLimit}
                  onChange={(e) =>
                    setForm({ ...form, userLimit: e.target.value })
                  }
                  placeholder="e.g. 100"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16A6CE]"
                />
                <p className="mt-1 text-xs text-slate-400">
                  This limit should include the organization admin.
                </p>
              </div>

              {formError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {formError}
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
                  className="rounded-lg bg-[#16A6CE] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1093B8]"
                >
                  {editingPlanId !== null ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Super_org_plane_and_price;
