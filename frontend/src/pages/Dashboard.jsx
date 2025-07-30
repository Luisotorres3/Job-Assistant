import React, { useEffect, useState } from "react";
import {
  fetchApplications,
  fetchApplication,
  deleteApplication,
} from "../api/api";
import ApplicationTable from "../components/ApplicationTable";
import StatCard from "../components/StatCard";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, BarChart3, Users, Clock, CheckCircle, FileText } from "lucide-react";

const EmptyState = () => (
    <div className="text-center py-16 px-6 bg-muted/50 rounded-lg border-2 border-dashed">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-4 shadow-sm">
        <FileText size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Applications Yet
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        It looks like you haven't added any job applications. Let's get started!
      </p>
      <Link
        to="/new"
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
      >
        <PlusCircle size={18} />
        Add Your First Application
      </Link>
    </div>
);


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
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
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

      {/* Content Area */}
      <div className="mt-8">
        {loading && (
           <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground font-medium">
                Loading Applications...
              </p>
            </div>
        )}

        {error && (
           <div className="text-center py-12 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="font-bold text-destructive">Error</p>
              <p className="text-destructive/80 mt-1">{error}</p>
            </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="bg-card border rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-card-foreground">
                Recent Applications
              </h2>
            </div>
            <div className="p-6">
              <ApplicationTable
                applications={applications}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
