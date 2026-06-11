/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project } from "../types";
import { Sparkles, ArrowRight, CornerRightDown, Lock, Grid, Eye } from "lucide-react";

interface InteractiveNightCityProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  unlocked: boolean;
}

export default function InteractiveNightCity({
  projects,
  onProjectSelect,
  unlocked,
}: InteractiveNightCityProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Extract unique categories for filtration
  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects based on active category selection
  const filteredProjects = activeCategory === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="relative w-full overflow-hidden select-none scroll-mt-24" id="interactive-nightpath-section">
      {/* Self-contained styling for floating animations and the bento theme */}
      <style>{`
        @keyframes gentleFloatOdd {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes gentleFloatEven {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-0.4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-odd {
          animation: gentleFloatOdd 6s ease-in-out infinite;
        }
        .animate-float-even {
          animation: gentleFloatEven 8s ease-in-out infinite;
        }
        .bento-card-glow {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bento-card-glow:hover {
          box-shadow: 0 15px 40px rgba(7, 86, 155, 0.12), inset 0 0 15px rgba(7, 86, 155, 0.05);
          transform: translateY(-6px) scale(1.015);
        }
        .blueprint-lines {
          background-size: 24px 24px;
          background-image: 
            linear-gradient(to right, rgba(7, 86, 155, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(7, 86, 155, 0.04) 1px, transparent 1px);
        }
      `}</style>

      {/* Header Panel */}
      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-3 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#07569b]/10 border border-[#07569b]/30 text-[#07569b] rounded-full text-[10px] font-mono uppercase tracking-[0.2em] mb-4 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#07569b] animate-spin-slow" />
            Signboard Masterpieces Portfolio
          </div>
          <h2 className="text-3xl md:text-5.5xl font-display font-black tracking-tight text-slate-900 mb-2 leading-none">
            엄선된 작품 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-[#07569b] to-blue-700">포트폴리오</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-sans max-w-2xl leading-relaxed font-medium">
            도시 상업 경관의 기하학적 흐름을 계산하여 축조한 정밀 간판 시안들입니다. 아래에서 카테고리를 선택해 설계 도면 그리드를 관람할 수 있으며, 작품 카드를 클릭하시면 <strong className="text-slate-900 font-bold">실제 현장 대비 1400px 분할 암호화 렌더러가 장착된 풀스크린 상세 사양서</strong>가 역동적으로 확장됩니다.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1.5 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          <span className="flex items-center gap-1">원하는 작품 카드를 클릭하여 정밀 사양 확인 <CornerRightDown className="w-3.5 h-3.5 text-[#07569b]" /></span>
          <span>BENTO ARCHITECTURE v3.1</span>
        </div>
      </div>

      {/* Modern Filter Category Ribbon */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-wrap gap-2.5 justify-center md:justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all cursor-pointer border ${
              activeCategory === cat
                ? "bg-[#07569b]/15 border-[#07569b] text-[#07569b] font-black shadow-[0_4px_15px_rgba(7,86,155,0.12)]"
                : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Static Bento Grid Layout with Floating sways */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const primaryColor = project.colors[0]?.hex || "#07569b";
            const isHovered = hoveredProjectId === project.id;
            
            // Generate some distinct bento layouts based on index representation
            const isLargeCell = idx === 0 || idx === 4;
            const cardSpan = isLargeCell ? "md:col-span-2 lg:col-span-1" : "";
            const animationClass = idx % 2 === 0 ? "animate-float-even" : "animate-float-odd";

            return (
              <div
                key={project.id}
                className={`${animationClass} ${cardSpan}`}
              >
                <div
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => onProjectSelect(project)}
                  className="group relative h-full overflow-hidden bg-white/95 border border-slate-200/80 hover:border-[#07569b]/55 rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 bento-card-glow"
                  style={{
                    borderLeft: `4px solid ${primaryColor}`
                  }}
                >
                  {/* Blueprint delicate background grids */}
                  <div className="absolute inset-0 blueprint-lines pointer-events-none opacity-30 z-0" />

                  {/* Secure watermark diagonal lines behind card content */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.015] z-0 overflow-hidden">
                    <span className="text-[24px] font-mono font-bold tracking-[0.4em] uppercase -rotate-12 whitespace-nowrap text-slate-900">
                      HSW PORTFOLIO PROTECT
                    </span>
                  </div>

                  {/* Card Top Block: Category and Premium badge */}
                  <div className="relative z-10 flex justify-between items-center mb-4">
                    <span 
                      className="text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 font-bold"
                      style={{ color: primaryColor }}
                    >
                      {project.category}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      {project.isPremium && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 bg-[#07569b]/10 text-[#07569b] border border-[#07569b]/30 rounded font-bold tracking-widest flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> PREMIUM
                        </span>
                      )}
                      <span 
                        className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'animate-ping' : ''}`} 
                        style={{ backgroundColor: primaryColor }} 
                      />
                    </div>
                  </div>

                  {/* Image Preview Block: Show what the signboard looks like with modern title form */}
                  <div className="relative z-10 w-full aspect-[16/10] my-3.5 rounded-xl overflow-hidden border border-slate-150 bg-slate-50 shadow-sm">
                    <img 
                      src={project.imgAfter} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Micro hover interaction indicator */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/95 backdrop-blur-sm border border-[#07569b]/35 px-3 py-1.5 rounded-full flex items-center gap-1 text-[9px] font-mono font-black text-[#07569b] shadow-md uppercase tracking-wider scale-90 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5 animate-pulse" /> Full Blueprints Open
                      </div>
                    </div>
                  </div>

                  {/* Card Middle Block: Project Info with elegant layouts */}
                  <div className="relative z-10 mt-1 mb-5">
                    {/* Subtle coordinates / specs label to show design detail */}
                    <div className="text-[9px] font-mono text-slate-400 mb-1 flex items-center gap-1 font-bold">
                      <Grid className="w-3 h-3 opacity-60" /> SPEC CODE: {project.id.toUpperCase()}-{idx + 1}
                    </div>
                    
                    <h3 
                      className={`text-base md:text-lg font-sans font-extrabold text-slate-900 tracking-tight leading-tight transition-colors ${isHovered ? 'text-[#07569b]' : ''}`}
                      style={{
                        textShadow: isHovered ? `0 0 10px ${primaryColor}15` : "none"
                      }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-sans mt-1.5 leading-relaxed line-clamp-2 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Card Bottom Block: Color system indicator & Action label */}
                  <div className="relative z-10 flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    {/* Miniature color palette swatches */}
                    <div className="flex gap-1.5">
                      {project.colors.map((color, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="w-4 h-4 rounded-full border border-slate-200 cursor-help shadow-sm" 
                          style={{ backgroundColor: color.hex }} 
                          title={`${color.name}: ${color.hex}`}
                        />
                      ))}
                    </div>

                    {/* Trigger Case Study Button with Hover Animation */}
                    <span className="font-mono text-[10px] font-bold text-slate-450 group-hover:text-[#07569b] flex items-center gap-1.5 transition-colors">
                      도면 확대하기 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Subtle outer neon pulse in hover */}
                  {isHovered && (
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                      style={{
                        border: `1px solid ${primaryColor}40`,
                        boxShadow: `inset 0 0 15px ${primaryColor}05`
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
