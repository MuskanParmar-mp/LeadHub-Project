import { useState } from "react";
import logo from "./assets/cyblogo.png";

function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    // Django API baad me yahan connect karenge
    setTimeout(() => {
      console.log("Login Data:", formData);
      console.log("Remember Me:", rememberMe);

      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@cybromleadhub.com",
      password: "Demo@123",
    });
  };

  return (
    <div className="min-h-screen flex bg-[#F5F8FC]">

      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <div
        className="
          hidden lg:flex
          lg:w-[55%]
          min-h-screen
          text-white
          px-12 xl:px-20
          py-10
          flex-col
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#172B49]
          via-[#005B91]
          to-[#0077B5]
        "
      >

        {/* Decorative circles */}

        <div
          className="
            absolute
            -top-40
            -right-40
            w-[500px]
            h-[500px]
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-48
            -left-48
            w-[450px]
            h-[450px]
            rounded-full
            border
            border-[#F58220]/20
          "
        />

        {/* Orange glow */}

        <div
          className="
            absolute
            top-1/3
            right-10
            w-40
            h-40
            bg-[#F58220]/10
            rounded-full
            blur-3xl
          "
        />


        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="flex items-center gap-4 relative z-10">

          <div
            className="
              w-14
              h-14
              rounded-xl
              bg-white
              flex
              items-center
              justify-center
              shadow-lg
              overflow-hidden
            "
          >
            <img
              src={logo}
              alt="Cybrom Technology"
              className="w-full h-full object-contain p-1"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Cybrom LeadHub
            </h2>

            <p className="text-xs text-blue-100 mt-1">
              Smart CRM & Calling Platform
            </p>
          </div>

        </div>


        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div className="my-auto max-w-xl relative z-10">

          {/* Welcome badge */}

          <span
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-white/10
              border
              border-white/20
              text-blue-50
              text-s
              font-medium
              mb-4
              mt-6
            "
          >
            Welcome Back
          </span>


          {/* Main Heading */}

          <h1
            className="
              text-4xl
              xl:text-1xl
              font-bold
              leading-[1.12]
              tracking-tight
              mb-6
            "
          >
            Manage Leads.

            <br />

            <span className="text-[#F58220]">
              Connect Better.
            </span>

            <br />

            Convert More.
          </h1>


          {/* Description */}

          <p
            className="
              text-blue-50/80
              text-base
              
              mb-8
            "
          >
            A smart lead management and calling platform designed
            to help teams manage enquiries, streamline follow-ups track performance, and improve conversions.
          </p>


          {/* =====================================================
              FEATURES
          ===================================================== */}

          <div className="space-y-4">


            {/* Feature 1 */}

            <div
              className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                bg-white/[0.08]
                border
                border-white/[0.12]
                hover:bg-white/[0.14]
                hover:border-[#F58220]/40
                hover:translate-x-1
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-lg
                  bg-[#F58220]/15
                  border
                  border-[#F58220]/20
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >
                📊
              </div>

              <div>

                <h3 className="font-semibold text-sm mb-1">
                  Smart Lead Management
                </h3>

                <p className="text-xs text-blue-100/70 leading-5">
                  Organize, assign and track every lead effortlessly.
                </p>

              </div>

            </div>


            {/* Feature 2 */}

            <div
              className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                bg-white/[0.08]
                border
                border-white/[0.12]
                hover:bg-white/[0.14]
                hover:border-[#F58220]/40
                hover:translate-x-1
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-lg
                  bg-[#F58220]/15
                  border
                  border-[#F58220]/20
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >
                📞
              </div>

              <div>

                <h3 className="font-semibold text-sm mb-1">
                  Powerful Calling & Follow-ups
                </h3>

                <p className="text-xs text-blue-100/70 leading-5">
                  Keep every conversation and follow-up organized.
                </p>

              </div>

            </div>


            {/* Feature 3 */}

            <div
              className="
                group
                flex
                items-center
                gap-4
                p-4
                rounded-xl
                bg-white/[0.08]
                border
                border-white/[0.12]
                hover:bg-white/[0.14]
                hover:border-[#F58220]/40
                hover:translate-x-1
                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-lg
                  bg-[#F58220]/15
                  border
                  border-[#F58220]/20
                  flex
                  items-center
                  justify-center
                  text-xl
                "
              >
                📈
              </div>

              <div>

                <h3 className="font-semibold text-sm mb-1">
                  Performance Insights
                </h3>

                <p className="text-xs text-blue-100/70 leading-5">
                  Track calls, conversions and employee performance
                  with real-time insights.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Copyright */}

        <p className="text-xs text-blue-100/50 relative z-10">
          © 2026 Cybrom LeadHub. All rights reserved.
        </p>

      </div>


      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <div
        className="
          w-full
          lg:w-[45%]
          min-h-screen
          flex
          items-center
          justify-center
          px-6
          sm:px-10
          py-10
        "
      >

        <div className="w-full max-w-md">


          {/* Mobile Logo */}

          <div className="flex lg:hidden justify-center mb-6">

            <div
              className="
                w-20
                h-20
                rounded-2xl
                bg-white
                border
                border-slate-200
                flex
                items-center
                justify-center
                shadow-md
                overflow-hidden
              "
            >
              <img
                src={logo}
                alt="Cybrom Technology"
                className="w-full h-full object-contain p-2"
              />
            </div>

          </div>


          {/* =================================================
              LOGIN HEADER
          ================================================= */}

          <div className="text-center mb-8">

            <div
              className="
                mx-auto
                mb-4
                w-12
                h-1
                rounded-full
                bg-[#F58220]
              "
            />

            <h2
              className="
                text-3xl
                font-bold
                text-[#172B49]
                tracking-tight
                mb-2
              "
            >
              Welcome Back!
            </h2>

            <p className="text-sm text-slate-500">
              Login to your Cybrom LeadHub account
            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-semibold
                  text-[#172B49]
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">

               

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    focus:border-[#0077B5]
                    focus:ring-4
                    focus:ring-[#0077B5]/10
                  "
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="
                    text-sm
                    font-semibold
                    text-[#172B49]
                  "
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="
                    text-xs
                    font-medium
                    text-[#0077B5]
                    hover:text-[#F58220]
                    hover:underline
                    transition-colors
                  "
                >
                  Forgot Password?
                </a>

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
                    w-full
                    h-12
                    pl-11
                    pr-12
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    focus:border-[#0077B5]
                    focus:ring-4
                    focus:ring-[#0077B5]/10
                  "
                />


                {/* Show Password */}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-[#0077B5]
                    transition-colors
                  "
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>


            {/* REMEMBER */}

            <div className="flex items-center">

              <label
                className="
                  flex
                  items-center
                  gap-2
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
                    w-4
                    h-4
                    accent-[#0077B5]
                    cursor-pointer
                  "
                />

                <span className="text-sm text-slate-500">
                  Remember me
                </span>

              </label>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-lg
                bg-[#0077B5]
                hover:bg-[#005B91]
                text-white
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-lg
                hover:shadow-[#0077B5]/20
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >

              {loading ? (
                <>
                  <span
                    className="
                      w-4
                      h-4
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


          {/* =================================================
              OR
          ================================================= */}

          <div className="flex items-center gap-3 my-7">

            <div className="flex-1 h-px bg-slate-200" />

            <span className="text-[11px] font-semibold text-slate-400">
              OR
            </span>

            <div className="flex-1 h-px bg-slate-200" />

          </div>


          {/* =================================================
              DEMO BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleDemoLogin}
            className="
              w-full
              h-12
              rounded-lg
              border
              border-[#0077B5]/30
              bg-[#0077B5]/5
              hover:bg-[#0077B5]/10
              hover:border-[#0077B5]
              text-sm
              font-medium
              text-[#172B49]
              transition-all
            "
          >
            Continue with Demo Account
          </button>


          {/* =================================================
              REGISTER
          ================================================= */}

          <p className="text-center text-sm text-slate-500 mt-6">

            Don't have an account?

            <a
              href="/register"
              className="
                ml-1
                text-[#0077B5]
                font-semibold
                hover:text-[#F58220]
                hover:underline
                transition-colors
              "
            >
              Create Account
            </a>

          </p>


          {/* Security */}

          <div className="flex items-center justify-center gap-2 mt-8">

            <span className="text-xs">
              🔒
            </span>

            <span className="text-[11px] text-slate-400">
              Your information is securely protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;