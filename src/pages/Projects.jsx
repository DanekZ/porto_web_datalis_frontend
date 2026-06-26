import { useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";
import { getProjects } from "../services/api";
import ProjectFilter from "../components/features/projects/ProjectFilter.jsx";
import ProjectGrid from "../components/features/projects/ProjectGrid.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data, isLoading, error, refetch } = useApi(() => getProjects(), []);

  const projects = data?.data ?? [];

  const projectCounts = useMemo(() => {
    if (data?.counts) return data.counts;
    return {
      all:  projects.length,
      web:  projects.filter((p) => p.category === "web").length,
      data: projects.filter((p) => p.category === "data").length,
    };
  }, [data, projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className="pt-16 min-h-screen">

      {/* Header */}
      <section className="section pb-0">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Projects</h2>
            <div className="section-divider" />
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#737373]">
              A showcase of my recent work across web development and data analytics. Each project represents a unique challenge and learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section pt-10">
        <div className="container">
          <div className="flex flex-col">
            <ProjectFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              projectCounts={projectCounts}
            />

            {error ? (
              <ErrorState message={error} onRetry={refetch} />
            ) : (
              <ProjectGrid projects={filteredProjects} isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;