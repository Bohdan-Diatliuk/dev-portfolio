import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function MyToolsSection() {
    const stack = ["JavaScript", "TypeScript", "React", "Redux", "Redux-Toolkit", "Zustand",];
    const stackB = ["Node.js", "Nest.js", "PostgreSQL", "HTML5", "CSS3", "Tailwind CSS"]
    const stackF = ["SCSS/SASS", "Docker", "React Native", "REST API", "Next.js", "Daisy UI"];
    const coreStack = ["JavaScript", "React", "TypeScript", "Tailwind CSS"]

    const stackRef = useRef(null);
    const stackInView = useInView(stackRef, { margin: "-100px" });
    
    return (
        <>
        <section ref={stackRef} className="max-w-5xl mx-auto pb-20">
          <motion.div
            className="group relative flex items-center gap-8"
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={stackInView ? { opacity: 1, y: 0, filter: "blur(0px)"} : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-9xl font-clash text-white cursor-default">
              My Tools
            </h3>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
              <h4 className="text-5xl font-clash text-red-700">My Heart</h4>
              {coreStack.map((tech) => (
                  <span key={tech} className="text-xl font-clash text-white/60 tracking-wide">
                    {tech}
                  </span>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={stackInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="overflow-hidden w-screen -mx-6 sm:-mx-12 md:-mx-20 lg:-mx-32 my-8"
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
            {[...Array(2)].map((_, j) => (
                <span key={j} className="flex gap-8 text-6xl font-clash text-white uppercase tracking-widest">
                {stack.map((tech) => (
                    <span key={tech} className="flex items-center gap-8">
                    {tech}
                    <span className="text-white/30">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
            {[...Array(2)].map((_, j) => (
                <span key={j} className="flex gap-8 text-6xl font-clash text-white uppercase tracking-widest">
                {stackB.map((tech) => (
                    <span key={tech} className="flex items-center gap-8">
                    {tech}
                    <span className="text-white/30">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
            {[...Array(2)].map((_, j) => (
                <span key={j} className="flex gap-8 text-6xl font-clash text-white uppercase tracking-widest">
                {stackF.map((tech) => (
                  <span key={tech} className="flex items-center gap-8">
                    {tech}
                    <span className="text-white/30">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </motion.div>
        </>
    );
}

export default MyToolsSection