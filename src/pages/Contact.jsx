import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-gradient">Get In</span>
              <span className="text-white"> Touch</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">Let's Connect</h2>
              
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <p className="text-slate-300">john.doe@example.com</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Phone</h3>
                      <p className="text-slate-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Location</h3>
                      <p className="text-slate-300">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Follow Me</h3>
                <div className="flex gap-4">
                  <a href="#" className="btn-secondary">
                    💼 LinkedIn
                  </a>
                  <a href="#" className="btn-secondary">
                    🐙 GitHub
                  </a>
                  <a href="#" className="btn-secondary">
                    🐦 Twitter
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h2 className="text-3xl font-bold mb-6 text-white">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or idea..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Let's Build Something Amazing</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Whether you have a project in mind or just want to chat about technology, 
              I'm always excited to connect with fellow developers and potential collaborators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:john.doe@example.com" className="btn-primary">
                📧 Email Me Directly
              </a>
              <a href="#" className="btn-secondary">
                📅 Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;