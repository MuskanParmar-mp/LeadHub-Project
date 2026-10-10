
import { useState } from "react";
import {
  Search,
  Users,
  UserPlus,
  CheckCircle,
  Phone,
  CalendarClock,
  Filter,
  Eye,
  Pencil,
  PhoneCall,
} from "lucide-react";

function Emp_my_lead() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const [leads, setLeads] = useState([
    {
      id: 1001,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      status: "New",
      source: "Website",
      followUp: "10 Oct 2026",
    },
    {
      id: 1002,
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "+91 98765 12345",
      status: "Contacted",
      source: "Facebook",
      followUp: "11 Oct 2026",
    },
    {
      id: 1003,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 91234 56789",
      status: "Interested",
      source: "Referral",
      followUp: "12 Oct 2026",
    },
    {
      id: 1004,
      name: "Neha Singh",
      email: "neha@example.com",
      phone: "+91 99887 76655",
      status: "Converted",
      source: "Website",
      followUp: "Completed",
    },
    {
      id: 1005,
      name: "Vikas Gupta",
      email: "vikas@example.com",
      phone: "+91 90909 80808",
      status: "New",
      source: "Instagram",
      followUp: "10 Oct 2026",
    },
    {
      id: 1006,
      name: "Pooja Jain",
      email: "pooja@example.com",
      phone: "+91 98760 12345",
      status: "Lost",
      source: "Advertisement",
      followUp: "—",
    },
  ]);

  const getStatusStyle = (value) => {
    const styles = {
      New: "bg-blue-100 text-blue-700",
      Contacted: "bg-purple-100 text-purple-700",
      Interested: "bg-orange-100 text-orange-700",
      Converted: "bg-green-100 text-green-700",
      Lost: "bg-red-100 text-red-700",
    };

    return styles[value] || "bg-gray-100 text-gray-700";
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = [
      lead.name,
      lead.email,
      lead.phone,
      String(lead.id),
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All Status" || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setLeads((previousLeads) =>
      previousLeads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const stats = [
    {
      title: "My Total Leads",
      value: leads.length,
      icon: Users,
      color: "text-sky-500",
    },
    {
      title: "New Leads",
      value: leads.filter((lead) => lead.status === "New").length,
      icon: UserPlus,
      color: "text-blue-500",
    },
    {
      title: "Interested Leads",
      value: leads.filter((lead) => lead.status === "Interested").length,
      icon: PhoneCall,
      color: "text-orange-500",
    },
    {
      title: "Converted",
      value: leads.filter((lead) => lead.status === "Converted").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fa] p-4 sm:p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1f33]">
            My Leads
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your assigned leads.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <Users size={18} className="text-[#16a6d1]" />
          Sales Executive
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{item.title}</p>
                <Icon size={21} className={item.color} />
              </div>

              <h2 className={`mt-3 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name, email, phone or lead ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#16a6d1] focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div className="relative w-full md:w-52">
          <Filter
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-4 text-sm text-gray-600 outline-none focus:border-[#16a6d1]"
          >
            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Interested</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-[#0b1f33]">
            All My Leads
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#f7f9fb]">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Lead</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Source</th>
                <th className="px-5 py-4">Follow-up</th>
                <th className="px-5 py-4">Update Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition hover:bg-sky-50/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f3f9] font-semibold text-[#159cc5]">
                        {lead.name.charAt(0)}
                      </div>

                      <div>
                        <p className="whitespace-nowrap text-sm font-semibold text-[#0b1f33]">
                          {lead.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Lead #{lead.id}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lead.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {lead.phone}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {lead.source}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600">
                      <CalendarClock size={16} className="text-gray-400" />
                      {lead.followUp}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead.id, e.target.value)
                      }
                      className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs outline-none focus:border-[#16a6d1]"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Interested</option>
                      <option>Converted</option>
                      <option>Lost</option>
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}
                        title="Call lead"
                        className="rounded-lg bg-sky-50 p-2 text-sky-600 transition hover:bg-sky-100"
                      >
                        <Phone size={16} />
                      </a>

                      <button
                        type="button"
                        title="View lead"
                        onClick={() =>
                          window.alert(
                            `Lead: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nStatus: ${lead.status}`
                          )
                        }
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        title="Edit lead status"
                        onClick={() => {
                          const nextStatus = window.prompt(
                            "Enter status: New, Contacted, Interested, Converted, Lost",
                            lead.status
                          );

                          const allowedStatuses = [
                            "New",
                            "Contacted",
                            "Interested",
                            "Converted",
                            "Lost",
                          ];

                          if (allowedStatuses.includes(nextStatus)) {
                            updateStatus(lead.id, nextStatus);
                          } else if (nextStatus !== null) {
                            window.alert("Please enter a valid status.");
                          }
                        }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No leads found. Try another search or status filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
          Showing {filteredLeads.length} lead(s)
        </div>
      </div>
    </div>
  );
}

export default Emp_my_lead;

