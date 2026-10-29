

import React, { useState } from "react";

import {

  LayoutDashboard,

  Building2,

  CreditCard,

  UserRound,

  FileBarChart,

  ShieldCheck,

  Bell,

  ClipboardList,

  Headset,

  Users,

  LogOut,

  Menu,

  X,

  Search,

  ChevronRight,

} from "lucide-react";



import Super_org_organization from "./Super_org_organization";

import Super_org_plane_and_price from "./Super_org_plane_and_price";

import Super_org_user from "./Super_org_user";

import Super_org_role_and_permission from "./Super_org_role_and_permission";

import Super_org_audit_log from "./Super_org_audit_log";

import Super_org_notification from "./Super_org_notification";

import Super_org_profile from "./Super_org_profile";

import Super_org_report from "./Super_org_report";

import Super_org_subcripation from "./Super_org_subcripation";

import Super_org_support_ticket from "./Super_org_support_ticket";



const menuItems = [

  { label: "Dashboard", icon: LayoutDashboard },

  { label: "Notifications", icon: Bell },

  { label: "Organizations", icon: Building2 },

  { label: "Plans & Pricing", icon: CreditCard },

  { label: "Profile", icon: UserRound },

  { label: "Reports", icon: FileBarChart },

  { label: "Role & Permission", icon: ShieldCheck },

  { label: "Subscriptions", icon: ClipboardList },

  { label: "Support Tickets", icon: Headset },

  { label: "Audit Log", icon: ClipboardList },

  { label: "Users", icon: Users },

];



function DashboardHome({ onNavigate }) {

  const stats = [

    {

      title: "Total Organizations",

      value: "248",

      detail: "+12% from last month",

      icon: Building2,

      color: "bg-blue-100 text-blue-700",

    },

    {

      title: "Total Users",

      value: "12,840",

      detail: "+8.4% from last month",

      icon: Users,

      color: "bg-green-100 text-green-700",

    },

    {

      title: "Active Subscriptions",

      value: "186",

      detail: "Across all organizations",

      icon: CreditCard,

      color: "bg-purple-100 text-purple-700",

    },

    {

      title: "Open Support Tickets",

      value: "24",

      detail: "Needs attention",

      icon: Headset,

      color: "bg-orange-100 text-orange-700",

    },

  ];



  const organizations = [

    {

      name: "Acme Technologies",

      email: "admin@acme.com",

      plan: "Enterprise",

      status: "Active",

    },

    {

      name: "Bright Solutions",

      email: "contact@bright.com",

      plan: "Professional",

      status: "Active",

    },

    {

      name: "Nova Systems",

      email: "admin@nova.com",

      plan: "Starter",

      status: "Inactive",

    },

    {

      name: "Vertex Digital",

      email: "hello@vertex.com",

      plan: "Professional",

      status: "Active",

    },

  ];



  const activities = [

    {

      title: "New organization registered",

      description: "Acme Technologies joined the platform",

      time: "10 minutes ago",

    },

    {

      title: "Subscription upgraded",

      description: "Bright Solutions upgraded its plan",

      time: "35 minutes ago",

    },

    {

      title: "New support ticket",

      description: "A new support request was created",

      time: "1 hour ago",

    },

    {

      title: "User account created",

      description: "A new user was added to the platform",

      time: "2 hours ago",

    },

  ];



  return (

    <div className="space-y-6">

      {/* Welcome */}

      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#0B1F33] p-6 text-white sm:flex-row sm:items-center">

        <div>

          <p className="text-sm text-cyan-300">Super Admin Panel</p>

          <h2 className="mt-1 text-2xl font-bold">

            Welcome back, Admin!

          </h2>

          <p className="mt-2 text-sm text-slate-300">

            Here is what's happening across your platform today.

          </p>

        </div>



        <button

          onClick={() => onNavigate("Organizations")}

          className="rounded-xl bg-[#16A6CE] px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"

        >

          + Create Organization

        </button>

      </div>



      {/* Stats */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon = item.icon;



          return (

            <div

              key={item.title}

              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"

            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">

                    {item.title}

                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-[#0B1F33]">

                    {item.value}

                  </h3>

                </div>



                <div className={`rounded-xl p-3 ${item.color}`}>

                  <Icon size={22} />

                </div>

              </div>



              <p className="mt-4 text-xs text-slate-500">

                {item.detail}

              </p>

            </div>

          );

        })}

      </div>



      {/* Organizations and activity */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">

            <div>

              <h3 className="font-bold text-[#0B1F33]">

                Recent Organizations

              </h3>

              <p className="mt-1 text-sm text-slate-500">

                Overview of recently registered organizations

              </p>

            </div>



            <button

              onClick={() => onNavigate("Organizations")}

              className="flex items-center gap-1 text-sm font-semibold text-[#16A6CE] hover:text-cyan-700"

            >

              View All <ChevronRight size={16} />

            </button>

          </div>



          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">

                <tr>

                  <th className="px-5 py-4 font-semibold">

                    Organization

                  </th>

                  <th className="px-5 py-4 font-semibold">Plan</th>

                  <th className="px-5 py-4 font-semibold">Status</th>

                  <th className="px-5 py-4 font-semibold">Action</th>

                </tr>

              </thead>



              <tbody className="divide-y divide-slate-100">

                {organizations.map((org) => (

                  <tr key={org.email} className="hover:bg-slate-50">

                    <td className="px-5 py-4">

                      <p className="font-semibold text-[#0B1F33]">

                        {org.name}

                      </p>

                      <p className="mt-1 text-xs text-slate-500">

                        {org.email}

                      </p>

                    </td>



                    <td className="px-5 py-4 text-slate-600">

                      {org.plan}

                    </td>



                    <td className="px-5 py-4">

                      <span

                        className={`rounded-full px-3 py-1 text-xs font-semibold ${

                          org.status === "Active"

                            ? "bg-green-100 text-green-700"

                            : "bg-slate-100 text-slate-600"

                        }`}

                      >

                        {org.status}

                      </span>

                    </td>



                    <td className="px-5 py-4">

                      <button

                        onClick={() => onNavigate("Organizations")}

                        className="font-semibold text-[#16A6CE] hover:underline"

                      >

                        View

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>



        {/* Recent activity */}

        <div className="rounded-2xl border border-slate-200 bg-white">

          <div className="border-b border-slate-100 p-5">

            <h3 className="font-bold text-[#0B1F33]">

              Recent Activity

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              Latest platform updates

            </p>

          </div>



          <div className="divide-y divide-slate-100 px-5">

            {activities.map((activity, index) => (

              <div key={index} className="flex gap-3 py-4">

                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#16A6CE]" />



                <div>

                  <p className="text-sm font-semibold text-[#0B1F33]">

                    {activity.title}

                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">

                    {activity.description}

                  </p>

                  <p className="mt-2 text-xs text-slate-400">

                    {activity.time}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* Quick navigation */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <h3 className="font-bold text-[#0B1F33]">Quick Actions</h3>



        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {[

            {

              label: "Manage Organizations",

              page: "Organizations",

              icon: Building2,

            },

            {

              label: "Manage Users",

              page: "Users",

              icon: Users,

            },

            {

              label: "Plans & Pricing",

              page: "Plans & Pricing",

              icon: CreditCard,

            },

            {

              label: "View Reports",

              page: "Reports",

              icon: FileBarChart,

            },

          ].map((action) => {

            const Icon = action.icon;



            return (

              <button

                key={action.page}

                onClick={() => onNavigate(action.page)}

                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-[#16A6CE] hover:bg-cyan-50"

              >

                <Icon size={20} className="text-[#16A6CE]" />

                <span className="text-sm font-semibold text-[#0B1F33]">

                  {action.label}

                </span>

              </button>

            );

          })}

        </div>

      </div>

    </div>

  );

}



function Super_org_dashboard() {

  const [activePage, setActivePage] = useState("Dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchText, setSearchText] = useState("");



  const renderPage = () => {

    switch (activePage) {

      case "Dashboard":

        return <DashboardHome onNavigate={setActivePage} />;



      case "Organizations":

        return <Super_org_organization />;



      case "Plans & Pricing":

        return <Super_org_plane_and_price />;



      case "Users":

        return <Super_org_user />;



      case "Role & Permission":

        return <Super_org_role_and_permission />;



      case "Audit Log":

        return <Super_org_audit_log />;



      case "Notifications":

        return <Super_org_notification />;



      case "Profile":

        return <Super_org_profile />;



      case "Reports":

        return <Super_org_report />;



      case "Subscriptions":

        return <Super_org_subcripation />;



      case "Support Tickets":

        return <Super_org_support_ticket />;



      default:

        return (

          <div className="rounded-2xl border border-slate-200 bg-white p-8">

            <h2 className="text-xl font-bold text-[#0B1F33]">

              Page not found

            </h2>

            <button

              onClick={() => setActivePage("Dashboard")}

              className="mt-4 rounded-lg bg-[#16A6CE] px-4 py-2 text-white"

            >

              Back to Dashboard

            </button>

          </div>

        );

    }

  };



  const filteredMenu = menuItems.filter((item) =>

    item.label.toLowerCase().includes(searchText.toLowerCase())

  );



  const handleNavigation = (page) => {

    setActivePage(page);

    setSidebarOpen(false);

    setSearchText("");

  };



  return (

    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">

      {/* Mobile overlay */}

      {sidebarOpen && (

        <button

          aria-label="Close sidebar overlay"

          onClick={() => setSidebarOpen(false)}

          className="fixed inset-0 z-40 bg-black/40 lg:hidden"

        />

      )}



      {/* Sidebar */}

      <aside

        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0B1F33] text-white transition-transform duration-300 ${

          sidebarOpen ? "translate-x-0" : "-translate-x-full"

        } lg:translate-x-0`}

      >

        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16A6CE] font-bold">

              LH

            </div>

            <div>

              <h1 className="text-lg font-bold">LeadHub</h1>

              <p className="text-xs text-slate-400">Super Admin</p>

            </div>

          </div>



          <button

            onClick={() => setSidebarOpen(false)}

            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"

            aria-label="Close menu"

          >

            <X size={20} />

          </button>

        </div>



        <div className="px-4 py-5">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">

            Main Menu

          </p>



          <div className="relative mb-4">

            <Search

              size={17}

              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"

            />

            <input

              value={searchText}

              onChange={(event) => setSearchText(event.target.value)}

              placeholder="Search menu..."

              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#16A6CE]"

            />

          </div>



          <nav className="max-h-[calc(100vh-230px)] space-y-1 overflow-y-auto">

            {filteredMenu.map((item) => {

              const Icon = item.icon;

              const isActive = activePage === item.label;



              return (

                <button

                  key={item.label}

                  onClick={() => handleNavigation(item.label)}

                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${

                    isActive

                      ? "bg-[#16A6CE] font-semibold text-white shadow-lg"

                      : "text-slate-300 hover:bg-white/10 hover:text-white"

                  }`}

                >

                  <Icon size={19} />

                  <span>{item.label}</span>

                  {isActive && (

                    <ChevronRight size={16} className="ml-auto" />

                  )}

                </button>

              );

            })}



            {filteredMenu.length === 0 && (

              <p className="px-3 py-4 text-sm text-slate-400">

                No menu items found.

              </p>

            )}

          </nav>

        </div>



        <div className="mt-auto border-t border-white/10 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 font-bold text-[#0B1F33]">

              SA

            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold">Super Admin</p>

              <p className="truncate text-xs text-slate-400">

                admin@leadhub.com

              </p>

            </div>

          </div>



          <button

            onClick={() => {

              const confirmed = window.confirm(

                "Are you sure you want to log out?"

              );



              if (confirmed) {

                // Connect your logout API here.

                console.log("Logout requested");

              }

            }}

            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300 transition hover:bg-red-500/10"

          >

            <LogOut size={19} />

            Logout

          </button>

        </div>

      </aside>



      {/* Main content */}

      <div className="min-h-screen lg:ml-72">

        {/* Topbar */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <button

              onClick={() => setSidebarOpen(true)}

              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"

              aria-label="Open menu"

            >

              <Menu size={22} />

            </button>



            <div className="min-w-0">

              <h2 className="truncate text-lg font-bold text-[#0B1F33] sm:text-xl">

                {activePage}

              </h2>

              <p className="hidden text-xs text-slate-500 sm:block">

                Super Admin / {activePage}

              </p>

            </div>

          </div>



          <div className="flex items-center gap-2 sm:gap-4">

            <button

              onClick={() => handleNavigation("Notifications")}

              aria-label="Open notifications"

              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"

            >

              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

            </button>



            <button

              onClick={() => handleNavigation("Profile")}

              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"

            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F33] text-sm font-bold text-white">

                SA

              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold text-[#0B1F33]">

                  Super Admin

                </p>

                <p className="text-xs text-slate-500">Administrator</p>

              </div>

            </button>

          </div>

        </header>



        <main className="p-4 sm:p-6 lg:p-8">

          {renderPage()}

        </main>

      </div>

    </div>

  );

}

export default Super_org_dashboard;
