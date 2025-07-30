import React from "react";
import { Eye, Edit, Trash2, Building, MapPin, Calendar } from "lucide-react";

const statusColors = {
  applied:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  interview:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  rejected:
    "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800",
  offer:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
};

export default function ApplicationTable({
  applications,
  onView,
  onEdit,
  onDelete,
}) {
  if (!applications.length) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <Building size={32} className="text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No applications yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Get started by adding your first job application. Track your progress
          and never miss an opportunity!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Company & Role
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Date Applied
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {applications.map((app) => (
            <tr
              key={app.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                      <Building size={18} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {app.company}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {app.role}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin
                    size={14}
                    className="mr-2 text-gray-400 dark:text-gray-500"
                  />
                  {app.location}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                    statusColors[app.status] || statusColors.applied
                  }`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar
                    size={14}
                    className="mr-2 text-gray-400 dark:text-gray-500"
                  />
                  {new Date(app.date_applied).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    title="View details"
                    onClick={() => onView && onView(app)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-all duration-200"
                    title="Edit application"
                    onClick={() => onEdit && onEdit(app)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    title="Delete application"
                    onClick={() => onDelete && onDelete(app)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
