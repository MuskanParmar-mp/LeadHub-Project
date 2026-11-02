
import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  Pencil,
  Save,
  X,
  ArrowLeft,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "",
    phone: "",
    role: "Administrator",
    department: "Administration",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();
    setEditing(false);
    setSaved(true);
  }

  function handleCancel() {
    setEditing(false);
    setSaved(false);
  }

  const initial = profile.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-[#16A3D3]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-2xl font-bold text-[#0B1F33] sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your administrator account and personal details.
        </p>
      </div>

      {/* Profile Banner */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-[#0B1F33] via-[#125078] to-[#16A3D3] sm:h-40" />

        <div className="px-5 pb-7 sm:px-8">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#16A3D3] text-4xl font-bold text-white shadow-sm">
              {initial}
            </div>

            {!editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(true);
                  setSaved(false);
                }}
                className="flex items-center gap-2 rounded-lg bg-[#0B1F33] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16A3D3]"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-[#0B1F33]">
                {profile.name || "Admin"}
              </h2>

              <BadgeCheck size={19} className="text-[#16A3D3]" />
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {profile.role}
            </p>
          </div>

          {saved && (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              Profile changes saved for this session.
            </div>
          )}

          {/* Account Summary */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
              <div className="rounded-lg bg-sky-50 p-3 text-[#16A3D3]">
                <ShieldCheck size={21} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Account Role</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
              <div className="rounded-lg bg-sky-50 p-3 text-[#16A3D3]">
                <UserRound size={21} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Department</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {profile.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 sm:col-span-2 lg:col-span-1">
              <div className="rounded-lg bg-sky-50 p-3 text-[#16A3D3]">
                <CalendarDays size={21} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Account Type</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Administrator Account
                </p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="mt-9">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F33]">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your basic account information.
                </p>
              </div>

              {editing && (
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  Edit Mode
                </span>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <UserRound size={16} />
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#16A3D3] focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="Enter full name"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail size={16} />
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#16A3D3] focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="Enter email address"
                />
              </label>

              {/* Phone */}
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Phone size={16} />
                  Phone Number
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#16A3D3] focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="Enter phone number"
                />
              </label>

              {/* Role */}
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <ShieldCheck size={16} />
                  Role
                </span>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  disabled
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                />
              </label>
            </div>

            {editing && (
              <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-[#0B1F33] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16A3D3]"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}
          </form>

          <p className="mt-6 text-xs text-slate-400">
            Demo mode: changes are held in React state and will reset
            when the page reloads. Database saving can be added later.
          </p>
        </div>
      </div>
    </div>
  );
}
