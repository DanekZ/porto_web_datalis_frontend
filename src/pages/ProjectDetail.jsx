import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getProjectById } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useApi(() => getProjectById(id), [id]);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading)
    return (
      <div className="pt-20 min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="pt-20 min-h-screen">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );

  const project = data?.data;
  if (!project) return null;

  // Gabungkan thumbnail + images (max 5)
  const allImages = [project.thumbnail, ...(project.images ?? [])].filter(Boolean).slice(0, 5);

  const techStack = project.tech_stack ?? [];

  return (
    <div className="pt-20 min-h-screen pb-20">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Back */}
        <Link to="/projects" className="inline-flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Projects
        </Link>

        {/* Image Gallery */}
        <div className="relative mb-8 rounded-2xl overflow-hidden bg-slate-800/50">
          <img src={allImages[activeImg]} alt={`${project.title} screenshot ${activeImg + 1}`} className="w-full h-[420px] object-cover" />

          {/* Prev / Next arrows (hanya jika > 1 gambar) */}
          {allImages.length > 1 && (
            <>
              <button onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => setActiveImg((i) => (i + 1) % allImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors">
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeImg ? "bg-blue-400 scale-125" : "bg-slate-500 hover:bg-slate-400"}`} />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all
                  ${i === activeImg ? "border-blue-400" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + badges */}
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full
                  ${project.category === "data" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"}`}
                >
                  {project.category === "data" ? "Data Analytics" : "Web Development"}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full
                  ${
                    project.status === "completed"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : project.status === "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                  }`}
                >
                  {project.status === "in-progress" ? "In Progress" : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            </div>

            {/* Description */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h2 className="mb-3 text-lg font-semibold text-white">About this project</h2>
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h2 className="mb-4 text-lg font-semibold text-white">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-sm font-medium text-blue-400 rounded-full border bg-blue-500/20 border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
              <h2 className="mb-4 text-lg font-semibold text-white">Links</h2>

              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors"
                >
                  <Github size={18} /> Source Code
                </a>
              )}

              {!project.demo_url && !project.github_url && <p className="text-slate-400 text-sm">Belum ada link yang tersedia.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
