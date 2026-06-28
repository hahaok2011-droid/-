/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Project } from "../types";
import { 
  X, AlertCircle, Lightbulb, Lock, ArrowRight, ShieldCheck, Sparkles, Play, Pause, ChevronLeft, ChevronRight, Info, Eye
} from "lucide-react";
import SplitCanvasViewer from "./SplitCanvasViewer";
import { motion, AnimatePresence } from "motion/react";

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

  // New Requested Features: Auto Slideshow (2s) & Floating Info HUD Toggle
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  // Collect all available images for this project into a unified list
  const rawImages = [
    project.imgAfter ? { url: project.imgAfter, label: project.imgAfterLabel || "대표 이미지 1" } : null,
    project.imgBefore ? { url: project.imgBefore, label: project.imgBeforeLabel || "대표 이미지 2" } : null,
    ...(project.detailImages || []).map((img, idx) => ({ url: img.url, label: img.label || `상세 이미지 ${idx + 1}` })),
    ...(project.additionalImages || []).map((img, idx) => ({ url: img.url, label: img.label || `추가 이미지 ${idx + 1}` }))
  ].filter((img): img is { url: string; label: string } => !!img && !!img.url);

  // Remove any duplicate image URLs
  const allImages = rawImages.filter((img, index, self) =>
    index === self.findIndex((t) => t.url === img.url)
  );

  const activeImage = allImages[activeImageIndex] || allImages[0] || { url: project.imgAfter, label: "대표 이미지 1" };
  const isLocked = project.isPremium && !isUnlocked;

  // Auto Slideshow Effect (Silky Smooth Museum Crossfade)
  useEffect(() => {
    if (!isPlaying || allImages.length <= 1 || isLocked) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying, allImages.length, isLocked]);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
    setIsPlaying(false); // Stop slideshow when user manually selects thumbnail
  };

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
      
      // ESC button close logic
      if (e.key === "Escape" || e.key === "Esc") {
        onClose();
        return;
      }

      // Spacebar toggle slideshow
      if (e.key === " " && !isLocked) {
        setIsPlaying((prev) => !prev);
      }

      // Blackout when typical snapshot/export hotkeys are triggered
      if (
        e.key === "PrintScreen" || 
        e.key === "Snapshot" ||
        (isCmdOrCtrl && e.key === "p") ||
        (isCmdOrCtrl && e.key === "s") ||
        (isCmdOrCtrl && e.key === "c") ||
        e.key === "F12" ||
        (isCmdOrCtrl && e.shiftKey && e.key === "s") ||
        (isCmdOrCtrl && e.shiftKey && e.key === "4")
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
  }, [onClose, isLocked]);

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

  return (
    <div 
      className="fixed top-16 md:top-20 left-0 right-0 bottom-0 z-[999999] bg-[#07070C] overflow-hidden flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Floating Active Warning message toast */}
      <div 
        id="hswup-warning-toast"
        className="fixed top-16 left-1/2 -translate-x-1/2 bg-red-600 border border-red-500 text-white font-mono text-center tracking-wider text-xs font-bold py-3 px-6 rounded-xl shadow-2xl z-55 pointer-events-none opacity-0 transition-opacity duration-300 uppercase"
      >
        ⚠️ SECURITY SHIELD ENGAGED — SCREEN CAPTURE & COPY BLOCKED OFF
      </div>

      {/* TOP FLOATING CONTROL HUD BAR (Sleek Glass Workbench) */}
      <header className="w-full shrink-0 bg-zinc-950/90 border-b border-white/10 px-4 py-3 backdrop-blur-xl z-40 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
        
        {/* Title & Badge */}
        <div className="flex items-center gap-2.5 min-w-0 mr-auto md:mr-0">
          <button 
            onClick={onClose}
            title="ESC 버튼을 클릭하여 창을 닫습니다"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-md shrink-0 mr-1"
          >
            <X className="w-3.5 h-3.5" /> ESC 창닫기
          </button>
          <span className="bg-[#07569b]/20 border border-[#07569b]/50 text-blue-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full shrink-0 uppercase shadow-sm">
            {project.category}
          </span>
          <h3 className="text-sm md:text-lg font-sans font-extrabold text-white truncate tracking-tight">
            {project.title}
          </h3>
          {project.isPremium && (
            <span className="bg-blue-950/60 border border-[#07569b]/30 text-blue-300 text-[8.5px] font-mono px-2 py-0.5 rounded-md uppercase hidden sm:flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-[#07569b]" /> Protected
            </span>
          )}
        </div>

        {!isLocked && (
          /* Slideshow Status & Quick Control */
          <div className="flex items-center gap-2 shrink-0">
            {allImages.length > 1 && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  isPlaying 
                    ? "bg-[#07569b] text-white shadow-[0_0_20px_rgba(7,86,155,0.6)] animate-pulse" 
                    : "bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30"
                }`}
              >
                {isPlaying ? (
                  <><Pause className="w-3.5 h-3.5 fill-current" /> 부드러운 자동 슬라이드 중</>
                ) : (
                  <><Play className="w-3.5 h-3.5 fill-current" /> 슬라이드 재생 정지됨 (멈춤 뷰어)</>
                )}
              </button>
            )}
          </div>
        )}

        {/* Right ESC Close Button Highlighted */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button 
            onClick={onClose}
            title="키보드 ESC 버튼을 누르셔도 창이 즉시 닫힙니다"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-mono transition-all cursor-pointer font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)] group"
          >
            <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform" /> 
            <span>창 닫기 <strong className="bg-black/40 px-2 py-0.5 rounded text-[10px] text-amber-300 ml-1 border border-white/20">ESC 버튼</strong></span>
          </button>
        </div>

      </header>

      {/* FULLSCREEN IMMERSIVE ARTWORK STAGE */}
      <main className="relative flex-1 w-full h-full min-h-0 flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
        
        {!isLocked && (
          /* TOP DEDICATED THUMBNAILS CARD PANEL */
          <div className="w-full max-w-7xl mx-auto shrink-0 pt-3 pb-1 px-4 z-35 flex items-center justify-center select-none">
            <div className="w-full bg-zinc-900/95 border border-white/15 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl flex items-center justify-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-2 my-auto max-w-full py-1 px-1 max-h-[130px] overflow-y-auto scrollbar-thin">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleThumbnailClick(idx)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer shrink-0 border ${
                      activeImageIndex === idx
                        ? "bg-[#07569b] text-white font-extrabold border-blue-400 shadow-[0_0_15px_rgba(7,86,155,0.8)] scale-105 z-10"
                        : "bg-zinc-800/90 text-zinc-300 border-white/10 hover:text-white hover:bg-zinc-700 hover:border-white/30"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activeImageIndex === idx ? "bg-white animate-ping" : "bg-zinc-500"}`} />
                    <span className="whitespace-nowrap font-medium">{img.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Background Subtle Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden opacity-[0.015]">
          <div className="text-white text-xl font-mono font-black uppercase tracking-[0.5em] -rotate-12 whitespace-nowrap leading-loose">
            CONFIDENTIAL DIGITAL PORTFOLIO PORTAL • HA SEUNG WAN SIGNMASTER • {currentTime} • DO NOT COPY OR DISTRIBUTE • CONFIDENTIAL DIGITAL PORTFOLIO PORTAL
          </div>
        </div>

        {isLocked ? (
          /* PASSCODE INTERLOCK GATE */
          <div className="max-w-xl mx-auto my-auto bg-zinc-900/80 border border-[#07569b]/30 rounded-2xl p-8 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(7,86,155,0.15)] relative z-20">
            <div className="w-14 h-14 bg-[#07569b]/15 border border-[#07569b]/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Lock className="w-6 h-6 text-[#07569b]" />
            </div>
            <h4 className="text-lg font-sans font-bold text-white tracking-tight">원격 보안 잠금 // 대표 핵심 기획안 보호</h4>
            <p className="text-zinc-400 text-xs mt-2.5 leading-relaxed">
              본 작품은 독자적인 발광 다이오드 구조 특허 공법 및 로고 디자인 자산 보호를 위해 시안 열람이 통제되어 있습니다. 
              <strong> 채용담당자 전용 패스코드</strong>를 기입하시면 고화질 원본 도면 시안의 락이 즉시 해제됩니다.
            </p>
            
            <form onSubmit={handleUnlockSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
              <input 
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="채용인증 비밀번호 입력"
                className="bg-zinc-950 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#07569b] w-full sm:max-w-[220px]"
              />
              <button 
                type="submit"
                className="bg-[#07569b] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
              >
                도면 열람 승인 <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {passError && (
              <p className="text-red-400 text-[11px] mt-3 font-mono font-bold animate-shake">
                ❌ 불일치: 비밀번호가 올바르지 않습니다. 다시 입력해주세요.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* FLOATING OVERLAID LEFT INFO HUD (Problem & Strategy) */}
            <div className={`absolute top-4 left-4 z-30 transition-all duration-300 max-w-[340px] w-[calc(100%-2rem)] sm:w-[340px] ${
              showInfoPanel ? "translate-x-0 opacity-100" : "-translate-x-[calc(100%+1rem)] opacity-0 pointer-events-none"
            }`}>
              <div className="bg-zinc-950/85 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-xs flex flex-col gap-3">
                
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#07569b] font-bold uppercase tracking-wider">
                    <Info className="w-3.5 h-3.5 text-[#07569b]" /> 기획 및 설계 조처 요약
                  </span>
                  <button
                    onClick={() => setShowInfoPanel(false)}
                    className="text-zinc-400 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-[10px] font-mono flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> 접기
                  </button>
                </div>

                {/* Problem Section */}
                <div>
                  <div className="flex items-center gap-1 text-red-400 font-semibold text-[10px] uppercase tracking-wider mb-1">
                    <AlertCircle className="w-3 h-3" /> 01. 현장 과제 (PROBLEM)
                  </div>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed pl-4 border-l border-red-500/30">
                    {project.problem}
                  </p>
                </div>

                {/* Strategy Section */}
                <div className="border-t border-white/5 pt-2">
                  <div className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px] uppercase tracking-wider mb-1.5">
                    <Lightbulb className="w-3 h-3" /> 02. 설계 공간 조처 (STRATEGY)
                  </div>
                  <ul className="flex flex-col gap-1.5 pl-1">
                    {project.strategy.map((item, idx) => (
                      <li key={idx} className="text-zinc-300 text-[10.5px] font-sans leading-relaxed flex gap-1.5 items-start">
                        <span className="text-emerald-400 font-mono font-bold text-[10px] mt-0.5 shrink-0">{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Anti-capture Notice inside HUD */}
                <div className="bg-red-950/30 border border-red-500/20 p-2 rounded-xl text-[9.5px] text-red-300 flex items-center gap-1.5 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>캡처 시도 감지 시 즉시 원본 보안 블랙아웃 연동</span>
                </div>

              </div>
            </div>

            {/* Collapsed Info HUD Open Pill Button (When panel closed) */}
            {!showInfoPanel && (
              <button
                onClick={() => setShowInfoPanel(true)}
                className="absolute top-4 left-4 z-30 bg-zinc-900/90 hover:bg-[#07569b] border border-white/20 text-white px-3.5 py-2 rounded-xl backdrop-blur-xl shadow-2xl flex items-center gap-2 text-xs font-mono font-bold transition-all cursor-pointer animate-fade-in"
              >
                <Eye className="w-4 h-4 text-[#07569b] group-hover:text-white" /> 기획 설명 펼치기 (INFO)
              </button>
            )}

            {/* MASSIVE IMMERSIVE CENTER CANVAS STAGE */}
            <div className="w-full h-full grid place-items-center p-2 md:p-6 relative">
              
              {/* Active print-screen / capture blackout protector mask */}
              {blackoutActive && (
                <div className="absolute inset-4 bg-black/99 border border-red-500/60 z-50 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-2xl backdrop-blur-3xl">
                  <ShieldCheck className="w-16 h-16 text-red-500 animate-bounce mb-4" />
                  <h4 className="text-white font-mono text-sm md:text-base font-black tracking-widest uppercase mb-2">
                    ⚠️ SECURITY SHIELD ENGAGED / 원본 지식재산 보호 차단막 작동
                  </h4>
                  <p className="text-zinc-400 text-xs max-w-md leading-relaxed">
                    디자이너의 핵심 설계 도면 및 로고 자산 보호를 위해 단축키 캡처 시도 시 원본 도면을 차단합니다.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {project.splitViewerEnabled ? (
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="col-start-1 row-start-1 w-full h-full max-w-[1500px] max-h-[82vh] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl p-1 pointer-events-none select-none"
                  >
                    <SplitCanvasViewer
                      imageUrl={activeImage.url}
                      alt={activeImage.label}
                      watermarkText={`HSW SECURE DESIGN PREVENT COPY ${currentTime}`}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="col-start-1 row-start-1 relative max-w-full max-h-[82vh] flex items-center justify-center pointer-events-none select-none"
                  >
                    <img
                      src={activeImage.url}
                      alt={activeImage.label}
                      className="max-w-full max-h-[80vh] object-contain select-none pointer-events-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom Floating Status Hint Bar */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-20 px-4">
              <div className="bg-black/85 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-[10px] font-mono text-zinc-300 flex items-center gap-3 shadow-2xl">
                <span className="text-white font-bold text-[#07569b] bg-blue-950/50 px-2 py-0.5 rounded">{activeImage.label}</span>
                <span className="text-zinc-600">|</span>
                <span>{activeImageIndex + 1} of {allImages.length}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">상단 썸네일 클릭 시 고정 // <strong className="text-red-300 font-bold">ESC 버튼</strong> 입력 시 창 해제</span>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
