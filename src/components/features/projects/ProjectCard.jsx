import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const ProjectCard = ({ project }) => {
  // Support field lama (image/tags/github/demo) maupun field baru dari API
  const thumbnail = project.thumbnail ?? project.image;
  const techStack = project.tech_stack ?? project.tags ?? [];
  const githubUrl = project.github_url ?? project.github;
  const demoUrl = project.demo_url ?? project.demo;

  return (
    <div className="flex flex-col h-full p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 bg-slate-800/50 border-slate-700/50 hover:scale-105 hover:bg-slate-800/70 hover:border-slate-600/50 group">
      {/* Thumbnail */}
      <div className="overflow-hidden relative mb-6 rounded-lg">
        <img src={thumbnail} alt={project.title} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 from-slate-900/50 group-hover:opacity-100" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full
          ${project.category === "data" ? "bg-purple-500/80 text-white" : "bg-blue-500/80 text-white"}`}
        >
          {project.category === "data" ? "Data Analytics" : "Web Development"}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">{project.title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-slate-300 line-clamp-3 flex-1">{project.description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {techStack.slice(0, 4).map((tag, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium text-blue-400 rounded-full border bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 transition-colors">
            {tag}
          </span>
        ))}
        {techStack.length > 4 && <span className="px-3 py-1 text-xs font-medium text-slate-400 rounded-full border bg-slate-700/50 border-slate-600">+{techStack.length - 4}</span>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        {/* Detail page */}
        <Link to={`/projects/${project.id}`} className="flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-500 hover:bg-blue-700 transition-all">
          View Detail <ArrowRight size={14} />
        </Link>

        {/* GitHub */}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors">
            <Github size={16} />
          </a>
        )}

        {/* Demo */}
        {demoUrl && (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors">
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
