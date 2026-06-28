import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useApi } from "../../../hooks/useApi";
import { adminGetAchievements, adminCreateAchievement, adminUpdateAchievement, adminDeleteAchievement } from "../../../services/adminApi";

const inputClass = "w-full px-3 py-2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all";
const labelClass = "block text-xs font-medium text-[#a3a3a3] mb-1.5";
const emptyForm = { title: "", issuer: "", type: "certification", image: "", credential_url: "", year: "", sort_order: 0 };

const typeColor = {
  award: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  course: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  certification: "bg-green-500/10 text-green-400 border-green-500/20",
};

const AchievementList = () => {
  const { data, isLoading, refetch } = useApi(adminGetAchievements);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const achievements = data?.data ?? [];

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };
  const openEdit = (a) => {
    setForm({ title: a.title, issuer: a.issuer, type: a.type, image: a.image ?? "", credential_url: a.credential_url ?? "", year: a.year ?? "", sort_order: a.sort_order ?? 0 });
    setEditingId(a.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await adminUpdateAchievement(editingId, form);
      } else {
        await adminCreateAchievement(form);
      }
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Hapus achievement "${title}"?`)) return;
    try {
      await adminDeleteAchievement(id);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Achievements</h1>
          <p className="text-[#737373] text-xs mt-0.5">{achievements.length} total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {showForm && (
        <div className="bg-[#141414] border border-blue-500/30 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">{editingId ? "Edit Achievement" : "New Achievement"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
                <option value="certification">Certification</option>
                <option value="course">Course</option>
                <option value="award">Award</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Certificate name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Issuer *</label>
            <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} placeholder="Issued by" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Credential URL</label>
            <input value={form.credential_url} onChange={(e) => setForm({ ...form, credential_url: e.target.value })} placeholder="https://..." className={inputClass} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Achievement"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#2d2d2d] text-[#737373] hover:text-white text-sm rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center text-[#737373] text-sm py-8">Loading...</div>
        ) : achievements.length === 0 ? (
          <div className="text-center text-[#737373] text-sm py-8">No achievements yet.</div>
        ) : (
          achievements.map((a) => (
            <div key={a.id} className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex gap-4 hover:border-[#2d2d2d] transition-colors">
              {a.image && <img src={a.image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-[#1f1f1f]" />}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${typeColor[a.type]}`}>{a.type}</span>
                  {a.year && <span className="text-xs text-[#525252]">{a.year}</span>}
                </div>
                <h3 className="text-sm font-semibold text-white">{a.title}</h3>
                <p className="text-[#737373] text-xs">{a.issuer}</p>
              </div>
              <div className="flex flex-shrink-0 gap-1">
                <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(a.id, a.title)} className="p-1.5 rounded-lg text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AchievementList;
