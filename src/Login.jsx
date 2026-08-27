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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    // Demo Admin Login
    setTimeout(() => {
      if (
        formData.email === "admin@cybromleadhub.com" &&
        formData.password === "Admin@123"
      ) {
        // Save login information
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", formData.email);

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        setLoading(false);

        // Dashboard par redirect
        navigate("/admin");
      } else {
        setLoading(false);
        alert("Invalid email or password");
      }
    }, 1000);
  };

  // DEMO LOGIN
 const handleDemoLogin = () => {
  setLoading(true);

  setTimeout(() => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("userEmail", "admin@cybromleadhub.com");

    setLoading(false);

    navigate("/admin");
  }, 500);
};

  return (
    <div className="min-h-screen w-full bg-[#F5F8FC] overflow-y-auto">

      <div className="min-h-screen w-full flex flex-col lg:flex-row">

        {/* =====================================================
            LEFT / BRANDING SECTION
            ===================================================== */}

        <div
          className="
            hidden lg:flex
            lg:w-[50%] xl:w-[55%]
            min-h-screen
            text-white
            px-8 xl:px-16 py-10
            flex-col justify-between
            relative
            overflow-hidden
            bg-gradient-to-br from-[#172B49] via-[#005B91] to-[#0077B5]
            shrink-0
          "
        >

          {/* Decorative Elements */}

          <div className="absolute -top-40 -right-40 w-[400px] xl:w-[500px] h-[400px] xl:h-[500px] rounded-full border border-white/10 pointer-events-none" />

          <div className="absolute -bottom-40 -left-40 w-[350px] xl:w-[450px] h-[350px] xl:h-[450px] rounded-full border border-[#F58220]/20 pointer-events-none" />

          <div className="absolute top-1/3 right-10 w-32 xl:w-40 h-32 xl:h-40 bg-[#F58220]/10 rounded-full blur-3xl pointer-events-none" />


          {/* BRAND HEADER */}

          <div className="relative z-10 flex items-center gap-3">

            <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden shrink-0">

              <img
                src={logo}
                alt="Cybrom Technology"
                className="w-full h-full object-contain p-1.5"
              />

            </div>

            <div>

              <h2 className="text-lg xl:text-xl font-bold tracking-tight">
                Cybrom LeadHub
              </h2>

              <p className="text-[11px] xl:text-xs text-blue-100/80">
                Smart CRM & Calling Platform
              </p>

            </div>

          </div>


          {/* HERO CONTENT */}

          <div className="my-auto max-w-lg relative z-10 py-6">

            <span
              className="
                inline-flex items-center
                px-3.5 py-1.5
                rounded-full
                bg-white/10
                border border-white/20
                text-blue-50
                text-xs xl:text-sm
                font-medium
                mb-4
              "
            >
              Welcome Back
            </span>


            <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-4">

              Manage Leads. <br />

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


            {/* FEATURES */}

            <div className="space-y-3">

              {/* Feature 1 */}

              <div
                className="
                  flex items-center gap-3
                  p-3 rounded-xl
                  bg-white/[0.08]
                  border border-white/[0.12]
                  hover:bg-white/[0.14]
                  transition-all
                "
              >

                <div
                  className="
                    w-10 h-10 shrink-0
                    rounded-lg
                    bg-[#F58220]/15
                    border border-[#F58220]/20
                    flex items-center justify-center
                    text-lg
                  "
                >
                  📊
                </div>

                <div>

                  <h3 className="font-semibold text-sm">
                    Smart Lead Management
                  </h3>

                  <p className="text-xs text-blue-100/70">
                    Organize, assign and track every lead effortlessly.
                  </p>

                </div>

              </div>


              {/* Feature 2 */}

              <div
                className="
                  flex items-center gap-3
                  p-3 rounded-xl
                  bg-white/[0.08]
                  border border-white/[0.12]
                  hover:bg-white/[0.14]
                  transition-all
                "
              >

                <div
                  className="
                    w-10 h-10 shrink-0
                    rounded-lg
                    bg-[#F58220]/15
                    border border-[#F58220]/20
                    flex items-center justify-center
                    text-lg
                  "
                >
                  📞
                </div>

                <div>

                  <h3 className="font-semibold text-sm">
                    Powerful Calling & Follow-ups
                  </h3>

                  <p className="text-xs text-blue-100/70">
                    Keep every conversation and follow-up organized.
                  </p>

                </div>

              </div>


              {/* Feature 3 */}

              <div
                className="
                  flex items-center gap-3
                  p-3 rounded-xl
                  bg-white/[0.08]
                  border border-white/[0.12]
                  hover:bg-white/[0.14]
                  transition-all
                "
              >

                <div
                  className="
                    w-10 h-10 shrink-0
                    rounded-lg
                    bg-[#F58220]/15
                    border border-[#F58220]/20
                    flex items-center justify-center
                    text-lg
                  "
                >
                  📈
                </div>

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


          {/* FOOTER */}

          <p className="text-xs text-blue-100/50 relative z-10">
            © 2026 Cybrom LeadHub. All rights reserved.
          </p>

        </div>


        {/* =====================================================
            RIGHT / LOGIN FORM
            ===================================================== */}

        <div
          className="
            w-full lg:w-[50%] xl:w-[45%]
            min-h-screen
            flex items-center justify-center
            px-4 sm:px-8 md:px-12 lg:px-10 xl:px-16
            py-8 sm:py-12
          "
        >

          <div className="w-full max-w-sm sm:max-w-md my-auto">


            {/* MOBILE LOGO */}

            <div className="flex lg:hidden flex-col items-center justify-center mb-6">

              <div
                className="
                  w-14 h-14 sm:w-16 sm:h-16
                  rounded-2xl
                  bg-white
                  border border-slate-200/80
                  flex items-center justify-center
                  shadow-md
                  p-2
                  mb-3
                "
              >

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

            <div className="text-center mb-6 sm:mb-8">

              <div
                className="
                  mx-auto mb-2 sm:mb-3
                  w-10 h-1
                  rounded-full
                  bg-[#F58220]
                "
              />

              <h2
                className="
                  text-2xl sm:text-3xl
                  font-bold
                  text-[#172B49]
                  tracking-tight
                  mb-1
                "
              >
                Welcome Back!
              </h2>

              <p className="text-xs sm:text-sm text-slate-500">
                Login to your Cybrom LeadHub account
              </p>

            </div>


            {/* LOGIN FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    text-xs sm:text-sm
                    font-semibold
                    text-[#172B49]
                    mb-1.5
                  "
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
                  className="
                    w-full h-11 sm:h-12
                    px-3.5 sm:px-4
                    rounded-lg
                    border border-slate-300
                    bg-white
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    focus:border-[#0077B5]
                    focus:ring-2
                    focus:ring-[#0077B5]/20
                  "
                />

              </div>


              {/* PASSWORD */}

              <div>

                <div className="flex items-center justify-between mb-1.5">

                  <label
                    htmlFor="password"
                    className="
                      text-xs sm:text-sm
                      font-semibold
                      text-[#172B49]
                    "
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="
                      text-xs
                      font-medium
                      text-[#0077B5]
                      hover:text-[#F58220]
                      hover:underline
                    "
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
                    className="
                      w-full h-11 sm:h-12
                      px-3.5 sm:px-4
                      pr-12
                      rounded-lg
                      border border-slate-300
                      bg-white
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:border-[#0077B5]
                      focus:ring-2
                      focus:ring-[#0077B5]/20
                    "
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-3.5
                      top-1/2
                      -translate-y-1/2
                      p-1
                      text-slate-400
                      hover:text-[#0077B5]
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? "🙈" : "👁"}

                  </button>

                </div>

              </div>


              {/* REMEMBER ME */}

              <div className="flex items-center justify-between">

                <label
                  className="
                    flex items-center
                    gap-2.5
                    cursor-pointer
                    select-none
                  "
                >

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="
                      w-4 h-4
                      rounded
                      border-slate-300
                      accent-[#0077B5]
                      cursor-pointer
                    "
                  />

                  <span className="text-xs sm:text-sm text-slate-600">
                    Remember me
                  </span>

                </label>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full h-11 sm:h-12
                  rounded-lg
                  bg-[#0077B5]
                  hover:bg-[#005B91]
                  active:bg-[#004b77]
                  text-white
                  text-sm
                  font-semibold
                  flex items-center
                  justify-center
                  gap-2
                  transition-all
                  shadow-sm
                  hover:shadow-md
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        w-4 h-4
                        border-2
                        border-white/40
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />

                    Signing in...
                  </>
                ) : (
                  "Login"
                )}

              </button>

            </form>


            {/* OR */}

            <div className="flex items-center gap-3 my-5 sm:my-6">

              <div className="flex-1 h-px bg-slate-200" />

              <span
                className="
                  text-[11px]
                  font-semibold
                  text-slate-400
                  uppercase
                  tracking-wider
                "
              >
                OR
              </span>

              <div className="flex-1 h-px bg-slate-200" />

            </div>


            {/* DEMO ACCOUNT */}

            <button
              type="button"
              onClick={handleDemoLogin}
              className="
                w-full h-11 sm:h-12
                rounded-lg
                border border-[#0077B5]/30
                bg-[#0077B5]/5
                hover:bg-[#0077B5]/10
                hover:border-[#0077B5]
                text-xs sm:text-sm
                font-medium
                text-[#172B49]
                transition-all
              "
            >
              Fill Demo Account
            </button>


            {/* DEMO DETAILS */}

            <div
              className="
                mt-3
                px-4 py-3
                rounded-lg
                bg-[#F58220]/5
                border border-[#F58220]/20
                text-center
              "
            >

              <p className="text-[11px] text-slate-500">
                Demo Admin Credentials
              </p>

              <p className="text-xs font-semibold text-[#172B49] mt-1">
                admin@cybromleadhub.com
              </p>

              <p className="text-xs font-semibold text-[#172B49]">
                Password: Admin@123
              </p>

            </div>


            {/* REGISTER */}

            <p className="text-center text-xs sm:text-sm text-slate-500 mt-5 sm:mt-6">

              Don't have an account?

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="
                  ml-1
                  text-[#0077B5]
                  font-semibold
                  hover:text-[#F58220]
                  hover:underline
                "
              >
                Create Account
              </button>

            </p>


            {/* SECURITY */}

            <div
              className="
                flex items-center
                justify-center
                gap-1.5
                mt-6 sm:mt-8
                text-slate-400
              "
            >

              <span className="text-xs">
                🔒
              </span>

              <span className="text-[11px]">
                Your information is securely protected
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;