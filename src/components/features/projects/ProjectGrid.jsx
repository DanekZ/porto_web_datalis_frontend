import React from "react";
import ProjectCard from "./ProjectCard.jsx";
import Loading from "../../common/Loading.jsx";

const ProjectGrid = ({ projects, isLoading = false }) => {
  if (isLoading) return <Loading />;

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4">
          <svg className="mx-auto w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-medium text-slate-300">No projects found</h3>
        <p className="text-slate-400">Try selecting a different filter to see more projects.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: "both",
          }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
