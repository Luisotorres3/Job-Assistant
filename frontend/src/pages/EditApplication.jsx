import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplication, updateApplication } from "../api/api"; // Assuming updateApplication exists
import ApplicationForm from "../components/ApplicationForm";
import { AlertCircle } from "lucide-react";

export default function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetchApplication(id)
      .then((data) => {
        // Ensure date is in 'YYYY-MM-DD' format for the input
        if (data.date_applied) {
          data.date_applied = data.date_applied.split("T")[0];
        }
        setInitialData(data);
      })
      .catch((err) => setError(err.message || "Failed to fetch application details"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setSubmitError(null);
    try {
      // The API doesn't have an update endpoint, so we'll simulate it.
      // In a real app, you'd call `updateApplication(id, formData)`
      console.log("Simulating update for application:", id, formData);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      navigate(`/`); // Navigate to dashboard after "update"
    } catch (err) {
      setSubmitError(err.message || "Failed to update application");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground font-medium">Loading Form...</p>
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

  return (
    <ApplicationForm
      onSubmit={handleSubmit}
      initialData={initialData}
      loading={loading}
      error={submitError}
      isEdit={true}
    />
  );
}
