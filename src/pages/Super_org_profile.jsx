
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  Bell,
  Activity,
  CalendarDays,
  Clock,
  Camera,
  Save,
  CheckCircle2,
  Monitor,
  LogOut,
} from "lucide-react";

function Super_org_profile() {
  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "admin@leadhub.com",
    phone: "+91 98765 43210",
    role: "Super Administrator",
    location: "Bhopal, Madhya Pradesh",
    bio: "Managing organizations, subscriptions and platform operations.",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [activeTab, setActiveTab] = useState("Profile");
  const [notifications, setNotifications] = useState({
    email: true,
    security: true,
    reports: false,
  });

  const activityData = [
    { day: "Mon", activity: 12 },
    { day: "Tue", activity: 18 },
    { day: "Wed", activity: 14 },
    { day: "Thu", activity: 24 },
    { day: "Fri", activity: 19 },
    { day: "Sat", activity: 10 },
    { day: "Sun", activity: 16 },
  ];

  const stats = [
    { label: "Organizations", value: "49", color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Total Users", value: "2,650", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Active Sessions", value: "12", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editForm);
    setEditOpen(false);
  };

  const tabs = ["Profile", "Security", "Notifications"];

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-7">
        <p className="mb-2 text-sm font-medium text-[#16A6CE]">
          Super Admin / Profile
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your account information, security and preferences.
        </p>
      </div>

      {/* Profile Banner */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-[#0B1F33] shadow-sm">
        <div className="h-28 bg-gradient-to-r from-[#0B1F33] via-[#124663] to-[#16A6CE]" />

        <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#0B1F33] bg-white text-3xl font-bold text-[#16A6CE] shadow-lg">
              {profile.name.trim().charAt(0).toUpperCase() || "A"}
            </div>

            <div className="pb-1">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <p className="mt-1 text-sm text-slate-300">{profile.role}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  <CheckCircle2 size={13} />
                  Active Account
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">
                  <ShieldCheck size={13} />
                  Admin Access
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setEditForm(profile);
              setEditOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#16A6CE] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1193b7]"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className={`rounded-xl p-3 ${item.bg}`}>
              <Activity size={22} className={item.color} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{item.label}</p>
              <h3 className="mt-1 text-2xl font-bold text-[#0B1F33]">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-[#0B1F33] text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-[#0B1F33]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "Profile" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#0B1F33]">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your account details
                </p>
              </div>
              <UserRound size={21} className="text-[#16A6CE]" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoItem icon={UserRound} label="Full Name" value={profile.name} />
              <InfoItem icon={Mail} label="Email Address" value={profile.email} />
              <InfoItem icon={Phone} label="Phone Number" value={profile.phone} />
              <InfoItem icon={ShieldCheck} label="Account Role" value={profile.role} />
              <InfoItem icon={MapPin} label="Location" value={profile.location} />
              <InfoItem icon={CalendarDays} label="Member Since" value="September 2026" />
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="mb-2 text-sm font-semibold text-[#0B1F33]">
                About
              </p>
              <p className="text-sm leading-6 text-slate-500">{profile.bio}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="font-bold text-[#0B1F33]">Account Activity</h3>
            <p className="mt-1 text-sm text-slate-500">
              Activity summary for this week
            </p>

            <div className="mt-5 h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="profileActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A6CE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16A6CE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF4" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="activity"
                    name="Activities"
                    stroke="#16A6CE"
                    strokeWidth={2.5}
                    fill="url(#profileActivity)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-cyan-50 p-3">
              <div>
                <p className="text-xs text-slate-500">Total this week</p>
                <p className="mt-1 text-lg font-bold text-[#0B1F33]">113</p>
              </div>
              <TrendingUpIcon />
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "Security" && (
        <div className="space-y-4">
          <SettingsRow
            icon={LockKeyhole}
            title="Password & Authentication"
            description="Update your password and protect your administrator account."
            action="Change Password"
            onClick={() =>
              alert("Connect this action to your Django password-change API.")
            }
          />
          <SettingsRow
            icon={ShieldCheck}
            title="Two-Factor Authentication"
            description="Add an extra verification step when signing in."
            action="Configure"
            onClick={() =>
              alert("Connect this action to your backend 2FA implementation.")
            }
          />
          <SettingsRow
            icon={Monitor}
            title="Active Sessions"
            description="Review devices and sessions signed in to your account."
            action="View Sessions"
            onClick={() =>
              alert("Connect this action to your Django session-management API.")
            }
          />
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "Notifications" && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h3 className="font-bold text-[#0B1F33]">
              Notification Preferences
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Choose which notifications you want to receive.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                key: "email",
                title: "Email Notifications",
                desc: "Receive important platform updates by email.",
              },
              {
                key: "security",
                title: "Security Alerts",
                desc: "Get notified about logins and security-related events.",
              },
              {
                key: "reports",
                title: "Report Summaries",
                desc: "Receive scheduled platform performance reports.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-2.5">
                    <Bell size={19} className="text-[#16A6CE]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0B1F33]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>

                <button
                  role="switch"
                  aria-checked={notifications[item.key]}
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    notifications[item.key] ? "bg-[#16A6CE]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      notifications[item.key] ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            These preferences are currently stored in local component state.
            Connect a backend endpoint to persist them between sessions.
          </p>
        </div>
      )}

      {/* Recent Activity */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2.5">
            <Clock size={20} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-[#0B1F33]">Recent Account Activity</h3>
            <p className="mt-1 text-sm text-slate-500">
              Sample activity records
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Administrator profile accessed",
              time: "Today · 10:30 AM",
              detail: "Web dashboard",
            },
            {
              title: "Organization reports reviewed",
              time: "Today · 09:45 AM",
              detail: "Reports & Analytics",
            },
            {
              title: "Subscription plans reviewed",
              time: "Yesterday · 04:20 PM",
              detail: "Plans & Pricing",
            },
          ].map((item, index) => (
            <div key={item.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#16A6CE]" />
                {index !== 2 && <span className="mt-1 h-full w-px bg-slate-200" />}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-1 pb-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-semibold text-[#0B1F33]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                </div>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form
            onSubmit={handleSave}
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F33]">
                  Edit Profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update your personal information.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["name", "Full Name"],
                ["email", "Email Address"],
                ["phone", "Phone Number"],
                ["location", "Location"],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-600">
                    {label}
                  </span>
                  <input
                    required
                    type={key === "email" ? "email" : "text"}
                    value={editForm[key]}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#16A6CE] focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-600">
                About
              </span>
              <textarea
                rows={3}
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#16A6CE] focus:ring-2 focus:ring-cyan-100"
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#0B1F33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153653]"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-slate-50 p-2">
        <Icon size={17} className="text-[#16A6CE]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-[#0B1F33]">
          {value}
        </p>
      </div>
    </div>
  );
}

function SettingsRow({ icon: Icon, title, description, action, onClick }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-cyan-50 p-3">
          <Icon size={21} className="text-[#16A6CE]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#0B1F33]">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="w-fit rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#0B1F33] transition hover:border-[#16A6CE] hover:text-[#16A6CE]"
      >
        {action}
      </button>
    </div>
  );
}

function TrendingUpIcon() {
  return <Activity size={21} className="text-[#16A6CE]" />;
}

export default Super_org_profile;
