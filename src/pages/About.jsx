import { useRef, useState, useEffect } from "react";
import MyPhoto from "../assets/images/my_foto.jpg";
import { useApi } from "../hooks/useApi";
import { getExperiences, getEducations, getSkills } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";
import * as si from "simple-icons";


const TimelineLegend = () => {
  const items = [
    { label: "Work Experience", color: "bg-blue-500" },
    { label: "Internship", color: "bg-purple-500" },
    { label: "Training", color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 ms-8">
          <span className={`w-3 h-3 rounded-full ${item.color}`} />
          <span className="text-xs text-[#a3a3a3]">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ── Simple Icons helper ───────────────────────────────────────────────────────
const findIcon = (slug) => {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug
    .slice(1)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}`;
  return si[key] ?? null;
};

// ── Skill Icon Card ───────────────────────────────────────────────────────────
const SkillIconCard = ({ name, icon: iconSlug, color, index }) => {
  const icon = findIcon(iconSlug || name.toLowerCase().replace(/[^a-z0-9]/g, ""));
  const hexColor = color || (icon ? `#${icon.hex}` : "#3b82f6");

  return (
    <div
      className="group flex flex-col items-center gap-2 p-4 bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl hover:border-[#404040] transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 rounded-xl group-hover:scale-110" style={{ backgroundColor: `${hexColor}15`, border: `1px solid ${hexColor}30` }}>
        {icon ? (
          <svg width={28} height={28} viewBox="0 0 24 24" fill={hexColor}>
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="text-lg font-bold" style={{ color: hexColor }}>
            {name.charAt(0)}
          </span>
        )}
      </div>
      <span className="text-xs text-[#737373] group-hover:text-white transition-colors text-center leading-tight">{name}</span>
      <div className="w-1 h-1 transition-opacity rounded-full opacity-0 group-hover:opacity-100" style={{ backgroundColor: hexColor }} />
    </div>
  );
};

// ── Animated SVGs ─────────────────────────────────────────────────────────────
const FrontendSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#111" rx="8" />
    <rect x="10" y="10" width="55" height="160" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="18" y="22" width="38" height="6" rx="2" fill="#3b82f6" opacity="0.9" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="18" y={36 + i * 18} width="8" height="8" rx="2" fill={i === 0 ? "#3b82f6" : "#2d2d2d"} />
        <rect x="30" y={38 + i * 18} width="20" height="4" rx="2" fill={i === 0 ? "#3b82f6" : "#333"} opacity="0.8" />
      </g>
    ))}
    <rect x="72" y="10" width="238" height="22" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="80" y="16" width="50" height="6" rx="2" fill="#3b82f6" opacity="0.8" />
    <rect x="220" y="16" width="25" height="6" rx="3" fill="#3b82f6" />
    <circle cx="300" cy="21" r="6" fill="#2d2d2d" />
    <circle cx="283" cy="21" r="6" fill="#2d2d2d" />
    <clipPath id="contentClip">
      <rect x="72" y="38" width="228" height="132" />
    </clipPath>
    <g clipPath="url(#contentClip)">
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-80;0,0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        <rect x="80" y="44" width="212" height="50" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
        <rect x="88" y="52" width="90" height="6" rx="2" fill="#e5e5e5" opacity="0.8" />
        <rect x="88" y="62" width="120" height="4" rx="2" fill="#404040" />
        <rect x="88" y="70" width="80" height="4" rx="2" fill="#404040" />
        <rect x="88" y="80" width="40" height="10" rx="3" fill="#3b82f6" />
        <rect x="170" y="46" width="114" height="46" rx="3" fill="#262626" stroke="#2d2d2d" strokeWidth="1" />
        <polyline points="178,78 198,62 218,70 238,55 258,65 274,56" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="points" values="178,78 198,62 218,70 238,55 258,65 274,56;178,75 198,65 218,67 238,58 258,62 274,60;178,78 198,62 218,70 238,55 258,65 274,56" dur="3s" repeatCount="indefinite" />
        </polyline>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={80 + i * 72} y="102" width="64" height="60" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
            <rect x={88 + i * 72} y="110" width="48" height="20" rx="2" fill="#262626" />
            <rect x={88 + i * 72} y="134" width="30" height="4" rx="2" fill="#404040" />
            <rect x={88 + i * 72} y="142" width="40" height="4" rx="2" fill="#333" />
            {[0, 1, 2].map((j) => (
              <rect key={j} x={88 + i * 72 + j * 14} y={128 - j * 6} width="10" height={10 + j * 6} rx="1" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"} opacity="0.8">
                <animate attributeName="height" values={`${10 + j * 6};${16 + j * 4};${10 + j * 6}`} dur={`${1.5 + j * 0.3 + i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="y" values={`${128 - j * 6};${122 - j * 4};${128 - j * 6}`} dur={`${1.5 + j * 0.3 + i * 0.2}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>
        ))}
        <rect x="80" y="172" width="212" height="6" rx="2" fill="#2d2d2d" />
        <rect x="80" y="184" width="160" height="6" rx="2" fill="#2d2d2d" />
        <rect x="80" y="196" width="190" height="6" rx="2" fill="#2d2d2d" />
      </g>
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" values="200,80;200,130;200,80" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
      <polygon points="0,0 0,14 4,10 7,16 9,15 6,9 11,9" fill="white" stroke="#111" strokeWidth="0.5" />
      <circle cx="4" cy="20" r="5" fill="#3b82f6" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="5s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;8;5" dur="5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

const BackendSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#111" rx="8" />
    <rect x="10" y="28" width="80" height="36" rx="4" fill="#1f1f1f" stroke="#3b82f6" strokeWidth="1" />
    <rect x="18" y="36" width="30" height="4" rx="2" fill="#3b82f6" opacity="0.8" />
    <rect x="18" y="44" width="50" height="3" rx="2" fill="#333" />
    <rect x="18" y="51" width="40" height="3" rx="2" fill="#333" />
    <rect x="10" y="72" width="80" height="36" rx="4" fill="#1f1f1f" stroke="#06b6d4" strokeWidth="1" />
    <rect x="18" y="80" width="30" height="4" rx="2" fill="#06b6d4" opacity="0.8" />
    <rect x="18" y="88" width="50" height="3" rx="2" fill="#333" />
    <rect x="18" y="95" width="35" height="3" rx="2" fill="#333" />
    <rect x="10" y="116" width="80" height="36" rx="4" fill="#1f1f1f" stroke="#8b5cf6" strokeWidth="1" />
    <rect x="18" y="124" width="30" height="4" rx="2" fill="#8b5cf6" opacity="0.8" />
    <rect x="18" y="132" width="50" height="3" rx="2" fill="#333" />
    <rect x="18" y="139" width="40" height="3" rx="2" fill="#333" />
    <rect x="110" y="60" width="90" height="56" rx="6" fill="#1f1f1f" stroke="#f59e0b" strokeWidth="1.5" />
    <rect x="120" y="70" width="70" height="6" rx="2" fill="#f59e0b" opacity="0.9" />
    <rect x="120" y="82" width="55" height="3" rx="2" fill="#333" />
    <rect x="120" y="89" width="60" height="3" rx="2" fill="#333" />
    <rect x="120" y="96" width="45" height="3" rx="2" fill="#333" />
    <ellipse cx="258" cy="65" rx="42" ry="12" fill="#1f1f1f" stroke="#28c840" strokeWidth="1.5" />
    <rect x="216" y="65" width="84" height="40" fill="#1f1f1f" />
    <ellipse cx="258" cy="105" rx="42" ry="12" fill="#1f1f1f" stroke="#28c840" strokeWidth="1.5" />
    <ellipse cx="258" cy="85" rx="42" ry="12" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="232" y="74" width="52" height="3" rx="2" fill="#28c840" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
    </rect>
    <rect x="237" y="92" width="42" height="3" rx="2" fill="#28c840" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
    </rect>
    <line x1="90" y1="46" x2="110" y2="82" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
    <line x1="90" y1="90" x2="110" y2="90" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
    <line x1="90" y1="134" x2="110" y2="98" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
    <line x1="200" y1="88" x2="216" y2="88" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
    <path id="p-react" d="M90,46 L110,82" fill="none" />
    <path id="p-mobile" d="M90,90 L110,90" fill="none" />
    <path id="p-third" d="M90,134 L110,98" fill="none" />
    <path id="p-db" d="M200,88 L216,88" fill="none" />
    <path id="p-dbres" d="M216,92 L200,92" fill="none" />
    <circle r="3" fill="#3b82f6">
      <animateMotion dur="2s" repeatCount="indefinite">
        <mpath xlinkHref="#p-react" />
      </animateMotion>
    </circle>
    <circle r="3" fill="#06b6d4">
      <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
        <mpath xlinkHref="#p-mobile" />
      </animateMotion>
    </circle>
    <circle r="3" fill="#8b5cf6">
      <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
        <mpath xlinkHref="#p-third" />
      </animateMotion>
    </circle>
    <circle r="3" fill="#f59e0b">
      <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.3s">
        <mpath xlinkHref="#p-db" />
      </animateMotion>
    </circle>
    <circle r="3" fill="#28c840">
      <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
        <mpath xlinkHref="#p-dbres" />
      </animateMotion>
    </circle>
  </svg>
);

const ReportSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#1a1a1a" rx="8" />
    <rect x="40" y="15" width="140" height="155" rx="6" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="55" y="28" width="100" height="8" rx="2" fill="#3b82f6" opacity="0.8" />
    <rect x="55" y="42" width="70" height="4" rx="2" fill="#404040" />
    <line x1="55" y1="54" x2="165" y2="54" stroke="#2d2d2d" strokeWidth="1" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="55" y={62 + i * 16} width="40" height="4" rx="2" fill="#404040">
          <animate attributeName="width" values={`${40 - i * 3};${50 - i * 2};${40 - i * 3}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </rect>
        <rect x="105" y={62 + i * 16} width="55" height="4" rx="2" fill="#2d2d2d" />
        <rect x="130" y={62 + i * 16} width="30" height="4" rx="2" fill={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} opacity="0.7" />
      </g>
    ))}
    <rect x="200" y="15" width="105" height="90" rx="6" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={215 + i * 22} y={80 - i * 14} width="14" height={20 + i * 14} rx="2" fill="#3b82f6" opacity="0.7">
        <animate attributeName="height" values={`${20 + i * 14};${30 + i * 10};${20 + i * 14}`} dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
        <animate attributeName="y" values={`${80 - i * 14};${70 - i * 10};${80 - i * 14}`} dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
      </rect>
    ))}
    <rect x="200" y="115" width="105" height="55" rx="6" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <circle cx="230" cy="143" r="18" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="70 43">
      <animateTransform attributeName="transform" type="rotate" from="0 230 143" to="360 230 143" dur="8s" repeatCount="indefinite" />
    </circle>
    <circle cx="230" cy="143" r="18" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="30 83" strokeDashoffset="-70">
      <animateTransform attributeName="transform" type="rotate" from="0 230 143" to="360 230 143" dur="8s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const DashboardSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#1a1a1a" rx="8" />
    <rect x="10" y="10" width="300" height="22" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="20" y="17" width="60" height="6" rx="2" fill="#3b82f6" opacity="0.8" />
    <circle cx="290" cy="21" r="5" fill="#2d2d2d" />
    <circle cx="275" cy="21" r="5" fill="#2d2d2d" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={10 + i * 102} y="40" width="94" height="42" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
        <rect x={20 + i * 102} y="50" width="40" height="4" rx="2" fill="#404040" />
        <rect x={20 + i * 102} y="60" width="55" height="8" rx="2" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#28c840"} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </rect>
      </g>
    ))}
    <rect x="10" y="90" width="190" height="80" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <polyline points="20,155 45,140 70,145 95,120 120,130 145,105 170,115 190,95" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round">
      <animate
        attributeName="points"
        values="20,155 45,140 70,145 95,120 120,130 145,105 170,115 190,95;20,150 45,130 70,140 95,110 120,125 145,100 170,120 190,90;20,155 45,140 70,145 95,120 120,130 145,105 170,115 190,95"
        dur="4s"
        repeatCount="indefinite"
      />
    </polyline>
    <polyline points="20,160 45,150 70,155 95,135 120,145 145,125 170,130 190,115" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <rect x="208" y="90" width="102" height="80" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={216 + i * 22} y={140 - i * 12} width="14" height={20 + i * 12} rx="2" fill={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} opacity="0.8">
        <animate attributeName="height" values={`${20 + i * 12};${30 + i * 8};${20 + i * 12}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        <animate attributeName="y" values={`${140 - i * 12};${130 - i * 8};${140 - i * 12}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
      </rect>
    ))}
  </svg>
);

// ── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = ({ title, description, tags, svg: SvgComponent }) => (
  <div className="group bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
    <div className="w-full h-44 overflow-hidden bg-[#111] border-b border-[#2d2d2d]">
      <SvgComponent />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">Intermediate</span>
      </div>
      <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-blue-400">{title}</h3>
      <p className="text-[#737373] text-sm leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 text-xs text-[#a3a3a3] bg-[#262626] border border-[#333] rounded-full hover:border-[#404040] transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ── Timeline Item ─────────────────────────────────────────────────────────────
const TimelineItem = ({ year, title, role, description, type, start_date, end_date }) => {
  const dotColor = { work: "bg-blue-500", internship: "bg-purple-500", training: "bg-green-500" }[type.toLowerCase()] ?? "bg-blue-500";

  const months = {
    '01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun',
    '07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const [y, m] = dateStr.split('-');
    return `${months[m] ?? m} ${y}`;
  };

  const dateRange = start_date
    ? `${formatDate(start_date)} — ${formatDate(end_date)}`
    : year;

  return (
    <div className="relative flex items-start">
      <div className={`absolute left-2 w-4 h-4 ${dotColor} rounded-full border-4 border-[#171717] flex-shrink-0`} />
      <div className="ml-12">
        <span className="text-xs font-semibold text-blue-400">{dateRange}</span>
        <h4 className="text-base font-bold text-white">{title}</h4>
        <p className="text-sm font-medium text-[#a3a3a3] mb-1">{role}</p>
        <p className="text-sm text-[#737373] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// ── Education Card ────────────────────────────────────────────────────────────
const EducationCard = ({ institution, degree, field, start_year, end_year, location, gpa }) => (
  <div className="card hover:border-blue-500/30">
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 border rounded-lg bg-blue-500/10 border-blue-500/20">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-white">{institution}</h4>
        <p className="text-sm font-medium text-blue-400">
          {degree} — {field}
        </p>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#737373]">
          <span>
            {start_year} — {end_year ?? "Present"}
          </span>
          {location && <span>• {location}</span>}
          {gpa && <span>• GPA {gpa}</span>}
        </div>
      </div>
    </div>
  </div>
);

// ── Services Data ─────────────────────────────────────────────────────────────
const services = [
  {
    title: "Front-End Development",
    description: "Building responsive, intuitive, and visually polished web interfaces using modern frontend technologies.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Vite"],
    svg: FrontendSVG,
  },
  {
    title: "Back-End Development",
    description: "Developing robust REST APIs and server-side systems with secure database integration.",
    tags: ["PHP", "Laravel", "Node.js", "MySQL", "REST API"],
    svg: BackendSVG,
  },
  {
    title: "Data Analytics Report",
    description: "Transforming raw data into structured reports with clear insights, visualizations, and actionable recommendations.",
    tags: ["Python", "Pandas", "Excel", "Matplotlib", "PowerPoint"],
    svg: ReportSVG,
  },
  {
    title: "Analytics Dashboard",
    description: "Designing interactive dashboards that visualize KPIs and metrics in real time for data-driven decisions.",
    tags: ["Python", "Streamlit", "Plotly", "Power BI", "D3.js"],
    svg: DashboardSVG,
  },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
const About = () => {
  const [isAboutVisible, setAboutVisible] = useState(false);
  const [isEducationVisible, setEducationVisible] = useState(false);
  const [isServicesVisible, setServicesVisible] = useState(false);
  const [isSkillsVisible, setSkillsVisible] = useState(false);

  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const servicesRef = useRef(null);
  const skillsRef = useRef(null);

  const { data: expData, isLoading: expLoading, error: expError, refetch: refetchExp } = useApi(getExperiences);
  const { data: eduData, isLoading: eduLoading, error: eduError, refetch: refetchEdu } = useApi(getEducations);
  const { data: skillsData } = useApi(getSkills);


  const experiences = expData?.data ?? [];
  const educations = eduData?.data ?? [];
  const skillGroups = skillsData?.data ?? {};
  const webSkills = skillGroups.web ?? [];
  const dataSkills = skillGroups.data ?? [];

  useEffect(() => {
    const makeObs = (setter) =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
        },
        { threshold: 0.05 }
      );

    const obsAbout = makeObs(setAboutVisible);
    const obsEducation = makeObs(setEducationVisible);
    const obsServices = makeObs(setServicesVisible);
    const obsSkills = makeObs(setSkillsVisible);

    if (aboutRef.current) obsAbout.observe(aboutRef.current);
    if (educationRef.current) obsEducation.observe(educationRef.current);
    if (servicesRef.current) obsServices.observe(servicesRef.current);
    if (skillsRef.current) obsSkills.observe(skillsRef.current);

    return () => {
      obsAbout.disconnect();
      obsEducation.disconnect();
      obsServices.disconnect();
      obsSkills.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen ">
      {/* ── About Me & Timeline ──────────────────────────────────────────── */}
      <section ref={aboutRef} className="section">
        <div className="container">
          <div className={`mb-12 text-center transition-all duration-700 ${
               isAboutVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}>
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </div>
             <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 transition-all duration-700 delay-200 ${
              isAboutVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}>
            {/* Profile */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-8 w-32 h-32 rounded-xl border border-[#2d2d2d] overflow-hidden">
                <img src={MyPhoto} alt="Zidane Abbas Mallaniung" className="object-cover w-full h-full" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-3 text-xl font-bold text-blue-400">Full-Stack Developer & Data Analytics</h3>
                <p className="mb-4 leading-relaxed text-[#a3a3a3] text-sm">
                  I'm <span className="font-semibold text-white">Zidane Abbas Mallaniung</span>, a Diploma in Informatics Engineering graduate with a strong passion for{" "}
                  <span className="font-semibold text-white">web development, data analytics, and technology-driven solutions</span>. 
                  I have experience building web-based applications using modern technologies, including developing a Point of Sales (POS) application as my final project, 
                  and creating solutions that improve efficiency through automation and data processing.
                </p>

                <p className="leading-relaxed text-[#a3a3a3] text-sm">
                  I gained professional experience as a <span className="font-semibold text-white">Data Entry & Data Management Intern at PT Tambang Raya Usaha Tama</span>, 
                  where I worked with operational data and developed automation workflows using Python and Pandas to streamline data processing. 
                  I also have experience in administrative roles, which strengthened my skills in accuracy, problem-solving, and effective communication.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#2d2d2d]" />
              <TimelineLegend/>
              {expLoading ? (
                <Loading className="grid grid-cols-1 gap-4" />
              ) : expError ? (
                <ErrorState message={expError} onRetry={refetchExp} />
              ) : (
                <div className="space-y-8 max-h-[480px] overflow-y-auto pr-4">
                  {experiences.map((exp) => (
                    <TimelineItem key={exp.id} {...exp} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <section ref={educationRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
            <div className={`mb-12 text-center transition-all duration-700 ${
              isEducationVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}>
            <h2 className="section-title">Education</h2>
            <div className="section-divider" />
          </div>
          {eduLoading ? (
            <Loading className="grid grid-cols-1 gap-4" />
          ) : eduError ? (
            <ErrorState message={eduError} onRetry={refetchEdu} />
          ) : (
            <div className={`grid max-w-4xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 transition-all duration-700 delay-200 ${
                isEducationVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`}>
              {educations.map((edu) => (
                <EducationCard key={edu.id} {...edu} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section ref={servicesRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className={`mb-4 text-center transition-all duration-700 ${isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="section-title">Services</h2>
            <div className="section-divider" />
            <p className="text-[#737373] max-w-xl mx-auto text-sm -mt-6">I deliver digital services by combining technical skills and creative thinking to create impactful, high-quality solutions.</p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 transition-all duration-700 delay-200 ${isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────────────────── */}
      <section ref={skillsRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className={`mb-12 text-center transition-all duration-700 ${isSkillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="section-title">Tech Stack</h2>
            <div className="section-divider" />
            <p className="text-[#737373] max-w-xl mx-auto text-sm">Technologies and tools I work with regularly.</p>
          </div>

          {webSkills.length === 0 && dataSkills.length === 0 ? (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-20 bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className={`space-y-8 transition-all duration-700 delay-200 ${isSkillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {webSkills.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    <h3 className="text-sm font-semibold text-white">Web Development</h3>
                    <div className="flex-1 h-px bg-[#2d2d2d]" />
                  </div>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                    {webSkills.map((skill, i) => (
                      <SkillIconCard key={skill.id} {...skill} index={i} />
                    ))}
                  </div>
                </div>
              )}
              {dataSkills.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    <h3 className="text-sm font-semibold text-white">Data Analytics</h3>
                    <div className="flex-1 h-px bg-[#2d2d2d]" />
                  </div>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                    {dataSkills.map((skill, i) => (
                      <SkillIconCard key={skill.id} {...skill} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
