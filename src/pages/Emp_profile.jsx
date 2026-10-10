
import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  ShieldCheck,
  Camera,
  Pencil,
  Save,
  X,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock3,
  Building2,
  BadgeCheck,
} from "lucide-react";

function Emp_profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [photo, setPhoto] = useState("");

  const [profile, setProfile] = useState({
    fullName: "Sumit Rajak",
    email: "sumit@example.com",
    phone: "",
    location: "Bhopal, Madhya Pradesh",
    department: "Sales",
    designation: "Sales Executive",
    employeeId: "EMP-001",
    joiningDate: "2026-09-20",
    bio: "Sales executive focused on customer relationships, lead conversion, and consistent calling performance.",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  const updateField = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleProfileSave = (event) => {
    event.preventDefault();

    setIsEditing(false);
    setSuccessMessage("Profile updated successfully.");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSuccessMessage("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSuccessMessage("Image size must be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    const errors = {};

    if (!passwords.current) {
      errors.current = "Enter your current password.";
    }

    if (passwords.newPassword.length < 8) {
      errors.newPassword =
        "New password must contain at least 8 characters.";
    }

    if (passwords.newPassword !== passwords.confirm) {
      errors.confirm = "Passwords do not match.";
    }

    if (
      passwords.current &&
      passwords.current === passwords.newPassword
    ) {
      errors.newPassword =
        "New password must differ from your current password.";
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setShowPasswordForm(false);
    setSuccessMessage(
      "Form validated. Connect the password API to securely update your password."
    );

    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500";

  const fieldLabel =
    "mb-2 block text-sm font-medium text-slate-600";

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-blue-600">
            Employee Workspace
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#0B1F33] sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <p>{successMessage}</p>
          </div>
        )}

        {/* Profile Hero */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#0B1F33] via-[#123C68] to-[#1264DB] sm:h-40" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-sm">
                    {photo ? (
                      <img
                        src={photo}
                        alt="Employee profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  <label
                    title="Upload profile photo"
                    className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-2 border-white bg-[#1264DB] text-white shadow-sm transition hover:bg-blue-700"
                  >
                    <Camera size={17} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="pb-1">
                  <h2 className="flex flex-wrap items-center gap-2 text-xl font-bold text-[#0B1F33] sm:text-2xl">
                    {profile.fullName}
                    <BadgeCheck
                      size={20}
                      className="text-blue-600"
                    />
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {profile.designation}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active Employee
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {profile.employeeId}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center justify-center gap-2 self-start rounded-xl bg-[#1264DB] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:self-auto"
              >
                {isEditing ? <X size={17} /> : <Pencil size={17} />}
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Department</p>
              <h3 className="mt-1 font-bold text-[#0B1F33]">
                {profile.department}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Account Status</p>
              <h3 className="mt-1 font-bold text-[#0B1F33]">
                Active
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <CalendarDays size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Joining Date</p>
              <h3 className="mt-1 font-bold text-[#0B1F33]">
                {profile.joiningDate}
              </h3>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

          {/* Personal Information */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 xl:col-span-2">
            <div className="mb-6 border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your basic contact and professional details.
              </p>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className={fieldLabel}>Full Name</label>
                  <div className="relative">
                    <UserRound
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      required
                      value={profile.fullName}
                      disabled={!isEditing}
                      onChange={(e) =>
                        updateField("fullName", e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Email Address</label>
                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      required
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Phone Number</label>
                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Location</label>
                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={profile.location}
                      disabled={!isEditing}
                      onChange={(e) =>
                        updateField("location", e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Department</label>
                  <div className="relative">
                    <Building2
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={profile.department}
                      disabled={!isEditing}
                      onChange={(e) =>
                        updateField("department", e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Designation</label>
                  <div className="relative">
                    <BriefcaseBusiness
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={profile.designation}
                      disabled={!isEditing}
                      onChange={(e) =>
                        updateField("designation", e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className={fieldLabel}>About Me</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    disabled={!isEditing}
                    onChange={(e) =>
                      updateField("bio", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Write a short introduction..."
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-[#1264DB] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Save size={17} />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <LockKeyhole size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-[#0B1F33]">
                    Security
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage your account password.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  Password protected
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Use a strong password and never share it with anyone.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowPasswordForm(!showPasswordForm);
                  setPasswordErrors({});
                }}
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </button>

              {showPasswordForm && (
                <form
                  onSubmit={handlePasswordChange}
                  className="mt-5 space-y-4"
                >
                  {[
                    {
                      key: "current",
                      label: "Current Password",
                    },
                    {
                      key: "newPassword",
                      label: "New Password",
                    },
                    {
                      key: "confirm",
                      label: "Confirm New Password",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className={fieldLabel}>
                        {field.label}
                      </label>

                      <div className="relative">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          value={passwords[field.key]}
                          onChange={(e) => {
                            setPasswords({
                              ...passwords,
                              [field.key]: e.target.value,
                            });
                            setPasswordErrors({
                              ...passwordErrors,
                              [field.key]: "",
                            });
                          }}
                          className={`${inputClass} pr-10`}
                          placeholder={field.label}
                        />

                        {field.key === "current" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>
                        )}
                      </div>

                      {passwordErrors[field.key] && (
                        <p className="mt-1 text-xs text-red-600">
                          {passwordErrors[field.key]}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#1264DB] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </form>
              )}
            </div>

            {/* Employee Information */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-bold text-[#0B1F33]">
                Work Information
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <BadgeCheck size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Employee ID
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {profile.employeeId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Joining Date
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {profile.joiningDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Employment Status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-emerald-700">
                      Active
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                    <Clock3 size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Work Schedule
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      As assigned by manager
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          LeadHub CRM · Employee Profile
        </p>
      </div>
    </div>
  );
}

export default Emp_profile;

