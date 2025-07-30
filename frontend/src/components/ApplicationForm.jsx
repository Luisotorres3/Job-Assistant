import React, { useState } from "react";
import {
  AlertCircle,
  Building,
  User,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";

const statusOptions = [
  { value: "applied", label: "Applied", icon: "📝" },
  { value: "interview", label: "Interview", icon: "🎯" },
  { value: "rejected", label: "Rejected", icon: "❌" },
  { value: "offer", label: "Offer", icon: "🎉" },
];

export default function ApplicationForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "applied",
    date_applied: new Date().toISOString().split("T")[0],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputStyles =
    "mt-2 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200";

  const labelStyles =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Building size={28} />
            Add New Application
          </h2>
          <p className="text-blue-100 mt-2">
            Fill in the details of your job application
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div>
              <label htmlFor="company" className={labelStyles}>
                <Building size={16} className="inline mr-2" />
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
                placeholder="e.g., Google, Microsoft, Apple"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className={labelStyles}>
                <User size={16} className="inline mr-2" />
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
                placeholder="e.g., Software Engineer, Product Manager"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className={labelStyles}>
              <MapPin size={16} className="inline mr-2" />
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
              placeholder="e.g., Mountain View, CA or Remote"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label htmlFor="status" className={labelStyles}>
                <CheckCircle size={16} className="inline mr-2" />
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
                    {opt.icon} {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Applied */}
            <div>
              <label htmlFor="date_applied" className={labelStyles}>
                <Calendar size={16} className="inline mr-2" />
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Error submitting application</h4>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
