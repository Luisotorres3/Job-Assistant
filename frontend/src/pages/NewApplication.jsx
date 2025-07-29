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
    <section className="bg-white rounded shadow p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">New Application</h1>
      <ApplicationForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </section>
  );
}
