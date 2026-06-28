import { useAuth } from "../../hooks/useAuth.jsx";
import { useApi } from "../../hooks/useApi";
import { adminGetProjects, adminGetSkills, adminGetExperiences, adminGetAchievements, adminGetEducations } from "../../services/adminApi";
import { FolderKanban, Wrench, Briefcase, Trophy, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ label, count, icon: Icon, color, path }) => (
  <Link to={path} className="group bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between hover:border-[#2d2d2d] transition-all duration-200">
    <div>
      <p className="text-[#737373] text-xs font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{count ?? "—"}</p>
    </div>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={20} />
    </div>
  </Link>
);

const Dashboard = () => {
  const { user } = useAuth();

  const { data: projectsData } = useApi(adminGetProjects);
  const { data: skillsData } = useApi(adminGetSkills);
  const { data: expData } = useApi(adminGetExperiences);
  const { data: achData } = useApi(adminGetAchievements);
  const { data: eduData } = useApi(adminGetEducations);

  const projects = projectsData?.data ?? [];
  const experiences = expData?.data ?? [];
  const achievements = achData?.data ?? [];
  const educations = eduData?.data ?? [];

  // Skills datanya grouped object, flatten dulu
  const skillsRaw = skillsData?.data ?? {};
  const skillsCount = Object.values(skillsRaw).flat().length;

  const stats = [
    { label: "Projects", count: projects.length, icon: FolderKanban, color: "bg-blue-500/10 text-blue-400", path: "/admin/projects" },
    { label: "Skills", count: skillsCount, icon: Wrench, color: "bg-purple-500/10 text-purple-400", path: "/admin/skills" },
    { label: "Experiences", count: experiences.length, icon: Briefcase, color: "bg-green-500/10 text-green-400", path: "/admin/experiences" },
    { label: "Achievements", count: achievements.length, icon: Trophy, color: "bg-yellow-500/10 text-yellow-400", path: "/admin/achievements" },
    { label: "Educations", count: educations.length, icon: GraduationCap, color: "bg-pink-500/10 text-pink-400", path: "/admin/educations" },
  ];

  const recentProjects = projects.slice(0, 5);
  const featuredCount = projects.filter((p) => p.featured).length;
  const webCount = projects.filter((p) => p.category === "web").length;
  const dataCount = projects.filter((p) => p.category === "data").length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-white">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-[#737373] text-sm mt-1">Here's an overview of your portfolio content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Projects</h2>
            <Link to="/admin/projects" className="flex items-center gap-1 text-xs text-blue-400 transition-colors hover:text-blue-300">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <p className="text-[#525252] text-sm">No projects yet.</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between py-2.5 border-b border-[#1f1f1f] last:border-0">
                  <div className="flex items-center min-w-0 gap-3">
                    {project.thumbnail ? <img src={project.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-[#1f1f1f]" /> : <div className="w-8 h-8 rounded-lg bg-[#1f1f1f] flex-shrink-0" />}
                    <p className="text-sm font-medium text-white truncate">{project.title}</p>
                  </div>
                  <div className="flex items-center flex-shrink-0 gap-2 ml-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${project.category === "data" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}>
                      {project.category === "data" ? "Data" : "Web"}
                    </span>
                    <Link to={`/admin/projects/${project.id}/edit`} className="text-xs text-[#737373] hover:text-white transition-colors">
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project breakdown */}
        <div className="space-y-4">
          {/* Category breakdown */}
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Projects Breakdown</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#737373]">Web Development</span>
                  <span className="font-medium text-white">{webCount}</span>
                </div>
                <div className="w-full bg-[#1f1f1f] rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-700" style={{ width: projects.length ? `${(webCount / projects.length) * 100}%` : "0%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#737373]">Data Analytics</span>
                  <span className="font-medium text-white">{dataCount}</span>
                </div>
                <div className="w-full bg-[#1f1f1f] rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-700" style={{ width: projects.length ? `${(dataCount / projects.length) * 100}%` : "0%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#737373]">Featured</span>
                  <span className="font-medium text-white">{featuredCount}</span>
                </div>
                <div className="w-full bg-[#1f1f1f] rounded-full h-1.5">
                  <div className="bg-yellow-500 h-1.5 rounded-full transition-all duration-700" style={{ width: projects.length ? `${(featuredCount / projects.length) * 100}%` : "0%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Add New Project", path: "/admin/projects/create" },
                { label: "Manage Skills", path: "/admin/skills" },
                { label: "Manage Experiences", path: "/admin/experiences" },
                { label: "Manage Achievements", path: "/admin/achievements" },
                { label: "Site Settings", path: "/admin/settings" },
              ].map(({ label, path }) => (
                <Link key={path} to={path} className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-[#737373] hover:text-white hover:bg-[#1f1f1f] transition-all">
                  {label}
                  <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
