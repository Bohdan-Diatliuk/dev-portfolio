import { Github, Heart, Instagram, Linkedin, Mail, Music, Send } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion";
import VideoSection from "./VideoSection";

function MySection() {
    const sectionRef = useRef(null);
    const chillRef = useRef(null);
    const mainTextRef = useRef(null);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const chillInView = useInView(chillRef, { margin: "-100px" });
    const mainInView = useInView(mainTextRef, { once: true, margin: "-100px" });

    const text = [
        "I'm a Fullstack Developer with a strong focus on Frontend.",
        "I transform ideas into beautiful, effortless-to-use web apps.",
        "You can check out the tools I usually work with in my stack or by exploring my projects.",
        "While I mainly build on the frontend, I also handle backend tasks when needed to deliver fully functional products..."
    ];

    return (
        <section ref={sectionRef} className="max-w-5xl mx-auto mt-100">
            <motion.h3
                ref={mainTextRef}
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={mainInView ? { opacity: 1, y: 0, filter: "blur(0px)"} : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-white text-9xl font-clash mb-5"
            >
                About Meee
            </motion.h3>
            <div className="flex flex-row items-center gap-5 text-white mb-15">
                <a
                    href="https://github.com/Bohdan-Diatliuk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/40 transition-colors duration-300"
                >
                    <Github size={26}/>
                </a>
                <a 
                    href="https://www.instagram.com/netlyuk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/40 transition-colors duration-300"
                >
                    <Instagram size={26}/>
                </a>
                <a
                    href="https://www.linkedin.com/in/bohdan-diatliuk-9257a3372/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/40 transition-colors duration-300"
                >
                    <Linkedin size={26}/>
                </a>
                <a
                    href="mailto:dyatluk.bohdan@gmail.com"
                    className="hover:text-white/40 transition-colors duration-300"
                >
                    <Mail size={28}/>
                </a>
                <a
                    href="https://open.spotify.com/playlist/6YHNTg2kG2rLH53tOr2O91?si=1148579ff05549f6"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Music size={26}/>
                </a>
                <a
                    href="https://t.me/netlyuk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/40 transition-colors duration-300"
                >
                    <Send size={24}/>
                </a>
                <a 
                    href="https://drive.google.com/file/d/17LLv3nycRzNcxvdaZ-U7bgVytOeQkD7B/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/40 transition-colors duration-300"
                >
                    <Heart size={26}/>
                </a>
            </div>
            <div ref={ref} className="flex flex-col gap-2 mb-35">
                {text.map((chat, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={isInView ? {opacity: 1} : {}}
                        transition={{ duration: 2, delay: i * 0.55 }}
                        className="text-white text-5xl font-medium"
                    >
                        {chat === "" ? "\u00A0" : chat}
                    </motion.span>
                ))}
            </div>
            <div ref={chillRef} className="flex flex-col gap-8">
                <motion.span
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={chillInView ? { opacity: 1, y: 0, filter: "blur(0px)"} : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-white text-7xl font-clash"
                >
                    Okay, it was so seriusly, chill bro, come here
                </motion.span>

                <VideoSection src="/videos/tiktok/one.MP4"/>
            
            </div>
        </section>
    )
}

export default MySection