import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import {
  adminGetExperiences, adminCreateExperience,
  adminUpdateExperience, adminDeleteExperience,
} from '../../../services/adminApi';

const inputClass = "w-full px-3 py-2 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all";
const labelClass = "block text-xs font-medium text-[#a3a3a3] mb-1.5";
const emptyForm  = {
  year: '', title: '', role: '', description: '',
  type: 'work', start_date: '', end_date: '', sort_order: 0
};

const months = [
  { value: '01', label: 'January' }, { value: '02', label: 'February' },
  { value: '03', label: 'March' },   { value: '04', label: 'April' },
  { value: '05', label: 'May' },     { value: '06', label: 'June' },
  { value: '07', label: 'July' },    { value: '08', label: 'August' },
  { value: '09', label: 'September'},{ value: '10', label: 'October' },
  { value: '11', label: 'November' },{ value: '12', label: 'December' },
];

const typeColor = {
  work:      'bg-blue-500/10 text-blue-400 border-blue-500/20',
  education: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  training:  'bg-green-500/10 text-green-400 border-green-500/20',
};

// Format "2023-06" → "June 2023"
const formatDate = (dateStr) => {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  const m = months.find(m => m.value === month);
  return m ? `${m.label} ${year}` : dateStr;
};

// MonthYear Picker
const MonthYearPicker = ({ label, value, onChange, allowEmpty = false }) => {
  const parts = value ? value.split('-') : ['', ''];
  const selectedYear  = parts[0] || '';
  const selectedMonth = parts[1] || '';

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

  const handleMonthChange = (newMonth) => {
    if (!newMonth) { onChange(''); return; }
    const y = selectedYear || String(currentYear);
    onChange(`${y}-${newMonth}`);
  };

  const handleYearChange = (newYear) => {
    if (!newYear) { onChange(''); return; }
    const m = selectedMonth || '01';
    onChange(`${newYear}-${m}`);
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <select
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Month</option>
          {months.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Year</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      {allowEmpty && (
        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!value}
            onChange={(e) => onChange(e.target.checked ? '' : `${currentYear}-01`)}
            className="w-3 h-3"
          />
          <span className="text-xs text-[#737373]">Present (still ongoing)</span>
        </label>
      )}
    </div>
  );
};

const ExperienceList = () => {
  const { data, isLoading, refetch } = useApi(adminGetExperiences);
  const [showForm, setShowForm]     = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [form, setForm]             = useState(emptyForm);
  const [saving, setSaving]         = useState(false);

  const experiences = data?.data ?? [];

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (exp) => {
    setForm({
      year:        exp.year        ?? '',
      title:       exp.title       ?? '',
      role:        exp.role        ?? '',
      description: exp.description ?? '',
      type:        exp.type        ?? 'work',
      start_date:  exp.start_date  ?? '',
      end_date:    exp.end_date    ?? '',
      sort_order:  exp.sort_order  ?? 0,
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.role.trim()) return;
    setSaving(true);
    try {
      if (editingId) { await adminUpdateExperience(editingId, form); }
      else           { await adminCreateExperience(form); }
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Hapus experience "${title}"?`)) return;
    try { await adminDeleteExperience(id); refetch(); }
    catch (err) { alert(err.message); }
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Experiences</h1>
          <p className="text-[#737373] text-xs mt-0.5">{experiences.length} total</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#141414] border border-blue-500/30 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">
            {editingId ? 'Edit Experience' : 'New Experience'}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}>
                <option value="work">Work</option>
                <option value="education">Education</option>
                <option value="training">Training</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Year (display) *</label>
              <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2024" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Institution / Company *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="PT Company Name" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Role / Position *</label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Web Developer" className={inputClass} />
          </div>

          {/* Start & End date */}
          <div className="grid grid-cols-2 gap-4">
            <MonthYearPicker
              label="Start Date *"
              value={form.start_date}
              onChange={(val) => setForm({ ...form, start_date: val })}
            />
            <MonthYearPicker
              label="End Date"
              value={form.end_date}
              onChange={(val) => setForm({ ...form, end_date: val })}
              allowEmpty
            />
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your responsibilities..." rows={3}
              className={`${inputClass} resize-none`} />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Experience'}
            </button>
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-[#2d2d2d] text-[#737373] hover:text-white text-sm rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center text-[#737373] text-sm py-8">Loading...</div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-[#737373] text-sm py-8">No experiences yet.</div>
        ) : experiences.map((exp) => (
          <div key={exp.id}
            className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex gap-4 hover:border-[#2d2d2d] transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`px-2 py-0.5 text-xs rounded-full border ${typeColor[exp.type]}`}>
                  {exp.type}
                </span>
                {/* Tampilkan bulan-tahun kalau ada, fallback ke year */}
                <span className="text-xs text-blue-400 font-medium">
                  {exp.start_date ? formatDate(exp.start_date) : exp.year}
                  {' — '}
                  {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm">{exp.title}</h3>
              <p className="text-[#a3a3a3] text-xs mb-1">{exp.role}</p>
              <p className="text-[#737373] text-xs leading-relaxed line-clamp-2">{exp.description}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => openEdit(exp)}
                className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-all">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(exp.id, exp.title)}
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

export default ExperienceList;