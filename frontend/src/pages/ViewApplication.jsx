import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApplication } from "../api/api";

export default function ViewApplication() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplication(id)
      .then(setApplication)
      .catch((err) => setError(err.message || "Failed to fetch application"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!application) return <div>Not found</div>;

  // Status badge color
  const statusColors = {
    applied:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    interview:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    rejected:
      "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800",
    offer:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
  };

  return (
    <div className="max-w-xl mx-auto bg-background text-foreground p-8 rounded-2xl shadow-lg border border-border mt-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow">
          <span className="text-white text-2xl font-bold">
            {application.company[0]}
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            {application.company}
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            {application.role}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-background dark:bg-zinc-800 rounded-lg p-4 border border-border">
          <span className="block text-xs text-muted-foreground mb-1">
            Location
          </span>
          <span className="font-semibold text-foreground">
            {application.location}
          </span>
        </div>
        <div className="bg-background dark:bg-zinc-800 rounded-lg p-4 border border-border">
          <span className="block text-xs text-muted-foreground mb-1">
            Status
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
              statusColors[application.status] || statusColors.applied
            }`}
          >
            {application.status.charAt(0).toUpperCase() +
              application.status.slice(1)}
          </span>
        </div>
        <div className="bg-background dark:bg-zinc-800 rounded-lg p-4 border border-border">
          <span className="block text-xs text-muted-foreground mb-1">
            Date Applied
          </span>
          <span className="font-semibold text-foreground">
            {new Date(application.date_applied).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <Link
          to={`/applications/${id}/edit`}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
        >
          Edit
        </Link>
        <Link
          to="/"
          className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 text-white font-semibold shadow border border-border dark:hover:bg-zinc-600 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
