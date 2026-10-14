import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SalesDashboard = () => {
  const navigate = useNavigate();

  // =========================
  // Dashboard Data
  // =========================

  const stats = [
    {
      title: "Total Leads",
      value: "462",
      subtitle: "Assigned to you",
      icon: "👥",
    },
    {
      title: "Today's Calls",
      value: "28",
      subtitle: "8 calls remaining",
      icon: "📞",
    },
    {
      title: "Interested Leads",
      value: "20",
      subtitle: "+4 from yesterday",
      icon: "⭐",
    },
    {
      title: "Follow-ups",
      value: "12",
      subtitle: "Due today",
      icon: "📅",
    },
  ];

  const todaysCalls = [
    {
      name: "Rahul Sharma",
      phone: "9876543210",
      course: "Full Stack Development",
      status: "Interested",
      time: "10:30 AM",
    },
    {
      name: "Priya Singh",
      phone: "9123456780",
      course: "Data Science",
      status: "Call Back",
      time: "11:30 AM",
    },
    {
      name: "Aman Verma",
      phone: "9988776655",
      course: "AI & ML",
      status: "New Lead",
      time: "01:00 PM",
    },
    {
      name: "Neha Gupta",
      phone: "9090909090",
      course: "Full Stack Development",
      status: "Interested",
      time: "03:30 PM",
    },
  ];

  const followUps = [
    {
      name: "Anjali Sharma",
      course: "Full Stack",
      date: "Today",
      time: "04:00 PM",
    },
    {
      name: "Rohit Jain",
      course: "Data Science",
      date: "Today",
      time: "05:00 PM",
    },
    {
      name: "Simran Khan",
      course: "AI & ML",
      date: "03 Oct",
      time: "11:00 AM",
    },
  ];

  const notifications = [
    "New lead assigned to you",
    "Follow-up reminder for Rahul Sharma",
    "Daily call target updated",
    "New enquiry received",
  ];

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("rememberMe");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#172B49] to-[#0D426A] text-white flex flex-col z-50">

        {/* LOGO */}

        <div className="h-20 px-6 flex items-center gap-3 border-b border-white/10">

          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md">
            <div className="text-2xl font-bold text-[#0077B5]">
              C
            </div>
          </div>

          <div>
            <h1 className="text-lg font-bold">
              LeadHub
            </h1>

            <p className="text-[10px] text-blue-200 tracking-widest">
              CRM PLATFORM
            </p>
          </div>

        </div>


        {/* MENU TITLE */}

        <div className="px-6 pt-7 pb-3">
          <p className="text-[11px] font-semibold tracking-[2px] text-blue-200">
            SALES MENU
          </p>
        </div>


        {/* MENU */}

        <nav className="px-3 space-y-1 flex-1 overflow-y-auto">

          {/* Dashboard */}

          <Link
            to="/salesdashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#20A8E0] text-white shadow-md"
          >
            <span className="text-lg">▣</span>

            <span className="text-sm font-medium">
              Dashboard
            </span>
          </Link>


          {/* Leads */}

          <Link
            to="/sales/leads"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 transition"
          >
            <span className="text-lg">👥</span>

            <span className="text-sm">
              My Leads
            </span>
          </Link>


          {/* Calls */}

          <Link
            to="/sales/calls"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 transition"
          >
            <span className="text-lg">📞</span>

            <span className="text-sm">
              Calls
            </span>
          </Link>


          {/* Follow Ups */}

          <Link
            to="/sales/followups"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 transition"
          >
            <span className="text-lg">📅</span>

            <span className="text-sm">
              Follow-ups
            </span>
          </Link>


          {/* Tasks */}

          <Link
            to="/sales/tasks"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 transition"
          >
            <span className="text-lg">✓</span>

            <span className="text-sm">
              Tasks
            </span>
          </Link>


          {/* Reports */}

          <Link
            to="/sales/reports"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 transition"
          >
            <span className="text-lg">▥</span>

            <span className="text-sm">
              Reports
            </span>
          </Link>


          {/* Divider */}

          <div className="my-4 border-t border-white/10" />


          {/* Settings */}

          <Link
            to="/sales/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-white/10 transition"
          >
            <span className="text-lg">⚙</span>

            <span className="text-sm">
              Settings
            </span>
          </Link>

        </nav>


        {/* USER / LOGOUT */}

        <div className="border-t border-white/10 p-4">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full bg-[#F58220] flex items-center justify-center font-bold">
              S
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold truncate">
                Sales Executive
              </p>

              <p className="text-[11px] text-blue-200 truncate">
                sales@cybromleadhub.com
              </p>

            </div>

          </div>


          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-orange-300 hover:bg-white/10 transition"
          >
            <span>↪</span>

            <span className="text-sm font-medium">
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="ml-64 w-[calc(100%-16rem)] min-h-screen">


        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">

          <div>

            <p className="text-sm text-gray-500">
              Welcome back,
            </p>

            <h2 className="text-xl font-bold text-[#172B49]">
              Sales Executive
            </h2>

          </div>


          <div className="flex items-center gap-6">

            {/* Notification */}

            <button className="relative text-xl">
              🔔

              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F58220] rounded-full border-2 border-white" />
            </button>


            {/* User */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-bold">
                S
              </div>

              <div className="hidden md:block">

                <p className="text-sm font-semibold text-gray-800">
                  Sales Executive
                </p>

                <p className="text-xs text-gray-500">
                  Sales Team
                </p>

              </div>

              <span className="text-gray-400">
                ▾
              </span>

            </div>

          </div>

        </header>


        {/* =================================================
            DASHBOARD CONTENT
        ================================================= */}

        <div className="p-6 md:p-8">


          {/* PAGE TITLE */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

            <div>

              <h1 className="text-3xl font-bold text-[#172B49]">
                Sales Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your leads, calls and daily performance.
              </p>

            </div>


            <div className="flex gap-3">

              <Link
                to="/sales/leads"
                className="bg-[#0077B5] hover:bg-[#005B91] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm"
              >
                + Add Lead
              </Link>

              <Link
                to="/sales/calls"
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium"
              >
                📞 Make Call
              </Link>

            </div>

          </div>


          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold text-[#172B49] mt-2">
                      {item.value}
                    </h2>

                    <p className="text-xs text-gray-500 mt-2">
                      {item.subtitle}
                    </p>

                  </div>


                  <div className="w-12 h-12 rounded-xl bg-[#EAF6FC] flex items-center justify-center text-xl">
                    {item.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-7">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-[#172B49]">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500">
                Quickly access your daily sales activities.
              </p>

            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">

              <Link
                to="/sales/leads"
                className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition"
              >
                <div className="text-2xl mb-2">
                  👥
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Leads
                </p>
              </Link>


              <Link
                to="/sales/calls"
                className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition"
              >
                <div className="text-2xl mb-2">
                  📞
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Calls
                </p>
              </Link>


              <Link
                to="/sales/followups"
                className="p-4 bg-yellow-50 rounded-xl text-center hover:bg-yellow-100 transition"
              >
                <div className="text-2xl mb-2">
                  📅
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Follow-ups
                </p>
              </Link>


              <Link
                to="/sales/tasks"
                className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition"
              >
                <div className="text-2xl mb-2">
                  ✅
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Tasks
                </p>
              </Link>


              <Link
                to="/sales/reports"
                className="p-4 bg-pink-50 rounded-xl text-center hover:bg-pink-100 transition"
              >
                <div className="text-2xl mb-2">
                  📊
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Reports
                </p>
              </Link>


              <Link
                to="/sales/settings"
                className="p-4 bg-gray-100 rounded-xl text-center hover:bg-gray-200 transition"
              >
                <div className="text-2xl mb-2">
                  ⚙️
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Settings
                </p>
              </Link>

            </div>

          </div>


          {/* =================================================
              CALLS + LEAD STATUS
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-7">


            {/* TODAY'S CALLS */}

            <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="p-5 border-b flex justify-between items-center">

                <div>

                  <h2 className="text-lg font-bold text-[#172B49]">
                    Today's Calls
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your scheduled calls for today
                  </p>

                </div>

                <Link
                  to="/sales/calls"
                  className="text-[#0077B5] text-sm font-semibold"
                >
                  View All →
                </Link>

              </div>


              <div className="overflow-x-auto">

                <table className="w-full text-sm">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="text-left p-4 text-gray-500 font-semibold">
                        Lead
                      </th>

                      <th className="text-left p-4 text-gray-500 font-semibold">
                        Course
                      </th>

                      <th className="text-left p-4 text-gray-500 font-semibold">
                        Status
                      </th>

                      <th className="text-left p-4 text-gray-500 font-semibold">
                        Time
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {todaysCalls.map((call, index) => (

                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="p-4">

                          <p className="font-semibold text-gray-800">
                            {call.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {call.phone}
                          </p>

                        </td>


                        <td className="p-4 text-gray-600">
                          {call.course}
                        </td>


                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              call.status === "Interested"
                                ? "bg-green-100 text-green-700"
                                : call.status === "Call Back"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {call.status}
                          </span>

                        </td>


                        <td className="p-4 text-gray-600">
                          {call.time}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>


            {/* LEAD STATUS */}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

              <h2 className="text-lg font-bold text-[#172B49]">
                Lead Status
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                Your assigned leads
              </p>


              <div className="space-y-5">

                {[
                  ["New Leads", "120", "70%", "bg-blue-500"],
                  ["Contacted", "98", "60%", "bg-purple-500"],
                  ["Interested", "86", "50%", "bg-green-500"],
                  ["Follow-up", "72", "45%", "bg-yellow-500"],
                  ["Converted", "48", "30%", "bg-green-600"],
                ].map((item, index) => (

                  <div key={index}>

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-gray-600">
                        {item[0]}
                      </span>

                      <span className="font-semibold text-gray-800">
                        {item[1]}
                      </span>

                    </div>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className={`h-2 rounded-full ${item[3]}`}
                        style={{ width: item[2] }}
                      />

                    </div>

                  </div>

                ))}

              </div>


              <Link
                to="/sales/leads"
                className="block text-center mt-7 text-[#0077B5] text-sm font-semibold"
              >
                View Lead Details →
              </Link>

            </div>

          </div>


          {/* =================================================
              BOTTOM SECTION
          ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


            {/* CALL PERFORMANCE */}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

              <h2 className="text-lg font-bold text-[#172B49]">
                Call Performance
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                Today's calling activity
              </p>


              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Total Calls
                  </span>

                  <strong>
                    28
                  </strong>
                </div>


                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Connected
                  </span>

                  <strong className="text-green-600">
                    21
                  </strong>
                </div>


                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Missed
                  </span>

                  <strong className="text-red-500">
                    3
                  </strong>
                </div>


                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Average Duration
                  </span>

                  <strong>
                    4m 32s
                  </strong>
                </div>

              </div>


              <Link
                to="/sales/reports"
                className="block mt-6 text-[#0077B5] text-sm font-semibold"
              >
                View Reports →
              </Link>

            </div>


            {/* FOLLOW UPS */}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

              <div className="flex justify-between items-center mb-5">

                <div>

                  <h2 className="text-lg font-bold text-[#172B49]">
                    Upcoming Follow-ups
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Don't miss your follow-ups
                  </p>

                </div>

                <Link
                  to="/sales/followups"
                  className="text-[#0077B5] text-sm font-semibold"
                >
                  View All
                </Link>

              </div>


              <div className="space-y-3">

                {followUps.map((item, index) => (

                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg"
                  >

                    <div className="flex justify-between">

                      <div>

                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.course}
                        </p>

                      </div>


                      <div className="text-right">

                        <p className="text-sm font-semibold text-[#0077B5]">
                          {item.date}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.time}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* TARGET + NOTIFICATIONS */}

            <div className="space-y-6">


              {/* TARGET */}

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                <div className="flex justify-between mb-3">

                  <h2 className="font-bold text-[#172B49]">
                    Today's Target
                  </h2>

                  <span className="text-[#0077B5] font-bold">
                    70%
                  </span>

                </div>


                <div className="h-3 bg-gray-100 rounded-full">

                  <div className="h-3 bg-[#0077B5] rounded-full w-[70%]" />

                </div>


                <div className="flex justify-between text-xs text-gray-500 mt-2">

                  <span>
                    28 Calls Done
                  </span>

                  <span>
                    40 Target
                  </span>

                </div>

              </div>


              {/* NOTIFICATIONS */}

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                <h2 className="font-bold text-[#172B49] mb-4">
                  🔔 Recent Notifications
                </h2>


                <div className="space-y-3">

                  {notifications.map((notification, index) => (

                    <div
                      key={index}
                      className="text-sm text-gray-600 border-b last:border-0 pb-2"
                    >
                      • {notification}
                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default SalesDashboard;
