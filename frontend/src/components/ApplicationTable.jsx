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
      <div className="text-center text-gray-500 py-8">
        No applications found.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow border">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
              Company
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
              Role
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
              Location
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
              Status
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
              Date Applied
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
            <tr
              key={app.id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-2 border-b">{app.company}</td>
              <td className="px-4 py-2 border-b">{app.role}</td>
              <td className="px-4 py-2 border-b">{app.location}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    statusColors[app.status] || ""
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-2 border-b">{app.date_applied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
