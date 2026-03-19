"use client";

import { useEffect, useRef } from "react";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);

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

  return <div ref={vantaRef} className="absolute inset-0" />;
}