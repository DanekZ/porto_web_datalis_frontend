import { useRef, useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { getAchievements } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";
import { ExternalLink, Award, BookOpen, BadgeCheck, X, Minus, Plus } from "lucide-react";

const preloadImage = (src) =>
  new Promise((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve;
  });

// ── Type meta ─────────────────────────────────────────────────────────────────
const typeMeta = {
  award:         { label: "Award",         icon: Award,      color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  course:        { label: "Course",        icon: BookOpen,   color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"   },
  certification: { label: "Certification", icon: BadgeCheck, color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
};

const levelColor = {
  Beginner:     "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Expert:       "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// ── Achievement Card ──────────────────────────────────────────────────────────
const AchievementCard = ({ achievement, onClick }) => {
  const { title, issuer, type, image, year } = achievement;
  const meta = typeMeta[type] ?? typeMeta.certification;
  const Icon = meta.icon;

  return (
    
    <div
      onClick={onClick}
      className="group bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl overflow-hidden hover:border-[#404040] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 flex flex-col cursor-pointer"
    >
      <div className="relative h-44 bg-[#0d0d0d] overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-[#262626] border border-[#333] flex items-center justify-center">
            <Icon size={32} className={meta.color} />
          </div>
        )}
        {year && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
            {year}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${meta.bg} ${meta.color}`}>
            <Icon size={11} />
            {meta.label}
          </span>
        </div>
        <h3 className="text-white font-bold text-base mb-1 group-hover:text-blue-400 transition-colors leading-snug flex-1">
          {title}
        </h3>
        <p className="text-[#737373] text-sm">{issuer}</p>
      </div>
    </div>
  );
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
const DetailModal = ({ achievement, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const meta = typeMeta[achievement.type] ?? typeMeta.certification;
  const Icon = meta.icon;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#0d0d0d] border border-[#2d2d2d] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2d2d] flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Detail Achievement</h2>
          <button onClick={onClose}
            className="p-2 rounded-lg text-[#737373] hover:text-white hover:bg-[#1f1f1f] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3">

          {/* Image viewer — 2/3 */}
          <div className="lg:col-span-2 bg-[#171717] flex flex-col items-center justify-center p-6 relative">
            {achievement.image ? (
              <div className="overflow-auto max-h-[60vh] flex items-center justify-center">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  style={{ transform: `scale(${zoom / 100})`, transition: 'transform 0.2s ease' }}
                  className="max-w-full object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-[#262626] border border-[#333] flex items-center justify-center">
                <Icon size={48} className={meta.color} />
              </div>
            )}

            {/* Zoom controls */}
            {achievement.image && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-full px-3 py-2">
                <button
                  onClick={() => setZoom((z) => Math.max(50, z - 10))}
                  className="p-1 text-[#737373] hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs text-white font-mono w-10 text-center">{zoom}%</span>
                <button
                  onClick={() => setZoom((z) => Math.min(200, z + 10))}
                  className="p-1 text-[#737373] hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Info panel — 1/3 */}
          <div className="p-6 space-y-6 border-t lg:border-t-0 lg:border-l border-[#2d2d2d]">

            {/* Issuer */}
            <div className="flex items-center gap-3 pb-5 border-b border-[#2d2d2d]">
              <div className="w-10 h-10 bg-[#262626] border border-[#333] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={18} className={meta.color} />
              </div>
              <h3 className="text-white font-bold">{achievement.issuer}</h3>
            </div>

            {/* Credential ID */}
            {achievement.credential_id && (
              <div>
                <p className="text-xs text-[#525252] uppercase tracking-wider mb-1.5">Credential ID</p>
                <p className="text-white font-mono text-sm">{achievement.credential_id}</p>
              </div>
            )}

            {/* Type + Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#525252] uppercase tracking-wider mb-1.5">Type</p>
                <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${meta.bg} ${meta.color}`}>
                  {meta.label}
                </span>
              </div>
              {achievement.level && (
                <div>
                  <p className="text-xs text-[#525252] uppercase tracking-wider mb-1.5">Level</p>
                  <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${levelColor[achievement.level] ?? levelColor.Intermediate}`}>
                    {achievement.level}
                  </span>
                </div>
              )}
            </div>

            {/* Dates */}
            {(achievement.issue_date || achievement.expiration_date) && (
              <div className="grid grid-cols-2 gap-4">
                {achievement.issue_date && (
                  <div>
                    <p className="text-xs text-[#525252] uppercase tracking-wider mb-1.5">Issue Date</p>
                    <p className="text-white text-sm font-medium">{formatDate(achievement.issue_date)}</p>
                  </div>
                )}
                {achievement.expiration_date && (
                  <div>
                    <p className="text-xs text-[#525252] uppercase tracking-wider mb-1.5">Expiration Date</p>
                    <p className="text-white text-sm font-medium">{formatDate(achievement.expiration_date)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Categories */}
            {achievement.categories?.length > 0 && (
              <div>
                <p className="text-xs text-[#525252] uppercase tracking-wider mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {achievement.categories.map((cat) => (
                    <span key={cat} className="px-2.5 py-1 text-xs font-medium text-[#a3a3a3] bg-[#262626] border border-[#333] rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Credential link */}
            {achievement.credential_url && (
              <a
                href={achievement.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white hover:bg-gray-100 text-black text-sm font-semibold rounded-lg transition-colors mt-4"
              >
                <ExternalLink size={15} /> View credential!
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [imagesReady, setImagesReady] = useState(false);
  const sectionRef = useRef(null);

  const { data, isLoading, error, refetch } = useApi(getAchievements);
  const achievements = data?.data ?? [];

  const filtered = activeFilter === "all"
    ? achievements
    : achievements.filter((a) => a.type === activeFilter);

  // Preload images setiap kali filtered berubah
  useEffect(() => {
    if (!filtered.length) { setImagesReady(true); return; }
    setImagesReady(false);
    Promise.all(filtered.map((a) => preloadImage(a.image)))
      .then(() => setImagesReady(true));
  }, [filtered]);

  const counts = {
    all:           achievements.length,
    award:         achievements.filter((a) => a.type === "award").length,
    course:        achievements.filter((a) => a.type === "course").length,
    certification: achievements.filter((a) => a.type === "certification").length,
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filters = [
    { key: "all",           label: "All" },
    { key: "certification", label: "Certifications" },
    { key: "course",        label: "Courses" },
    { key: "award",         label: "Awards" },
  ];

  return (
    <div className="min-h-screen">
      <section ref={sectionRef} className="section">
        <div className="container">

          <div className={`mb-6 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="section-title">Achievements</h2>
            <div className="section-divider" />
            <p className="text-[#737373] max-w-xl mx-auto text-sm">
              Certifications, courses, and awards that reflect my commitment to continuous learning.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                  activeFilter === key
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-transparent border-[#2d2d2d] text-[#737373] hover:border-[#404040] hover:text-white"
                }`}
              >
                {label}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === key ? "bg-blue-700 text-blue-200" : "bg-[#262626] text-[#737373]"
                }`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {isLoading || !imagesReady ? (
            <Loading />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-[#262626] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-[#404040]" />
              </div>
              <h3 className="text-white font-semibold mb-2">No achievements found</h3>
              <p className="text-[#737373] text-sm">Try selecting a different filter.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {filtered.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="animate-fade-in-left"
                  style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "both" }}
                >
                  <AchievementCard
                    achievement={achievement}
                    onClick={() => setSelected(achievement)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <DetailModal achievement={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default Achievements;