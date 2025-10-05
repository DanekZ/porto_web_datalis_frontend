import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md bg-slate-900/80 border-slate-700/50">
      <div className="container px-6 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex gap-3 items-center">
            <span className="text-xl font-bold text-white">My Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 items-center md:flex">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
              About
            </Link>
            {/* <Link to="/projects" className={`nav-link ${isActive("/projects") ? "active" : ""}`}>
              Projects
            </Link>
            <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
              Contact
            </Link> */}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="transition-colors md:hidden text-slate-300 hover:text-blue-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="py-4 border-t md:hidden border-slate-700/50">
            <div className="flex flex-col gap-4">
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/projects" className={`nav-link ${isActive("/projects") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Projects
              </Link>
              <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
