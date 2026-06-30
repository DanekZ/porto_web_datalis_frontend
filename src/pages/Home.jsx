import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GridBackground from "../components/common/grid-background/GridBackground.jsx";
import MyFoto from "../assets/images/my_foto.jpg";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, ExternalLink, Github, Mail } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getFeaturedProjects } from "../services/api";

const preloadImage = (src) =>
  new Promise((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve;
  });

const FloatingPhoto = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -15, y: dx * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHover(false);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Gantungan */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-2 bg-gradient-to-r from-[#2d2d2d] via-[#404040] to-[#2d2d2d] rounded-full" />
        <div
          className="w-0.5 bg-gradient-to-b from-[#404040] to-[#2d2d2d]"
          style={{
            height: "32px",
            transform: `rotate(${tilt.y * 0.3}deg)`,
            transformOrigin: "top center",
            transition: "transform 0.3s ease",
          }}
        />
        <div className="w-2 h-2 bg-[#404040] rounded-full" />
      </div>

      {/* Photo */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHover ? "scale(1.03)" : "scale(1)"}`,
          transition: isHover ? "transform 0.1s ease" : "transform 0.5s ease",
        }}
      >
        {/* Animated glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-2xl opacity-60 animate-pulse"
          style={{
            background: "radial-gradient(ellipse, #3b82f6 0%, #8b5cf6 50%, transparent 70%)",
            transform: "scale(1.2)",
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl blur-3xl opacity-40"
          style={{
            background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
            transform: "scale(1.3)",
            animation: "rotateConic 6s linear infinite",
          }}
        />

        {/* Image */}
        <img src={src} alt={alt} draggable={false} className="relative z-10 object-cover rounded-2xl border border-[#2d2d2d]/50 shadow-2xl" style={{ width: "260px", height: "260px" }} />

        {/* Shine */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      </div>

      <style>{`
        @keyframes rotateConic {
          from { transform: scale(1.3) rotate(0deg); }
          to   { transform: scale(1.3) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ── Featured Card ─────────────────────────────────────────────────────────────
const FeaturedCard = ({ project }) => {
  const techStack = project.tech_stack ?? [];
  return (
    <div className="group flex flex-col h-full bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl overflow-hidden hover:border-[#404040] transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden bg-[#0d0d0d]">
          <img src={project.thumbnail} alt={project.title}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full ${
            project.category === "data" ? "bg-purple-500/80 text-white" : "bg-blue-500/80 text-white"
          }`}>
            {project.category === "data" ? "Data Analytics" : "Web Development"}
          </span>
        </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-blue-400">{project.title}</h3>
        <p className="text-[#a3a3a3] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs text-blue-400 border rounded-full bg-blue-500/10 border-blue-500/20">
              {tag}
            </span>
          ))}
          {techStack.length > 3 && <span className="px-2 py-1 text-xs text-[#737373] bg-[#262626] rounded-full">+{techStack.length - 3}</span>}
        </div>
        <div className="flex gap-2">
          <Link to={`/projects/${project.id}`} className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            Detail <ArrowRight size={14} />
          </Link>
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#737373] rounded-lg transition-colors">
              <Github size={16} />
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#737373] rounded-lg transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
function Home() {
    const [isProjectsVisible, setProjectsVisible] = useState(false);
    const [isCtaVisible,      setCtaVisible]      = useState(false);
    const [imagesReady,       setImagesReady]     = useState(false);
    const projectsRef = useRef(null);
    const ctaRef      = useRef(null);

    const { data, isLoading } = useApi(getFeaturedProjects);
    const featuredProjects = data?.data ?? [];

    // Preload gambar setelah data didapat
    useEffect(() => {
      if (!featuredProjects.length) { setImagesReady(false); return; }
      setImagesReady(false);
      Promise.all(featuredProjects.map((p) => preloadImage(p.thumbnail)))
        .then(() => setImagesReady(true));
    }, [featuredProjects]);

    useEffect(() => {
      const makeObserver = (setter) =>
        new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setter(true); },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

      const obsProjects = makeObserver(setProjectsVisible);
      const obsCta      = makeObserver(setCtaVisible);

      if (projectsRef.current) obsProjects.observe(projectsRef.current);
      if (ctaRef.current)      obsCta.observe(ctaRef.current);

      return () => { obsProjects.disconnect(); obsCta.disconnect(); };
    }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <GridBackground>
        <section className="flex justify-center items-center min-h-[90vh] px-4 sm:px-6 lg:px-8">
          <div className="container flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-16">
            {/* Text */}
            <div className="flex-1 max-w-2xl">
              <p className="mb-2 text-sm font-semibold sm:text-base lg:text-lg text-gradient">
                <TypeAnimation sequence={["Hello, My name is"]} speed={50} repeat={0} cursor={false} />
              </p>
              <h1 className="mb-2 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-5xl xl:text-6xl">
                <TypeAnimation sequence={[1000, "Zidane Abbas M"]} speed={50} repeat={0} cursor={false} />
              </h1>
              <h2 className="mb-4 text-lg font-semibold text-[#a3a3a3] sm:text-xl md:text-2xl lg:text-3xl">
                <TypeAnimation sequence={[2500, "Web Developer", 2500, "Data Analytics"]} speed={50} repeat={Infinity} />
              </h2>
              <p className="text-sm leading-relaxed text-[#737373] sm:text-base lg:text-lg">
                <TypeAnimation
                  sequence={[3000, "I build exceptional digital experiences and extract meaningful insights from data. Specializing in elegant web solutions and powerful analytics tools."]}
                  speed={80}
                  repeat={0}
                  cursor={false}
                />
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/projects" className="btn-primary">
                  View Projects <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Floating Photo */}
            <div className="flex items-start justify-center flex-1 pt-0">
              <FloatingPhoto src={MyFoto} alt="Zidane Abbas Mallaniung" />
            </div>
          </div>
        </section>
      </GridBackground>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <section ref={projectsRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-700 ${
            isProjectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider" />
            <p className="text-[#737373] max-w-xl mx-auto text-sm">
              A selection of my recent work across web development and data analytics.
            </p>
          </div>

          {isLoading || !imagesReady ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl h-72 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
              isProjectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-in-left"
                  style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "both" }}
                >
                  <FeaturedCard project={project} />
                </div>
              ))}
            </div>
          )}

          <div className={`mt-10 text-center transition-all duration-700 delay-300 ${
            isProjectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <Link to="/projects" className="btn-secondary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-700 ${isCtaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl" />
              <div className="relative bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-10">
                <h2 className="mb-3 text-3xl font-bold text-white">
                  Let's build something <span className="text-gradient">great</span> together
                </h2>
                <p className="text-[#737373] text-sm leading-relaxed mb-8">Available for freelance projects, collaborations, and full-time opportunities. Feel free to reach out!</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="btn-primary">
                    <Mail size={16} /> Get In Touch
                  </Link>
                  <Link to="/projects" className="btn-secondary">
                    View My Work <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
