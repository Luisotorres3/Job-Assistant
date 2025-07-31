import React, { useState } from "react";
import {
  AlertCircle,
  Building,
  User,
  MapPin,
  Calendar,
  CheckCircle,
  Briefcase,
  Link2,
  Bell,
  X,
} from "lucide-react";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

const statusOptions = [
  { value: "applied", label: "Applied", icon: "📝" },
  { value: "interview", label: "Interview", icon: "🎯" },
  { value: "rejected", label: "Rejected", icon: "❌" },
  { value: "offer", label: "Offer", icon: "🎉" },
];

export default function ApplicationForm({
  onSubmit,
  initialData = {},
  loading,
  error,
  isEdit = false,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: initialData.company || "",
    role: initialData.role || "",
    location: initialData.location || "",
    status: initialData.status || "applied",
    date_applied:
      initialData.date_applied || new Date().toISOString().split("T")[0],
    next_step_date: initialData.next_step_date || "",
    link: initialData.link || "",
    notes: initialData.notes || "",
    tags: initialData.tags || [],
  });

  function handleTagsChange(e) {
    // Assuming tags are comma-separated
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setForm(prevForm => ({...prevForm, tags: tagsArray}));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const Input = ({ id, name, type = "text", ...props }) => (
    <input
      id={id}
      name={name}
      type={type}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );

  const Label = ({ htmlFor, children, ...props }) => (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 mb-2"
      {...props}
    >
      {children}
    </label>
  );

  const Select = ({ id, name, children, ...props }) => (
    <select
      id={id}
      name={name}
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
    </select>
  );

  return (
    <div className="max-w-2xl mx-auto bg-card text-card-foreground rounded-xl shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Briefcase size={28} className="text-primary" />
          {isEdit ? "Edit Application" : "Add New Application"}
        </h2>
        <p className="text-muted-foreground mt-2">
          Fill in the details of your job application below.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <Label htmlFor="company">
              <Building size={16} />
              Company
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              placeholder="e.g., Google"
            />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role">
              <User size={16} />
              Role
            </Label>
            <Input
              type="text"
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">
            <MapPin size={16} />
            Location
          </Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="e.g., Mountain View, CA or Remote"
          />
        </div>

        {/* Job Link */}
        <div>
          <Label htmlFor="link">
            <Link2 size={16} />
            Job Post Link
          </Label>
          <Input
            type="url"
            id="link"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://company.com/careers/job-id"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <Label htmlFor="status">
              <CheckCircle size={16} />
              Status
            </Label>
            <Select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Date Applied */}
          <div>
            <Label htmlFor="date_applied">
              <Calendar size={16} />
              Date Applied
            </Label>
            <Input
              type="date"
              id="date_applied"
              name="date_applied"
              value={form.date_applied}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Next Step Date */}
        <div>
          <Label htmlFor="next_step_date">
            <Bell size={16} />
            Next Step Date (Optional)
          </Label>
          <Input
            type="date"
            id="next_step_date"
            name="next_step_date"
            value={form.next_step_date}
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">
            Notes
          </Label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="4"
            className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Add any notes here, e.g., referral name, job post URL, etc."
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">
            Tags
          </Label>
          <Input
            type="text"
            id="tags"
            name="tags"
            defaultValue={form.tags.join(", ")}
            onBlur={handleTagsChange} // Use onBlur to update state when user leaves the field
            placeholder="e.g., remote, senior, fintech"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {form.tags && form.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Error submitting application</h4>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
           <button
            type="button"
            onClick={() => navigate(-1)} // Go back to previous page
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border rounded-lg shadow-sm text-base font-semibold text-muted-foreground bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            <X size={20} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring dark:focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                {isEdit ? "Save Changes" : "Submit Application"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
