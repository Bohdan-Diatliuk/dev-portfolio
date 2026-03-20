import { projects } from "../lib/projects";
import { useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function HeroProjectSection() {
    const { slug } = useParams()
    const project = projects.find(p => p.slug === slug);

    const categoriesRef = useRef(null);
    const linksRef = useRef(null);
    const aboutRef = useRef(null);


    const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" });
    const linksInView = useInView(linksRef, {  once: true, margin: "-100px" });
    const aboutInView = useInView(aboutRef, {  once: true, margin: "-100px" });
    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <section>
            <div className='flex flex-row flex-wrap items-baseline gap-4 text-white text-7xl font-medium mt-6 mb-50'>
                <span className='text-white/30 pr-5'>Stack:</span>
                    {project.stack.map((prod, i) => (
                    <span key={i} className='text-white/90 text-6xl font-jet'>
                        {prod}{i < project.stack.length - 1 ? "," : ""}
                    </span>
                ))}    
            </div>
            
            <motion.div
                ref={categoriesRef}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)'  }}
                animate={categoriesInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='flex flex-row flex-wrap gap-4 text-7xl font-medium mb-50'
            >
                <span className='text-white/30'>Categories:</span>
                {project.category.map((cat, i) => (
                    <span key={i} className='text-white/90 pr-6 font-regular'>
                        {cat}{i < project.category.length - 1 ? "," : ""}
                    </span>
                ))}    
            </motion.div>

            <motion.div
                ref={linksRef}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)'  }}
                animate={linksInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='text-white text-7xl font-medium mb-50'
            >
                {project.github && (

                    <div className="flex gap-8 items-center mb-4 ">
                    <span className="text-white/30">GitHub:</span>
                    <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-500 transition-colors duration-300 font-regular"
                        >
                        {project.title}
                    </a>
                </div>
                )}
                <div className="flex gap-8 items-center mb-4">
                    <span className="text-white/30">Live Demo:</span>
                    <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-500 transition-colors duration-300 font-regular"
                    >
                        Demo
                    </a>
                </div>
            </motion.div>
            
            <motion.div
                ref={aboutRef}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                animate={aboutInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <h2 className='text-white/30 text-7xl font-medium'>About Project:</h2>
                <div className='text-3xl font-light mt-4'>   
                    {project.feedback.map((prod, i) => (
                        <p
                            key={i}
                            className={`text-white ${i < project.feedback.length - 1 ? 'pb-4' : ''}`}
                        >
                            {prod}
                        </p>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default HeroProjectSection