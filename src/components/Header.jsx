import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSettings } from "../services/api";
import { useApi } from "../hooks/useApi";


const Header = () => {
  const { data: settingsData, isLoading: settingsLoading, error: settingsError } = useApi(getSettings);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#171717]/95 backdrop-blur-md border-b border-[#2d2d2d]'
          : 'bg-transparent'
      }`}
    >
      <div className="container px-6 mx-auto">
        <div className="flex justify-between items-center h-16">

          {/* Brand */}
          <Link
            to="/"
            className="text-white font-bold text-lg tracking-tight hover:text-blue-400 transition-colors"
            style={{ fontWeight: 700, fontSize: '24px' }}
          >
            Zidane<span className="text-blue-400">.</span>
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden gap-8 items-center md:flex">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${
                  isActive(path) ? 'active text-white' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>


         {/* Desktop Download Resume */}
        <div className="hidden md:flex items-center">

          {settingsLoading ? (
            <div className="w-24 h-10 bg-[#2d2d2d] rounded-lg animate-pulse"></div>
          ) : (
            <a
              href={settingsData.data?.resume_url || "/resume.pdf"}
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-[#404040] rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>

              Resume
            </a>
          )}

        </div>


          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#a3a3a3] hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>


       {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="py-4 border-t md:hidden border-[#2d2d2d]">

          <div className="flex flex-col gap-4">

            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${
                  isActive(path) ? 'active text-white' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}


            {/* Mobile Resume */}
            {settingsLoading ? (
              <div className="w-40 h-5 bg-[#2d2d2d] rounded animate-pulse"></div>
            ) : (
              <a
                href={settingsData?.data?.resume_url || "/resume.pdf"}
                download
                className="flex items-center gap-2 text-sm font-medium text-blue-400"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>

                Download Resume
              </a>
            )}

          </div>
        </div>
      )}

      </div>
    </header>
  );
};

export default Header;