import React, { useEffect, useState } from "react";
import {
  fetchApplications,
  fetchApplication,
  deleteApplication,
} from "../api/api";
import ApplicationTable from "../components/ApplicationTable";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, BarChart3, Users, Clock, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Remove mockApplications, use real API

  useEffect(() => {
    setLoading(true);
    fetchApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch applications");
        setLoading(false);
      });
  }, []);
  // Handlers for actions
  const handleView = (app) => {
    navigate(`/applications/${app.id}`);
  };

  const handleEdit = (app) => {
    navigate(`/applications/${app.id}/edit`);
  };

  const handleDelete = async (app) => {
    setLoading(true);
    setError(null);
    try {
      await deleteApplication(app.id);
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
    } catch (err) {
      setError(err.message || "Failed to delete application");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    interview: applications.filter((app) => app.status === "interview").length,
    offers: applications.filter((app) => app.status === "offer").length,
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div
      className="bg-header border border-zinc-200 rounded-xl shadow p-6 transition-all duration-300 hover:shadow-md
      dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 text-zinc-900"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} shadow-sm`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-zinc-500 dark:text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold text-inherit text-foreground dark:text-foreground">
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
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <Link
          to="/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-primary-foreground bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-background"
        >
          <PlusCircle size={20} />
          Add Application
        </Link>
      </div>

      {/* Stats */}
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

      {/* Table */}
      <div
        className="bg-background border border-zinc-200 rounded-xl shadow-sm transition-colors duration-300
         dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 text-zinc-900"
      >
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 dark:bg-background">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-gray-600">
            Recent Applications
          </h2>
        </div>
        <div className="p-6">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-muted-foreground font-medium">
                Loading Applications...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-800">
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
