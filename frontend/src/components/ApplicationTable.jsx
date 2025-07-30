import React from "react";
import { Eye, Edit, Trash2, Building, MapPin, Calendar, Bell, Pin, ExternalLink } from "lucide-react";
import Badge from "./Badge";

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const StatusSelect = ({ app, onStatusUpdate }) => {
  const { status } = app;
  const badgeClasses = "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => onStatusUpdate(app, e.target.value)}
        className={`${badgeClasses} appearance-none w-full pr-8 cursor-pointer bg-transparent`}
        style={{
          color: `var(--badge-${status}-text)`,
          borderColor: `var(--badge-${status}-border)`,
        }}
      >
        {statusOptions.map(opt => (
          <option key={opt.value} value={opt.value} style={{color: 'initial', backgroundColor: 'initial'}}>
            {opt.label}
          </option>
        ))}
      </select>
       <div
        className={`absolute inset-0 -z-10 rounded-md`}
        style={{ backgroundColor: `var(--badge-${status}-bg)`}}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    </div>
  );
};

const NextStepDate = ({ date }) => {
  if (!date) return <span className="text-muted-foreground/50">N/A</span>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDate = new Date(date);
  nextDate.setHours(0,0,0,0);

  let textColor = "text-muted-foreground";
  if (nextDate.getTime() < today.getTime()) {
    textColor = "text-red-500 dark:text-red-400 font-semibold";
  } else if (nextDate.getTime() === today.getTime()) {
    textColor = "text-green-600 dark:text-green-400 font-semibold";
  }

  return (
    <div className={`flex items-center text-sm ${textColor}`}>
      <Bell size={14} className="mr-2" />
      {new Date(date).toLocaleDateString()}
    </div>
  );
};


export default function ApplicationTable({
  applications,
  pinned,
  onView,
  onEdit,
  onDelete,
  onStatusUpdate,
  onPinToggle,
}) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {applications.map((app) => (
          <div key={app.id} className="bg-card border rounded-lg p-4 space-y-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                 <button onClick={() => onPinToggle(app.id)} className="p-1">
                    <Pin size={16} className={`transition-colors ${pinned.has(app.id) ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground hover:text-amber-400'}`} />
                  </button>
                <div>
                  <p className="font-semibold text-foreground">{app.company}</p>
                  <p className="text-sm text-muted-foreground">{app.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                 {app.link && (
                  <a href={app.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-muted text-muted-foreground" title="Open Job Link">
                    <ExternalLink size={16} />
                  </a>
                )}
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
              <StatusSelect app={app} onStatusUpdate={onStatusUpdate} />
              <NextStepDate date={app.next_step_date} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
               <th className="px-2 py-4"></th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Company & Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Next Step
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
                className={`transition-colors duration-200 group ${pinned.has(app.id) ? 'bg-amber-100/10' : 'hover:bg-muted/50'}`}
              >
                <td className="px-2 py-4">
                  <button onClick={() => onPinToggle(app.id)} className="p-2" title={pinned.has(app.id) ? 'Unpin' : 'Pin'}>
                    <Pin size={16} className={`transition-all ${pinned.has(app.id) ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground/50 group-hover:text-amber-400'}`} />
                  </button>
                </td>
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
                       <div className="text-xs text-muted-foreground/80 flex items-center mt-1">
                        <MapPin size={12} className="mr-1.5" />
                        {app.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusSelect app={app} onStatusUpdate={onStatusUpdate} />
                </td>
                <td className="px-6 py-4">
                  <NextStepDate date={app.next_step_date} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                     {app.link && (
                      <a href={app.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-muted" title="Open Job Link">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      className="p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-muted"
                      title="View details"
                      onClick={() => onView && onView(app)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-muted"
                      title="Edit application"
                      onClick={() => onEdit && onEdit(app)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all duration-200 text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
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
