import { projects } from "../lib/projects";
import { useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function HeroProjectSection() {
    const { slug } = useParams()
    const project = projects.find(p => p.slug === slug);

    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <section>
            <div className='flex flex-row flex-wrap gap-2 text-white text-7xl font-medium my-6'>
                <span className='text-white/30 pr-5'>Stack:</span>
                    {project.stack.map((prod, i) => (
                    <code key={i} className='text-orange-600'>
                        {prod}{i < project.stack.length - 1 ? "," : ""}
                    </code>
                ))}    
            </div>
            
            <motion.div
                ref={sectionRef}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)'  }}
                animate={sectionInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='flex flex-row flex-wrap gap-2 text-white text-7xl font-medium my-8'
            >
                <span className='text-white/30 pr-5'>Categories:</span>
                {project.category.map((cat, i) => (
                    <span key={i} className='text-white font-regular'>
                        {cat}{i < project.category.length - 1 ? "," : ""}
                    </span>
                ))}    
            </motion.div>

            <motion.div
                ref={sectionRef}
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)'  }}
                animate={sectionInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                className='flex flex-col gap-2 text-white text-7xl font-medium my-8'
            >
                <span className='text-white/30 flex gap-5'>GitHub:
                    <a className="text-white">{project.title}</a>
                </span>
                <span className='text-white/30 flex gap-5'>Demo:
                    <a className="text-white">Live Demo</a>
                </span>   
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                animate={sectionInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            >
                <h2 className='text-white/30 text-7xl font-medium'>About Project:</h2>
                <div className='text-3xl font-light mt-4'>
                    <p className='text-white pb-4'>{project.feedback[0]}</p>
                    <p className='text-white pb-4'>{project.feedback[1]}</p>
                    <p className='text-white'>{project.feedback[2]}</p>
                </div>
            </motion.div>
        </section>
    )
}

export default HeroProjectSection