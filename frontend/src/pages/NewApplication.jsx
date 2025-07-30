import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../api/api";
import ApplicationForm from "../components/ApplicationForm";
import { ArrowLeft } from "lucide-react";

export default function NewApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(form) {
    setLoading(true);
    setError(null);
    try {
      // Since we are using mock data, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await createApplication(form);
      console.log("Form submitted:", form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          New Application
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <ApplicationForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
