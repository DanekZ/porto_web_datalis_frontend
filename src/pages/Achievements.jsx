import { useRef, useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { getAchievements } from "../services/api";
import Loading from "../components/common/Loading.jsx";
import ErrorState from "../components/common/ErrorState.jsx";
import { ExternalLink, Award, BookOpen, BadgeCheck } from "lucide-react";

const typeMeta = {
  award: {
    label: "Award",
    icon: Award,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  course: {
    label: "Course",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  certification: {
    label: "Certification",
    icon: BadgeCheck,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
};


const AchievementCard = ({
  title,
  issuer,
  type,
  image,
  credential_url,
  year
}) => {

  const meta = typeMeta[type] ?? typeMeta.certification;
  const Icon = meta.icon;

  return (
    <div className="group bg-[#1a1a1a] border border-[#2d2d2d] rounded-2xl overflow-hidden hover:border-[#404040] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 flex flex-col">

      <div className="relative h-44 bg-[#111] overflow-hidden">

        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (

          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#262626] border border-[#333] flex items-center justify-center">
              <Icon size={32} className={meta.color}/>
            </div>
          </div>

        )}


        {year && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
            {year}
          </span>
        )}

      </div>


      <div className="flex flex-col flex-1 p-5">


        <div className="mb-3">

          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${meta.bg} ${meta.color}`}>

            <Icon size={11}/>
            {meta.label}

          </span>

        </div>



        <h3 className="text-white font-bold text-base mb-1 group-hover:text-blue-400 transition-colors leading-snug flex-1">

          {title}

        </h3>


        <p className="text-[#737373] text-sm mb-4">

          {issuer}

        </p>



        {credential_url && (

          <a
            href={credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors mt-auto"
          >

            <ExternalLink size={12}/>
            View Credential

          </a>

        )}

      </div>

    </div>
  );

};




const Achievements = () => {


  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);


  const { data, isLoading, error, refetch } = useApi(getAchievements);


  const achievements = data?.data ?? [];



  const filtered =
    activeFilter === "all"
      ? achievements
      : achievements.filter(
          (a) => a.type === activeFilter
        );




  const counts = {

    all: achievements.length,

    award: achievements.filter(
      (a)=>a.type==="award"
    ).length,


    course: achievements.filter(
      (a)=>a.type==="course"
    ).length,


    certification: achievements.filter(
      (a)=>a.type==="certification"
    ).length,

  };




  useEffect(()=>{

    const obs = new IntersectionObserver(

      ([entry])=>{

        if(entry.isIntersecting)
          setIsVisible(true);

      },

      {
        threshold:0.05
      }

    );


    if(sectionRef.current)
      obs.observe(sectionRef.current);


    return ()=>obs.disconnect();


  },[]);





  const filters = [

    {
      key:"all",
      label:"All"
    },

    {
      key:"certification",
      label:"Certifications"
    },

    {
      key:"course",
      label:"Courses"
    },

    {
      key:"award",
      label:"Awards"
    }

  ];





  return (

    <div className="pt-20 min-h-screen">


      <section ref={sectionRef} className="section">


        <div className="container">



          <div className={`mb-12 text-center transition-all duration-700 ${
            isVisible
            ?"opacity-100 translate-y-0"
            :"opacity-0 translate-y-8"
          }`}>



            <h2 className="section-title">
              Achievements
            </h2>


            <div className="section-divider"/>


            <p className="text-[#737373] max-w-xl mx-auto text-sm">

              Certifications, courses, and awards that reflect my commitment to continuous learning.

            </p>



          </div>





          <div className="flex flex-wrap justify-center gap-2 mb-10">


            {filters.map(({key,label})=>(

              <button

                key={key}

                onClick={()=>setActiveFilter(key)}

                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                  
                  activeFilter===key

                  ?"bg-blue-600 border-blue-500 text-white"

                  :"bg-transparent border-[#2d2d2d] text-[#737373]"

                }`}

              >

                {label}


                <span className="ml-2 text-xs">

                  {counts[key]}

                </span>


              </button>


            ))}


          </div>






          {
          isLoading ? (

            <Loading/>

          ) : error ? (

            <ErrorState 
              message={error}
              onRetry={refetch}
            />

          ) : filtered.length===0 ? (

            <div className="py-20 text-center">

              <Award size={32}/>

              <h3 className="text-white">
                No achievements found
              </h3>

            </div>


          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


              {
              filtered.map((achievement)=>(

                <AchievementCard
                  key={achievement.id}
                  {...achievement}
                />

              ))
              }


            </div>

          )

          }





        </div>


      </section>


    </div>

  );


};


export default Achievements;