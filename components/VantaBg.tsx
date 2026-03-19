"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaRef.current || !window.VANTA || !window.THREE) return;

    vantaEffect.current = window.VANTA.CLOUDS({
      el: vantaRef.current,
      THREE: window.THREE,
      skyColor: 0x68b8d7,
      cloudColor: 0xadc4d9,
      cloudShadowColor: 0x183550,
      sunColor: 0xff9919,
      sunGlareColor: 0xff6633,
      sunlightColor: 0xff9933,
      speed: 1,
    });

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

  return <div ref={vantaRef} className="absolute inset-0 bg-sky-300" />;
}