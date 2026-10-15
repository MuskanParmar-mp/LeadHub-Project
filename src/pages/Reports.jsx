import React from "react";
import Layout from "../components/layout/Layout";

const Reports = () => {
  const stats = [
    { title: "Total Leads", value: "1,250", change: "+12%" },
    { title: "Total Calls", value: "3,480", change: "+18%" },
    { title: "Converted Leads", value: "186", change: "+8%" },
    { title: "Conversion Rate", value: "14.9%", change: "+3.2%" },
  ];

  const employees = [
    {
      name: "Rahul Sharma",
      leads: 120,
      calls: 340,
      followups: 85,
      conversions: 28,
    },
    {
      name: "Priya Singh",
      leads: 105,
      calls: 310,
      followups: 72,
      conversions: 24,
    },
    {
      name: "Aman Verma",
      leads: 95,
      calls: 285,
      followups: 68,
      conversions: 19,
    },
    {
      name: "Neha Gupta",
      leads: 88,
      calls: 260,
      followups: 61,
      conversions: 17,
    },
  ];

  const sources = [
    { name: "Instagram", leads: 420 },
    { name: "Website", leads: 310 },
    { name: "Referral", leads: 220 },
    { name: "Walk-in", leads: 180 },
    { name: "Other", leads: 120 },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Reports & Analytics
            </h1>
            <p className="text-gray-500 mt-1">
              Track leads, calls, conversions and employee performance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
              <option>All Employees</option>
              <option>Rahul Sharma</option>
              <option>Priya Singh</option>
              <option>Aman Verma</option>
              <option>Neha Gupta</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
              <option>This Month</option>
              <option>This Week</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>

            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <p className="text-gray-500 text-sm">{item.title}</p>

              <div className="flex items-center justify-between mt-3 gap-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.value}
                </h2>

                <span className="text-green-600 text-sm font-medium">
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lead & Call Reports */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* Lead Report */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Lead Report
            </h2>

            <div className="space-y-4">
              {[
                { name: "New Leads", value: 320, width: "70%", color: "bg-blue-500" },
                { name: "Contacted", value: 280, width: "60%", color: "bg-yellow-500" },
                { name: "Interested", value: 240, width: "52%", color: "bg-purple-500" },
                { name: "Follow-up", value: 224, width: "48%", color: "bg-orange-500" },
                { name: "Converted", value: 186, width: "40%", color: "bg-green-500" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1 text-sm sm:text-base">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call Report */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Call Report
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">Total Calls</p>
                <h3 className="text-2xl font-bold mt-2">3,480</h3>
              </div>

              <div className="bg-green-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">Completed Calls</p>
                <h3 className="text-2xl font-bold mt-2">2,940</h3>
              </div>

              <div className="bg-yellow-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">Pending Calls</p>
                <h3 className="text-2xl font-bold mt-2">540</h3>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl">
                <p className="text-gray-500 text-sm">Avg. Duration</p>
                <h3 className="text-2xl font-bold mt-2">04:32</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Conversion Report
            </h2>

            <span className="text-green-600 font-semibold">
              14.9% Conversion Rate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="border rounded-lg p-5">
              <p className="text-gray-500">Total Leads</p>
              <h3 className="text-2xl font-bold mt-2">1,250</h3>
            </div>

            <div className="border rounded-lg p-5">
              <p className="text-gray-500">Interested Leads</p>
              <h3 className="text-2xl font-bold mt-2">464</h3>
            </div>

            <div className="border rounded-lg p-5">
              <p className="text-gray-500">Converted Leads</p>
              <h3 className="text-2xl font-bold mt-2">186</h3>
            </div>
          </div>
        </div>

        {/* Employee Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Employee Performance
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="pb-3 pr-4">Employee</th>
                  <th className="pb-3 pr-4">Assigned Leads</th>
                  <th className="pb-3 pr-4">Calls Made</th>
                  <th className="pb-3 pr-4">Follow-ups</th>
                  <th className="pb-3">Conversions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.name}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 pr-4 font-medium text-gray-800">
                      {employee.name}
                    </td>
                    <td className="py-4 pr-4">{employee.leads}</td>
                    <td className="py-4 pr-4">{employee.calls}</td>
                    <td className="py-4 pr-4">{employee.followups}</td>
                    <td className="py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {employee.conversions}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source-wise Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Source-wise Report
          </h2>

          <div className="space-y-5">
            {sources.map((source) => (
              <div key={source.name}>
                <div className="flex justify-between mb-2 gap-3">
                  <span className="font-medium text-gray-700">
                    {source.name}
                  </span>

                  <span className="text-gray-500">
                    {source.leads} Leads
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${(source.leads / 420) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Reports;