import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { adminGetSettings, adminUpdateSettings } from "../../services/adminApi";

const inputClass = "w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white placeholder-[#525252] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
const labelClass = "block text-xs font-medium text-[#a3a3a3] mb-2";
const sectionClass = "bg-[#141414] border border-[#1f1f1f] rounded-xl p-6 space-y-5";

const SettingsPage = () => {
  const [form, setForm] = useState({ resume_url: "", site_name: "", site_email: "", site_location: "" });
  const [isLoading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetSettings()
      .then((res) => {
        const d = res.data ?? {};
        setForm({
          resume_url: d.resume_url ?? "",
          site_name: d.site_name ?? "",
          site_email: d.site_email ?? "",
          site_location: d.site_location ?? "",
        });
      })
      .catch(() => setError("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await adminUpdateSettings(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="text-lg font-bold text-white">Settings</h1>
        <p className="text-[#737373] text-xs mt-0.5">Manage your portfolio site settings</p>
      </div>

      {error && <div className="px-4 py-3 text-sm text-red-400 border rounded-lg bg-red-500/10 border-red-500/20">{error}</div>}

      {success && <div className="px-4 py-3 text-sm text-green-400 border rounded-lg bg-green-500/10 border-green-500/20">Settings saved successfully!</div>}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Profile */}
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-white">Profile Info</h2>
          <div>
            <label className={labelClass}>Site Name</label>
            <input name="site_name" value={form.site_name} onChange={handleChange} placeholder="Zidane Abbas Mallaniung" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="site_email" value={form.site_email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input name="site_location" value={form.site_location} onChange={handleChange} placeholder="Balikpapan, East Kalimantan" className={inputClass} />
          </div>
        </div>

        {/* Resume */}
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-white">Resume</h2>
          <div>
            <label className={labelClass}>Resume URL</label>
            <input name="resume_url" value={form.resume_url} onChange={handleChange} placeholder="https://drive.google.com/file/..." className={inputClass} />
            <p className="text-xs text-[#525252] mt-2">Link Google Drive, Dropbox, atau URL langsung ke file PDF resume kamu.</p>
          </div>
          {form.resume_url && (
            <a href={form.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300">
              Preview Resume →
            </a>
          )}
        </div>

        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save size={16} />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
