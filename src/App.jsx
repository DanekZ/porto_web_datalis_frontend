import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Layout
import Layout from "./components/Layout";
import ScrollToTop from "./components/common/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectList from "./pages/admin/projects/ProjectList";
import ProjectForm from "./pages/admin/projects/ProjectForm";
import SkillList from "./pages/admin/skills/SkillList";
import ExperienceList from "./pages/admin/experiences/ExperienceList";
import AchievementList from "./pages/admin/achievements/AchievementList";
import EducationList from "./pages/admin/educations/EducationList";
import SettingsPage from "./pages/admin/Settings";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ── Public Routes ─────────────────────────────────────────── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ── Admin Routes ──────────────────────────────────────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/create" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
          <Route path="skills" element={<SkillList />} />
          <Route path="experiences" element={<ExperienceList />} />
          <Route path="achievements" element={<AchievementList />} />
          <Route path="educations" element={<EducationList />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
