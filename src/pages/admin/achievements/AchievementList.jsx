import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import {
  adminGetAchievements, adminCreateAchievement,
  adminUpdateAchievement, adminDeleteAchievement,
  adminUploadImage, adminDeleteImage,
} from '../../../services/adminApi';

const BASE_URL = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000';

const inputClass = "w-full px-3 py-2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all";
const labelClass = "block text-xs font-medium text-[#a3a3a3] mb-1.5";
const emptyForm  = {
  title: '', issuer: '', type: 'certification', level: '',
  image: '', image_path: '', credential_url: '', credential_id: '',
  issue_date: '', expiration_date: '', categories: [], year: '', sort_order: 0,
};

const typeColor = {
  award:         'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  course:        'bg-blue-500/10 text-blue-400 border-blue-500/20',
  certification: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const AchievementList = () => {
  const { data, isLoading, refetch } = useApi(adminGetAchievements);
  const [showForm, setShowForm]     = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [form, setForm]             = useState(emptyForm);
  const [saving, setSaving]         = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const imageRef = useRef(null);

  const achievements = data?.data ?? [];

  const openAdd  = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (a) => {
    setForm({
      title: a.title, issuer: a.issuer, type: a.type, level: a.level ?? '',
      image: a.image ?? '', image_path: a.image_path ?? '',
      credential_url: a.credential_url ?? '', credential_id: a.credential_id ?? '',
      issue_date: a.issue_date ?? '', expiration_date: a.expiration_date ?? '',
      categories: a.categories ?? [], year: a.year ?? '', sort_order: a.sort_order ?? 0,
    });
    setEditingId(a.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      if (form.image_path) await adminDeleteImage(form.image_path).catch(() => {});
      const res = await adminUploadImage(file);
      setForm((prev) => ({ ...prev, image: `${BASE_URL}${res.url}`, image_path: res.path }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      if (imageRef.current) imageRef.current.value = '';
    }
  };

  const removeImage = async () => {
    if (form.image_path) await adminDeleteImage(form.image_path).catch(() => {});
    setForm((prev) => ({ ...prev, image: '', image_path: '' }));
  };

  const addCategory = () => {
    const val = categoryInput.trim();
    if (!val || form.categories.includes(val)) return;
    setForm((prev) => ({ ...prev, categories: [...prev.categories, val] }));
    setCategoryInput('');
  };

  const removeCategory = (cat) => {
    setForm((prev) => ({ ...prev, categories: prev.categories.filter((c) => c !== cat) }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (editingId) { await adminUpdateAchievement(editingId, form); }
      else           { await adminCreateAchievement(form); }
      setShowForm(false); setEditingId(null); refetch();
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, title, imagePath) => {
    if (!confirm(`Hapus achievement "${title}"?`)) return;
    try {
      if (imagePath) await adminDeleteImage(imagePath).catch(() => {});
      await adminDeleteAchievement(id);
      refetch();
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Achievements</h1>
          <p className="text-[#737373] text-xs mt-0.5">{achievements.length} total</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {showForm && (
        <div className="bg-[#141414] border border-blue-500/30 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">{editingId ? 'Edit Achievement' : 'New Achievement'}</h2>

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
              <label className={labelClass}>Level</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={inputClass}>
                <option value="">None</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Certificate name" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Issuer *</label>
            <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              placeholder="Issued by" className={inputClass} />
          </div>

          {/* Upload Image */}
          <div>
            <label className={labelClass}>Certificate Image</label>
            {form.image ? (
              <div className="relative group w-full">
                <img src={form.image} alt="certificate"
                  className="w-full h-56 object-contain bg-[#0d0d0d] rounded-lg border border-[#2d2d2d]" />
                <button type="button" onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => imageRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-[#2d2d2d] rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
              >
                {uploading ? (
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload size={24} className="text-[#525252]" />
                    <div className="text-center">
                      <p className="text-sm text-[#737373]">Click to upload certificate</p>
                      <p className="text-xs text-[#525252] mt-1">JPG, PNG, WebP — max 2MB</p>
                    </div>
                  </>
                )}
              </div>
            )}
            <input ref={imageRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Credential ID</label>
              <input value={form.credential_id} onChange={(e) => setForm({ ...form, credential_id: e.target.value })}
                placeholder="N9ZOE7030XG5" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Display Year</label>
              <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2024" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Issue Date</label>
              <input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Expiration Date</label>
              <input type="date" value={form.expiration_date} onChange={(e) => setForm({ ...form, expiration_date: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className={labelClass}>Categories</label>
            <div className="flex gap-2">
              <input
                value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                placeholder="e.g. Front End, Backend..." className={`${inputClass} flex-1`}
              />
              <button type="button" onClick={addCategory}
                className="px-3 py-2 bg-[#262626] hover:bg-[#333] border border-[#2d2d2d] rounded-lg text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
            {form.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.categories.map((cat) => (
                  <span key={cat} className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    {cat}
                    <button type="button" onClick={() => removeCategory(cat)} className="hover:text-red-400 transition-colors">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Credential URL</label>
            <input value={form.credential_url} onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
              placeholder="https://..." className={inputClass} />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors">
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Achievement'}
            </button>
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-[#2d2d2d] text-[#737373] hover:text-white text-sm rounded-lg transition-colors">
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
        ) : achievements.map((a) => (
          <div key={a.id} className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex gap-4 hover:border-[#2d2d2d] transition-colors">
            {a.image && (
              <img src={a.image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-[#1f1f1f]" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`px-2 py-0.5 text-xs rounded-full border ${typeColor[a.type]}`}>{a.type}</span>
                {a.level && <span className="text-xs text-yellow-400">{a.level}</span>}
                {a.year && <span className="text-xs text-[#525252]">{a.year}</span>}
              </div>
              <h3 className="text-white font-semibold text-sm">{a.title}</h3>
              <p className="text-[#737373] text-xs">{a.issuer}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => openEdit(a)}
                className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-all">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(a.id, a.title, a.image_path)}
                className="p-1.5 rounded-lg text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementList;