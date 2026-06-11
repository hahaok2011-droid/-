/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Compass, Lightbulb, MapPin, Eye } from "lucide-react";

export default function HeroSign() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Compute rotational tilt angles (maximum 18 degrees tilt)
      const tiltX = -(y / (rect.height / 2)) * 18;
      const tiltY = (x / (rect.width / 2)) * 18;
      
      setRotation({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      // Smooth return to default neutral position
      setRotation({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[250px] md:h-[400px] bg-[#07569b]/[0.08] blur-[120px] rounded-full pointer-events-none select-none z-0" />
      
      {/* 3D SIGNBOARD FRAME STAGE */}
      <div 
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-full max-w-[500px] md:max-w-[700px] bg-white border border-[#07569b]/30 rounded-3xl p-6 md:p-12 transition-all duration-300 ease-out flex flex-col items-center justify-center select-none cursor-grab shadow-[0_20px_50px_rgba(7,86,155,0.06)]"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered 
            ? "0 30px 60px rgba(7, 86, 155, 0.12), 0 0 30px 1px rgba(7, 86, 155, 0.2)" 
            : "0 20px 50px rgba(7, 86, 155, 0.06)"
        }}
      >
        {/* Absolute metal studs (4 corners of industrial sign boards) */}
        <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-slate-200 border border-slate-300" />
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-200 border border-slate-300" />
        <span className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-slate-200 border border-slate-300" />
        <span className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-slate-200 border border-slate-300" />
 
        {/* Outer neon strip background glow */}
        <div 
          className="absolute inset-[1px] rounded-[22px] border border-[#07569b]/20 pointer-events-none transition-all duration-500"
          style={{
            boxShadow: isHovered 
              ? "inset 0 0 25px rgba(7, 86, 155, 0.1), 0 0 10px rgba(7, 86, 155, 0.05)" 
              : "none"
          }}
        />

        {/* Top bar header HUD tag */}
        <div className="flex items-center gap-2 mb-8 pointer-events-none transform translate-z-10 bg-slate-50 border border-slate-100 py-1 px-3.5 rounded-full text-[10px] font-sans tracking-wide text-[#07569b] font-bold shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#07569b] animate-spin-slow" />
          마우스를 올리면 움직입니다.
        </div>

        {/* MAIN TEXT TITLE: STYLED AS ROTATING NEON SIGN */}
        <div 
          className="text-center transform translate-z-20 transition-all duration-300 pointer-events-none"
          style={{ transform: "translateZ(50px)" }}
        >
          <p className="text-slate-400 text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase mb-4 font-black select-none">
            - THE MOMENT OUTDOOR CHANGER -
          </p>
          
          {/* Sizable elegant Title with glowing and flickering letters - resized to give air/negative space */}
          <h1 className="text-3xl md:text-4.5xl font-sans font-medium tracking-tight text-slate-800 leading-relaxed select-none break-keep px-1 mb-2">
            첫인상을 디자인합니다,
            <span className="block mt-2.5 font-sans font-light text-slate-600">
              간판디자이너 <strong className="font-bold text-[#07569b] cyan-glow">하승완</strong>입니다
            </span>
          </h1>

          <p className="text-slate-500 text-[10px] md:text-[11px] font-sans tracking-wide mt-5 max-w-sm md:max-w-md mx-auto leading-relaxed select-none font-medium">
            "간판 하나가 빌딩의 자태와 도시의 가로수 그늘을 바꿀 때, 공간 브랜딩의 심장은 비로소 고동칩니다."
          </p>
        </div>

        {/* DYNAMIC METRIC LABELS */}
        <div 
          className="grid grid-cols-3 gap-3 md:gap-6 mt-10 pt-8 border-t border-slate-100 w-full transform translate-z-10 text-center"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex flex-col gap-1 bg-slate-55 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">Experience</span>
            <span className="text-sm md:text-lg font-mono font-black text-[#07569b]">20 Years+</span>
          </div>

          <div className="flex flex-col gap-1 bg-slate-55 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">Completed</span>
            <span className="text-sm md:text-lg font-mono font-black text-[#07569b]">5000+</span>
          </div>

          <div className="flex flex-col gap-1 bg-slate-55 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">Aesthetics</span>
            <span className="text-sm md:text-lg font-mono font-black text-[#07569b]">Pure Detail</span>
          </div>
        </div>

        {/* Bottom design credits indicator */}
        <div className="mt-8 text-center text-[9px] font-mono text-slate-400 tracking-[0.2em] uppercase transform translate-z-5">
          LED CHASSIS SENSOR / PERSPECTIVE ROTATION v1.99
        </div>

      </div>

      {/* RECRUITER IMPACT STATEMENT BOX */}
      <div className="relative z-10 max-w-xl text-center mt-12 px-4 transition-all duration-350">
        <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 tracking-tight">
          하승완 <span className="text-[#07569b] font-mono font-bold text-xs uppercase ml-1.5 border-l border-slate-200 pl-2">Outdoor Advertising Designer</span>
        </h2>
        <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed font-sans font-medium">
          단순 공예 기술자를 마감하고, 도시 상업 경관의 맥락을 읽는 
          <strong className="text-slate-900"> '공간 브랜딩 디자이너'</strong>로 활동합니다. 빌딩 외벽의 음영 and 관측 거리 50m 시인성을 
          정량 지표화하여, 비즈니스를 성공시키는 사인을 제도합니다.
        </p>
      </div>

    </div>
  );
}
