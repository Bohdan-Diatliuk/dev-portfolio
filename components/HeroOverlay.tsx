"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroOverlay() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);
  const [h1Visible, setH1Visible] = useState(false);

  useEffect(() => {
    if (!vantaRef.current) return;

    const load = async () => {
      const THREE = await import("three");
      const CLOUDS = (await import("vanta/dist/vanta.clouds.min")).default;

      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE,
        skyColor: 0x68b8d7,
        cloudColor: 0xadc4d9,
        cloudShadowColor: 0x183550,
        sunColor: 0xff9919,
        sunGlareColor: 0xff6633,
        sunlightColor: 0xff9933,
        speed: 1,
      });
    };

    load();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const canvas = vantaRef.current?.querySelector("canvas") as HTMLCanvasElement;
        if (!canvas) return;
        canvas.style.display = entry.isIntersecting ? "block" : "none";
      },
      { threshold: 0 }
    );

    if (vantaRef.current) observer.observe(vantaRef.current);

    return () => {
      observer.disconnect();
      vantaEffect.current?.destroy();
    };
  }, []);

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
        <div ref={vantaRef} className="absolute inset-0" />

        <motion.div
          style={{ y: textY, scale: textScale, opacity: textOpacity, filter: textFilter }}
          className="relative z-10 h-full flex flex-col items-center justify-center gap-6 select-none"
        >
          <h1 className="text-7xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
            {mainText}
          </h1>

          <h2 className="text-4xl font-bold text-white/90 tracking-tight drop-shadow-md flex">
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={h1Visible ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.05,
                  delay: i * 0.06,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-b from-transparent to-black-900 z-10" />
      </motion.div>

      <div ref={spacerRef} className="h-[300vh]" />
    </>
  );
}