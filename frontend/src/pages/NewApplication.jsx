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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
          aria-label="Go back"
        >
          <ArrowLeft
            size={24}
            className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            New Application
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
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
