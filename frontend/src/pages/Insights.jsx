import React, { useMemo, useState, useEffect } from "react";
import { fetchApplications } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { unparse } from 'papaparse';
import { Download } from "lucide-react";

// Helper to get week number
const getWeek = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `W${weekNo}, ${d.getFullYear()}`;
}

export default function Insights() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications()
      .then(setApplications)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    const timelineData = applications.reduce((acc, app) => {
      const week = getWeek(app.date_applied);
      if (!acc[week]) {
        acc[week] = { name: week, applications: 0 };
      }
      acc[week].applications++;
      return acc;
    }, {});

    return {
      total: applications.length,
      statusCounts,
      timeline: Object.values(timelineData).sort((a, b) => new Date(a.name.split(', ')[1], 0, (parseInt(a.name.slice(1).split(',')[0]) * 7)) - new Date(b.name.split(', ')[1], 0, (parseInt(b.name.slice(1).split(',')[0]) * 7))),
    };
  }, [applications]);

  const handleExport = () => {
    const csv = unparse(applications, { header: true });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'job_applications.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading insights...</div>;
  }

  const StatCard = ({ title, value, children }) => (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {children}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Application Insights
          </h1>
          <p className="mt-2 text-muted-foreground">
            Analyze your job application trends.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Download size={16} />
          Export to CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Applications" value={stats.total} />
        {Object.entries(stats.statusCounts).map(([status, count]) => (
           <StatCard key={status} title={`# ${status.charAt(0).toUpperCase() + status.slice(1)}`} value={count} />
        ))}
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Applications per Week</h3>
        <div style={{ width: '100%', height: 300 }}>
           <ResponsiveContainer>
            <BarChart data={stats.timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Legend />
              <Bar dataKey="applications" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
