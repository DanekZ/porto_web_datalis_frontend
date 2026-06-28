import { Outlet, Navigate, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LayoutDashboard, FolderKanban, Wrench, Briefcase, Trophy, GraduationCap, Settings, LogOut, User } from "lucide-react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/projects", label: "Projects", icon: FolderKanban },
  { path: "/admin/skills", label: "Skills", icon: Wrench },
  { path: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { path: "/admin/achievements", label: "Achievements", icon: Trophy },
  { path: "/admin/educations", label: "Educations", icon: GraduationCap },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );

  if (!user) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-[#141414] border-r border-[#1f1f1f] flex flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-[#1f1f1f]">
          <span className="text-lg font-bold text-white">
            Zidane<span className="text-blue-400">.</span>
            <span className="text-xs text-[#525252] font-normal ml-2">admin</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-[#737373] hover:text-white hover:bg-[#1f1f1f]"}`}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-[#1f1f1f] space-y-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex items-center justify-center flex-shrink-0 bg-blue-600 rounded-full w-7 h-7">
              <User size={14} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.name}</p>
              <p className="text-[#525252] text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-[#141414] border-b border-[#1f1f1f] flex items-center px-6">
          <h1 className="text-sm font-semibold text-white">Portfolio Admin Panel</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
