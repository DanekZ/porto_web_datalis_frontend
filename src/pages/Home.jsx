import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GridBackground from "../components/common/grid-background/GridBackground.jsx";
import MyFoto from "../assets/images/my_foto.jpg";
import { TypeAnimation } from "react-type-animation";
import { ChevronRight } from "lucide-react";

function Home() {
  const [isExpertiseVisible, setIsExpertiseVisible] = useState(false);
  const expertiseRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsExpertiseVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
      }
    );

    const currentElement = expertiseRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <>
      <div className="pt-16 min-h-screen">
        {/* Hero Section */}
        <GridBackground>
          <section className="flex justify-center items-center h-[90vh] px-4 sm:px-6 lg:px-8">
            <div className="container flex flex-col-reverse justify-between items-center md:flex-row min-h-[50vh] gap-8 md:gap-12">
              <div className="flex-1 mx-auto max-w-2xl text-wrap">
                {/* Step 1: Greeting */}
                <p className="mb-2 text-sm font-semibold sm:text-base lg:text-lg text-gradient text-start">
                  <TypeAnimation sequence={["Hello, My name is"]} speed={50} repeat={0} cursor={false} />
                </p>

                {/* Step 2: Name with delay */}
                <h1 className="mb-2 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-5xl xl:text-6xl text-start">
                  <TypeAnimation sequence={[1000, "Zidane Abbas Mallaniung"]} speed={50} repeat={0} cursor={false} />
                </h1>

                {/* Step 3: Profession with delay */}
                <h2 className="mb-4 text-lg font-semibold text-gray-300 sm:text-xl md:text-2xl lg:text-3xl text-start">
                  <TypeAnimation sequence={[2500, "Web Developer", 2500, "Data Scientist"]} speed={50} repeat={Infinity} />
                </h2>

                <p className="text-sm leading-relaxed text-gray-400 sm:text-base lg:text-lg text-start">
                  <TypeAnimation
                    sequence={[3000, "I build exceptional digital experiences and extract meaningful insight from data. Specializing in creating elegant web solutions and powerful data analytics tools that drive business decisions."]}
                    speed={80}
                    repeat={0}
                    cursor={false}
                  />
                </p>
              </div>
              <div className="flex flex-1 justify-center items-center">
                <img src={MyFoto} alt="My Foto" className="object-cover w-48 h-48 rounded-lg border-4 border-gray-500 shadow-lg sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72" />
              </div>
            </div>
          </section>
        </GridBackground>

        {/* My Expertise */}
        <section ref={expertiseRef} className="flex justify-center items-center min-h-screen section">
          <div className="container">
            <div className="text-center">
              <div className={`mb-8 transition-all duration-1000 ${isExpertiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <h2 className="mb-4 text-4xl font-bold text-white">My Expertise</h2>
                <div className="mx-auto w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <div className={`grid grid-cols-1 gap-8 mx-auto max-w-6xl md:grid-cols-2 transition-all duration-1000 delay-300 ${isExpertiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {/* Web Development Column */}
                <div
                  className={`p-6 rounded-lg border backdrop-blur-sm bg-slate-800/50 border-slate-700 transition-all duration-1000 delay-500 ${
                    isExpertiseVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
                  }`}
                >
                  <div className="flex items-center mb-6">
                    <div className="flex justify-center items-center mr-3 w-8 h-8 bg-blue-500 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Web Development</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>React & Next.js</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>Node.js & Express</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>TypeScript</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>Responsive UI/UX Design</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>RESTful API Development</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>MySQL</span>
                    </div>
                  </div>
                </div>

                {/* Data Science Column */}
                <div
                  className={`p-6 rounded-lg border backdrop-blur-sm bg-slate-800/50 border-slate-700 transition-all duration-1000 delay-700 ${
                    isExpertiseVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
                  }`}
                >
                  <div className="flex items-center mb-6">
                    <div className="flex justify-center items-center mr-3 w-8 h-8 bg-purple-500 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Data Science</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>Python</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>Machine Learning</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>Data Visualization</span>
                    </div>
                    <div className="flex items-center transition-colors text-slate-300 hover:text-white">
                      <ChevronRight className="text-green-400" />
                      <span>Statistical Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
