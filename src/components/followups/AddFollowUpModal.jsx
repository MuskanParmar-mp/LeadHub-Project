import React, { useState } from "react";

function AddFollowUpModal({ onClose, onAdd, editData }) {

  

  const [form, setForm] = useState(
    editData || {
      lead: "",
      phone: "",
      employee: "",
      date: "",
      time: "",
      type: "Call",
      priority: "Medium",
      reminder: "15 minutes before",
      notes: "",
      status: "Pending",
    }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.lead || !form.date || !form.time) {
      return;
    }

    onAdd({
      ...form,
      id: Date.now(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="p-5 border-b flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-[#0B1F33]">
              {editData ? "Reschedule Follow Up" : "Add Follow Up"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Schedule your next customer interaction
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">

          {/* Lead + Employee */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-[#0B1F33]">
                Lead
              </label>

              <select
                name="lead"
                value={form.lead}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
              >
                <option value="">Select Lead</option>
                <option value="Rahul Sharma">Rahul Sharma</option>
                <option value="Priya Singh">Priya Singh</option>
                <option value="Amit Patel">Amit Patel</option>
                <option value="Neha Verma">Neha Verma</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#0B1F33]">
                Assign Employee
              </label>

              <select
                name="employee"
                value={form.employee}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
              >
                <option value="">Select Employee</option>
                <option value="Rahul">Rahul</option>
                <option value="Priya">Priya</option>
                <option value="Aman">Aman</option>
                <option value="Neha">Neha</option>
              </select>
            </div>

          </div>

          {/* Date + Time */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-[#0B1F33]">
                Follow-up Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#0B1F33]">
                Follow-up Time
              </label>

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
              />
            </div>

          </div>

          {/* Type + Priority */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-[#0B1F33]">
                Follow-up Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
              >
                <option>Call</option>
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Meeting</option>
                <option>Callback</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#0B1F33]">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

          </div>

          {/* Reminder */}

          <div>

            <label className="text-sm font-medium text-[#0B1F33]">
              Reminder
            </label>

            <select
              name="reminder"
              value={form.reminder}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16A3D3]"
            >
              <option>At follow-up time</option>
              <option>15 minutes before</option>
              <option>30 minutes before</option>
              <option>1 hour before</option>
              <option>1 day before</option>
            </select>

          </div>

          {/* Notes */}

          <div>

            <label className="text-sm font-medium text-[#0B1F33]">
              Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Add notes about this follow-up..."
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-[#16A3D3]"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#16A3D3] text-white font-semibold hover:bg-[#0B1F33] transition"
            >
              {editData ? "Reschedule" : "Save Follow Up"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddFollowUpModal;