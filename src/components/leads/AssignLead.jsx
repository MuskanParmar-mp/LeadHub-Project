import React, { useState } from "react";

function AssignLead({ lead, onClose }) {

  const [employee, setEmployee] = useState("");

  const employees = [
    "Amit",
    "Neha",
    "Rahul",
    "Priya",
  ];

  const handleAssign = () => {

    if (!employee) {
      alert("Please select an employee");
      return;
    }

    alert(`${lead.name} assigned to ${employee}`);

    onClose();
  };

  if (!lead) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h3 className="text-lg font-bold text-[#0B1F33]">
              Assign Lead
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Assign this lead to an employee
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ×
          </button>

        </div>


        {/* Lead Information */}
        <div className="bg-[#F7FAFC] rounded-xl p-4 mb-5">

          <p className="text-sm font-semibold text-[#0B1F33]">
            {lead.name}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {lead.email}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {lead.phone}
          </p>

        </div>


        {/* Employee */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Employee
        </label>

        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="
            w-full
            px-4 py-3
            rounded-xl
            border border-gray-200
            outline-none
            text-sm
            focus:border-[#16A3D3]
          "
        >

          <option value="">
            Select employee
          </option>

          {employees.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}

        </select>


        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              px-5 py-2.5
              rounded-xl
              bg-gray-100
              text-gray-600
              text-sm
              hover:bg-gray-200
            "
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className="
              px-5 py-2.5
              rounded-xl
              bg-[#16A3D3]
              text-white
              text-sm
              hover:bg-[#128eb8]
            "
          >
            Assign Lead
          </button>

        </div>

      </div>

    </div>
  );
}

export default AssignLead;