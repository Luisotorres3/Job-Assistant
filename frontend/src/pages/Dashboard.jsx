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
    <section className="bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
        <Link
          to="/new"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + New
        </Link>
      </div>
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      )}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}
      {!loading && !error && <ApplicationTable applications={applications} />}
    </section>
  );
}
