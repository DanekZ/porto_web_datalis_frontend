const BASE_URL = import.meta.env.VITE_API_URL+"/api" || "http://localhost:8000/api";

const getToken = () => localStorage.getItem("admin_token");

const authFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json",    
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
};

// ── Upload ────────────────────────────────────────────────────────────────────
export const adminUploadImage = async (file) => {
 const token = getToken();
  console.log("TOKEN saat upload:", token); // 

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
        Accept: "application/json",    
      Authorization: `Bearer ${getToken()}`,
      // JANGAN set Content-Type — biarkan browser set boundary otomatis
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Upload error ${res.status}`);
  }

  return res.json();
};

export const adminDeleteImage = (path) =>
  authFetch("/upload", {
    method: "DELETE",
    body: JSON.stringify({ path }),
  });

// ── Projects ──────────────────────────────────────────────────────────────────
export const adminGetProjects = () => authFetch("/projects");
export const adminGetProject = (id) => authFetch(`/projects/${id}`);
export const adminCreateProject = (data) => authFetch("/projects", { method: "POST", body: JSON.stringify(data) });
export const adminUpdateProject = (id, data) => authFetch(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const adminDeleteProject = (id) => authFetch(`/projects/${id}`, { method: "DELETE" });

// ── Skills ────────────────────────────────────────────────────────────────────
export const adminGetSkills = () => authFetch("/skills");
export const adminCreateSkill = (data) => authFetch("/skills", { method: "POST", body: JSON.stringify(data) });
export const adminUpdateSkill = (id, data) => authFetch(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const adminDeleteSkill = (id) => authFetch(`/skills/${id}`, { method: "DELETE" });

// ── Experiences ───────────────────────────────────────────────────────────────
export const adminGetExperiences = () => authFetch("/experiences");
export const adminCreateExperience = (data) => authFetch("/experiences", { method: "POST", body: JSON.stringify(data) });
export const adminUpdateExperience = (id, data) => authFetch(`/experiences/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const adminDeleteExperience = (id) => authFetch(`/experiences/${id}`, { method: "DELETE" });

// ── Achievements ──────────────────────────────────────────────────────────────
export const adminGetAchievements = () => authFetch("/achievements");
export const adminCreateAchievement = (data) => authFetch("/achievements", { method: "POST", body: JSON.stringify(data) });
export const adminUpdateAchievement = (id, data) => authFetch(`/achievements/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const adminDeleteAchievement = (id) => authFetch(`/achievements/${id}`, { method: "DELETE" });

// ── Educations ────────────────────────────────────────────────────────────────
export const adminGetEducations = () => authFetch("/educations");
export const adminCreateEducation = (data) => authFetch("/educations", { method: "POST", body: JSON.stringify(data) });
export const adminUpdateEducation = (id, data) => authFetch(`/educations/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const adminDeleteEducation = (id) => authFetch(`/educations/${id}`, { method: "DELETE" });

// ── Settings ──────────────────────────────────────────────────────────────────
export const adminGetSettings = () => authFetch("/settings");
export const adminUpdateSettings = (data) => authFetch("/settings", { method: "PUT", body: JSON.stringify(data) });
