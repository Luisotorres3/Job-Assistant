import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplication, createApplication } from "../api/api";

export default function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "applied",
    date_applied: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplication(id)
      .then((data) => setForm(data))
      .catch((err) => setError(err.message || "Failed to fetch application"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // You should implement updateApplication in api.js for real update
      await createApplication(form); // Placeholder: should be updateApplication(id, form)
      navigate(`/applications/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update application");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-background text-foreground p-8 rounded-2xl shadow-lg border border-border mt-10 space-y-6"
    >
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Edit Application
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Company
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full p-3 border border-border rounded-lg bg-background dark:bg-zinc-800 text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Role
          </label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-3 border border-border rounded-lg bg-background dark:bg-zinc-800 text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border border-border rounded-lg bg-background dark:bg-zinc-800 text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-border rounded-lg bg-background dark:bg-zinc-800 text-foreground"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Date Applied
          </label>
          <input
            name="date_applied"
            value={form.date_applied}
            onChange={handleChange}
            type="date"
            className="w-full p-3 border border-border rounded-lg bg-background dark:bg-zinc-800 text-foreground"
            required
          />
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 text-foreground font-semibold shadow border border-border dark:hover:bg-zinc-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
