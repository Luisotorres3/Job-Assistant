const BASE_URL = "http://localhost:8000";

// Fetch all applications
export async function fetchApplications() {
  const res = await fetch(`${BASE_URL}/applications`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json();
}

// Fetch a single application by ID
export async function fetchApplication(id) {
  const res = await fetch(`${BASE_URL}/applications/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
}

// Create a new application
export async function createApplication(data) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.detail || "Failed to create application");
  }
  return res.json();
}

// Update an application by ID (PATCH for partial updates)
export async function updateApplication(id, data) {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
     const errorBody = await res.json();
    throw new Error(errorBody.detail || "Failed to update application");
  }
  return res.json();
}


// Delete application by ID
export async function deleteApplication(id) {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (res.status === 204) return { message: "Application deleted successfully" };
  if (!res.ok) throw new Error("Failed to delete application");
  return res.json();
}
