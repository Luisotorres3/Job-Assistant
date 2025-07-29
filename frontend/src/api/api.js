const BASE_URL = "/api";

export async function fetchApplications() {
  const res = await fetch(`${BASE_URL}/applications`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json();
}

export async function fetchApplication(id) {
  const res = await fetch(`${BASE_URL}/applications/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
}

export async function createApplication(data) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create application");
  return res.json();
}
