import { useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";
import { getProjects } from "../services/api";
import ProjectFilter from "../components/features/projects/ProjectFilter.jsx";
import ProjectGrid from "../components/features/projects/ProjectGrid.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch semua projects sekali, filter di client
  const { data, isLoading, error, refetch } = useApi(() => getProjects(), []);

  const projects = data?.data ?? [];

  // Hitung counts langsung dari data (atau dari API jika tersedia)
  const projectCounts = useMemo(() => {
    if (data?.counts) return data.counts;
    return {
      all: projects.length,
      web: projects.filter((p) => p.category === "web").length,
      data: projects.filter((p) => p.category === "data").length,
    };
  }, [data, projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="mt-4">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Projects</h2>
            <div className="mx-auto mb-4 w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">A showcase of my recent work and creative solutions. Each project represents a unique challenge and learning experience.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="my-10">
        <div className="container">
          <div className="flex flex-col">
            <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} projectCounts={projectCounts} />

            {error ? <ErrorState message={error} onRetry={refetch} /> : <ProjectGrid projects={filteredProjects} isLoading={isLoading} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
