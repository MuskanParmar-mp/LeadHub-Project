
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/cyblogo.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ADMIN / REAL BACKEND LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const responseText = await response.text();
      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        console.error("Backend did not return JSON:", responseText);
      }

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        alert(
          data.message ||
            data.detail ||
            `Login failed. Status: ${response.status}`
        );
        return;
      }

      if (data.access) {
        localStorage.setItem("accessToken", data.access);
      }

      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }

      const role = String(
        data.role || data.user?.role || "admin"
      )
        .toLowerCase()
        .trim()
        .replace(/[\s-]+/g, "_");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      localStorage.setItem(
        "userEmail",
        data.email || formData.email.trim()
      );

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      if (["employee", "sales", "sales_executive"].includes(role)) {
        navigate("/pages/emp_dashboard");
      } else {
        // Admin / manager / missing role
        navigate("/admin");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(
        "Could not connect to the backend. Please check that Django is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // FILL ADMIN DEMO CREDENTIALS
  const handleDemoLogin = () => {
    setFormData({
      email: "admin@cybromleadhub.com",
      password: "Admin@123",
    });
  };

  // FRONTEND-ONLY EMPLOYEE DEMO
  const handleDemoEmployee = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "employee");
    localStorage.setItem(
      "userEmail",
      "employee@cybromleadhub.com"
    );

    navigate("/pages/emp_dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F8FC]">
      <div className="min-h-screen w-full flex flex-col lg:flex-row">

        {/* LEFT BRANDING */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] min-h-screen text-white px-8 xl:px-16 py-10 flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#172B49] via-[#005B91] to-[#0077B5]">

          <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full border border-[#F58220]/20" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={logo}
                alt="Cybrom Technology"
                className="w-full h-full object-contain p-1.5"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold">Cybrom LeadHub</h2>
              <p className="text-xs text-blue-100/80">
                Smart CRM & Calling Platform
              </p>
            </div>
          </div>

          <div className="my-auto max-w-lg relative z-10 py-8">
            <span className="inline-flex px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-4">
              Welcome Back
            </span>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              Manage Leads.
              <br />
              <span className="text-[#F58220]">
                Connect Better.
              </span>
              <br />
              Convert More.
            </h1>

            <p className="text-blue-50/80 text-sm leading-relaxed mb-6">
              A smart lead management platform to track enquiries,
              streamline follow-ups, and boost performance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.08] border border-white/[0.12]">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-sm">
                    Smart Lead Management
                  </h3>
                  <p className="text-xs text-blue-100/70">
                    Organize, assign and track every lead effortlessly.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.08] border border-white/[0.12]">
                <span className="text-2xl">📞</span>
                <div>
                  <h3 className="font-semibold text-sm">
                    Powerful Calling & Follow-ups
                  </h3>
                  <p className="text-xs text-blue-100/70">
                    Keep every conversation and follow-up organized.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.08] border border-white/[0.12]">
                <span className="text-2xl">📈</span>
                <div>
                  <h3 className="font-semibold text-sm">
                    Performance Insights
                  </h3>
                  <p className="text-xs text-blue-100/70">
                    Track calls, conversions and employee performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-blue-100/50 relative z-10">
            © 2026 Cybrom LeadHub. All rights reserved.
          </p>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="w-full lg:w-1/2 xl:w-[45%] min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 py-8">
          <div className="w-full max-w-md my-auto">

            {/* MOBILE LOGO */}
            <div className="flex lg:hidden flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md p-2 mb-3">
                <img
                  src={logo}
                  alt="Cybrom Technology"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-lg font-bold text-[#172B49]">
                Cybrom LeadHub
              </h1>
              <p className="text-xs text-slate-500">
                Smart CRM & Calling Platform
              </p>
            </div>

            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-3 w-10 h-1 rounded-full bg-[#F58220]" />
              <h2 className="text-3xl font-bold text-[#172B49] mb-1">
                Welcome Back!
              </h2>
              <p className="text-sm text-slate-500">
                Login to your Cybrom LeadHub account
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#172B49] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="admin@cybromleadhub.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 outline-none focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#172B49]"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-medium text-[#0077B5] hover:text-[#F58220] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 outline-none focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#0077B5]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#0077B5]"
                />
                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-lg bg-[#0077B5] hover:bg-[#005B91] text-white text-sm font-semibold flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* DEMO SEPARATOR */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400">
                DEMO ACCOUNTS
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* ADMIN DEMO */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full h-12 rounded-lg border border-[#0077B5]/30 bg-[#0077B5]/5 hover:bg-[#0077B5]/10 text-sm font-medium text-[#172B49] transition-all"
            >
              Fill Demo Admin Account
            </button>

            <div className="mt-3 px-4 py-3 rounded-lg bg-[#F58220]/5 border border-[#F58220]/20 text-center">
              <p className="text-xs text-slate-500">
                Demo Admin Credentials
              </p>
              <p className="text-sm font-semibold text-[#172B49] mt-1">
                admin@cybromleadhub.com
              </p>
              <p className="text-sm font-semibold text-[#172B49]">
                Password: Admin@123
              </p>
            </div>

            {/* EMPLOYEE DEMO */}
            <button
              type="button"
              onClick={handleDemoEmployee}
              className="w-full h-12 mt-4 rounded-lg border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-sm font-semibold text-[#172B49] transition-all"
            >
              Demo Employee Login
            </button>

            <div className="mt-3 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-center">
              <p className="text-xs text-slate-500">
                Demo Employee Credentials
              </p>
              <p className="text-sm font-semibold text-[#172B49] mt-1">
                employee@cybromleadhub.com
              </p>
              <p className="text-sm font-semibold text-[#172B49]">
                Password: Employee@123
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Frontend demo only: these credentials are displayed for demo purposes and are not verified by the backend.
              </p>
            </div>

            {/* REGISTER */}
            <p className="text-center text-sm text-slate-500 mt-6">
              Don't have an account?
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="ml-1 text-[#0077B5] font-semibold hover:text-[#F58220] hover:underline"
              >
                Create Account
              </button>
            </p>

            {/* SECURITY */}
            <div className="flex items-center justify-center gap-1.5 mt-8 text-slate-400">
              <span className="text-xs">
                🔒 Your session is protected
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
