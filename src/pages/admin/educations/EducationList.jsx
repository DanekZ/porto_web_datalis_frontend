import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useApi } from "../../../hooks/useApi";
import { adminGetEducations, adminCreateEducation, adminUpdateEducation, adminDeleteEducation } from "../../../services/adminApi";

const inputClass = "w-full px-3 py-2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all";
const labelClass = "block text-xs font-medium text-[#a3a3a3] mb-1.5";
const emptyForm = { institution: "", degree: "", field: "", start_year: "", end_year: "", location: "", gpa: "", logo: "", sort_order: 0 };

const EducationList = () => {
  const { data, isLoading, refetch } = useApi(adminGetEducations);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const educations = data?.data ?? [];

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };
  const openEdit = (e) => {
    setForm({ institution: e.institution, degree: e.degree, field: e.field, start_year: e.start_year, end_year: e.end_year ?? "", location: e.location ?? "", gpa: e.gpa ?? "", logo: e.logo ?? "", sort_order: e.sort_order ?? 0 });
    setEditingId(e.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.institution.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await adminUpdateEducation(editingId, form);
      } else {
        await adminCreateEducation(form);
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

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus education "${name}"?`)) return;
    try {
      await adminDeleteEducation(id);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Educations</h1>
          <p className="text-[#737373] text-xs mt-0.5">{educations.length} total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Education
        </button>
      </div>

      {showForm && (
        <div className="bg-[#141414] border border-blue-500/30 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">{editingId ? "Edit Education" : "New Education"}</h2>
          <div>
            <label className={labelClass}>Institution *</label>
            <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} placeholder="University / School name" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Degree</label>
              <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="Diploma (D3)" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Field *</label>
              <input value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="Informatics Engineering" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Year *</label>
              <input value={form.start_year} onChange={(e) => setForm({ ...form, start_year: e.target.value })} placeholder="2021" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Year</label>
              <input value={form.end_year} onChange={(e) => setForm({ ...form, end_year: e.target.value })} placeholder="2024 (kosong = Present)" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Samarinda, East Kalimantan" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>GPA</label>
              <input value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} placeholder="3.50" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Logo URL</label>
            <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="https://..." className={inputClass} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Education"}
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
        ) : educations.length === 0 ? (
          <div className="text-center text-[#737373] text-sm py-8">No educations yet.</div>
        ) : (
          educations.map((edu) => (
            <div key={edu.id} className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex gap-4 hover:border-[#2d2d2d] transition-colors">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 border rounded-lg bg-blue-500/10 border-blue-500/20">
                {edu.logo ? (
                  <img src={edu.logo} alt="" className="object-cover w-full h-full rounded-lg" />
                ) : (
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white">{edu.institution}</h3>
                <p className="text-xs text-blue-400">
                   {edu.degree ? edu.degree + "-" : ""} {edu.field}
                </p>
                <div className="flex gap-3 mt-1 text-xs text-[#525252]">
                  <span>
                    {edu.start_year} — {edu.end_year ?? "Present"}
                  </span>
                  {edu.location && <span>• {edu.location}</span>}
                  {edu.gpa && <span>• GPA {edu.gpa}</span>}
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-1">
                <button onClick={() => openEdit(edu)} className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(edu.id, edu.institution)} className="p-1.5 rounded-lg text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-all">
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

export default EducationList;
