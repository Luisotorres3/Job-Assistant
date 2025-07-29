import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../api/api";
import ApplicationForm from "../components/ApplicationForm";

export default function NewApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(form) {
    setLoading(true);
    setError(null);
    try {
      await createApplication(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">New Application</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
        <ApplicationForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
