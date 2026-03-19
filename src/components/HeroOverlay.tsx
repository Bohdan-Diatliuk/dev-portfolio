import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import VantaBackground from "./VantaBg";

export default function HeroOverlay() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [h1Visible, setH1Visible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15, 0.6], ["20px", "0px", "-40px"]);
  const textScale = useTransform(scrollYProgress, [0, 0.15, 0.5], [1.3, 1, 1]);
  const textBlur = useTransform(scrollYProgress, [0, 0.15], [12, 0]);
  const textFilter = useMotionTemplate`blur(${textBlur}px)`;

  useMotionValueEvent(textOpacity, "change", (v) => {
    if (v > 0.9 && !h1Visible) setH1Visible(true);
  });

  const mainText = "Hi, I'm Bohdan!";
  const text = "FullStack Developer";

  return (
    <>
      <motion.div
        style={{ opacity: heroOpacity }}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <VantaBackground />

        <motion.div
          style={{ y: textY, scale: textScale, opacity: textOpacity, filter: textFilter }}
          className="relative z-10 h-full flex flex-col items-center justify-center gap-6 select-none"
        >
          <h1 className="text-8xl font-clash text-white leading-none drop-shadow-lg">
            {mainText}
          </h1>

          <h2 className="text-4xl font-clash text-white/90 drop-shadow-md flex">
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={h1Visible ? { opacity: 1 } : {}}
                transition={{ duration: 0.05, delay: i * 0.06 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-b from-transparent to-slate-950 z-10" />
      </motion.div>

      <div ref={spacerRef} className="h-[300vh]" />
    </>
  );
}