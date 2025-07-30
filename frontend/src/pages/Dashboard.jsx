import React, { useEffect, useState, useMemo } from "react";
import {
  fetchApplications,
  deleteApplication,
  updateApplication,
} from "../api/api";
import ApplicationTable from "../components/ApplicationTable";
import StatCard from "../components/StatCard";
import Skeleton from "../components/Skeleton";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, BarChart3, Users, Clock, CheckCircle, FileText, Search } from "lucide-react";

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

const DashboardLoadingSkeleton = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-12 w-40 rounded-lg" />
    </div>

    {/* Stats Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
    </div>

     {/* Table Skeleton */}
    <div className="bg-card border rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b">
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);


export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter and sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [pinned, setPinned] = useState(() => new Set(JSON.parse(localStorage.getItem('pinnedApps') || '[]')));

  useEffect(() => {
    localStorage.setItem('pinnedApps', JSON.stringify([...pinned]));
  }, [pinned]);

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

  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => {
        // Search term filter
        const term = searchTerm.toLowerCase();
        const inCompany = app.company.toLowerCase().includes(term);
        const inRole = app.role.toLowerCase().includes(term);
        const searchMatch = !term || inCompany || inRole;

        // Status filter
        const statusMatch = filterStatus === 'all' || app.status === filterStatus;

        return searchMatch && statusMatch;
      })
      .sort((a, b) => {
        // Pinned items first
        const aIsPinned = pinned.has(a.id);
        const bIsPinned = pinned.has(b.id);
        if (aIsPinned !== bIsPinned) return aIsPinned ? -1 : 1;

        switch (sortBy) {
          case 'date_asc':
            return new Date(a.date_applied) - new Date(b.date_applied);
          case 'date_desc':
            return new Date(b.date_applied) - new Date(a.date_applied);
          case 'company_asc':
            return a.company.localeCompare(b.company);
          case 'company_desc':
            return b.company.localeCompare(a.company);
          default:
            return 0;
        }
      });
  }, [applications, searchTerm, filterStatus, sortBy]);

  const stats = useMemo(() => ({
    total: filteredApplications.length,
    applied: filteredApplications.filter((app) => app.status === "applied").length,
    interview: filteredApplications.filter((app) => app.status === "interview").length,
    offers: filteredApplications.filter((app) => app.status === "offer").length,
  }), [filteredApplications]);

  const handleView = (app) => navigate(`/applications/${app.id}`);
  const handleEdit = (app) => navigate(`/applications/${app.id}/edit`);
  const handleDelete = async (app) => {
    // Optimistic UI update
    const originalApplications = [...applications];
    setApplications(prev => prev.filter(a => a.id !== app.id));

    try {
      await deleteApplication(app.id);
    } catch (err) {
      setError(err.message || "Failed to delete application. Reverting changes.");
      setApplications(originalApplications); // Revert on error
    }
  };

  const handleStatusUpdate = async (app, newStatus) => {
    const originalApplications = [...applications];
    // Optimistic update
    setApplications(prev => prev.map(a => a.id === app.id ? {...a, status: newStatus} : a));

    try {
      await updateApplication(app.id, { status: newStatus });
    } catch (err) {
      setError(err.message || "Failed to update status. Reverting changes.");
      setApplications(originalApplications); // Revert on error
    }
  };

  const handlePinToggle = (appId) => {
    setPinned(prevPinned => {
      const newPinned = new Set(prevPinned);
      if (newPinned.has(appId)) {
        newPinned.delete(appId);
      } else {
        newPinned.add(appId);
      }
      return newPinned;
    });
  };

  if (loading) return <DashboardLoadingSkeleton />;

  return (
    <div className="space-y-6">
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
      <div className="mt-6">
        {error && (
           <div className="text-center py-12 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="font-bold text-destructive">Error</p>
              <p className="text-destructive/80 mt-1">{error}</p>
            </div>
        )}

        {!error && applications.length > 0 && (
          <div className="bg-card border rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b flex flex-col md:flex-row items-center gap-4">
              <h2 className="text-xl font-semibold text-card-foreground flex-shrink-0">
                Recent Applications ({filteredApplications.length})
              </h2>
               {/* Filter and Sort Controls */}
              <div className="flex-grow flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by company or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus:ring-ring focus:ring-1 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background text-sm focus:ring-ring focus:ring-1 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background text-sm focus:ring-ring focus:ring-1 focus:outline-none"
                  >
                    <option value="date_desc">Sort by Date (Newest)</option>
                    <option value="date_asc">Sort by Date (Oldest)</option>
                    <option value="company_asc">Sort by Company (A-Z)</option>
                    <option value="company_desc">Sort by Company (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 h-[calc(100vh-420px)] overflow-y-auto">
              <ApplicationTable
                applications={filteredApplications}
                pinned={pinned}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
                onPinToggle={handlePinToggle}
              />
            </div>
          </div>
        )}

        {!error && applications.length === 0 && !loading && (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
