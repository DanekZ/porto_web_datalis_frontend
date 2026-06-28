# Portfolio Frontend — React

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React, Simple Icons
- **Animation**: CSS + Intersection Observer
- **Type Animation**: react-type-animation

---

## Setup

```bash
# Masuk ke folder project
cd frontend

# Install dependencies
npm install

# Copy env
cp .env.example .env

# Isi .env
VITE_API_URL=http://localhost:8000/api

# Jalankan dev server
npm run dev
```

---

## Struktur Folder

```
src/
├── assets/
│   └── images/
│       └── my_foto.jpg
├── components/
│   ├── admin/
│   │   └── AdminLayout.jsx       ← Layout + sidebar admin panel
│   ├── common/
│   │   ├── ErrorState.jsx        ← Komponen error reusable
│   │   ├── Loading.jsx           ← Skeleton loading
│   │   ├── ScrollToTop.jsx       ← Auto scroll ke atas saat navigasi
│   │   └── grid-background/
│   │       └── GridBackground.jsx
│   ├── features/
│   │   └── projects/
│   │       ├── ProjectCard.jsx   ← Card project
│   │       ├── ProjectFilter.jsx ← Filter kategori
│   │       └── ProjectGrid.jsx   ← Grid project
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Layout.jsx                ← Wrapper public pages (pakai Outlet)
├── hooks/
│   ├── useApi.jsx                ← Generic fetch hook dengan loading/error state
│   └── useAuth.jsx               ← Auth context + login/logout
├── pages/
│   ├── admin/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Settings.jsx
│   │   ├── achievements/
│   │   │   └── AchievementList.jsx
│   │   ├── educations/
│   │   │   └── EducationList.jsx
│   │   ├── experiences/
│   │   │   └── ExperienceList.jsx
│   │   ├── projects/
│   │   │   ├── ProjectList.jsx
│   │   │   └── ProjectForm.jsx   ← Create + Edit (shared form)
│   │   └── skills/
│   │       └── SkillList.jsx     ← Dengan Simple Icons picker
│   ├── About.jsx
│   ├── Achievements.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── ProjectDetail.jsx
│   └── Projects.jsx
├── services/
│   ├── api.js                    ← Public API calls
│   └── adminApi.js               ← Protected API calls (dengan Bearer token)
├── App.jsx                       ← Route definitions
├── main.jsx                      ← Entry point + AuthProvider
└── index.css                     ← Global styles + Tailwind
```

---

## Halaman Public

### Home (`/`)

- Hero section dengan foto floating + efek tilt 3D + glow animasi
- Featured Projects dari API (`?featured=true`)
- CTA section "Let's build something great"

### About (`/about`)

- Bio + foto profil
- Timeline pengalaman dari API
- Services dengan 4 SVG animasi (Frontend, Backend, Report, Dashboard)
- Education dari API
- Tech Stack grid icon dari API (Simple Icons + warna resmi)

### Projects (`/projects`)

- Filter by category: All / Web Development / Data Analytics
- Grid cards dengan loading skeleton + empty state
- Data dari API

### Project Detail (`/projects/:id`)

- Layout 2 kolom: kiri gambar gallery, kanan info
- Gallery images (thumbnail + max 4 additional) dengan slider
- Thumbnail strip, dots indicator, prev/next arrows (muncul saat hover)
- Tech stack, links GitHub/Demo, project info card

### Achievements (`/achievements`)

- Filter by type: All / Certifications / Courses / Awards
- Grid cards dengan image, issuer, credential link
- Empty state jika filter kosong

### Contact (`/contact`)

- Form (name, email, subject, message) — submit via `mailto:`
- Info kontak (email, lokasi, local time WITA real-time)
- Social links (GitHub, LinkedIn, Instagram)

---

## Admin Panel (`/admin`)

### Login (`/admin/login`)

- Form login dengan email + password
- Auth via Laravel Sanctum
- Token disimpan di `localStorage` (`admin_token`)
- Auto redirect ke dashboard jika sudah login

### Dashboard (`/admin`)

- Stats card: jumlah Projects, Skills, Experiences, Achievements, Educations
- Recent projects list
- Project breakdown bar (Web vs Data vs Featured)
- Quick action links

### Projects (`/admin/projects`)

- Tabel semua project dengan thumbnail, category, status, links
- Filter by category
- Tombol Add, Edit, Delete
- Star icon untuk featured project

### Project Form (`/admin/projects/create` & `/admin/projects/:id/edit`)

- Form shared untuk create dan edit
- Upload thumbnail (drag/click area)
- Upload additional images (max 4, dengan preview grid)
- Tech stack tag input (ketik + Enter atau klik +)
- Toggle featured
- Field: title, description, category, status, sort_order, github_url, demo_url

### Skills (`/admin/skills`)

- Grouped by category (Web / Data / Other)
- Icon picker dari daftar 30+ teknologi populer dengan Simple Icons
- Preview icon + warna sebelum save
- Inline edit (klik Edit → form muncul di baris yang sama)

### Experiences (`/admin/experiences`)

- Card list dengan tahun, tipe (work/education/training), title, role
- Form add/edit muncul di atas list
- Color-coded dot per tipe

### Achievements (`/admin/achievements`)

- Card list dengan image, type badge, title, issuer
- Form add/edit dengan field image URL + credential URL

### Educations (`/admin/educations`)

- Card list dengan logo placeholder, institution, degree, field, GPA
- Form add/edit lengkap

### Settings (`/admin/settings`)

- `resume_url` — URL file PDF resume (tampil di tombol Download Resume header)
- `site_name`, `site_email`, `site_location`
- Preview link resume jika URL diisi

---

## Services & Hooks

### `src/services/api.js` — Public endpoints

```js
getProjects(category); // GET /api/projects?category=web
getFeaturedProjects(); // GET /api/projects?featured=true
getProjectById(id); // GET /api/projects/:id
getSkills(); // GET /api/skills
getExperiences(); // GET /api/experiences
getAchievements(); // GET /api/achievements
getEducations(); // GET /api/educations
getSettings(); // GET /api/settings
```

### `src/services/adminApi.js` — Protected endpoints

```js
// Auth
// (login/logout ada di useAuth.jsx)

// Upload
adminUploadImage(file); // POST /api/upload (multipart)
adminDeleteImage(path); // DELETE /api/upload

// Projects
adminGetProjects();
adminGetProject(id);
adminCreateProject(data);
adminUpdateProject(id, data);
adminDeleteProject(id);

// Skills
adminGetSkills();
adminCreateSkill(data);
adminUpdateSkill(id, data);
adminDeleteSkill(id);

// Experiences
adminGetExperiences();
adminCreateExperience(data);
adminUpdateExperience(id, data);
adminDeleteExperience(id);

// Achievements
adminGetAchievements();
adminCreateAchievement(data);
adminUpdateAchievement(id, data);
adminDeleteAchievement(id);

// Educations
adminGetEducations();
adminCreateEducation(data);
adminUpdateEducation(id, data);
adminDeleteEducation(id);

// Settings
adminGetSettings();
adminUpdateSettings(data);
```

### `src/hooks/useApi.jsx`

```js
const { data, isLoading, error, refetch } = useApi(fetcherFn, deps);
```

Generic hook untuk fetch data dengan loading, error, dan refetch.

### `src/hooks/useAuth.jsx`

```js
const { user, token, isLoading, login, logout } = useAuth();
```

Context hook untuk auth state. Wrap di `main.jsx` dengan `<AuthProvider>`.

---

## Routing (`App.jsx`)

```
Public (dengan Layout + Header + Footer):
  /                   → Home
  /about              → About
  /projects           → Projects
  /projects/:id       → ProjectDetail
  /achievements       → Achievements
  /contact            → Contact

Admin (dengan AdminLayout + Sidebar):
  /admin/login        → Login (tanpa layout)
  /admin              → Dashboard
  /admin/projects     → ProjectList
  /admin/projects/create      → ProjectForm (create)
  /admin/projects/:id/edit    → ProjectForm (edit)
  /admin/skills               → SkillList
  /admin/experiences          → ExperienceList
  /admin/achievements         → AchievementList
  /admin/educations           → EducationList
  /admin/settings             → Settings
```

---

## Warna & Design System

```css
/* Background */
--bg-base: #171717 --bg-card: #1a1a1a --bg-muted: #262626 /* Border */ --border: #2d2d2d --border-hover: #404040 /* Text */ --text-white: #ffffff --text-muted: #a3a3a3 --text-dim: #737373 --text-faint: #525252 /* Accent */ --blue: #3b82f6
  --purple: #8b5cf6 --cyan: #06b6d4;
```

---

## CSS Classes Kustom (`index.css`)

```css
.container      /* max-w-1200px, auto margin, padding 24px */
.section        /* padding 80px 0 */
.section-title  /* text-4xl font-bold text-white */
.section-divider /* garis gradien biru-ungu */
.text-gradient  /* gradient text biru ke ungu */
.btn-primary    /* tombol gradien biru-ungu */
.btn-secondary  /* tombol outline abu-abu */
.card           /* bg card dengan hover effect */
.nav-link       /* link navigasi */

/* Animasi */
.animate-fade-in
.animate-fade-in-left
.animate-fade-in-right
.delay-100 ... .delay-500
```

---

## Simple Icons (Tech Stack)

Dipakai di:

- `About.jsx` — section Tech Stack
- `SkillList.jsx` (admin) — icon picker

```js
import * as si from "simple-icons";

// Cari icon
const icon = si["siReact"]; // { path, hex }

// Render
<svg viewBox="0 0 24 24" fill={`#${icon.hex}`}>
  <path d={icon.path} />
</svg>;
```

Nama key: `si` + nama kapital + lowercase tanpa spasi/simbol.
Contoh: `react` → `siReact`, `tailwindcss` → `siTailwindcss`

---

## Catatan

- `Layout.jsx` menggunakan `<Outlet />` (bukan `children`) karena pakai nested routes React Router v6
- `useAuth.jsx` harus berekstensi `.jsx` karena berisi JSX (`<AuthContext.Provider>`)
- File upload menggunakan `FormData` — jangan set `Content-Type` manual, biarkan browser set boundary otomatis
- Admin panel terlindungi oleh `AdminLayout` yang cek `user` dari `useAuth` — redirect ke `/admin/login` jika belum login
- `simple-icons` versi terbaru menggunakan named export `siNamaTeknologi`
