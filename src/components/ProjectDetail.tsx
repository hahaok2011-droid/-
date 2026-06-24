/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Project } from "../types";
import { 
  X, AlertCircle, Lightbulb, Lock, ArrowRight, ShieldCheck, Sparkles
} from "lucide-react";
import SplitCanvasViewer from "./SplitCanvasViewer";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlockRequest: (password: string) => boolean;
}

export default function ProjectDetail({
  project,
  onClose,
  isUnlocked,
  onUnlockRequest,
}: ProjectDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  
  // Anti-capture security status
  const [blackoutActive, setBlackoutActive] = useState(false);

  // Update real-time ticking UTC timestamp to embed persistent security stamps
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.getUTCFullYear() + "-" + 
                     String(now.getUTCMonth() + 1).padStart(2, "0") + "-" + 
                     String(now.getUTCDate()).padStart(2, "0") + " " + 
                     String(now.getUTCHours()).padStart(2, "0") + ":" + 
                     String(now.getUTCMinutes()).padStart(2, "0") + ":" + 
                     String(now.getUTCSeconds()).padStart(2, "0") + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    // Setup hotkey capture/print screen blockers
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      
      // ESC button close logic requested by user
      if (e.key === "Escape" || e.key === "Esc") {
        onClose();
        return;
      }

      // Blackout when typical snapshot/export hotkeys are triggered
      if (
        e.key === "PrintScreen" || 
        e.key === "Snapshot" ||
        (isCmdOrCtrl && e.key === "p") || // Web page printable
        (isCmdOrCtrl && e.key === "s") || // File save
        (isCmdOrCtrl && e.key === "c") || // Copy blocking
        e.key === "F12" || // Inspector
        (isCmdOrCtrl && e.shiftKey && e.key === "s") || // Win+Shift+S snipping trigger hint
        (isCmdOrCtrl && e.shiftKey && e.key === "4")    // Mac command shift 4 hint
      ) {
        setBlackoutActive(true);
        const warningToast = document.getElementById("hswup-warning-toast");
        if (warningToast) {
          warningToast.style.opacity = "1";
          setTimeout(() => {
            warningToast.style.opacity = "0";
          }, 3000);
        }
      }
    };

    const handleKeyUp = () => {
      setBlackoutActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      document.body.style.overflow = "unset";
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onClose]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUnlockRequest(passInput);
    if (success) {
      setPassInput("");
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  // Collect all available images for this project into a unified list
  const allImages = [
    project.imgAfter ? { url: project.imgAfter, label: project.imgAfterLabel || "대표 이미지 1" } : null,
    project.imgBefore ? { url: project.imgBefore, label: project.imgBeforeLabel || "대표 이미지 2" } : null,
    ...(project.additionalImages || []).map((img, idx) => ({ url: img.url, label: img.label || `상세 이미지 ${idx + 1}` }))
  ].filter((img): img is { url: string; label: string } => !!img && !!img.url);

  const activeImage = allImages[activeImageIndex] || allImages[0] || { url: project.imgAfter, label: "대표 이미지 1" };
  const isLocked = project.isPremium && !isUnlocked;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl overflow-y-auto lg:overflow-hidden flex justify-center items-center p-2 sm:p-4 md:p-6 select-none"
      onContextMenu={(e) => e.preventDefault()} // Block right-click context menu
    >
      {/* Dynamic Keyframes Styles */}
      <style>{`
        @keyframes detailBloomIn {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(15px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes floatWatermark {
          0% { background-position: 0px 0px; }
          100% { background-position: 60px 60px; }
        }
        .animate-bloom-in {
          animation: detailBloomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .moving-watermark-overlay {
          background-size: 40px 40px;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(7, 86, 155, 0.035),
            rgba(7, 86, 155, 0.035) 1px,
            transparent 1px,
            transparent 14px
          );
          animation: floatWatermark 12s linear infinite;
        }
      `}</style>

      {/* Persistent safety watermark backdrop behind modal panel */}
      <div className="absolute inset-0 bg-transparent moving-watermark-overlay pointer-events-none z-0 opacity-40" />

      {/* Floating Active Warning message toast */}
      <div 
        id="hswup-warning-toast"
        className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 border border-red-500 text-white font-mono text-center tracking-wider text-xs font-bold py-3 px-6 rounded-xl shadow-2xl z-55 pointer-events-none opacity-0 transition-opacity duration-300 uppercase"
      >
        ⚠️ SECURITY SHIELD ENGAGED — SCREEN CAPTURE & COPY BLOCKED OFF
      </div>

      {/* Modal Main Shell Container: Max-width 1600px, responsive flex workbench */}
      <div className="relative w-full max-w-[1580px] bg-zinc-950 border border-white/10 rounded-2xl p-4 md:p-6 shadow-[0_0_100px_rgba(0,0,0,0.95)] z-10 animate-bloom-in flex flex-col max-h-[calc(100vh-1.5rem)] md:max-h-[calc(100vh-3rem)] min-h-[500px]">
        
        {/* Anti-screenshot Watermark background text */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden opacity-[0.012]">
          <div className="text-white text-[16px] font-mono font-black uppercase tracking-[0.4em] rotate-12 whitespace-nowrap leading-loose">
            CONFIDENTIAL DIGITAL PORTFOLIO PORTAL • HA SEUNG WAN SIGNMASTER • LIVE TRACKING ACTIVE • {currentTime} • CONFIDENTIAL DIGITAL PORTFOLIO PORTAL • HA SEUNG WAN SIGNMASTER
          </div>
        </div>

        {/* Modal Top Header Section (Compact) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4 mb-4 shrink-0 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1 font-mono text-[9px] font-bold">
              <span className="bg-[#07569b]/10 border border-[#07569b]/30 text-[#07569b] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {project.category} CASE STUDY
              </span>
              {project.isPremium && (
                <span className="bg-blue-950/40 border border-[#07569b]/20 text-blue-300 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-[#07569b]" /> Premium Security
                </span>
              )}
              <span className="bg-red-950/40 border border-red-500/20 text-red-400 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-red-400 animate-pulse" /> 캡처 감지 차단막 연동
              </span>
            </div>
            
            <h3 className="text-lg md:text-2xl font-sans font-extrabold text-white tracking-tight flex items-center gap-2">
              {project.title}
              <span className="text-xs font-normal text-zinc-400 hidden lg:inline font-sans truncate max-w-xl">
                | {project.tagline}
              </span>
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-red-950/40 hover:border-red-500/30 border border-white/10 text-zinc-300 hover:text-red-300 rounded-xl text-[11px] font-mono transition-all cursor-pointer font-bold shrink-0 shadow-lg"
          >
            <X className="w-4 h-4 text-red-400" /> 닫기 (ESC)
          </button>
        </div>

        {isLocked && (
          /* PASSCODE INTERLOCK GATE */
          <div className="max-w-xl mx-auto my-auto bg-zinc-900/60 border border-[#07569b]/25 rounded-2xl p-8 backdrop-blur-md text-center shadow-[0_0_25px_rgba(7,86,155,0.1)] relative z-10">
            <div className="w-12 h-12 bg-[#07569b]/10 border border-[#07569b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#07569b]" />
            </div>
            <h4 className="text-base font-sans font-semibold text-white tracking-tight">원격 보안 잠금 // 대표 핵심 기획안 보호</h4>
            <p className="text-zinc-400 text-[11px] mt-2 leading-relaxed">
              본 작품은 독자적인 발광 다이오드 구조 특허 공법 및 로고 디자인 자산 보호를 위해 시안 열람이 통제되어 있습니다. 
              <strong> 채용담당자 전용 패스코드</strong>를 기입하시면 원본 제한 도면 시안의 락이 즉시 해제됩니다.
            </p>
            
            <form onSubmit={handleUnlockSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="채용인증 비밀번호"
                className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#07569b]/80 w-full sm:max-w-[200px]"
              />
              <button 
                type="submit"
                className="bg-[#07569b] hover:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                도면 시안 잠금해제 <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {passError && (
              <p className="text-red-400 text-[10px] mt-2.5 font-mono">
                ❌ 불일치: 비밀번호가 올바르지 않습니다.
              </p>
            )}
          </div>
        )}

        {!isLocked && (
          <div className="flex flex-col lg:flex-row gap-5 relative z-10 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
            
            {/* LEFT SIDEBAR: Problem/Strategy & Smart Thumbnails Rail (Desktop: w-320px) */}
            <div className="w-full lg:w-[310px] xl:w-[340px] shrink-0 flex flex-col gap-3.5 order-2 lg:order-1 overflow-y-auto lg:pr-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
              
              {/* Problem & Strategy Combined Context Box */}
              <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col gap-3.5 select-text shrink-0">
                <div>
                  <div className="flex items-center gap-1.5 text-red-400 font-semibold text-[10px] uppercase tracking-wider mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    01. 현장 과제 (PROBLEM)
                  </div>
                  <p className="text-zinc-350 text-xs font-sans leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px] uppercase tracking-wider mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                    02. 설계 공간 조처 (STRATEGY)
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {project.strategy.map((item, index) => (
                      <li key={index} className="text-zinc-300 text-[11px] font-sans leading-relaxed flex gap-1.5">
                        <span className="text-emerald-400 font-mono font-bold shrink-0">{index + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Smart Thumbnails Rail Switcher */}
              {allImages.length > 0 && (
                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-3.5 flex flex-col gap-2.5 shrink-0">
                  <div className="flex items-center justify-between text-[#07569b] font-semibold text-[10px] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#07569b]" />
                      🖼️ 썸네일 (클릭 시 작품 이동)
                    </span>
                    <span className="text-zinc-500 font-mono text-[8px]">{allImages.length} VIEWS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[240px] pr-0.5 scrollbar-none">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`group relative rounded-lg overflow-hidden border transition-all text-left cursor-pointer flex flex-col bg-black/40 h-20 ${
                          activeImageIndex === index
                            ? "border-[#07569b] ring-2 ring-[#07569b]/30 shadow-md bg-zinc-900"
                            : "border-white/5 hover:border-white/20 opacity-75 hover:opacity-100"
                        }`}
                        title={img.label}
                      >
                        {/* Thumbnail Image */}
                        <div className="w-full h-13 overflow-hidden relative bg-black/60">
                          <img 
                            src={img.url} 
                            alt={img.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          {activeImageIndex === index && (
                            <span className="absolute top-1 right-1 bg-[#07569b] text-white text-[6px] font-mono font-bold px-1 py-0.5 rounded shadow uppercase">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        {/* Clearly Visible Thumbnail Title */}
                        <div className="flex-1 px-1.5 py-0.5 bg-zinc-950/95 flex items-center justify-center border-t border-white/5">
                          <span className="text-[9px] font-sans text-zinc-200 font-medium truncate block w-full text-center">
                            {img.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compact Guide Footer */}
              <div className="text-[9px] text-zinc-500 font-mono bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed text-center mt-auto shrink-0 hidden lg:block">
                💡 <strong className="text-zinc-400">ESC</strong> 키를 누르면 이전 목록으로 복귀합니다.
              </div>

            </div>

            {/* RIGHT HERO STAGE: Main Massive Artwork Area (flex-1) */}
            <div className="flex-1 flex flex-col order-1 lg:order-2 min-w-0 min-h-[420px] lg:min-h-0">
              <div className="w-full h-full flex flex-col relative bg-zinc-900/20 border border-white/10 rounded-xl overflow-hidden flex-1 justify-center items-center p-2 md:p-4 group">
                
                {/* Floating Top-Left Viewer Badge */}
                <div className="absolute top-3 left-3.5 z-20 pointer-events-none flex items-center gap-2">
                  <span className="bg-black/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-md text-[9.5px] font-mono text-zinc-300 font-semibold flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3 h-3 text-[#07569b]" /> 초고화질 도면 뷰어 (도면 확대)
                  </span>
                  {project.splitViewerEnabled && (
                    <span className="bg-[#07569b]/20 border border-[#07569b]/40 text-[#07569b] px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase hidden sm:inline">
                      Shield Secured
                    </span>
                  )}
                </div>

                {/* Floating Top-Right Active Image Label */}
                <div className="absolute top-3 right-3.5 z-20 pointer-events-none">
                  <span className="bg-black/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-md text-[9.5px] font-mono text-zinc-400 shadow-lg">
                    {activeImage.label} ({activeImageIndex + 1}/{allImages.length})
                  </span>
                </div>

                {/* Main Hero Image Canvas */}
                <div className="w-full h-full flex items-center justify-center relative my-auto overflow-hidden">
                  
                  {/* Active print-screen / capture blackout protector mask */}
                  {blackoutActive && (
                    <div className="absolute inset-0 bg-black/99 border border-red-500/50 z-50 rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-2xl backdrop-blur-2xl">
                      <ShieldCheck className="w-12 h-12 text-red-500 animate-bounce mb-3" />
                      <h4 className="text-white font-mono text-xs font-black tracking-widest uppercase mb-2">
                        ⚠️ SECURITY SHIELD ENGAGED / 화면 캡쳐 가공 방지 차단막 작동
                      </h4>
                      <p className="text-zinc-400 text-[10px] max-w-sm leading-relaxed">
                        디자이너의 소중한 지식재산 보호 목적을 위해, 캡처 단축키 작동시 자동으로 원본 도면을 숨김 처리합니다.
                      </p>
                    </div>
                  )}

                  {project.splitViewerEnabled ? (
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl p-1 pointer-events-none select-none max-w-full">
                      <SplitCanvasViewer
                        imageUrl={activeImage.url}
                        alt={activeImage.label}
                        watermarkText={`HSW SECURE DESIGN PREVENT COPY ${currentTime}`}
                      />
                    </div>
                  ) : (
                    <img
                      src={activeImage.url}
                      alt={activeImage.label}
                      className="max-w-full max-h-[68vh] lg:max-h-[calc(100vh-11rem)] object-contain select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Subtle Footer hint inside Stage */}
                <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none opacity-50 hidden sm:block">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest bg-black/70 border border-white/5 px-2.5 py-0.5 rounded">
                    ESC 키를 누르면 목록으로 복귀합니다 • 고선명 원본 배율 유지
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
