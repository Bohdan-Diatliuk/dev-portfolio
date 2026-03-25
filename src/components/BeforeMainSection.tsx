import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BeforeMainSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const text = "I create modern, responsive, \nand user friendly web applications.";

  return (
    <section className="relative z-60 min-h-screen flex items-center px-4 sm:px-12 md:px-20 lg:px-32 bg-black-950">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-6xl  font-clash leading-none text-white">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 2.25, delay: i * 0.05 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
}