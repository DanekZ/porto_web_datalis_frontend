import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, ExternalLink, Github } from "lucide-react";
import { useApi } from "../../../hooks/useApi";
import { adminGetProjects, adminDeleteProject } from "../../../services/adminApi";

const ProjectList = () => {
  const { data, isLoading, refetch } = useApi(adminGetProjects);
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const projects = data?.data ?? [];

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const handleDelete = async (id, title) => {
    if (!confirm(`Hapus project "${title}"?`)) return;
    setDeletingId(id);
    try {
      await adminDeleteProject(id);
      refetch();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Projects</h1>
          <p className="text-[#737373] text-xs mt-0.5">{projects.length} total projects</p>
        </div>
        <Link to="/admin/projects/create" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "web", "data"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              filter === f ? "bg-blue-600 border-blue-500 text-white" : "bg-transparent border-[#2d2d2d] text-[#737373] hover:text-white hover:border-[#404040]"
            }`}
          >
            {f === "all" ? "All" : f === "web" ? "Web Development" : "Data Analytics"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[#737373] text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#737373] text-sm">No projects found.</p>
            <Link to="/admin/projects/create" className="inline-block mt-2 text-sm text-blue-400 hover:text-blue-300">
              Add your first project
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#525252] uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#525252] uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#525252] uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#525252] uppercase tracking-wider hidden lg:table-cell">Links</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-[#525252] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {filtered.map((project) => (
                <tr key={project.id} className="hover:bg-[#1a1a1a] transition-colors">
                  {/* Project */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {project.thumbnail ? <img src={project.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-[#1f1f1f]" /> : <div className="w-10 h-10 rounded-lg bg-[#1f1f1f] flex-shrink-0" />}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-white truncate">{project.title}</p>
                          {project.featured && <Star size={12} className="flex-shrink-0 text-yellow-400" />}
                        </div>
                        <p className="text-[#525252] text-xs truncate mt-0.5">{(project.tech_stack ?? []).slice(0, 3).join(", ")}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${project.category === "data" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}>
                      {project.category === "data" ? "Data" : "Web"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="hidden px-5 py-4 lg:table-cell">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full border ${
                        project.status === "completed"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : project.status === "in-progress"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-[#262626] text-[#737373] border-[#333]"
                      }`}
                    >
                      {project.status === "in-progress" ? "In Progress" : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </td>

                  {/* Links */}
                  <td className="hidden px-5 py-4 lg:table-cell">
                    <div className="flex gap-2">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-[#525252] hover:text-white transition-colors">
                          <Github size={15} />
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-[#525252] hover:text-white transition-colors">
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/projects/${project.id}/edit`} className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-all">
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={deletingId === project.id}
                        className="p-1.5 rounded-lg text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
