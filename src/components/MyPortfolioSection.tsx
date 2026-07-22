import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import projects from '../lib/projects.json';
import { useNavigate } from "react-router-dom";

function MyPortfolioSection() {
    const projectsRef = useRef(null);
    const navigate = useNavigate();
    const projectsInView = useInView(projectsRef, { margin: "-100px" });
    const inProgressCount = projects.filter((project) => project.category.includes("In Progress")).length;
    const doneCount = projects.length - inProgressCount;

    return (
        <section ref={projectsRef} className="max-w-5xl mx-auto mt-150">
          <motion.h3
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-clash text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 3.6, ease: "easeOut" }}
          >
            My Portfolio
          </motion.h3>
          <motion.p
            className="text-white/50 font-regular text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 3.6, delay: 0.1, ease: "easeOut" }}
          >
            {projects.length} projects
          </motion.p>
          <motion.p
            className="text-white/30 font-regular text-xs sm:text-sm mb-12 pb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 3.6, delay: 0.15, ease: "easeOut" }}
          >
            {doneCount} done · {inProgressCount} in progress
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const isInProgress = project.category.includes("In Progress")

              return (
                <motion.div
                  key={project.id}
                  onClick={() => !isInProgress && navigate(`/projects/${project.slug}`)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className={`relative rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors duration-300  hoverable ${
                    isInProgress
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:bg-white/10 hover:border-white/20 cursor-pointer'
                    }`}
                  >
                  
                  {isInProgress && (
                    <span className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      In Progress
                    </span>
                  )}

                  <div className="w-10 h-10 rounded-xl mb-6">
                    <img
                      src={`/${project.image}`}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-xl font-medium mb-2 text-white">{project.title}</h4>
                  <p className="text-white/50 font-regular text-sm">{project.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>
    )
}

export default MyPortfolioSection