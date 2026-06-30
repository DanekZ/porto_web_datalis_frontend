import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import ImageWithSkeleton from '../../common/ImageWithSkeleton.jsx';

const ProjectCard = ({ project }) => {
  const thumbnail = project.thumbnail ?? project.image;
  const techStack = project.tech_stack ?? project.tags ?? [];
  const githubUrl = project.github_url ?? project.github;
  const demoUrl   = project.demo_url   ?? project.demo;

  return (
    <div className="group flex flex-col h-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl overflow-hidden hover:border-[#404040] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">

    {/* Thumbnail */}
    <div className="relative h-48">
      <ImageWithSkeleton
        src={thumbnail}
        alt={project.title}
        containerClassName="w-full h-full bg-[#0d0d0d]"
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-40 pointer-events-none" />

      <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full z-10 ${
        project.category === "data" ? "bg-purple-500/80 text-white" : "bg-blue-500/80 text-white"
      }`}>
        {project.category === "data" ? "Data Analytics" : "Web Development"}
      </span>

      {project.status === "in-progress" && (
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-500/80 text-white z-10">
          In Progress
        </span>
      )}
    </div>


      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="mb-2 text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-[#737373] line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {techStack.slice(0, 4).map((tag, i) => (
            <span key={i} className="px-2.5 py-1 text-xs font-medium text-blue-400 rounded-full border bg-blue-500/10 border-blue-500/20">
              {tag}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-2.5 py-1 text-xs font-medium text-[#737373] rounded-full border bg-[#262626] border-[#333]">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/projects/${project.id}`}
            className="flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            View Detail <ArrowRight size={14} />
          </Link>

          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 rounded-lg border border-[#333] text-[#737373] hover:text-white hover:border-[#404040] transition-colors">
              <Github size={16} />
            </a>
          )}

          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 rounded-lg border border-[#333] text-[#737373] hover:text-white hover:border-[#404040] transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;