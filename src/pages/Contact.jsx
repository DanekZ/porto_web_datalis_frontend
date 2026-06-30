import { useState, useEffect } from "react";
import { Mail, MapPin, Clock, Github, Linkedin, Instagram } from "lucide-react";
import { getSettings } from "../services/api";
import { useApi } from "../hooks/useApi";

const Contact = () => {
  const { data: settingsData, isLoading: settingsLoading, error: settingsError } = useApi(getSettings);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const time = now.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const date = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Makassar",
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      setLocalTime(`${time} WITA — ${date}`);
    };

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    const mailUser = settingsData?.data?.site_email || ""

    const mailtoLink = `mailto:${mailUser}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}
Email: ${email}

${message}`,
    )}`;

    window.location.href = mailtoLink;
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/DanekZ",
      icon: Github,
      color: "text-white",
      bg: "bg-[#262626] hover:bg-[#333] border-[#333] hover:border-[#404040]",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/zidane-abbas-m-413536258/",
      icon: Linkedin,
      color: "text-blue-400",
      bg: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 hover:border-blue-500/40",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/dane_zdn/",
      icon: Instagram,
      color: "text-pink-400",
      bg: "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20 hover:border-pink-500/40",
    },
  ];

  const inputClass = "w-full px-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white placeholder-[#525252] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300";

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="pb-0 section">
        <div className="container">
          <div className="text-center">
            <h1 className="section-title">Get In Touch</h1>

            <div className="section-divider" />

            <p className="text-[#737373] max-w-xl mx-auto text-sm">Have a project in mind or want to collaborate? Feel free to reach out — I'll get back to you as soon as possible.</p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="pt-10 section">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl p-8">
              <h2 className="mb-6 text-lg font-bold text-white">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#a3a3a3] mb-2">Name</label>

                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Zidane Abbas" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#a3a3a3] mb-2">Email</label>

                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="hello@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#a3a3a3] mb-2">Subject</label>

                  <select name="subject" value={formData.subject} onChange={handleChange} required className={inputClass}>
                    <option value="" disabled>
                      Select a topic
                    </option>

                    <option value="Project Collaboration">Project Collaboration</option>

                    <option value="Job Opportunity">Job Opportunity</option>

                    <option value="Consultation">Consultation</option>

                    <option value="Data Analytics Service">Data Analytics Service</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#a3a3a3] mb-2">Message</label>

                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell me about your project or inquiry..." className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" className="justify-center w-full btn-primary">
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}

            <div className="space-y-4 lg:col-span-2">
              {/* Email */}

              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5 flex items-start gap-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border rounded-lg bg-blue-500/10 border-blue-500/20">
                  <Mail size={18} className="text-blue-400" />
                </div>

               <div>
                  {settingsLoading ? (
                    <>
                      <div className="w-12 h-4 mb-2 bg-[#2d2d2d] rounded animate-pulse"></div>
                      <div className="w-48 h-4 bg-[#2d2d2d] rounded animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      <h3 className="mb-1 text-sm font-semibold text-white">
                        Email
                      </h3>

                      <a
                        href={`mailto:${settingsData?.data?.site_email || "zidaneabbas99@gmail.com"}`}
                        className="text-sm text-[#737373] hover:text-blue-400 transition-colors"
                      >
                        {settingsData?.data?.site_email || "zidaneabbas99@gmail.com"}
                      </a>
                    </>
                  )}
                </div>
              </div>

             {/* Location */}

            <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5 flex items-start gap-4">

              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border rounded-lg bg-green-500/10 border-green-500/20">
                <MapPin size={18} className="text-green-400" />
              </div>


              <div>

                {settingsLoading ? (
                  <>
                    <div className="w-16 h-4 mb-2 bg-[#2d2d2d] rounded animate-pulse"></div>

                    <div className="w-40 h-4 mb-2 bg-[#2d2d2d] rounded animate-pulse"></div>

                    <div className="w-20 h-4 bg-[#2d2d2d] rounded animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <h3 className="mb-1 text-sm font-semibold text-white">
                      Location
                    </h3>

                    <p className="text-sm text-[#737373]">
                      {settingsData?.location || "Bontang, East Kalimantan"}
                    </p>

                    <p className="text-sm text-[#737373]">
                      {settingsData?.country || "Indonesia"}
                    </p>
                  </>
                )}

              </div>

            </div>

              {/* Time */}

              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5 flex items-start gap-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 border rounded-lg bg-purple-500/10 border-purple-500/20">
                  <Clock size={18} className="text-purple-400" />
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">Local Time</h3>

                  <p className="text-sm text-[#737373] font-mono">{localTime}</p>
                </div>
              </div>

              {/* Social */}

              <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">Find me on</h3>

                <div className="space-y-3">
                  {socialLinks.map(({ name, url, icon: Icon, color, bg }) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-300 ${bg} ${color}`}>
                      <Icon size={16} />
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}

              <div className="p-5 text-center border bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/20 rounded-xl">
                <p className="mb-1 font-semibold text-white">Open for opportunities</p>

                <p className="text-[#737373] text-xs">Available for freelance projects, collaborations, and full-time roles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
