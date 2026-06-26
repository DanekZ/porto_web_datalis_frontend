import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, Tag, Layers } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getProjectById } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

const statusMeta = {
  completed:    { label: "Completed",   color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30"   },
  "in-progress":{ label: "In Progress", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  archived:     { label: "Archived",    color: "text-[#737373]",  bg: "bg-[#262626] border-[#333]"            },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useApi(() => getProjectById(id), [id]);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) return (
    <div className="pt-20 min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 pt-10">
        <Loading className="grid grid-cols-1 gap-6" />
      </div>
    </div>
  );

  if (error) return (
    <div className="pt-20 min-h-screen">
      <ErrorState message={error} onRetry={refetch} />
    </div>
  );

  const project = data?.data;
  if (!project) return null;

  const allImages = [project.thumbnail, ...(project.images ?? [])].filter(Boolean).slice(0, 5);
  const techStack = project.tech_stack ?? [];
  const status    = statusMeta[project.status] ?? statusMeta.archived;

  const prevImg = () => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % allImages.length);

  return (
    <div className="pt-20 min-h-screen pb-24">
      <div className="container max-w-6xl mx-auto px-4">

        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mb-8 text-sm text-[#737373] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* ── Main Layout: Left image | Right info ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Gallery ──────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24">

            {/* Main image */}
            <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#2d2d2d] group">
              <img
                src={allImages[activeImg]}
                alt={`${project.title} ${activeImg + 1}`}
                className="w-full h-72 object-cover transition-all duration-500"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Counter */}
              {allImages.length > 1 && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-white bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                  {activeImg + 1} / {allImages.length}
                </span>
              )}

              {/* Dots */}
              {allImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeImg
                          ? "w-5 h-1.5 bg-blue-400"
                          : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      i === activeImg
                        ? "border-blue-400 opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Project Info card — di bawah gallery */}
            <div className="mt-4 bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Project Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#737373]">Category</span>
                  <span className="text-white font-medium">
                    {project.category === "data" ? "Data Analytics" : "Web Development"}
                  </span>
                </div>
                <div className="h-px bg-[#2d2d2d]" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#737373]">Status</span>
                  <span className={`font-medium ${status.color}`}>{status.label}</span>
                </div>
                <div className="h-px bg-[#2d2d2d]" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#737373]">Technologies</span>
                  <span className="text-white font-medium">{techStack.length} used</span>
                </div>
                {allImages.length > 1 && (
                  <>
                    <div className="h-px bg-[#2d2d2d]" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#737373]">Gallery</span>
                      <span className="text-white font-medium">{allImages.length} images</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info ────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Badges + Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                  project.category === "data"
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                    : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                }`}>
                  {project.category === "data" ? "Data Analytics" : "Web Development"}
                </span>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
                {project.featured && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full border bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                    ★ Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white leading-tight">{project.title}</h1>
            </div>

            {/* Description */}
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers size={15} className="text-blue-400" />
                <h2 className="text-sm font-semibold text-white">About this project</h2>
              </div>
              <p className="text-[#a3a3a3] leading-relaxed text-sm">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={15} className="text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-medium text-blue-400 rounded-full border bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4">Links</h2>
              <div className="space-y-3">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-[#333] text-[#a3a3a3] hover:text-white hover:border-[#404040] text-sm font-medium transition-colors"
                  >
                    <Github size={15} /> Source Code
                  </a>
                )}
                {!project.demo_url && !project.github_url && (
                  <p className="text-[#737373] text-sm">Belum ada link tersedia.</p>
                )}
              </div>
            </div>

            {/* Back */}
            <Link
              to="/projects"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-[#2d2d2d] text-[#737373] hover:text-white hover:border-[#404040] text-sm font-medium transition-colors"
            >
              <ArrowLeft size={15} /> Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;