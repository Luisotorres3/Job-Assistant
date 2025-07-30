import React, { useEffect, useState } from "react";
import { fetchApplications } from "../api/api";
import ApplicationTable from "../components/ApplicationTable";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

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
    // navigate(`/application/${app.id}`);
    console.log("View:", app);
  };
  const handleEdit = (app) => {
    // navigate(`/edit/${app.id}`);
    console.log("Edit:", app);
  };
  const handleDelete = (app) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
      // Call API to delete here
    }
  };

  useEffect(() => {
    setLoading(true);
    // Using mocked data
    setApplications(mockApplications);
    setLoading(false);
    // fetchApplications()
    //   .then(setApplications)
    //   .catch((err) => setError(err.message))
    //   .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Job Application Dashboard
        </h1>
        <Link
          to="/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
        >
          <PlusCircle size={20} />
          Add New Application
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {loading && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 font-medium">
            Loading Applications...
          </div>
        )}
        {error && (
          <div className="text-center py-10 text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200 rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
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
  );
}
