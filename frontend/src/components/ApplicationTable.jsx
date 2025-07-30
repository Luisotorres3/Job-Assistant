import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const statusColors = {
  applied: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  interview: "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  rejected: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100",
  offer: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100",
};

export default function ApplicationTable({
  applications,
  onView,
  onEdit,
  onDelete,
}) {
  if (!applications.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        <h2 className="text-xl font-semibold">No applications found</h2>
        <p className="mt-2">Get started by adding a new application.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date Applied
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {app.company}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {app.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {app.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusColors[app.status] || ""
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {app.date_applied}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button
                  className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                  title="View"
                  onClick={() => onView && onView(app)}
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors duration-200"
                  title="Edit"
                  onClick={() => onEdit && onEdit(app)}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-danger dark:text-gray-400 dark:hover:text-danger-hover transition-colors duration-200"
                  title="Delete"
                  onClick={() => onDelete && onDelete(app)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
