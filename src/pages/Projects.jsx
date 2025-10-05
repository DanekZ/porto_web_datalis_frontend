import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["Vue.js", "Socket.io", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      tags: ["React", "API Integration", "Charts"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media metrics with data visualization, reporting features, and automated insights.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["Python", "Django", "D3.js"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations and optimized performance.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      tags: ["React", "Tailwind", "Vite"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 6,
      title: "Learning Management System",
      description: "A comprehensive LMS with course creation, student progress tracking, video streaming, and interactive quizzes.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
      tags: ["Next.js", "Prisma", "AWS"],
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  const skills = [
    "React", "Vue.js", "Node.js", "Python", "JavaScript", "TypeScript", 
    "MongoDB", "PostgreSQL", "Express.js", "Django", "Next.js", "Tailwind CSS",
    "Socket.io", "REST APIs", "GraphQL", "AWS", "Docker", "Git"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-gradient">My</span>
              <span className="text-white"> Projects</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and creative solutions. Each project represents a unique challenge and learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex gap-4 mt-auto">
                  <a 
                    href={project.github} 
                    className="btn-secondary flex-1 text-center"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.demo} 
                    className="btn-primary flex-1 text-center"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Technologies & Skills</h2>
            <p className="text-xl text-slate-300 mb-8">
              Technologies and tools I use to bring projects to life
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium hover:bg-blue-500/20 hover:text-blue-400 transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Let's Work Together</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Interested in collaborating on a project? I'm always open to discussing new opportunities and creative challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Start a Project
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;