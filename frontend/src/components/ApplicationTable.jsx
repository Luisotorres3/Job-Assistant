import React from "react";
import { Eye, Edit, Trash2, Building, MapPin, Calendar } from "lucide-react";
import Badge from "./Badge";

export default function ApplicationTable({
  applications,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {applications.map((app) => (
          <div key={app.id} className="bg-card border rounded-lg p-4 space-y-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{app.company}</p>
                <p className="text-sm text-muted-foreground">{app.role}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onEdit && onEdit(app)}
                  className="p-2 rounded-md hover:bg-muted text-muted-foreground"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete && onDelete(app)}
                  className="p-2 rounded-md hover:bg-muted text-destructive"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-2" />
              {app.location}
            </div>
            <div className="flex justify-between items-center pt-2">
              <Badge status={app.status}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar size={14} className="mr-2" />
                {new Date(app.date_applied).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Company & Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {applications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-muted/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                        <Building size={18} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {app.company}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {app.role}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={14} className="mr-2" />
                    {app.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge status={app.status}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-2" />
                    {new Date(app.date_applied).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 rounded-lg transition-all duration-200 text-primary hover:bg-primary/10"
                      title="View details"
                      onClick={() => onView && onView(app)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all duration-200 text-primary hover:bg-primary/10"
                      title="Edit application"
                      onClick={() => onEdit && onEdit(app)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all duration-200 text-destructive hover:bg-destructive/10"
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
    </>
  );
}
