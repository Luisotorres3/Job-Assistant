import React, { useState } from "react";

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "rejected", label: "Rejected" },
  { value: "offer", label: "Offer" },
];

export default function ApplicationForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "applied",
    date_applied: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputStyles =
    "mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-shadow";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
        Add New Application
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-600"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              className={inputStyles}
              placeholder="e.g., Google"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-600"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className={inputStyles}
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-600"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className={inputStyles}
            placeholder="e.g., Mountain View, CA"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-600"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputStyles}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="date_applied"
              className="block text-sm font-semibold text-gray-600"
            >
              Date Applied
            </label>
            <input
              type="date"
              id="date_applied"
              name="date_applied"
              value={form.date_applied}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
