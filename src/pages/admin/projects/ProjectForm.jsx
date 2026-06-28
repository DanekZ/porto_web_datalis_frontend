import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Upload, Image } from "lucide-react";
import { adminGetProject, adminCreateProject, adminUpdateProject, adminUploadImage, adminDeleteImage } from "../../../services/adminApi";

const initialForm = {
  title: "",
  description: "",
  thumbnail: "",
  thumbnail_path: "",
  images: [],
  image_paths: [],
  tech_stack: [],
  category: "web",
  github_url: "",
  demo_url: "",
  status: "completed",
  featured: false,
  sort_order: 0,
};

const inputClass = "w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg text-white placeholder-[#525252] text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
const labelClass = "block text-xs font-medium text-[#a3a3a3] mb-2";
const sectionClass = "bg-[#141414] border border-[#1f1f1f] rounded-xl p-6 space-y-5";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");
  const [techInput, setTechInput] = useState("");
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  const thumbRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;
    adminGetProject(id)
      .then((res) => {
        const p = res.data;
        setForm({
          title: p.title ?? "",
          description: p.description ?? "",
          thumbnail: p.thumbnail ?? "",
          thumbnail_path: p.thumbnail_path ?? "",
          images: p.images ?? [],
          image_paths: p.image_paths ?? [],
          tech_stack: p.tech_stack ?? [],
          category: p.category ?? "web",
          github_url: p.github_url ?? "",
          demo_url: p.demo_url ?? "",
          status: p.status ?? "completed",
          featured: p.featured ?? false,
          sort_order: p.sort_order ?? 0,
        });
      })
      .catch(() => setError("Failed to load project."))
      .finally(() => setFetching(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // ── Thumbnail upload ──────────────────────────────────────────────────────
  const handleThumbUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    try {
      // Hapus thumbnail lama kalau ada
      if (form.thumbnail_path) await adminDeleteImage(form.thumbnail_path).catch(() => {});
      const res = await adminUploadImage(file);
      setForm((prev) => ({
        ...prev,
        thumbnail: `http://localhost:8000${res.url}`,
        thumbnail_path: res.path,
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingThumb(false);
      if (thumbRef.current) thumbRef.current.value = "";
    }
  };

  const removeThumb = async () => {
    if (form.thumbnail_path) await adminDeleteImage(form.thumbnail_path).catch(() => {});
    setForm((prev) => ({ ...prev, thumbnail: "", thumbnail_path: "" }));
  };

  // ── Additional images upload ──────────────────────────────────────────────
  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = 4 - form.images.length;
    if (remaining <= 0) return;

    const toUpload = files.slice(0, remaining);
    setUploadingImg(true);

    try {
      const results = await Promise.all(toUpload.map((f) => adminUploadImage(f)));
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...results.map((r) => `http://localhost:8000${r.url}`)],
        image_paths: [...prev.image_paths, ...results.map((r) => r.path)],
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingImg(false);
      if (imagesRef.current) imagesRef.current.value = "";
    }
  };

  const removeImage = async (index) => {
    const path = form.image_paths[index];
    if (path) await adminDeleteImage(path).catch(() => {});
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      image_paths: prev.image_paths.filter((_, i) => i !== index),
    }));
  };

  // ── Tech stack ────────────────────────────────────────────────────────────
  const addTech = () => {
    const val = techInput.trim();
    if (!val || form.tech_stack.includes(val)) return;
    setForm((prev) => ({ ...prev, tech_stack: [...prev.tech_stack, val] }));
    setTechInput("");
  };

  const removeTech = (tag) => {
    setForm((prev) => ({ ...prev, tech_stack: prev.tech_stack.filter((t) => t !== tag) }));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isEdit) {
        await adminUpdateProject(id, form);
      } else {
        await adminCreateProject(form);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isFetching)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div className="max-w-3xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/projects" className="p-2 rounded-lg text-[#737373] hover:text-white hover:bg-[#1f1f1f] transition-all">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white">{isEdit ? "Edit Project" : "Add New Project"}</h1>
          <p className="text-[#737373] text-xs mt-0.5">{isEdit ? `Editing project #${id}` : "Fill in the details below"}</p>
        </div>
      </div>

      {error && <div className="px-4 py-3 text-sm text-red-400 border rounded-lg bg-red-500/10 border-red-500/20">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-white">Basic Information</h2>
          <div>
            <label className={labelClass}>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Project title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe your project..." rows={4} className={`${inputClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                <option value="web">Web Development</option>
                <option value="data">Data Analytics</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status *</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Sort Order</label>
              <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} min={0} className={inputClass} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative" onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}>
                  <div className={`w-10 h-5 rounded-full transition-colors ${form.featured ? "bg-blue-600" : "bg-[#333]"}`} />
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-[#a3a3a3]">Featured project</span>
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-white">Images</h2>

          {/* Thumbnail */}
          <div>
            <label className={labelClass}>Thumbnail (Cover Image)</label>
            {form.thumbnail ? (
              <div className="relative w-full group">
                <img src={form.thumbnail} alt="thumbnail" className="w-full h-48 object-cover rounded-lg border border-[#2d2d2d]" />
                <button type="button" onClick={removeThumb} className="absolute flex items-center justify-center transition-opacity bg-red-500 rounded-full opacity-0 top-2 right-2 w-7 h-7 group-hover:opacity-100">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => thumbRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-[#2d2d2d] rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
              >
                {uploadingThumb ? (
                  <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Upload size={24} className="text-[#525252]" />
                    <div className="text-center">
                      <p className="text-sm text-[#737373]">Click to upload thumbnail</p>
                      <p className="text-xs text-[#525252] mt-1">JPG, PNG, WebP — max 2MB</p>
                    </div>
                  </>
                )}
              </div>
            )}
            <input ref={thumbRef} type="file" accept="image/*" onChange={handleThumbUpload} className="hidden" />
          </div>

          {/* Additional Images */}
          <div>
            <label className={labelClass}>
              Additional Images
              <span className="ml-2 text-[#525252]">{form.images.length}/4</span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {/* Existing images */}
              {form.images.map((img, i) => (
                <div key={i} className="relative group aspect-video">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-lg border border-[#2d2d2d]" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute flex items-center justify-center w-5 h-5 transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100">
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}

              {/* Upload slot */}
              {form.images.length < 4 && (
                <div
                  onClick={() => imagesRef.current?.click()}
                  className="aspect-video border-2 border-dashed border-[#2d2d2d] rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                >
                  {uploadingImg ? (
                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Image size={18} className="text-[#525252]" />
                      <span className="text-xs text-[#525252]">Add</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <input ref={imagesRef} type="file" accept="image/*" multiple onChange={handleImagesUpload} className="hidden" />
            <p className="text-xs text-[#525252] mt-2">Max 4 additional images. Total gallery = 1 thumbnail + 4 images.</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-white">Tech Stack</h2>
          <div className="flex gap-2">
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="e.g. React, Laravel, Python..." className={`${inputClass} flex-1`} />
            <button type="button" onClick={addTech} className="px-3 py-2 bg-[#262626] hover:bg-[#333] border border-[#2d2d2d] rounded-lg text-white transition-colors">
              <Plus size={16} />
            </button>
          </div>
          {form.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.tech_stack.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTech(tag)} className="transition-colors hover:text-red-400">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className={sectionClass}>
          <h2 className="text-sm font-semibold text-white">Links</h2>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/username/repo" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Demo URL</label>
            <input name="demo_url" value={form.demo_url} onChange={handleChange} placeholder="https://yourproject.vercel.app" className={inputClass} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button type="submit" disabled={isLoading} className="flex-1 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                {isEdit ? "Saving..." : "Creating..."}
              </span>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Project"
            )}
          </button>
          <Link to="/admin/projects" className="px-6 py-3 border border-[#2d2d2d] text-[#737373] hover:text-white hover:border-[#404040] text-sm font-medium rounded-lg transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
