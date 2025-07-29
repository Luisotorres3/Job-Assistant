import React, { useEffect, useState } from "react";
import { fetchApplications } from "../api/api";
import ApplicationTable from "../components/ApplicationTable";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchApplications()
      .then(setApplications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <Link
          to="/new"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-blue-700 shadow-md transition-colors"
        >
          + Add New Application
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading && (
          <div className="text-center py-10 text-gray-500 font-medium">
            Loading Applications...
          </div>
        )}
        {error && (
          <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <ApplicationTable applications={applications} />
        )}
      </div>
    </div>
  );
}
