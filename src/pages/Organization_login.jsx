import { useState } from "react";

import axios from "axios";

function Organization() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 

const handleSubmit = async (e) => {
  e.preventDefault();

  const email = formData.email.trim().toLowerCase();
  const password = formData.password;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const response = await axios.post(
  "http://127.0.0.1:8000/api/super-org-login/login/",
  {
    super_org_email: formData.email.trim().toLowerCase(),
    super_org_password: formData.password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

    if (response.data.success) {
      if (rememberMe) {
        localStorage.setItem("superOrgEmail", email);
      } else {
        localStorage.removeItem("superOrgEmail");
      }

      // Super Admin
      if (response.data.role === "super_admin") {
        window.location.href = "/pages/super_org_dashboard";
      }
      // Organization Admin
      else if (response.data.organization_id) {
        window.location.href = "/admin";
      } else {
        alert("Account role or organization details are missing.");
      }
    }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Server error. Please try again.";

    alert(message);

    console.error("Login error:", {
      status: error.response?.status,
      data: error.response?.data,
    });
    console.log("Status:", error.response?.status);
console.log("Backend error:", error.response?.data);
console.log("URL:", error.config?.url);
  }
};


  return (
    <div className="min-h-screen bg-[#F4F7FC] lg:grid lg:grid-cols-[55%_45%]">

      {/* LEFT PANEL */}
      <section className="relative flex min-h-[440px] flex-col overflow-hidden bg-gradient-to-br from-[#193657] via-[#075888] to-[#0077A9] px-6 py-8 text-white sm:px-10 lg:min-h-screen lg:px-14 lg:py-9">

        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-20 -top-28 h-[430px] w-[430px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-36 -left-24 h-[300px] w-[300px] rounded-full border border-orange-400/20" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-md">
            <span className="bg-gradient-to-br from-sky-400 via-orange-400 to-orange-600 bg-clip-text text-4xl font-black text-transparent">
              C
            </span>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Cybrom LeadHub
            </h1>
            <p className="mt-1 text-xs text-blue-100 sm:text-sm">
              Smart CRM & Calling Platform
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="relative z-10 my-auto max-w-xl py-12 lg:py-16">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            Organization Portal
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[38px]">
            Manage Leads.
            <br />
            <span className="text-[#FF852D]">Connect Better.</span>
            <br />
            Convert More.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-blue-100 sm:text-base">
            Manage your organization, empower your team, track leads,
            and streamline your entire sales workflow from one platform.
          </p>

          {/* Features */}
          <div className="mt-7 space-y-3">

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.08] p-3 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-xl">
                📊
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  Smart Lead Management
                </h3>
                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Organize, assign and track every lead effortlessly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.08] p-3 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-xl">
                📞
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  Powerful Calling & Follow-ups
                </h3>
                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Keep every conversation and follow-up organized.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.08] p-3 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-xl">
                🏢
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  Organization Dashboard
                </h3>
                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Monitor your team's performance in one place.
                </p>
              </div>
            </div>

          </div>
        </div>

        <p className="relative z-10 mt-auto text-xs text-blue-100/80">
          © {new Date().getFullYear()} Cybrom LeadHub. All rights reserved.
        </p>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex min-h-[580px] items-center justify-center px-5 py-12 sm:px-10 lg:min-h-screen lg:px-12">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-9 text-center">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#FF852D]" />

            <h2 className="text-3xl font-bold tracking-tight text-[#173553]">
              Welcome Back!
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Login to your Cybrom LeadHub organization account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="org-email"
                className="mb-2 block text-sm font-semibold text-[#173553]"
              >
                Organization Email
              </label>

              <input
                id="org-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@yourorganization.com"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-[#C9D6E8] bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0083BC] focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label
                  htmlFor="org-password"
                  className="text-sm font-semibold text-[#173553]"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert("Please contact your administrator to reset your password.")
                  }
                  className="text-xs font-semibold text-[#0083BC] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="org-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-[#C9D6E8] bg-white px-4 py-3.5 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0083BC] focus:ring-2 focus:ring-sky-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-[#0083BC]"
              />
              Remember me
            </label>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#007FB5] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#006B99] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 active:scale-[0.99]"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DCE4EF]" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-[#DCE4EF]" />
          </div>

          {/* Portal Information */}
          <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-4 text-center">
            <p className="text-sm font-semibold text-[#173553]">
              Organization Access
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Sign in using the credentials provided to your organization
              by the LeadHub Super Admin.
            </p>
          </div>

          <p className="mt-7 text-center text-xs text-slate-400">
            Secure Organization Access · Cybrom LeadHub
          </p>

        </div>
      </section>
    </div>
  );
}

export default Organization;