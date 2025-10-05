import React from "react";
import { Link } from "react-router-dom";
import MyPhoto from "../assets/images/my_foto.jpg";

const About = () => {
  return (
    <div className="pt-20 min-h-screen">
      {/* About Me & Skills */}
      <section className="bg-slate-900/50 pb-10">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">About Me</h2>
            <div className="mx-auto w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Profile Section */}
            <div className="flex flex-col items-center lg:items-start">
              {/* Profile Image */}
              <div className="flex justify-center items-center mb-8 w-32 h-32 rounded-lg border-2 border-cyan-400/30 bg-slate-800/50">
                <img src={MyPhoto} alt="My Photo" className="object-cover w-full h-full rounded-lg" />
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-cyan-400">Full-Stack Developer & Data Scientist</h3>
                <p className="mb-6 leading-relaxed text-slate-300">
                  I'm <span className="font-extrabold">Zidane Abbas Mallaniung</span>, a graduate of <span className="font-extrabold">Diploma in Informatics Engineering</span> with a strong interest in{" "}
                  <span className="font-extrabold">web development</span> and <span className="font-extrabold">data management</span>. Since college, I’ve been actively involved in developing various web-based projects, including a Point of
                  Sales (POS) application that became the focus of my final project. I enjoy building functional and efficient systems while paying attention to every detail—from planning to testing.
                </p>
                <p className="leading-relaxed text-slate-300">
                  In addition to my web development experience, I also worked as a <span className="font-extrabold">Data Entry & Data Manager</span> Intern at PT Tambang Raya Usaha Tama and as{" "}
                  <span className="font-extrabold">an Administrative Staff</span> at Surya Raya Badminton. These experiences strengthened my skills in data handling, administrative accuracy, and professional communication in a workplace
                  setting. I believe that combining technical expertise with strong discipline is essential to continuously grow in the technology field.
                </p>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cyan-400/30"></div>

              {/* Timeline Items */}
              <div className="space-y-8 max-h-9/12 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyan-400/50 scrollbar-track-slate-700/30">
                <div className="flex relative items-start">
                  <div className="absolute left-2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="ml-12">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-cyan-400">2025</span>
                      <h4 className="text-lg font-bold text-white">Suvi Training</h4>
                      <p className="font-medium text-cyan-400">Web Development NodeJS & React</p>
                    </div>
                    <p className="text-sm text-slate-300">Participated in a web development training program focusing on modern JavaScript technologies to enhance full-stack development capabilities.</p>
                  </div>
                </div>

                <div className="flex relative items-start">
                  <div className="absolute left-2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="ml-12">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-cyan-400">2025</span>
                      <h4 className="text-lg font-bold text-white">Surya Raya Badminton</h4>
                      <p className="font-medium text-cyan-400">Administrative Staff</p>
                    </div>
                    <p className="text-sm text-slate-300">
                      Responsible for daily administrative operations, documentation, and financial record management. Assisted internal coordination and maintained effective communication within the organization.
                    </p>
                  </div>
                </div>

                <div className="flex relative items-start">
                  <div className="absolute left-2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="ml-12">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-cyan-400">2025</span>
                      <h4 className="text-lg font-bold text-white">PT Tambang Raya Usaha Tama</h4>
                      <p className="font-medium text-cyan-400">Data Manager & Data Entry</p>
                    </div>
                    <p className="text-sm text-slate-300">
                      Managed and validated daily operational data using Microsoft Excel, ensuring data accuracy before transferring it to the main file. Strengthened analytical and organizational skills through systematic data handling.
                    </p>
                  </div>
                </div>

                <div className="flex relative items-start">
                  <div className="absolute left-2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="ml-12">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-cyan-400">2024</span>
                      <h4 className="text-lg font-bold text-white">Politeknik Negeri Samarinda</h4>
                      <p className="font-medium text-cyan-400">Final Project: Web Development</p>
                    </div>
                    <p className="text-sm text-slate-300">
                      Designed and implemented a web-based Point of Sales (POS) application using Laravel and the Unified Modeling Language (UML) methodology. Conducted blackbox testing to ensure the reliability and functionality of the
                      system.
                    </p>
                  </div>
                </div>

                <div className="flex relative items-start">
                  <div className="absolute left-2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="ml-12">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-cyan-400">2023</span>
                      <h4 className="text-lg font-bold text-white">GreenNusa Computindo</h4>
                      <p className="font-medium text-cyan-400">Web Development Intern</p>
                    </div>
                    <p className="text-sm text-slate-300">Developed dynamic web pages using Laravel Framework while learning the fundamentals of database management and responsive design.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="section bg-slate-800/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Technical Skills</h2>
            <div className="mx-auto w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Web Development */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-8">Web Development</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">HTML/CSS/JavaScript</span>
                    <span className="text-cyan-400 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">React/</span>
                    <span className="text-cyan-400 font-semibold">80%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Node.js</span>
                    <span className="text-cyan-400 font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Database Management</span>
                    <span className="text-cyan-400 font-semibold">70%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">UI/UX Design</span>
                    <span className="text-cyan-400 font-semibold">55%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Science */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-8">Data Science</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Python/R</span>
                    <span className="text-cyan-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Machine Learning</span>
                    <span className="text-cyan-400 font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Data Visualization</span>
                    <span className="text-cyan-400 font-semibold">82%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Statistical Analysis</span>
                    <span className="text-cyan-400 font-semibold">70%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Big Data Technologies</span>
                    <span className="text-cyan-400 font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Education Section */}
      <section className="section bg-slate-900/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Certifications & Education</h2>
            <div className="mx-auto w-40 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Education Cards */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">Master of Computer Science</div>
              <div className="text-cyan-300 text-sm mb-2">Stanford University</div>
              <div className="text-slate-400 text-sm">2014 - 2016</div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">AWS Certified Solutions Architect</div>
              <div className="text-cyan-300 text-sm mb-2">Amazon Web Services</div>
              <div className="text-slate-400 text-sm">2019</div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">TensorFlow Developer Certificate</div>
              <div className="text-cyan-300 text-sm mb-2">Google</div>
              <div className="text-slate-400 text-sm">2020</div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">Full-Stack Web Development</div>
              <div className="text-cyan-300 text-sm mb-2">freeCodeCamp</div>
              <div className="text-slate-400 text-sm">2018</div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">Bachelor of Science in Computer Engineering</div>
              <div className="text-cyan-300 text-sm mb-2">MIT</div>
              <div className="text-slate-400 text-sm">2010 - 2014</div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
              <div className="text-cyan-400 font-bold text-lg mb-2">Data Science Professional</div>
              <div className="text-cyan-300 text-sm mb-2">IBM</div>
              <div className="text-slate-400 text-sm">2019</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
