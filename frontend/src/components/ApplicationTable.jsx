import React from "react";

const statusColors = {
  applied: "bg-gray-200 text-gray-800",
  interview: "bg-blue-200 text-blue-800",
  rejected: "bg-red-200 text-red-800",
  offer: "bg-green-200 text-green-800",
};

export default function ApplicationTable({ applications }) {
  if (!applications.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        <h2 className="text-xl font-semibold">No applications found</h2>
        <p className="mt-2">Get started by adding a new application.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Applied
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {app.company}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {app.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {app.date_applied}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
