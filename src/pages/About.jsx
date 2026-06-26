import { Link } from "react-router-dom";
import MyPhoto from "../assets/images/my_foto.jpg";
import { useApi } from "../hooks/useApi";
import { getSkills, getExperiences } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

// ── Sub-components ────────────────────────────────────────────────────────────

const SkillBar = ({ name, proficiency }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-white font-medium">{name}</span>
      <span className="text-cyan-400 font-semibold">{proficiency}%</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2">
      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700" style={{ width: `${proficiency}%` }} />
    </div>
  </div>
);

const TimelineItem = ({ year, title, role, description }) => (
  <div className="flex relative items-start">
    <div className="absolute left-2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900" />
    <div className="ml-12">
      <div className="mb-2">
        <span className="text-sm font-semibold text-cyan-400">{year}</span>
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <p className="font-medium text-cyan-400">{role}</p>
      </div>
      <p className="text-sm text-slate-300">{description}</p>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────

const About = () => {
  const { data: skillsData, isLoading: skillsLoading, error: skillsError, refetch: refetchSkills } = useApi(getSkills);

  const { data: expData, isLoading: expLoading, error: expError, refetch: refetchExp } = useApi(getExperiences);

  const skillGroups = skillsData?.data ?? {};
  const webSkills = skillGroups.web ?? [];
  const dataSkills = skillGroups.data ?? [];
  const experiences = expData?.data ?? [];

  return (
    <div className="pt-20 min-h-screen">
      {/* ── About Me & Timeline ──────────────────────────────────────── */}
      <section className="bg-slate-900/50 pb-10">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">About Me</h2>
            <div className="mx-auto w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Profile */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex justify-center items-center mb-8 w-32 h-32 rounded-lg border-2 border-cyan-400/30 bg-slate-800/50">
                <img src={MyPhoto} alt="My Photo" className="object-cover w-full h-full rounded-lg" />
              </div>

              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-cyan-400">Full-Stack Developer & Data Analytics</h3>
                <p className="mb-6 leading-relaxed text-slate-300">
                  I'm <span className="font-extrabold">Zidane Abbas Mallaniung</span>, a graduate of <span className="font-extrabold">Diploma in Informatics Engineering</span> with a strong interest in{" "}
                  <span className="font-extrabold">web development</span> and <span className="font-extrabold">data management</span>. Since college, I've been actively involved in developing various web-based projects, including a Point of
                  Sales (POS) application that became the focus of my final project.
                </p>
                <p className="leading-relaxed text-slate-300">
                  I also worked as a <span className="font-extrabold">Data Entry & Data Manager</span> Intern at PT Tambang Raya Usaha Tama and as <span className="font-extrabold">an Administrative Staff</span> at Surya Raya Badminton.
                  These experiences strengthened my skills in data handling, administrative accuracy, and professional communication in a workplace setting.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cyan-400/30" />

              {expLoading ? (
                <Loading  className="md:grid-cols-1 lg:grid-cols-1"/>
              ) : expError ? (
                <ErrorState message={expError} onRetry={refetchExp} />
              ) : (
                <div className="space-y-8 max-h-[480px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyan-400/50 scrollbar-track-slate-700/30">
                  {experiences.map((exp) => (
                    <TimelineItem key={exp.id} {...exp} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Skills ─────────────────────────────────────────── */}
      <section className="section bg-slate-800/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Technical Skills</h2>
            <div className="mx-auto w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>

          {skillsLoading ? (
            <Loading />
          ) : skillsError ? (
            <ErrorState message={skillsError} onRetry={refetchSkills} />
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Web Development */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-8">Web Development</h3>
                <div className="space-y-6">
                  {webSkills.map((skill) => (
                    <SkillBar key={skill.id} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                </div>
              </div>

              {/* Data Science */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-8">Data Science</h3>
                <div className="space-y-6">
                  {dataSkills.map((skill) => (
                    <SkillBar key={skill.id} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
