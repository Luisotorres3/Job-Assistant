import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../api/api";
import ApplicationForm from "../components/ApplicationForm";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function NewApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(form) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await createApplication(form);
      console.log("Form submitted:", form);

      setSuccess(true);

      // Redirect after showing success message
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 bg-background text-foreground p-6 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors duration-200 group border border-border"
          aria-label="Go back"
        >
          <ArrowLeft
            size={24}
            className="text-foreground group-hover:text-gray-900 dark:group-hover:text-white"
          />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            New Application
          </h1>
          <p className="text-muted-foreground mt-1">
            Add a new job application to track your progress
          </p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 p-4 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
          <CheckCircle size={20} />
          <div>
            <h4 className="font-semibold">Application added successfully!</h4>
            <p className="text-sm">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Form */}
      <ApplicationForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
