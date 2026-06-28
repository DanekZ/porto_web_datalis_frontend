import { useState } from "react";
import { Plus, Trash2, Check, X, Search } from "lucide-react";
import { useApi } from "../../../hooks/useApi";
import { adminGetSkills, adminCreateSkill, adminUpdateSkill, adminDeleteSkill } from "../../../services/adminApi";
import * as si from "simple-icons";

// ── Helpers ───────────────────────────────────────────────────────────────────

// Cari icon dari simple-icons berdasarkan nama
const findIcon = (name) => {
  if (!name) return null;
  const key = `si${name.charAt(0).toUpperCase()}${name
    .slice(1)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}`;
  return si[key] ?? null;
};

// Daftar teknologi populer dengan nama simple-icons dan warna resminya
const popularTech = [
  // Web
  { name: "HTML", icon: "html5", color: "#E34F26", category: "web" },
  { name: "CSS", icon: "css3", color: "#1572B6", category: "web" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E", category: "web" },
  { name: "TypeScript", icon: "typescript", color: "#3178C6", category: "web" },
  { name: "React", icon: "react", color: "#61DAFB", category: "web" },
  { name: "Vue.js", icon: "vuedotjs", color: "#4FC08D", category: "web" },
  { name: "Next.js", icon: "nextdotjs", color: "#000000", category: "web" },
  { name: "Vite", icon: "vite", color: "#646CFF", category: "web" },
  { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4", category: "web" },
  { name: "Laravel", icon: "laravel", color: "#FF2D20", category: "web" },
  { name: "PHP", icon: "php", color: "#777BB4", category: "web" },
  { name: "Node.js", icon: "nodedotjs", color: "#339933", category: "web" },
  { name: "Express", icon: "express", color: "#000000", category: "web" },
  { name: "MySQL", icon: "mysql", color: "#4479A1", category: "web" },
  { name: "PostgreSQL", icon: "postgresql", color: "#4169E1", category: "web" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248", category: "web" },
  { name: "Redis", icon: "redis", color: "#DC382D", category: "web" },
  { name: "Docker", icon: "docker", color: "#2496ED", category: "web" },
  { name: "Git", icon: "git", color: "#F05032", category: "web" },
  { name: "GitHub", icon: "github", color: "#181717", category: "web" },
  // Data
  { name: "Python", icon: "python", color: "#3776AB", category: "data" },
  { name: "R", icon: "r", color: "#276DC3", category: "data" },
  { name: "Pandas", icon: "pandas", color: "#150458", category: "data" },
  { name: "NumPy", icon: "numpy", color: "#013243", category: "data" },
  { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00", category: "data" },
  { name: "Keras", icon: "keras", color: "#D00000", category: "data" },
  { name: "Jupyter", icon: "jupyter", color: "#F37626", category: "data" },
  { name: "Streamlit", icon: "streamlit", color: "#FF4B4B", category: "data" },
  { name: "Plotly", icon: "plotly", color: "#3F4F75", category: "data" },
  { name: "Power BI", icon: "powerbi", color: "#F2C811", category: "data" },
  { name: "Tableau", icon: "tableau", color: "#E97627", category: "data" },
  { name: "Excel", icon: "microsoftexcel", color: "#217346", category: "data" },
  { name: "Kaggle", icon: "kaggle", color: "#20BEFF", category: "data" },
];

// ── Icon Badge ────────────────────────────────────────────────────────────────
const IconBadge = ({ name, iconSlug, color, size = 20 }) => {
  const icon = findIcon(iconSlug || name.toLowerCase().replace(/[^a-z0-9]/g, ""));
  return (
    <div className="flex items-center gap-2">
      {icon ? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color || `#${icon.hex}`}>
          <path d={icon.path} />
        </svg>
      ) : (
        <div className="w-5 h-5 rounded bg-[#333]" />
      )}
      <span className="text-sm font-medium text-white">{name}</span>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const inputClass = "w-full px-3 py-2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all";

const emptyForm = { name: "", category: "web", icon: "", color: "", sort_order: 0 };

const SkillList = () => {
  const { data, isLoading, refetch } = useApi(adminGetSkills);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null); // 'add' | 'edit'

  const grouped = data?.data ?? {};
  const allSkills = Object.entries(grouped).flatMap(([cat, skills]) => skills.map((s) => ({ ...s, category: cat })));

  const filteredTech = popularTech.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  const selectTech = (tech) => {
    if (pickerTarget === "add") {
      setAddForm({ ...addForm, name: tech.name, icon: tech.icon, color: tech.color, category: tech.category });
    } else {
      setEditForm({ ...editForm, name: tech.name, icon: tech.icon, color: tech.color, category: tech.category });
    }
    setShowPicker(false);
    setSearch("");
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setEditForm({ name: skill.name, category: skill.category, icon: skill.icon ?? "", color: skill.color ?? "", sort_order: skill.sort_order ?? 0 });
  };

  const handleSave = async (id) => {
    setSaving(true);
    try {
      await adminUpdateSkill(id, editForm);
      setEditingId(null);
      refetch();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus skill "${name}"?`)) return;
    try {
      await adminDeleteSkill(id);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async () => {
    if (!addForm.name.trim()) return;
    setSaving(true);
    try {
      await adminCreateSkill(addForm);
      setAddForm(emptyForm);
      setShowAdd(false);
      refetch();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const categoryColor = {
    web: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    data: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    other: "bg-[#262626] text-[#737373] border-[#333]",
  };

  return (
    <div className="max-w-3xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Skills</h1>
          <p className="text-[#737373] text-xs mt-0.5">{allSkills.length} total skills</p>
        </div>
        <button
          onClick={() => {
            setShowAdd(!showAdd);
            setShowPicker(false);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Icon Picker Modal */}
      {showPicker && (
        <div className="bg-[#141414] border border-blue-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Pick Technology</h3>
            <button onClick={() => setShowPicker(false)} className="text-[#737373] hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search technology..."
              className="w-full pl-8 pr-4 py-2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 pr-1 overflow-y-auto sm:grid-cols-4 max-h-64">
            {filteredTech.map((tech) => {
              const icon = findIcon(tech.icon);
              return (
                <button key={tech.name} onClick={() => selectTech(tech)} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#1a1a1a] border border-[#2d2d2d] hover:border-blue-500/50 hover:bg-[#262626] transition-all">
                  {icon ? (
                    <svg width={24} height={24} viewBox="0 0 24 24" fill={tech.color}>
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    <div className="w-6 h-6 rounded bg-[#333]" />
                  )}
                  <span className="text-xs text-[#a3a3a3] text-center leading-tight">{tech.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Form */}
      {showAdd && (
        <div className="bg-[#141414] border border-blue-500/30 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">New Skill</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-[#a3a3a3] mb-1.5">Technology</label>
              <div className="flex gap-2">
                <input value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="Skill name" className={`${inputClass} flex-1`} />
                <button
                  type="button"
                  onClick={() => {
                    setPickerTarget("add");
                    setShowPicker(true);
                  }}
                  className="px-3 py-2 bg-[#262626] hover:bg-[#333] border border-[#2d2d2d] rounded-lg text-white text-xs transition-colors whitespace-nowrap"
                >
                  Pick Icon
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#a3a3a3] mb-1.5">Category</label>
              <select value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })} className={inputClass}>
                <option value="web">Web Development</option>
                <option value="data">Data Analytics</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          {addForm.name && (
            <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#2d2d2d]">
              <span className="text-xs text-[#737373]">Preview:</span>
              <IconBadge name={addForm.name} iconSlug={addForm.icon} color={addForm.color} />
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={saving} className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving..." : "Save Skill"}
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setShowPicker(false);
              }}
              className="px-4 py-2 border border-[#2d2d2d] text-[#737373] hover:text-white text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Skills List grouped by category */}
      {isLoading ? (
        <div className="text-center text-[#737373] text-sm py-8">Loading...</div>
      ) : allSkills.length === 0 ? (
        <div className="text-center text-[#737373] text-sm py-8">No skills yet.</div>
      ) : (
        Object.entries(grouped).map(([cat, skills]) => (
          <div key={cat} className="bg-[#141414] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#1f1f1f] flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs rounded-full border ${categoryColor[cat]}`}>{cat === "web" ? "Web Development" : cat === "data" ? "Data Analytics" : "Other"}</span>
              <span className="text-[#525252] text-xs">{skills.length} skills</span>
            </div>
            <div className="divide-y divide-[#1f1f1f]">
              {skills.map((skill) => (
                <div key={skill.id} className="px-5 py-3 flex items-center gap-4 hover:bg-[#1a1a1a] transition-colors">
                  {editingId === skill.id ? (
                    // Edit mode
                    <div className="grid flex-1 grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className={`${inputClass} flex-1`} />
                        <button
                          type="button"
                          onClick={() => {
                            setPickerTarget("edit");
                            setShowPicker(true);
                          }}
                          className="px-2 py-1 bg-[#262626] hover:bg-[#333] border border-[#2d2d2d] rounded-lg text-white text-xs transition-colors"
                        >
                          Icon
                        </button>
                      </div>
                      <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className={inputClass}>
                        <option value="web">Web</option>
                        <option value="data">Data</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  ) : (
                    // View mode
                    <div className="flex-1">
                      <IconBadge name={skill.name} iconSlug={skill.icon} color={skill.color} />
                    </div>
                  )}

                  <div className="flex flex-shrink-0 gap-1">
                    {editingId === skill.id ? (
                      <>
                        <button onClick={() => handleSave(skill.id)} disabled={saving} className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/10 transition-all">
                          <Check size={15} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-[#737373] hover:bg-[#262626] transition-all">
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit({ ...skill, category: cat })} className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-all text-xs">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(skill.id, skill.name)} className="p-1.5 rounded-lg text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SkillList;
