"use client";

import projects from '@/lib/projects.json';
import BeforeMainSection from "./BeforeMainSection";
import HeroOverlay from "./HeroOverlay";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const stack = ["JavaScript", "TypeScript", "React", "Redux", "Redux-Toolkit", "Zustand", "Next.js", "Node.js", "Nest.js", "PostgreSQL", "HTML5", "CSS3", "Tailwind CSS", "Daisy UI", "SCSS/SASS"];

  const stackRef = useRef(null);
  const projectsRef = useRef(null);
  const stackInView = useInView(stackRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  return (
    <div>
      <HeroOverlay />
      <BeforeMainSection />

      <main className="relative z-10 bg-black-950 px-6 sm:px-12 md:px-20 lg:px-32 py-32">

        <section ref={stackRef} className="max-w-5xl mx-auto">
          <motion.h3
            className="text-9xl font-bold pb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={stackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            My Stack
          </motion.h3>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={stackInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="overflow-hidden w-screen -mx-6 sm:-mx-12 md:-mx-20 lg:-mx-32 my-8"
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap mb-100"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, j) => (
              <span key={j} className="flex gap-8 text-6xl font-mono text-white uppercase tracking-widest">
                {stack.map((tech) => (
                  <span key={tech} className="flex items-center gap-8">
                    {tech}
                    <span className="text-white/30">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <section ref={projectsRef} className="max-w-5xl mx-auto mt-32">
          <motion.h3
            className="text-9xl font-bold mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Portfolio
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 bg-black-800 p-8 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-300 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 mb-6" />
                <h4 className="text-xl font-semibold mb-2 text-slate-900">{project.title}</h4>
                <p className="text-slate-500 text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
};