import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchApplication, deleteApplication } from "../api/api";
import Badge from "../components/Badge";
import {
  Building,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  ChevronLeft,
  Edit,
  Trash2,
  AlertCircle,
  Tag,
} from "lucide-react";

export default function ViewApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplication(id)
      .then(data => {
        // Simulate fetching tags if they don't exist
        if (!data.tags) {
          data.tags = ["remote", "full-time", "fintech"];
        }
        setApplication(data)
      })
      .catch((err) => setError(err.message || "Failed to fetch application"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setLoading(true);
      try {
        // In a real app, this would be a proper API call
        await deleteApplication(id);
        navigate("/");
      } catch (err) {
        setError(err.message || "Failed to delete application");
        setLoading(false);
      }
    }
  };

  if (loading) {
     return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground font-medium">Loading Application...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-destructive/10 rounded-lg border border-destructive/20">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="mt-2 text-lg font-semibold text-destructive">Failed to load application</h3>
        <p className="mt-1 text-sm text-destructive/80">{error}</p>
      </div>
    );
  }

  if (!application) return null;

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-muted/50 p-4 rounded-lg border">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-semibold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to={`/applications/${id}/edit`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Edit size={16} />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-sm border">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-md flex-shrink-0">
            <span className="text-white text-3xl font-bold">
              {application.company[0]}
            </span>
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              {application.company}
            </h1>
            <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
              <Briefcase size={18} />
              {application.role}
            </p>
          </div>
          <Badge status={application.status} className="mt-2 sm:mt-0">
            {application.status.charAt(0).toUpperCase() +
              application.status.slice(1)}
          </Badge>
        </div>

        {application.tags && application.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {application.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InfoCard icon={MapPin} label="Location" value={application.location} />
          <InfoCard
            icon={Calendar}
            label="Date Applied"
            value={new Date(application.date_applied).toLocaleDateString()}
          />
        </div>

        {application.notes && (
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FileText size={18} />
              Notes
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-lg border">
              <p>{application.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
