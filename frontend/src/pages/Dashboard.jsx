import React, { useEffect, useState } from "react";
import { fetchApplications } from "../api/api";
import ApplicationTable from "../components/ApplicationTable";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PlusCircle, BarChart3, Users, Clock, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mocked data for demonstration
  const mockApplications = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      location: "Mountain View, CA",
      status: "interview",
      date_applied: "2024-07-20",
    },
    {
      id: 2,
      company: "Facebook",
      role: "Frontend Developer",
      location: "Menlo Park, CA",
      status: "applied",
      date_applied: "2024-07-22",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Product Manager",
      location: "Seattle, WA",
      status: "offer",
      date_applied: "2024-07-15",
    },
    {
      id: 4,
      company: "Netflix",
      role: "UI/UX Designer",
      location: "Los Gatos, CA",
      status: "rejected",
      date_applied: "2024-07-18",
    },
  ];

  const handleView = (app) => {
    console.log("View:", app);
  };

  const handleEdit = (app) => {
    console.log("Edit:", app);
  };

  const handleDelete = (app) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
    }
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 500);
  }, []);

  // Calculate stats
  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    interview: applications.filter((app) => app.status === "interview").length,
    offers: applications.filter((app) => app.status === "offer").length,
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} shadow-sm`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and manage your job applications
          </p>
        </div>
        <Link
          to="/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
        >
          <PlusCircle size={20} />
          Add Application
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BarChart3}
          title="Total Applications"
          value={stats.total}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Clock}
          title="Applied"
          value={stats.applied}
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
        />
        <StatCard
          icon={Users}
          title="Interviews"
          value={stats.interview}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard
          icon={CheckCircle}
          title="Offers"
          value={stats.offers}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Applications
          </h2>
        </div>

        <div className="p-6">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                Loading Applications...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="font-bold text-red-600 dark:text-red-400">Error</p>
              <p className="text-red-500 dark:text-red-300 mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <ApplicationTable
              applications={applications}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
