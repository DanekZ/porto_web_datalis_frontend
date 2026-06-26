import { useRef, useState, useEffect } from "react";
import MyPhoto from "../assets/images/my_foto.jpg";
import { useApi } from "../hooks/useApi";
import { getExperiences, getEducations } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

// ── Animated SVGs ─────────────────────────────────────────────────────────────

const FrontendSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#111" rx="8" />

    {/* Sidebar */}
    <rect x="10" y="10" width="55" height="160" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="18" y="22" width="38" height="6" rx="2" fill="#3b82f6" opacity="0.9" />
    {[0,1,2,3,4].map((i) => (
      <g key={i}>
        <rect x="18" y={36 + i * 18} width="8" height="8" rx="2" fill={i === 0 ? "#3b82f6" : "#2d2d2d"} />
        <rect x="30" y={38 + i * 18} width="20" height="4" rx="2" fill={i === 0 ? "#3b82f6" : "#333"} opacity="0.8" />
      </g>
    ))}

    {/* Navbar */}
    <rect x="72" y="10" width="238" height="22" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="80" y="16" width="50" height="6" rx="2" fill="#3b82f6" opacity="0.8" />
    <rect x="220" y="16" width="25" height="6" rx="3" fill="#3b82f6" />
    <circle cx="300" cy="21" r="6" fill="#2d2d2d" />
    <circle cx="283" cy="21" r="6" fill="#2d2d2d" />

    {/* Scrolling content container — clipped */}
    <clipPath id="contentClip">
      <rect x="72" y="38" width="228" height="132" />
    </clipPath>

    <g clipPath="url(#contentClip)">
      {/* Scrolling content group */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-80;0,0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />

        {/* Hero image section */}
        <rect x="80" y="44" width="212" height="50" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
        <rect x="88" y="52" width="90" height="6" rx="2" fill="#e5e5e5" opacity="0.8" />
        <rect x="88" y="62" width="120" height="4" rx="2" fill="#404040" />
        <rect x="88" y="70" width="80" height="4" rx="2" fill="#404040" />
        <rect x="88" y="80" width="40" height="10" rx="3" fill="#3b82f6" />
        <rect x="170" y="46" width="114" height="46" rx="3" fill="#262626" stroke="#2d2d2d" strokeWidth="1" />
        <polyline points="178,78 198,62 218,70 238,55 258,65 274,56" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round">
          <animate attributeName="points" values="178,78 198,62 218,70 238,55 258,65 274,56;178,75 198,65 218,67 238,58 258,62 274,60;178,78 198,62 218,70 238,55 258,65 274,56" dur="3s" repeatCount="indefinite" />
        </polyline>

        {/* 3 Columns */}
        {[0,1,2].map((i) => (
          <g key={i}>
            <rect x={80 + i * 72} y="102" width="64" height="60" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
            <rect x={88 + i * 72} y="110" width="48" height="20" rx="2" fill="#262626" />
            <rect x={88 + i * 72} y="134" width="30" height="4" rx="2" fill="#404040" />
            <rect x={88 + i * 72} y="142" width="40" height="4" rx="2" fill="#333" />
            {[0,1,2].map((j) => (
              <rect key={j} x={88 + i*72 + j*14} y={128 - j*6} width="10" height={10 + j*6} rx="1"
                fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"} opacity="0.8">
                <animate attributeName="height" values={`${10+j*6};${16+j*4};${10+j*6}`} dur={`${1.5+j*0.3+i*0.2}s`} repeatCount="indefinite" />
                <animate attributeName="y" values={`${128-j*6};${122-j*4};${128-j*6}`} dur={`${1.5+j*0.3+i*0.2}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>
        ))}

        {/* Extra content below (revealed when scrolled) */}
        <rect x="80" y="172" width="212" height="6" rx="2" fill="#2d2d2d" />
        <rect x="80" y="184" width="160" height="6" rx="2" fill="#2d2d2d" />
        <rect x="80" y="196" width="190" height="6" rx="2" fill="#2d2d2d" />
        <rect x="80" y="212" width="212" height="40" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
        <rect x="88" y="220" width="80" height="5" rx="2" fill="#3b82f6" opacity="0.5" />
        <rect x="88" y="230" width="130" height="4" rx="2" fill="#2d2d2d" />
        <rect x="88" y="238" width="100" height="4" rx="2" fill="#2d2d2d" />
      </g>
    </g>

    {/* Cursor — animated scrolling */}
    <g>
      {/* Move cursor smoothly */}
      <animateTransform attributeName="transform" type="translate"
        values="200,80;200,130;200,80"
        dur="5s" repeatCount="indefinite"
        calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
      {/* Cursor arrow */}
      <polygon points="0,0 0,14 4,10 7,16 9,15 6,9 11,9" fill="white" stroke="#111" strokeWidth="0.5" />
      {/* Scroll wheel glow */}
      <circle cx="4" cy="20" r="5" fill="#3b82f6" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="5s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;8;5" dur="5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

const BackendSVG = () => {
  const dotPositions = [
    { x: 75, y: 50 },
    { x: 75, y: 90 },
    { x: 75, y: 130 },
    { x: 165, y: 90 },
    { x: 255, y: 70 },
    { x: 255, y: 110 },
  ];

  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#111" rx="8" />

      {/* Frontend boxes (left) */}

      {/* React App box */}
      <rect x="10" y="28" width="80" height="36" rx="4" fill="#1f1f1f" stroke="#3b82f6" strokeWidth="1" />
      <rect x="18" y="36" width="30" height="4" rx="2" fill="#3b82f6" opacity="0.8" />
      <rect x="18" y="44" width="50" height="3" rx="2" fill="#333" />
      <rect x="18" y="51" width="40" height="3" rx="2" fill="#333" />

      {/* Mobile App box */}
      <rect x="10" y="72" width="80" height="36" rx="4" fill="#1f1f1f" stroke="#06b6d4" strokeWidth="1" />
      <rect x="18" y="80" width="30" height="4" rx="2" fill="#06b6d4" opacity="0.8" />
      <rect x="18" y="88" width="50" height="3" rx="2" fill="#333" />
      <rect x="18" y="95" width="35" height="3" rx="2" fill="#333" />

      {/* Other client box */}
      <rect x="10" y="116" width="80" height="36" rx="4" fill="#1f1f1f" stroke="#8b5cf6" strokeWidth="1" />
      <rect x="18" y="124" width="30" height="4" rx="2" fill="#8b5cf6" opacity="0.8" />
      <rect x="18" y="132" width="50" height="3" rx="2" fill="#333" />
      <rect x="18" y="139" width="40" height="3" rx="2" fill="#333" />

      {/* API box (center) */}
      <rect x="110" y="60" width="90" height="56" rx="6" fill="#1f1f1f" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="120" y="70" width="70" height="6" rx="2" fill="#f59e0b" opacity="0.9" />
      <rect x="120" y="82" width="55" height="3" rx="2" fill="#333" />
      <rect x="120" y="89" width="60" height="3" rx="2" fill="#333" />
      <rect x="120" y="96" width="45" height="3" rx="2" fill="#333" />

      {/* Database (right) */}
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

      {/* Connection lines with animated dots */}
      {/* React → API */}
      <line x1="90" y1="46" x2="110" y2="82" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
      {/* Mobile → API */}
      <line x1="90" y1="90" x2="110" y2="90" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
      {/* 3rd → API */}
      <line x1="90" y1="134" x2="110" y2="98" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
      {/* API → DB */}
      <line x1="200" y1="88" x2="216" y2="88" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

      {/* Animated data packets */}
      {/* React → API packet */}
      <circle r="3" fill="#3b82f6">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath xlinkHref="#path-react" />
        </animateMotion>
      </circle>
      <path id="path-react" d="M90,46 L110,82" fill="none" />

      {/* Mobile → API packet */}
      <circle r="3" fill="#06b6d4">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
          <mpath xlinkHref="#path-mobile" />
        </animateMotion>
      </circle>
      <path id="path-mobile" d="M90,90 L110,90" fill="none" />

      {/* 3rd → API packet */}
      <circle r="3" fill="#8b5cf6">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
          <mpath xlinkHref="#path-third" />
        </animateMotion>
      </circle>
      <path id="path-third" d="M90,134 L110,98" fill="none" />

      {/* API → DB packet */}
      <circle r="3" fill="#f59e0b">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.3s">
          <mpath xlinkHref="#path-db" />
        </animateMotion>
      </circle>
      <path id="path-db" d="M200,88 L216,88" fill="none" />

      {/* DB → API response */}
      <circle r="3" fill="#28c840">
        <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
          <mpath xlinkHref="#path-db-res" />
        </animateMotion>
      </circle>
      <path id="path-db-res" d="M216,92 L200,92" fill="none" />
    </svg>
  );
};

const ReportSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#1a1a1a" rx="8" />
    {/* Document */}
    <rect x="40" y="15" width="140" height="155" rx="6" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    {/* Header */}
    <rect x="55" y="28" width="100" height="8" rx="2" fill="#3b82f6" opacity="0.8" />
    <rect x="55" y="42" width="70" height="4" rx="2" fill="#404040" />
    {/* Divider */}
    <line x1="55" y1="54" x2="165" y2="54" stroke="#2d2d2d" strokeWidth="1" />
    {/* Table rows */}
    {[0,1,2,3,4].map((i) => (
      <g key={i}>
        <rect x="55" y={62 + i * 16} width="40" height="4" rx="2" fill="#404040">
          <animate attributeName="width" values={`${40 - i*3};${50 - i*2};${40 - i*3}`} dur={`${2+i*0.3}s`} repeatCount="indefinite" />
        </rect>
        <rect x="105" y={62 + i * 16} width="55" height="4" rx="2" fill="#2d2d2d" />
        <rect x="130" y={62 + i * 16} width="30" height="4" rx="2" fill={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} opacity="0.7" />
      </g>
    ))}
    {/* Chart area */}
    <rect x="55" y="148" width="110" height="4" rx="2" fill="#2d2d2d" />
    {/* Right side mini chart */}
    <rect x="200" y="15" width="105" height="90" rx="6" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="212" y="25" width="80" height="5" rx="2" fill="#404040" />
    {[0,1,2,3].map((i) => (
      <rect key={i} x={215 + i * 22} y={80 - i * 14} width="14" height={20 + i * 14} rx="2" fill="#3b82f6" opacity="0.7" key={i}>
        <animate attributeName="height" values={`${20+i*14};${30+i*10};${20+i*14}`} dur={`${1.5+i*0.4}s`} repeatCount="indefinite" />
        <animate attributeName="y" values={`${80-i*14};${70-i*10};${80-i*14}`} dur={`${1.5+i*0.4}s`} repeatCount="indefinite" />
      </rect>
    ))}
    {/* Right side pie */}
    <rect x="200" y="115" width="105" height="55" rx="6" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <circle cx="230" cy="143" r="18" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="70 43">
      <animateTransform attributeName="transform" type="rotate" from="0 230 143" to="360 230 143" dur="8s" repeatCount="indefinite" />
    </circle>
    <circle cx="230" cy="143" r="18" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="30 83" strokeDashoffset="-70">
      <animateTransform attributeName="transform" type="rotate" from="0 230 143" to="360 230 143" dur="8s" repeatCount="indefinite" />
    </circle>
    <rect x="258" y="132" width="35" height="4" rx="2" fill="#3b82f6" opacity="0.7" />
    <rect x="258" y="142" width="25" height="4" rx="2" fill="#8b5cf6" opacity="0.7" />
    <rect x="258" y="152" width="30" height="4" rx="2" fill="#404040" />
  </svg>
);

const DashboardSVG = () => (
  <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#1a1a1a" rx="8" />
    {/* Header bar */}
    <rect x="10" y="10" width="300" height="22" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <rect x="20" y="17" width="60" height="6" rx="2" fill="#3b82f6" opacity="0.8" />
    <circle cx="290" cy="21" r="5" fill="#2d2d2d" />
    <circle cx="275" cy="21" r="5" fill="#2d2d2d" />
    {/* KPI cards */}
    {[0,1,2].map((i) => (
      <g key={i}>
        <rect x={10 + i * 102} y="40" width="94" height="42" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
        <rect x={20 + i * 102} y="50" width="40" height="4" rx="2" fill="#404040" />
        <rect x={20 + i * 102} y="60" width="55" height="8" rx="2" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#28c840"} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur={`${2+i*0.5}s`} repeatCount="indefinite" />
        </rect>
      </g>
    ))}
    {/* Line chart */}
    <rect x="10" y="90" width="190" height="80" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    <polyline
      points="20,155 45,140 70,145 95,120 120,130 145,105 170,115 190,95"
      fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
    >
      <animate attributeName="points"
        values="20,155 45,140 70,145 95,120 120,130 145,105 170,115 190,95;20,150 45,130 70,140 95,110 120,125 145,100 170,120 190,90;20,155 45,140 70,145 95,120 120,130 145,105 170,115 190,95"
        dur="4s" repeatCount="indefinite" />
    </polyline>
    <polyline
      points="20,160 45,150 70,155 95,135 120,145 145,125 170,130 190,115"
      fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" opacity="0.6"
    />
    {/* Bar chart */}
    <rect x="208" y="90" width="102" height="80" rx="4" fill="#1f1f1f" stroke="#2d2d2d" strokeWidth="1" />
    {[0,1,2,3].map((i) => (
      <g key={i}>
        <rect x={216 + i * 22} y={140 - i * 12} width="14" height={20 + i * 12} rx="2"
          fill={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} opacity="0.8">
          <animate attributeName="height" values={`${20+i*12};${30+i*8};${20+i*12}`} dur={`${1.5+i*0.3}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${140-i*12};${130-i*8};${140-i*12}`} dur={`${1.5+i*0.3}s`} repeatCount="indefinite" />
        </rect>
      </g>
    ))}
  </svg>
);

// ── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = ({ title, description, tags, svg: SvgComponent }) => (
  <div className="group bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
    {/* Animated illustration */}
    <div className="w-full h-44 overflow-hidden bg-[#111] border-b border-[#2d2d2d]">
      <SvgComponent />
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
          Intermediate
        </span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-[#737373] text-sm leading-relaxed mb-4">
        {description}
      </p>
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
const TimelineItem = ({ year, title, role, description, type }) => {
  const dotColor = { work: 'bg-blue-500', education: 'bg-purple-500', training: 'bg-green-500' }[type] ?? 'bg-blue-500';
  return (
    <div className="flex relative items-start">
      <div className={`absolute left-2 w-4 h-4 ${dotColor} rounded-full border-4 border-[#171717] flex-shrink-0`} />
      <div className="ml-12">
        <span className="text-xs font-semibold text-blue-400">{year}</span>
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
      <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      </div>
      <div>
        <h4 className="text-white font-bold">{institution}</h4>
        <p className="text-blue-400 text-sm font-medium">{degree} — {field}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#737373]">
          <span>{start_year} — {end_year ?? 'Present'}</span>
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
    title: 'Front-End Development',
    description: 'Building responsive, intuitive, and visually polished web interfaces using modern frontend technologies.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Vite'],
    svg: FrontendSVG,
  },
  {
    title: 'Back-End Development',
    description: 'Developing robust REST APIs and server-side systems with secure database integration.',
    tags: ['PHP', 'Laravel', 'Node.js', 'MySQL', 'REST API'],
    svg: BackendSVG,
  },
  {
    title: 'Data Analytics Report',
    description: 'Transforming raw data into structured reports with clear insights, visualizations, and actionable recommendations.',
    tags: ['Python', 'Pandas', 'Excel', 'Matplotlib', 'PowerPoint'],
    svg: ReportSVG,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Designing interactive dashboards that visualize KPIs and metrics in real time for data-driven decisions.',
    tags: ['Python', 'Streamlit', 'Plotly', 'Power BI', 'D3.js'],
    svg: DashboardSVG,
  },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
const About = () => {
  const [isServicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef(null);

  const { data: expData, isLoading: expLoading, error: expError, refetch: refetchExp } = useApi(getExperiences);
  const { data: eduData, isLoading: eduLoading, error: eduError, refetch: refetchEdu } = useApi(getEducations);

  const experiences = expData?.data ?? [];
  const educations  = eduData?.data ?? [];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setServicesVisible(true); },
      { threshold: 0.05 }
    );
    if (servicesRef.current) obs.observe(servicesRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pt-20 min-h-screen">

      {/* ── About Me & Timeline ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Profile */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-8 w-32 h-32 rounded-xl border border-[#2d2d2d] overflow-hidden">
                <img src={MyPhoto} alt="Zidane Abbas Mallaniung" className="object-cover w-full h-full" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-3 text-xl font-bold text-blue-400">
                  Full-Stack Developer & Data Analytics
                </h3>
                <p className="mb-4 leading-relaxed text-[#a3a3a3] text-sm">
                  I'm <span className="text-white font-semibold">Zidane Abbas Mallaniung</span>, a graduate of{" "}
                  <span className="text-white font-semibold">Diploma in Informatics Engineering</span> with a strong
                  interest in <span className="text-white font-semibold">web development</span> and{" "}
                  <span className="text-white font-semibold">data management</span>. Since college, I've been actively
                  involved in developing various web-based projects, including a Point of Sales (POS) application that
                  became the focus of my final project.
                </p>
                <p className="leading-relaxed text-[#a3a3a3] text-sm">
                  I also worked as a <span className="text-white font-semibold">Data Entry & Data Manager</span> Intern
                  at PT Tambang Raya Usaha Tama and as{" "}
                  <span className="text-white font-semibold">Administrative Staff</span> at Surya Raya Badminton. These
                  experiences strengthened my skills in data handling, administrative accuracy, and professional
                  communication.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#2d2d2d]" />
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

      {/* ── Skills & Services ─────────────────────────────────────────────── */}
      <section ref={servicesRef} className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className={`mb-4 text-center transition-all duration-700 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="section-title">Skills & Services</h2>
            <div className="section-divider" />
            <p className="text-[#737373] max-w-xl mx-auto text-sm -mt-6">
              I deliver digital services by combining technical skills and creative thinking to create impactful, high-quality solutions.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 transition-all duration-700 delay-200 ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

          {/* ── Education ────────────────────────────────────────────────────── */}
      <section className="section border-t border-[#2d2d2d]">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="section-title">Education</h2>
            <div className="section-divider" />
          </div>
          {eduLoading ? (
            <Loading className="grid grid-cols-1 gap-4" />
          ) : eduError ? (
            <ErrorState message={eduError} onRetry={refetchEdu} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {educations.map((edu) => (
                <EducationCard key={edu.id} {...edu} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default About;