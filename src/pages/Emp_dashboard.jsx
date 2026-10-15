import React, { useState } from "react";
import Emp_my_lead from "./Emp_my_lead";
import Emp_calls from "./Emp_calls";
import Emp_follow_up from "./Emp_follow_up";
import Emp_notification from "./Emp_notification";
import Emp_profile from "./Emp_profile";
import Emp_reports from "./Emp_reports";
import Emp_task from "./Emp_task";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  CalendarCheck,
  ClipboardList,
  Bell,
  UserRound,
  Settings,
  FileBarChart,
  LogOut,
  Menu,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  ThumbsUp,
  ArrowUpRight,
} from "lucide-react";


const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "My Leads", icon: Users },
  { name: "Calls", icon: PhoneCall },
  { name: "Follow-ups", icon: CalendarCheck },
  { name: "My Tasks", icon: ClipboardList },
  { name: "Notifications", icon: Bell },
  { name: "My Profile", icon: UserRound },
  { name: "Reports", icon: FileBarChart },
  { name: "Settings", icon: Settings },
  
];

const stats = [
  {
    title: "My Leads",
    value: "128",
    note: "Total assigned leads",
    icon: Users,
    color: "bg-sky-100 text-sky-700",
    change: "+12%",
  },
  {
    title: "Today's Calls",
    value: "32",
    note: "Calls completed today",
    icon: PhoneCall,
    color: "bg-green-100 text-green-700",
    change: "+8%",
  },
  {
    title: "Follow-ups Due",
    value: "08",
    note: "Require your attention",
    icon: Clock,
    color: "bg-orange-100 text-orange-700",
    change: "Today",
  },
  {
    title: "Interested Leads",
    value: "24",
    note: "Positive responses",
    icon: ThumbsUp,
    color: "bg-purple-100 text-purple-700",
    change: "+15%",
  },
  {
    title: "Conversions",
    value: "12",
    note: "Successful conversions",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-700",
    change: "+10%",
  },
];

const leads = [
  {
    name: "Rahul Sharma",
    company: "Sharma Enterprises",
    phone: "+91 98XXXXXX21",
    status: "Interested",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Priya Verma",
    company: "Verma Solutions",
    phone: "+91 97XXXXXX42",
    status: "Follow-up",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Amit Patel",
    company: "Patel Industries",
    phone: "+91 96XXXXXX83",
    status: "New Lead",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Neha Singh",
    company: "Singh Associates",
    phone: "+91 99XXXXXX15",
    status: "Converted",
    color: "bg-purple-100 text-purple-700",
  },
];

const tasks = [
  { title: "Call Rahul Sharma", time: "10:30 AM", done: true },
  { title: "Follow-up with Priya", time: "12:00 PM", done: false },
  { title: "Contact new leads", time: "02:00 PM", done: false },
  { title: "Update call outcomes", time: "04:00 PM", done: false },
];

const weeklyCalls = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 50 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 35 },
];

function EmpSidebar({ activePage, setActivePage, open, setOpen }) {
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0B1F33] text-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[94px] shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-3xl font-bold text-[#159FC7]">
            C
          </div>
          <div>
            <h2 className="text-xl font-bold">LeadHub</h2>
            <p className="text-[10px] tracking-[4px] text-sky-300">CRM</p>
          </div>
        </div>

        <div className="px-5 pb-2 pt-7 text-[11px] font-semibold tracking-[2px] text-sky-300/80">
          MAIN MENU
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 pb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.name;

            return (
              <button
                type="button"
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm transition ${
                  active
                    ? "bg-[#16A6D1] font-semibold text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-orange-400 hover:bg-white/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.title}</p>
          <h3 className="mt-3 text-3xl font-bold text-[#0B1F33]">{item.value}</h3>
        </div>
        <div className={`rounded-xl p-3 ${item.color}`}>
          <Icon size={23} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-slate-500">{item.note}</p>
        <span className="text-xs font-semibold text-green-600">{item.change}</span>
      </div>
    </div>
  );
}

function WeeklyCallsChart() {
  return (
    <div className="flex h-52 items-end justify-around gap-3 border-b border-l border-slate-200 px-3 pb-2 pt-5">
      {weeklyCalls.map((item) => (
        <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-[10px] text-slate-500">{item.value}</span>
          <div
            title={`${item.value} calls`}
            style={{ height: `${item.value}%` }}
            className="w-full max-w-10 rounded-t-md bg-[#16A6D1] transition hover:bg-[#0B1F33]"
          />
          <span className="text-xs text-slate-500">{item.day}</span>
        </div>
      ))}
    </div>
  );
}


function EmployeeSectionPage({ page, setActivePage }) {
  const pageContent = {
    Calls: {
      description: "Review your calling activity and recent call outcomes.",
      headers: ["Lead", "Call Time", "Outcome", "Next Action"],
      rows: [
        ["Rahul Sharma", "10:30 AM", "Interested", "Schedule follow-up"],
        ["Priya Verma", "11:15 AM", "No answer", "Try again"],
        ["Amit Patel", "12:05 PM", "Connected", "Share details"],
      ],
    },
    "Follow-ups": {
      description: "Manage leads that need another contact.",
      headers: ["Lead", "Due", "Priority", "Status"],
      rows: [
        ["Priya Verma", "Today, 12:00 PM", "High", "Pending"],
        ["Rahul Sharma", "Today, 03:00 PM", "Medium", "Pending"],
        ["Neha Singh", "Tomorrow, 11:00 AM", "Low", "Scheduled"],
      ],
    },
    "My Tasks": {
      description: "Your assigned tasks and daily work plan.",
      headers: ["Task", "Time", "Priority", "Status"],
      rows: [
        ["Call Rahul Sharma", "10:30 AM", "High", "Completed"],
        ["Follow-up with Priya", "12:00 PM", "High", "Pending"],
        ["Update call outcomes", "04:00 PM", "Medium", "Pending"],
      ],
    },
    Notifications: {
      description: "Recent updates related to your leads and tasks.",
      headers: ["Notification", "Time", "Type", "Status"],
      rows: [
        ["A new lead was assigned to you", "09:15 AM", "Lead", "New"],
        ["Follow-up reminder: Priya Verma", "11:30 AM", "Reminder", "Unread"],
        ["Daily call target updated", "Yesterday", "Update", "Read"],
      ],
    },
  };

  const content = pageContent[page];

  if (page === "My Profile") {
    return (
      <main className="p-4 sm:p-7">
        <section className="max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="mt-1 text-sm text-slate-500">View your employee account details.</p>
          <div className="mt-6 flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16A6D1] text-xl font-bold text-white">SE</div>
            <div><h3 className="font-semibold">Sales Executive</h3><p className="text-sm text-slate-500">Employee</p></div>
          </div>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div><dt className="text-sm text-slate-500">Role</dt><dd className="mt-1 font-medium">Sales Executive</dd></div>
            <div><dt className="text-sm text-slate-500">Department</dt><dd className="mt-1 font-medium">Sales</dd></div>
            <div><dt className="text-sm text-slate-500">Account Status</dt><dd className="mt-1 font-medium text-green-600">Active</dd></div>
            <div><dt className="text-sm text-slate-500">Workspace</dt><dd className="mt-1 font-medium">LeadHub CRM</dd></div>
          </dl>
        </section>
      </main>
    );
  }

  if (page === "Settings") {
    return (
      <main className="p-4 sm:p-7">
        <section className="max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your workspace preferences.</p>
          <div className="mt-6 divide-y divide-slate-100">
            <div className="flex items-center justify-between gap-4 py-4"><div><p className="font-medium">Notifications</p><p className="text-sm text-slate-500">Receive reminders for follow-ups</p></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Enabled</span></div>
            <div className="flex items-center justify-between gap-4 py-4"><div><p className="font-medium">Account security</p><p className="text-sm text-slate-500">Your account is managed by your CRM administrator.</p></div><span className="text-sm text-slate-500">Managed</span></div>
          </div>
          <button type="button" onClick={() => setActivePage("My Profile")} className="mt-4 rounded-lg bg-[#0B1F33] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#163653]">View My Profile</button>
        </section>
      </main>
    );
  }

  return (
    <main className="space-y-5 p-4 sm:p-7">
      <div><h2 className="text-2xl font-bold">{page}</h2><p className="mt-1 text-sm text-slate-500">{content?.description}</p></div>
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{content?.headers.map((header) => <th key={header} className="px-5 py-4 font-semibold">{header}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {content?.rows.map((row, index) => <tr key={`${page}-${index}`} className="hover:bg-slate-50">{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className="px-5 py-4 text-sm text-slate-700">{cellIndex === row.length - 1 ? <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">{cell}</span> : cell}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </section>
      <button type="button" onClick={() => setActivePage("Dashboard")} className="rounded-lg bg-[#0B1F33] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#163653]">Back to Dashboard</button>
    </main>
  );
}

export default function Emp_dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter((lead) =>
    `${lead.name} ${lead.company} ${lead.phone} ${lead.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#0B1F33]">
      <EmpSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setSidebarOpen((current) => !current)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg font-bold">{activePage}</h1>
              <p className="text-xs text-slate-500">Welcome back, Sales Executive</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Open notifications"
              onClick={() => setActivePage("Notifications")}
              className="relative rounded-full bg-slate-100 p-3 hover:bg-slate-200"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
            </button>
            <div className="hidden h-9 border-l border-slate-200 sm:block" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16A6D1] font-semibold text-white">
                SE
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Sales Executive</p>
                <p className="text-xs text-slate-500">Employee</p>
              </div>
            </div>
          </div>
        </header>

        {activePage === "My Leads" ? (
          <main className="p-4 sm:p-7"><Emp_my_lead /></main>
        ) : activePage === "Calls" ? (
          <main className="p-4 sm:p-7"><Emp_calls /></main>
        ) : activePage === "Follow-ups" ? (
          <main className="p-4 sm:p-7"><Emp_follow_up /></main>
        ) : activePage === "Notifications" ? (
          <main className="p-4 sm:p-7"><Emp_notification /></main>
        ) : activePage === "My Profile" ? (
          <main className="p-4 sm:p-7"><Emp_profile /></main>
        ) 
        : activePage === "My Tasks" ? (
            <main className="p-4 sm:p-7">
                    <Emp_task />
            </main>): activePage === "Reports" ? (
          <main className="p-4 sm:p-7"><Emp_reports /></main>
        ) : activePage !== "Dashboard" ? (
          <EmployeeSectionPage page={activePage} setActivePage={setActivePage} />
        ) : (
          <main className="space-y-6 p-4 sm:p-7">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-[28px]">Sales Executive Dashboard</h2>
              <p className="mt-1 text-sm text-slate-500">Track your leads, calls and daily sales performance.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600">
              <span className="mr-2" aria-hidden="true">📅</span>
              Today's Overview
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {stats.map((item) => <StatCard key={item.title} item={item} />)}
          </section>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">Calls Overview</h3>
                  <p className="mt-1 text-sm text-slate-500">Your weekly calling performance</p>
                </div>
                <span className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">This Week</span>
              </div>
              <WeeklyCallsChart />
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <TrendingUp size={17} className="text-green-600" />
                <span>Weekly calls performance</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold">Today's Tasks</h3>
              <p className="mb-5 mt-1 text-sm text-slate-500">Your daily work schedule</p>
              <div className="space-y-5">
                {tasks.map((task) => (
                  <div key={task.title} className="flex gap-3">
                    <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${task.done ? "bg-green-100 text-green-600" : "border-2 border-slate-300"}`}>
                      {task.done && <CheckCircle2 size={15} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{task.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={12} /> {task.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActivePage("My Tasks")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F33] py-3 text-sm font-semibold text-white hover:bg-[#163653]"
              >
                View All Tasks <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <h3 className="text-lg font-bold">Recent Leads</h3>
                <p className="mt-1 text-sm text-slate-500">Recently assigned leads and their status</p>
              </div>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <Search size={17} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search leads..."
                  aria-label="Search leads"
                  className="w-32 bg-transparent text-sm outline-none sm:w-44"
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">Lead Name</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Company</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Phone</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.name} className="hover:bg-slate-50">
                      <td className="px-5 py-4 text-sm font-semibold">{lead.name}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">{lead.company}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">{lead.phone}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${lead.color}`}>{lead.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setActivePage("My Leads")}
                          className="text-sm font-semibold text-[#159FC7] hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">No matching leads found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 p-4 text-center">
              <button
                type="button"
                onClick={() => setActivePage("My Leads")}
                className="text-sm font-semibold text-[#159FC7] hover:underline"
              >
                View All Leads →
              </button>
            </div>
          </section>
          </main>
        )}
      </div>
    </div>
  );
}
