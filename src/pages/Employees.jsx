import React, { useState } from "react";

const Employee = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [employees, setEmployees] = useState([]);

  const emptyForm = {
    email: "",
    employeeId: "",
    password: "",
    fullName: "",
    joinDate: "",
    creator: "",
    update: "",
    designation: "",
    phoneNumber: "",
    department: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD / UPDATE EMPLOYEE
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedEmployees = [...employees];

      updatedEmployees[editingIndex] = {
        ...updatedEmployees[editingIndex],
        ...formData,
        password:
          formData.password || updatedEmployees[editingIndex].password,
      };

      setEmployees(updatedEmployees);
      setEditingIndex(null);
    } else {
      const newEmployee = {
        ...formData,
        status: "Active",
        calls: 0,
        leads: 0,
        followups: 0,
        conversions: 0,
      };

      setEmployees([...employees, newEmployee]);
    }

    setFormData(emptyForm);
    setShowForm(false);
  };

  // =========================
  // EDIT EMPLOYEE
  // =========================

  const handleEdit = (index) => {
    const employee = employees[index];

    setFormData({
      email: employee.email,
      employeeId: employee.employeeId,
      password: "",
      fullName: employee.fullName,
      joinDate: employee.joinDate,
      creator: employee.creator,
      update: employee.update,
      designation: employee.designation,
      phoneNumber: employee.phoneNumber,
      department: employee.department,
    });

    setEditingIndex(index);
    setShowForm(true);
  };

  // =========================
  // DELETE EMPLOYEE
  // =========================

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((_, i) => i !== index)
      );
    }
  };

  // =========================
  // ACTIVE / INACTIVE
  // =========================

  const toggleStatus = (index) => {
    const updatedEmployees = [...employees];

    updatedEmployees[index] = {
      ...updatedEmployees[index],
      status:
        updatedEmployees[index].status === "Active"
          ? "Inactive"
          : "Active",
    };

    setEmployees(updatedEmployees);
  };

  // =========================
  // PERFORMANCE
  // =========================

  const handlePerformance = (employee) => {
    setSelectedEmployee(employee);
    setShowPerformance(true);
  };

  // =========================
  // FILTER EMPLOYEES
  // =========================

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.fullName
        .toLowerCase()
        .includes(searchText) ||
      employee.employeeId
        .toLowerCase()
        .includes(searchText) ||
      employee.email
        .toLowerCase()
        .includes(searchText) ||
      employee.phoneNumber
        .toLowerCase()
        .includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" ||
      employee.status === statusFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus
    );
  });

  // =========================
  // DEPARTMENTS
  // =========================

  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.department)
        .filter(Boolean)
    ),
  ];

  // =========================
  // COUNTS
  // =========================

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage employees, status and performance
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(emptyForm);
            setEditingIndex(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          + New Employee
        </button>

      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

        {/* Total */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Employees
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {employees.length}
          </h2>

        </div>

        {/* Active */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Active Employees
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {activeEmployees}
          </h2>

        </div>

        {/* Inactive */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Inactive Employees
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            {inactiveEmployees}
          </h2>

        </div>

      </div>

      {/* ================= EMPLOYEE LIST ================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* LIST HEADER */}

        <div className="px-6 py-5 border-b">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Employee List
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and manage all CRM employees
              </p>
            </div>

            {/* SEARCH + FILTER */}

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(e.target.value)
                }
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none"
              >
                <option value="All">
                  All Departments
                </option>

                {departments.map((department, index) => (
                  <option
                    key={index}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* ================= TABLE ================= */}

        {filteredEmployees.length === 0 ? (

          <div className="py-16 text-center text-gray-400">

            <div className="text-4xl mb-3">
              👤
            </div>

            <p>
              No employees found.
            </p>

            <p className="text-sm mt-1">
              Click "New Employee" to add an employee.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-3 text-left">
                    Employee ID
                  </th>

                  <th className="px-5 py-3 text-left">
                    Employee
                  </th>

                  <th className="px-5 py-3 text-left">
                    Email
                  </th>

                  <th className="px-5 py-3 text-left">
                    Designation
                  </th>

                  <th className="px-5 py-3 text-left">
                    Department
                  </th>

                  <th className="px-5 py-3 text-left">
                    Phone
                  </th>

                  <th className="px-5 py-3 text-left">
                    Join Date
                  </th>

                  <th className="px-5 py-3 text-left">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((employee) => {

                  const originalIndex =
                    employees.indexOf(employee);

                  return (

                    <tr
                      key={originalIndex}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="px-5 py-4 font-medium">
                        {employee.employeeId}
                      </td>

                      <td className="px-5 py-4">

                        <div>
                          <p className="font-medium text-gray-800">
                            {employee.fullName}
                          </p>

                          <p className="text-xs text-gray-400">
                            {employee.creator || "—"}
                          </p>
                        </div>

                      </td>

                      <td className="px-5 py-4">
                        {employee.email}
                      </td>

                      <td className="px-5 py-4">
                        {employee.designation}
                      </td>

                      <td className="px-5 py-4">
                        {employee.department}
                      </td>

                      <td className="px-5 py-4">
                        {employee.phoneNumber}
                      </td>

                      <td className="px-5 py-4">
                        {employee.joinDate}
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            employee.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {employee.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleEdit(originalIndex)
                            }
                            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              toggleStatus(originalIndex)
                            }
                            className={`px-3 py-1.5 rounded-lg ${
                              employee.status === "Active"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {employee.status === "Active"
                              ? "Inactive"
                              : "Active"}
                          </button>

                          <button
                            onClick={() =>
                              handlePerformance(employee)
                            }
                            className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                          >
                            Performance
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(originalIndex)
                            }
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ================================================= */}
      {/* NEW / EDIT EMPLOYEE MODAL */}
      {/* ================================================= */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>

                <h2 className="text-xl font-semibold text-gray-800">

                  {editingIndex !== null
                    ? "Edit Employee"
                    : "New Employee"}

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                  {editingIndex !== null
                    ? "Update employee information"
                    : "Add a new employee to the CRM portal"}

                </p>

              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                  setFormData(emptyForm);
                }}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Email */}

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {/* Employee ID */}

                <InputField
                  label="Employee ID"
                  name="employeeId"
                  placeholder="Enter employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />

                {/* Password */}

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder={
                    editingIndex !== null
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  required={editingIndex === null}
                />

                {/* Full Name */}

                <InputField
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                {/* Join Date */}

                <InputField
                  label="Join Date"
                  name="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                />

                {/* Creator */}

                <InputField
                  label="Creator"
                  name="creator"
                  placeholder="Enter creator"
                  value={formData.creator}
                  onChange={handleChange}
                />

                {/* Update */}

                <InputField
                  label="Update"
                  name="update"
                  placeholder="Enter update"
                  value={formData.update}
                  onChange={handleChange}
                />

                {/* Designation */}

                <InputField
                  label="Designation"
                  name="designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />

                {/* Phone */}

                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

                {/* Department */}

                <InputField
                  label="Department"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 mt-7 pt-5 border-t">

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingIndex(null);
                    setFormData(emptyForm);
                  }}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  {editingIndex !== null
                    ? "Update Employee"
                    : "Submit"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* PERFORMANCE MODAL */}
      {/* ================================================= */}

      {showPerformance && selectedEmployee && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>

                <h2 className="text-xl font-semibold text-gray-800">
                  Employee Performance
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedEmployee.fullName}
                </p>

              </div>

              <button
                onClick={() =>
                  setShowPerformance(false)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* Performance */}

            <div className="p-6">

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <PerformanceCard
                  title="Assigned Leads"
                  value={selectedEmployee.leads || 0}
                />

                <PerformanceCard
                  title="Calls Made"
                  value={selectedEmployee.calls || 0}
                />

                <PerformanceCard
                  title="Follow-ups"
                  value={selectedEmployee.followups || 0}
                />

                <PerformanceCard
                  title="Conversions"
                  value={selectedEmployee.conversions || 0}
                />

              </div>

              {/* Conversion Rate */}

              <div className="mt-6 border rounded-xl p-5">

                <div className="flex justify-between mb-2">

                  <span className="font-medium text-gray-700">
                    Conversion Performance
                  </span>

                  <span className="font-semibold text-green-600">

                    {selectedEmployee.leads > 0
                      ? (
                          (selectedEmployee.conversions /
                            selectedEmployee.leads) *
                          100
                        ).toFixed(1)
                      : 0}
                    %

                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${
                        selectedEmployee.leads > 0
                          ? Math.min(
                              (selectedEmployee.conversions /
                                selectedEmployee.leads) *
                                100,
                              100
                            )
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


// =================================================
// INPUT COMPONENT
// =================================================

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-1.5">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg
        outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        placeholder:text-gray-400"
      />

    </div>
  );
};


// =================================================
// PERFORMANCE CARD
// =================================================

const PerformanceCard = ({ title, value }) => {
  return (
    <div className="bg-gray-50 border rounded-xl p-4">

      <p className="text-xs text-gray-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-gray-800 mt-2">
        {value}
      </h3>

    </div>
  );
};

export default Employee;