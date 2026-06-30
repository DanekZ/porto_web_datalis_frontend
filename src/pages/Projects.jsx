import { useState, useMemo, useRef, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { getProjects } from "../services/api";
import ProjectFilter from "../components/features/projects/ProjectFilter.jsx";
import ProjectGrid from "../components/features/projects/ProjectGrid.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

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

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      obs.observe(sectionRef.current);
    }

    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="pt-20 pb-12">
        <div className="container">
          <div
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
            <h2 className="section-title">Projects</h2>
            <div className="section-divider" />
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#737373]">
              A showcase of my recent work across web development and data analytics. Each project represents a unique challenge and learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section ref={sectionRef}>
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
              <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <ProjectGrid 
                projects={filteredProjects} 
                isLoading={isLoading}
              />
            </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;