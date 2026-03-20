/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function VantaBg() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const init = () => {
      if (!window.VANTA || !window.THREE || !vantaRef.current) return;
      
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
    };

    if (window.VANTA && window.THREE) {
      init();
    } else {
      window.addEventListener('load', init, { once: true });
    }

    return () => {
      vantaEffect.current?.destroy();
      window.removeEventListener('load', init);
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0" />;
}