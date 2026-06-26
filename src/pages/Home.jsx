import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GridBackground from "../components/common/grid-background/GridBackground.jsx";
import MyFoto from "../assets/images/my_foto.jpg";
import { TypeAnimation } from "react-type-animation";
import { ChevronRight, ArrowRight, ExternalLink, Github } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getFeaturedProjects } from "../services/api";

// ── Featured Project Card ─────────────────────────────────────────────────────
const FeaturedCard = ({ project }) => {
  const techStack = project.tech_stack ?? [];

  return (
    <div className="group flex flex-col h-full bg-[#262626] border border-[#2d2d2d] rounded-xl overflow-hidden hover:border-[#404040] transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent opacity-60" />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full ${
          project.category === 'data'
            ? 'bg-purple-500/80 text-white'
            : 'bg-blue-500/80 text-white'
        }`}>
          {project.category === 'data' ? 'Data Analytics' : 'Web Development'}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-[#a3a3a3] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
              {tag}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="px-2 py-1 text-xs text-[#737373] bg-[#333] rounded-full">
              +{techStack.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/projects/${project.id}`}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Detail <ArrowRight size={14} />
          </Link>
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#737373] rounded-lg transition-colors">
              <Github size={16} />
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#737373] rounded-lg transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
function Home() {
  const [isExpertiseVisible, setIsExpertiseVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible]   = useState(false);
  const expertiseRef = useRef(null);
  const projectsRef  = useRef(null);

  const { data, isLoading } = useApi(getFeaturedProjects);
  const featuredProjects = data?.data ?? [];

  useEffect(() => {
    const makeObserver = (setter) =>
      new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

    const obsExpertise = makeObserver(setIsExpertiseVisible);
    const obsProjects  = makeObserver(setIsProjectsVisible);

    if (expertiseRef.current) obsExpertise.observe(expertiseRef.current);
    if (projectsRef.current)  obsProjects.observe(projectsRef.current);

    return () => {
      obsExpertise.disconnect();
      obsProjects.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen pt-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <GridBackground>
        <section className="flex justify-center items-center h-[90vh] px-4 sm:px-6 lg:px-8">
          <div className="container flex flex-col-reverse justify-between items-center md:flex-row min-h-[50vh] gap-8 md:gap-12">

            {/* Text */}
            <div className="flex-1 max-w-2xl mx-auto text-wrap">
              <p className="mb-2 text-sm font-semibold sm:text-base lg:text-lg text-gradient text-start">
                <TypeAnimation sequence={["Hello, My name is"]} speed={50} repeat={0} cursor={false} />
              </p>
              <h1 className="mb-2 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-5xl xl:text-6xl text-start">
                <TypeAnimation sequence={[1000, "Zidane Abbas M"]} speed={50} repeat={0} cursor={false} />
              </h1>
              <h2 className="mb-4 text-lg font-semibold text-[#a3a3a3] sm:text-xl md:text-2xl lg:text-3xl text-start">
                <TypeAnimation sequence={[2500, "Web Developer", 2500, "Data Analytics"]} speed={50} repeat={Infinity} />
              </h2>
              <p className="text-sm leading-relaxed text-[#737373] sm:text-base lg:text-lg text-start">
                <TypeAnimation
                  sequence={[3000, "I build exceptional digital experiences and extract meaningful insights from data. Specializing in elegant web solutions and powerful analytics tools."]}
                  speed={80}
                  repeat={0}
                  cursor={false}
                />
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 mt-8 flex-wrap">
                <Link to="/projects" className="btn-primary">
                  View Projects <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="flex items-center justify-center flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                <img
                  src={MyFoto}
                  alt="Zidane Abbas Mallaniung"
                  className="relative object-cover w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl border border-[#2d2d2d]"
                />
              </div>
            </div>
          </div>
        </section>
      </GridBackground>

      {/* ── Expertise ────────────────────────────────────────────────────── */}
      <section ref={expertiseRef} className="section">
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-700 ${isExpertiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="section-title">My Expertise</h2>
            <div className="section-divider" />
          </div>

          <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 transition-all duration-700 delay-200 ${isExpertiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Web Dev */}
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-9 h-9 mr-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Web Development</h3>
              </div>
              <div className="space-y-3">
                {['React & Vite', 'Node.js & Express', 'Laravel / PHP', 'Responsive UI/UX Design', 'RESTful API Development', 'MySQL & PostgreSQL'].map((item) => (
                  <div key={item} className="flex items-center text-[#a3a3a3] hover:text-white transition-colors">
                    <ChevronRight className="text-blue-400 mr-2 flex-shrink-0" size={16} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Science */}
            <div className="card">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-9 h-9 mr-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Data Analyst</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Data Cleaning & Transformation',
                  'Exploratory Data Analysis (EDA)',
                  'SQL Data Analysis & Reporting',
                  'Python (Pandas, NumPy, Matplotlib, Seaborn)',
                  'Power BI Dashboard Development',
                  'Data Visualization & Insights',
                  'Business Intelligence & Reporting',
                  'Excel Analytics'
                ].map((item) => (
                  <div key={item} className="flex items-center text-[#a3a3a3] hover:text-white transition-colors">
                    <ChevronRight className="text-purple-400 mr-2 flex-shrink-0" size={16} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <section ref={projectsRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-700 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider" />
            <p className="text-[#737373] max-w-xl mx-auto text-sm">
              A selection of my recent work across web development and data analytics.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#262626] border border-[#2d2d2d] rounded-xl h-72 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {featuredProjects.map((project) => (
                <FeaturedCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/projects" className="btn-secondary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;