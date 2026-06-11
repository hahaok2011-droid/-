/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Project } from "../types";
import { 
  X, AlertCircle, TrendingUp, Lightbulb, Grid, Palette, Type,
  Lock, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, Eye, Sparkles
} from "lucide-react";
import SplitCanvasViewer from "./SplitCanvasViewer";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  isUnlocked: boolean; // Premium access password unlocked (0610)
  onUnlockRequest: (password: string) => boolean;
}

export default function ProjectDetail({
  project,
  onClose,
  isUnlocked,
  onUnlockRequest,
}: ProjectDetailProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 for Before/After compare
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(true); // Default error state off when valid input provided
  const [currentTime, setCurrentTime] = useState("");
  
  // Anti-capture security status
  const [blackoutActive, setBlackoutActive] = useState(false);
  const [tilt, setTilt] = useState({ rX: 0, rY: 0 });

  // Update real-time ticking UTC timestamp to embed persistent, un-deletable print stamps
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
        // Alert safety triggers
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

    // 🛡️ CRITICAL ULTIMATE SECURITY: When window loses focus (such as launching external snipping tools or screenshot menus),
    // we instantly render the layout blacked out so snipped images result in empty black templates.
    const handleWindowBlur = () => {
      setBlackoutActive(true);
    };

    const handleWindowFocus = () => {
      setBlackoutActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    
    return () => {
      document.body.style.overflow = "unset";
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  // Handle Before/After slider dragging
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left click held
      handleSliderMove(e.clientX);
    }
  };

  // Cursor-interactive three dimensional parallax tilting
  const handleArtMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -7; // max 3.5 deg tilt
    const rotateY = ((x / rect.width) - 0.5) * 7; 
    setTilt({ rX: rotateX, rY: rotateY });
  };

  const handleArtMouseLeave = () => {
    setTilt({ rX: 0, rY: 0 });
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUnlockRequest(passInput);
    if (success) {
      setPassInput("");
    } else {
      setPassError(true);
      // Brief error shake animations can be handled gracefully
    }
  };

  // Locked gate: if project is premium and parent doesn't authorize, lock the view
  const isLocked = project.isPremium && !isUnlocked;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/99 backdrop-blur-2xl overflow-y-auto flex justify-center items-start py-6 md:py-12 px-4 md:px-6 select-none"
      onContextMenu={(e) => e.preventDefault()} // Block right-click context menu within full modal
    >
      {/* Dynamic Keyframes Styles for expansion blooms and micro drifting */}
      <style>{`
        @keyframes detailBloomIn {
          0% {
            opacity: 0;
            transform: scale(0.65) translateY(40px);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
        @keyframes floatWatermark {
          0% { background-position: 0px 0px; }
          100% { background-position: 60px 60px; }
        }
        @keyframes subtleFloatingArt {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-5px) translateX(2.5px) rotate(0.2deg); }
          55% { transform: translateY(-1.5px) translateX(-2.5px) rotate(-0.15deg); }
          75% { transform: translateY(-6px) translateX(1.5px) rotate(0.12deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }
        .animate-bloom-in {
          animation: detailBloomIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
        .floating-artwork-stage {
          animation: subtleFloatingArt 9s ease-in-out infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: transform 0.25s ease-out;
        }
      `}</style>

      {/* Persistent safety watermark backdrop behind modal panel */}
      <div className="absolute inset-0 bg-transparent moving-watermark-overlay pointer-events-none z-0 opacity-50" />

      {/* Floating Active Warning message toast */}
      <div 
        id="hswup-warning-toast"
        className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 border border-red-500 text-white font-mono text-center tracking-wider text-xs font-bold py-3 px-6 rounded-xl shadow-2xl z-55 pointer-events-none opacity-0 transition-opacity duration-305 uppercase"
      >
        ⚠️ SECURITY SHIELD ENGAGED — SCREEN CAPTURE & COPY BLOCKED OFF
      </div>

      {/* Modal Main Stage Container with dynamic zoom expansion bloom */}
      <div className="relative w-full max-w-7xl bg-zinc-950 border border-white/10 rounded-2xl p-5 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10 animate-bloom-in">
        
        {/* Anti-screenshot Watermark background text */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden opacity-[0.012]">
          <div className="text-white text-[16px] font-mono font-black uppercase tracking-[0.4em] rotate-12 whitespace-nowrap leading-loose">
            CONFIDENTIAL DIGITAL PORTFOLIO PORTAL • HA SEUNG WAN SIGNMASTER • LIVE TRACKING ACTIVE • {currentTime} • CONFIDENTIAL DIGITAL PORTFOLIO PORTAL • HA SEUNG WAN SIGNMASTER • LIVE TRACKING ACTIVE • {currentTime}
          </div>
        </div>

        {/* Modal Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-5 mb-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5 font-bold">
              <span className="text-[9px] bg-[#07569b]/10 border border-[#07569b]/30 text-[#07569b] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {project.category} CASE STUDY
              </span>
              {project.isPremium && (
                <span className="text-[9px] bg-blue-950/40 border border-[#07569b]/20 text-blue-300 font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-[#07569b]" /> Premium Security
                </span>
              )}
              <span className="text-[9px] bg-red-950/40 border border-red-500/20 text-red-400 font-mono px-2.5 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-red-400 animate-pulse" /> 캡처 시도 즉시 화면 차단막 연동
              </span>
            </div>
            
            <h3 className="text-xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-[11px] font-mono transition-all cursor-pointer font-bold shrink-0 shadow-lg"
          >
            <X className="w-4 h-4 text-red-400" /> 화면 확대 끄기 (CLOSE)
          </button>
        </div>

        {isLocked && (
          /* PASSCODE INTERLOCK GATE */
          <div className="max-w-xl mx-auto my-14 bg-zinc-900/60 border border-[#07569b]/25 rounded-2xl p-8 backdrop-blur-md text-center shadow-[0_0_25px_rgba(7,86,155,0.1)] relative z-10">
            <div className="w-12 h-12 bg-[#07569b]/10 border border-[#07569b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#07569b]" />
            </div>
            <h4 className="text-base font-sans font-semibold text-white tracking-tight">원격 보안 잠금 // 대표 핵심 기획안 보호</h4>
            <p className="text-zinc-400 text-[11px] mt-2 leading-relaxed">
              본 작품은 독자적인 발광 다이오드 구조 특허 공법 및 로고 디자인 자산 보호를 위해 시안 열람이 통제되어 있습니다. 
              <strong> 채용담당자 전용 패스코드 (0610)</strong>를 기입하시면 원본 1400px 제한 Canvas 도면 시안의 락이 즉시 해제됩니다.
            </p>
            
            <form onSubmit={handleUnlockSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="채용인증 비밀번호 (0610)"
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
                ❌ 불일치: 비밀번호가 올바르지 않습니다. (안내 비밀번호: 0610)
              </p>
            )}

            <div className="mt-6 border-t border-white/5 pt-4 text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-zinc-650" />
              SECURED IP PREVIEWS VIA PORTAL ENVELOPE
            </div>
          </div>
        )}

        {!isLocked && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Box: STATIONARY FIXED EXPLANATION SECTION (Doesn't float, remains perfectly solid & clear for reading details) */}
            <div className="lg:col-span-5 flex flex-col gap-5 select-text">
              
              {/* Problem Analysis Card */}
              <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-[11px] uppercase tracking-wider mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  01. 현장 복합적 직면 과제 (PROBLEM)
                </div>
                <p className="text-zinc-350 text-xs md:text-[13px] font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Design Strategy Card */}
              <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider mb-2">
                  <Lightbulb className="w-3.5 h-3.5" />
                  02. 설계 공간 조처 사양 (STRATEGY)
                </div>
                <ul className="flex flex-col gap-2">
                  {project.strategy.map((item, index) => (
                    <li key={index} className="text-zinc-300 text-xs font-sans leading-relaxed flex gap-2">
                      <span className="text-emerald-400 font-mono font-bold">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications Card */}
              <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl flex flex-col gap-3.5">
                <div className="flex items-center gap-2 text-[#07569b] font-semibold text-[11px] uppercase tracking-wider">
                  <Grid className="w-3.5 h-3.5" />
                  03. 하우징 가이던스 제원 (SPECS)
                </div>
                
                {/* Brand Typo Emblem */}
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block mb-1 font-bold">대표 타이포 엠블럼</span>
                  <div className="bg-black py-2 px-3 rounded-lg text-center border border-white/[0.1]">
                    <span className="text-xs font-black text-white px-2 tracking-wider font-mono">
                      {project.logoText || "DESIGN CORE"}
                    </span>
                  </div>
                </div>

                {/* Palette Grid */}
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block mb-1.5 flex items-center gap-1 font-bold">
                    <Palette className="w-3 h-3 text-[#07569b]" /> 색조 대응 체계 (COLOR SYSTEM)
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {project.colors.map((color, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-1.5 bg-black border border-white/5 p-1 rounded-md text-[9px]"
                      >
                        <span className="w-3.5 h-3.5 rounded border border-white/20 select-none block shrink-0" style={{ backgroundColor: color.hex }} />
                        <div className="overflow-hidden">
                          <p className="font-semibold text-zinc-300 truncate">{color.name}</p>
                          <p className="text-[8px] font-mono text-zinc-500 lowercase">{color.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography specs */}
                <div className="flex flex-col gap-2.5">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block flex items-center gap-1 mb-0.5 font-bold">
                      <Type className="w-3 h-3" /> 서체 구조
                    </span>
                    <p className="text-zinc-200 text-xs font-bold font-mono">{project.fontFamily}</p>
                    <p className="text-zinc-400 text-[10px] leading-relaxed">{project.fontDescription}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block mb-0.5 font-bold">비율 레이아웃 조율</span>
                    <p className="text-zinc-400 text-[10px] leading-relaxed">{project.layoutDesc}</p>
                  </div>
                </div>
              </div>

              {/* Achievements Results Indicator */}
              <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-xl">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-[11px] uppercase tracking-wider mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  04. 정량적 추진 성과 (RESULT)
                </div>
                <div className="bg-zinc-950 p-3.5 rounded-lg border border-white/10 flex items-center gap-3">
                  <div className="text-2xl font-mono font-black text-[#07569b] shrink-0 select-none">
                    +45%
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed font-sans">
                    {project.result}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Box: DYNAMIC ARTWORK STAGE (Applies gorgeous floating drifts & real-time cursor tilt parallax) */}
            <div className="lg:col-span-7 flex flex-col gap-5 w-full relative">
              
              <div 
                className="floating-artwork-stage flex flex-col gap-5 w-full"
                onMouseMove={handleArtMouseMove}
                onMouseLeave={handleArtMouseLeave}
                style={{
                  transform: `rotateX(${tilt.rX}deg) rotateY(${tilt.rY}deg) scale(1.005)`
                }}
              >
                {/* Primary Expanded Signboard Graphic */}
                <div className="flex flex-col gap-1.5 relative">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold flex justify-between items-center bg-zinc-900/40 p-2.5 rounded-xl border border-white/5">
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#07569b] animate-pulse" /> 마우스 반응형 3D 가변 렌더</span>
                    {project.splitViewerEnabled ? (
                      <span className="text-[9px] text-[#07569b] font-bold flex items-center gap-1 uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#07569b]" /> Double Split Canvas Secured
                      </span>
                    ) : (
                      <span className="text-[9px] text-[#07569b] font-bold">Dynamic Shield Active</span>
                    )}
                  </span>

                  {/* Active print-screen / capture blackout protector mask */}
                  {blackoutActive && (
                    <div className="absolute inset-0 bg-black/99 border border-red-500/50 z-50 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-2xl backdrop-blur-2xl">
                      <ShieldCheck className="w-12 h-12 text-red-500 animate-bounce mb-3" />
                      <h4 className="text-white font-mono text-xs font-black tracking-widest uppercase mb-2">
                        ⚠️ SECURITY SHIELD ENGAGED / 화면 캡쳐 가공 방지 차단막 작동
                      </h4>
                      <p className="text-zinc-400 text-[10px] max-w-sm leading-relaxed">
                        디자이너의 소중한 지식재산 보호 목적을 위해, 캡처 단축키 작동시 혹은 캡처 도구 활성화로 인한 창 이탈(Blur) 발생 시 자동으로 원본 도면을 숨김 처리합니다. 포인터를 다시 브라우저 안으로 이동하십시오.
                      </p>
                    </div>
                  )}

                  {project.splitViewerEnabled ? (
                    /* Anti-copy split partition canvas rendering for premium works */
                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/80 shadow-2xl p-1 pointer-events-none select-none">
                      
                      {/* Interactive diagonal text rolling on top */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden z-10 mix-blend-difference">
                        <div className="text-white/[0.04] text-[11px] font-mono font-black uppercase tracking-[0.3em] rotate-12 whitespace-nowrap">
                          {currentTime} SECURITY MATRIX • DO NOT CAPTURE • {currentTime} SECURITY MATRIX
                        </div>
                      </div>

                      <SplitCanvasViewer
                        imageUrl={project.imgAfter}
                        alt={project.title}
                        watermarkText={`HSW SECURE DESIGN PREVENT COPY ${currentTime}`}
                      />
                    </div>
                  ) : (
                    /* Standard premium watermark-shielded visual container */
                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl group select-none pointer-events-none">
                      
                      {/* Highly active diagonal textual security warnings */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden z-10 bg-black/5 mix-blend-overlay">
                        <div className="text-white/[0.05] text-[11px] font-mono font-black uppercase tracking-[0.25em] -rotate-12 whitespace-nowrap leading-loose p-5">
                          HSW INTELLECTUAL PROPERTY GUARD • DO NOT SCREENSHOT • STAMP {currentTime} • PREVIEW FOR RECRUITING VALIDATION ONLY
                        </div>
                      </div>

                      <img
                        src={project.imgAfter}
                        alt={project.title}
                        className="w-full object-cover max-h-[460px] select-none pointer-events-none"
                        style={{ maxWidth: "1400px" }}
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute bottom-3 right-3 text-[8px] font-mono bg-black/80 border border-white/10 px-2.5 py-1 rounded text-zinc-400 z-20">
                        SECURED AUTO RESIZED 1400PX
                      </div>
                    </div>
                  )}
                </div>

                {/* Before and After slider tool with enhanced drag visuals */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest font-semibold flex justify-between">
                    <span>🔄 3D 상호작용 전후 비교 (마우스 드래그 / 터치 작동)</span>
                    <span className="text-[#07569b] font-bold">BEFORE / AFTER COMPARATOR</span>
                  </span>

                  <div 
                    ref={sliderRef}
                    className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-white/10 select-none bg-zinc-950 shadow-2xl cursor-ew-resize group"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                  >
                    
                    {/* Active Screen protector within comparation slider too */}
                    {blackoutActive && (
                      <div className="absolute inset-0 bg-black/99 z-50 flex items-center justify-center text-center">
                        <ShieldCheck className="w-8 h-8 text-red-500 animate-pulse mr-2" />
                        <span className="text-white font-mono text-[10px] uppercase font-bold tracking-widest">
                          [ SECURITY SHIELD ACTIVE ]
                        </span>
                      </div>
                    )}

                    {/* AFTER GRAPHIC */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={project.imgAfter} 
                        alt="시공 후 전경" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 right-3 z-10 bg-[#07569b] text-white font-extrabold font-mono text-[8px] px-2 py-0.5 rounded uppercase tracking-wider shadow">
                        성공 시공 (AFTER)
                      </div>
                    </div>

                    {/* BEFORE GRAPHIC (Cover panel width dynamic) */}
                    <div 
                      className="absolute inset-y-0 left-0 overflow-hidden z-10 border-r border-[#07569b]/60"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img 
                        src={project.imgBefore} 
                        alt="시공 전 전경" 
                        className="absolute inset-y-0 left-0 h-[280px] object-cover pointer-events-none select-none max-w-none"
                        style={{ width: sliderRef.current?.getBoundingClientRect().width || "100%" }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 left-3 z-20 bg-red-600 text-white font-extrabold font-mono text-[8px] px-2 py-0.5 rounded uppercase tracking-wider shadow">
                        시공 전 (BEFORE)
                      </div>
                    </div>

                    {/* Center drag knob identifier bar */}
                    <div 
                      className="absolute inset-y-0 z-20 w-[2.5px] bg-[#07569b] shadow-[0_0_15px_rgba(7,86,155,0.5)] flex items-center justify-center pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute w-7 h-7 bg-black border border-[#07569b] text-[#07569b] rounded-full flex items-center justify-center shadow-2xl font-black text-xs font-mono">
                        ⇔
                      </div>
                    </div>

                    {/* Anti-copy diagnostic grid on slider */}
                    <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025] flex items-center justify-center z-10">
                      <span className="text-[12px] font-mono font-bold tracking-[0.2em] -rotate-12 whitespace-nowrap">
                        CONFIDENTIAL SYSTEM ACTIVE
                      </span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Informative text below the float artwork panel */}
              <p className="text-[9px] text-[#07569b]/70 font-mono text-center tracking-tight bg-zinc-950 p-2.5 rounded-xl border border-white/5 uppercase">
                ⚙️ TIP: 작품 구역에 마우스를 올리면 3D 자이로스코프 패럴랙스가 가동되어 도면 경관이 입체적으로 조절됩니다.
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
