import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 bg-slate-800/50 border-slate-700/50 hover:transform hover:scale-105 hover:bg-slate-800/70 hover:border-slate-600/50 group">
      {/* Project Image */}
      <div className="overflow-hidden relative mb-6 rounded-lg">
        <img src={project.image} alt={project.title} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 from-slate-900/50 group-hover:opacity-100"></div>
      </div>

      {/* Project Title */}
      <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">{project.title}</h3>

      {/* Project Description */}
      <p className="mb-4 text-sm leading-relaxed text-slate-300 line-clamp-3">{project.description}</p>

      {/* Technology Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 text-xs font-medium text-blue-400 rounded-full border transition-colors duration-200 bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30">
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        <button className="px-4 py-2 w-full text-sm font-medium text-center text-white bg-blue-600 rounded-lg border border-blue-500 shadow-lg transition-all duration-200 cursor-pointer hover:bg-blue-700 hover:border-blue-600 shadow-blue-500/25">
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
