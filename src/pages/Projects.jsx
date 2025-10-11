import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { projectsData, filterProjects, getProjectCounts } from "../data/project.js";
import ProjectFilter from "../components/features/projects/ProjectFilter.jsx";
import ProjectGrid from "../components/features/projects/ProjectGrid.jsx";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Get project counts for each category
  const projectCounts = useMemo(() => {
    return getProjectCounts(projectsData);
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    return filterProjects(projectsData, activeFilter);
  }, [activeFilter]);

  // Handle filter change with loading state
  const handleFilterChange = (newFilter) => {
    if (newFilter !== activeFilter) {
      setIsLoading(true);

      // Simulate loading for smooth transition
      setTimeout(() => {
        setActiveFilter(newFilter);
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="mt-4">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Projects</h2>
            <div className="mx-auto mb-4 w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">A showcase of my recent work and creative solutions. Each project represents a unique challenge and learning experience.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="my-10">
        <div className="container">
          <div className="flex flex-col">
            {/* Project Filter */}
            <ProjectFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} projectCounts={projectCounts} />

            {/* Project Grid */}
            <ProjectGrid projects={filteredProjects} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
