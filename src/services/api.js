const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function apiFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

// ── Projects ──────────────────────────────────────────────────────────────────

/** Semua project, opsional filter category */
export const getProjects = (category = "all") => {
  const params = category !== "all" ? `?category=${category}` : "";
  return apiFetch(`/projects${params}`);
};

/** 3 featured projects untuk Home */
export const getFeaturedProjects = () => apiFetch("/projects?featured=true");

/** Single project by id */
export const getProjectById = (id) => apiFetch(`/projects/${id}`);

// ── Skills ────────────────────────────────────────────────────────────────────

export const getSkills = () => apiFetch("/skills");

// ── Experiences ───────────────────────────────────────────────────────────────

export const getExperiences = () => apiFetch("/experiences");

// Educations
export const getEducations = () => apiFetch('/educations');

// Achievements
export const getAchievements = () => apiFetch('/achievements');
