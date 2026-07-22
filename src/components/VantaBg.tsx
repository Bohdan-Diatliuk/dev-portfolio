/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_SRC = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.clouds.min.js";

let scriptsPromise: Promise<void> | null = null;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      if ((existing as HTMLScriptElement).dataset.loaded === "true") resolve();
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadVantaScripts() {
  if (!scriptsPromise) {
    scriptsPromise = loadScript(THREE_SRC).then(() => loadScript(VANTA_SRC));
  }
  return scriptsPromise;
}

export default function VantaBg() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion || !vantaRef.current) return;

    let cancelled = false;

    loadVantaScripts().then(() => {
      if (cancelled || !vantaRef.current || !window.VANTA || !window.THREE) return;

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
    });

    return () => {
      cancelled = true;
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-sky-400 via-sky-200 to-orange-200" />
    );
  }

  return <div ref={vantaRef} className="absolute inset-0" />;
}
