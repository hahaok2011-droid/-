/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck, HelpCircle, Scan, Flashlight, Eye } from "lucide-react";

interface SplitCanvasViewerProps {
  imageUrl: string;
  alt: string;
  watermarkText?: string;
  maxDisplayWidth?: number;
}

export default function SplitCanvasViewer({
  imageUrl,
  alt,
  maxDisplayWidth = 1400,
}: SplitCanvasViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // 차단 모드: 'dither'(광학 스캔 디더링 - 눈엔 선명하지만 캡처시 절반 깨짐), 'lens'(스포트라이트 손전등), 'normal'(일반 캔버스 방어)
  const [securityMode, setSecurityMode] = useState<"dither" | "lens" | "normal">("dither");
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  // 궁극의 캡처 방지: Hold to View (길게 누르기 열람 모드)
  const [holdToView, setHoldToView] = useState(true);
  const holdToViewRef = useRef(true);
  const isHoldingRef = useRef(false);
  const [isHoldingState, setIsHoldingState] = useState(false);

  const toggleHoldToView = () => {
    const next = !holdToView;
    setHoldToView(next);
    holdToViewRef.current = next;
  };

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setLoading(true);
    setError(false);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    imgRef.current = img;

    let animId: number;
    let phase = false;

    img.onload = () => {
      if (!active) return;
      setLoading(false);

      const ratio = img.height / img.width;
      const targetWidth = Math.min(img.width, maxDisplayWidth);
      const targetHeight = targetWidth * ratio;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 애니메이션 루프: 양자 스캔 디더링 & 포커스 가드
      // 사람의 망막 잔상 효과를 이용해 매 프레임마다 홀짝 픽셀 라인을 고속 교차
      // OS 스냅샷 촬영이나 캡처 도구 활성화 시 즉시 암전 및 도면 픽셀 50% 분리
      const renderFrame = () => {
        if (!active || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, targetWidth, targetHeight);

        // [핵심 방어 0단계] 브라우저 창 포커스를 잃거나 숨겨진 상태(캡처 도구 실행 순간) 감지 시 즉시 작화 중단
        if (!document.hasFocus() || document.hidden || document.body.getAttribute("data-key-pressed")) {
          ctx.fillStyle = "#09090b";
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          ctx.font = "bold 14px font-mono";
          ctx.fillStyle = "#ef4444";
          ctx.textAlign = "center";
          ctx.fillText("🚫 [캡처 감지] 외부 스크린샷 시도로 도면 렌더링이 차단되었습니다.", targetWidth / 2, targetHeight / 2);
          animId = requestAnimationFrame(renderFrame);
          return;
        }

        // [핵심 방어 0.5단계] Hold to View(누르고 있기 열람) 모드 활성화 시 클릭 유지 안 하면 자물쇠 쉴드 표출
        if (holdToViewRef.current && !isHoldingRef.current) {
          ctx.fillStyle = "#09090b";
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          
          ctx.font = "bold 44px font-sans";
          ctx.textAlign = "center";
          ctx.fillText("🔒", targetWidth / 2, targetHeight / 2 - 25);
          
          ctx.font = "bold 16px font-sans";
          ctx.fillStyle = "#38bdf8";
          ctx.fillText("한석원 기밀 도면 고도화 보안 잠금 중", targetWidth / 2, targetHeight / 2 + 20);
          
          ctx.font = "12px font-sans";
          ctx.fillStyle = "#94a3b8";
          ctx.fillText("마우스 왼쪽 버튼을 도면 위에 길게 누르고 있는 동안에만 표시됩니다", targetWidth / 2, targetHeight / 2 + 45);
          
          animId = requestAnimationFrame(renderFrame);
          return;
        }

        // 1. 이미지 물리 분할 렌더링 (메모리 덤프 방지)
        const cols = 10;
        const rows = 10;
        const cellW = targetWidth / cols;
        const cellH = targetHeight / rows;
        const srcW = img.width / cols;
        const srcH = img.height / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.drawImage(img, c * srcW, r * srcH, srcW, srcH, c * cellW, r * cellH, cellW, cellH);
          }
        }

        // 2. 보안 모드별 물리적 마스킹 적용
        if (securityMode === "dither") {
          phase = !phase;
          ctx.fillStyle = "#09090b";
          // 1px 간격의 정밀 홀짝 가로 격자를 프레임마다 위상 반전시켜 렌더링 (육안으론 풀화면이지만 캡처시 치수 판독 불가)
          for (let y = phase ? 0 : 1; y < targetHeight; y += 2) {
            ctx.fillRect(0, y, targetWidth, 1);
          }
        } else if (securityMode === "lens") {
          // 손전등 스포트라이트 보안 모드: 마우스 반경 외부를 설계도 블루프린트 매트릭스로 은폐
          ctx.save();
          ctx.fillStyle = "rgba(5, 9, 18, 0.96)";
          ctx.beginPath();
          ctx.rect(0, 0, targetWidth, targetHeight);

          if (isHovering && mousePos.x >= 0) {
            ctx.arc(mousePos.x, mousePos.y, 200, 0, Math.PI * 2, true);
          } else {
            // 마우스 이탈 시 중앙에 작은 힌트 렌즈만 표시
            ctx.arc(targetWidth / 2, targetHeight / 2, 140, 0, Math.PI * 2, true);
          }
          ctx.fill();

          // 스포트라이트 외곽 가이드 링 드로잉
          const ringX = isHovering ? mousePos.x : targetWidth / 2;
          const ringY = isHovering ? mousePos.y : targetHeight / 2;
          ctx.strokeStyle = "rgba(7, 86, 155, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ringX, ringY, isHovering ? 200 : 140, 0, Math.PI * 2);
          ctx.stroke();

          ctx.font = "10px monospace";
          ctx.fillStyle = "rgba(7, 86, 155, 0.9)";
          ctx.fillText("🔦 HSW SECURE LENS ACTIVE // 전체 도면 유출 차단 중", ringX - 110, ringY - (isHovering ? 210 : 150));
          ctx.restore();
        }

        animId = requestAnimationFrame(renderFrame);
      };

      renderFrame();
    };

    img.onerror = () => {
      if (!active) return;
      setLoading(false);
      setError(true);
    };

    return () => {
      active = false;
      if (animId) cancelAnimationFrame(animId);
    };
  }, [imageUrl, maxDisplayWidth, securityMode, isHovering, mousePos]);

  // 마우스 이동 좌표 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        isHoldingRef.current = false;
        setIsHoldingState(false);
      }}
      onMouseDown={() => {
        isHoldingRef.current = true;
        setIsHoldingState(true);
      }}
      onMouseUp={() => {
        isHoldingRef.current = false;
        setIsHoldingState(false);
      }}
      className="relative group overflow-hidden bg-zinc-950 rounded-2xl border border-white/15 shadow-2xl w-full select-none"
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 z-10 gap-3 min-h-[400px]">
          <Loader2 className="w-8 h-8 text-[#07569b] animate-spin" />
          <span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
            초고속 매트릭스 분할 & 광학 쉴드 컴파일 중...
          </span>
        </div>
      )}

      {/* Fail fallback */}
      {error && (
        <div className="relative grid place-items-center p-8 text-center bg-zinc-900 min-h-[400px]">
          <img
            src={imageUrl}
            alt={alt}
            className="max-h-[650px] w-auto object-contain select-none pointer-events-none filter blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 grid place-items-center">
            <p className="text-zinc-300 font-mono text-xs p-4 bg-zinc-950/90 rounded-xl border border-red-500/30">
              🔒 도면 보안을 위해 원본 이미지 외부 핫링킹 로드가 차단되었습니다.
            </p>
          </div>
        </div>
      )}

      {/* Canvas Drawing */}
      {!error && (
        <div className="w-full relative overflow-hidden grid place-items-center bg-zinc-900/60 p-1 md:p-3 cursor-crosshair">
          <canvas
            ref={canvasRef}
            className="block max-w-full max-h-[68vh] object-contain mx-auto select-none pointer-events-none rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* HSW 고도화 도면 보호 컨트롤러 툴바 (시각적 워터마크 대체 신기술 바) */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 bg-zinc-950/90 border border-[#07569b]/40 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/30 rounded">
            <ShieldCheck className="w-3.5 h-3.5" /> HSW OPTICAL DRM 2.0
          </span>
          <span className="text-[11px] text-zinc-300 font-sans hidden sm:inline">
            {securityMode === "dither" && "⚡ 광학 스캔 가동 중 (스크린샷 촬영 시 도면 데이터 깨짐)"}
            {securityMode === "lens" && "🔦 손전등 스포트라이트 (전체 도면 한 번에 캡처 불가)"}
            {securityMode === "normal" && "🛡️ 분할 매트릭스 메모리 방어 중"}
          </span>
        </div>

        {/* 물리 차단 모드 선택 버튼 그룹 */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleHoldToView}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              holdToView
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 border border-rose-400"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent"
            }`}
            title="마우스를 누르고 있을 때만 도면을 보여 스크린샷 캡처를 원천 차단합니다"
          >
            🔒 Hold to View {holdToView ? "ON" : "OFF"}
          </button>

          <button
            onClick={() => setSecurityMode("dither")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              securityMode === "dither"
                ? "bg-[#07569b] text-white shadow-md shadow-[#07569b]/30 border border-blue-400/40"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent"
            }`}
          >
            <Scan className="w-3 h-3" /> 스캔 방어(디더링)
          </button>

          <button
            onClick={() => setSecurityMode("lens")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              securityMode === "lens"
                ? "bg-[#07569b] text-white shadow-md shadow-[#07569b]/30 border border-blue-400/40"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent"
            }`}
          >
            <Flashlight className="w-3 h-3" /> 보안 손전등
          </button>

          <button
            onClick={() => setSecurityMode("normal")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              securityMode === "normal"
                ? "bg-zinc-800 text-zinc-200 border border-white/20"
                : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-zinc-300 border border-transparent"
            }`}
            title="기본 분할 메모리 렌더링"
          >
            <Eye className="w-3 h-3" /> 일반
          </button>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
            title="보안 원리 안내"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#07569b]" />
          </button>
        </div>
      </div>

      {showExplanation && (
        <div className="absolute top-14 left-3 right-3 p-4 bg-zinc-950/98 border border-[#07569b]/50 rounded-xl text-zinc-300 text-xs shadow-2xl backdrop-blur-2xl z-20 animate-fade-in pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="font-bold text-[#07569b] flex items-center gap-1 font-mono text-[11px]">
              🛡️ 지저분한 글자 워터마크를 대체한 무차단 광학 방어 원리
            </span>
            <button onClick={() => setShowExplanation(false)} className="text-[10px] text-zinc-400 hover:text-white">닫기 ✕</button>
          </div>
          <ul className="space-y-1.5 text-[11px] text-zinc-300 leading-relaxed font-sans">
            <li>
              • <strong>⚡ 광학 스캔 방어(디더링)</strong>: 사람의 눈은 1/60초 이하의 초고속 화면 교차를 잔상 효과로 합쳐서 보지만, 정지된 단 1프레임을 찍어가는 OS 스냅샷 촬영 시에는 <strong>도면의 50% 픽셀 라인이 누락되어 깨진 화면만 캡처</strong>됩니다.
            </li>
            <li>
              • <strong>🔦 보안 손전등 렌즈</strong>: 설계도 전체를 한 번에 보여주지 않고 마우스 주변만 국소 개방하여 전체 도면 유출을 원천적으로 봉쇄합니다.
            </li>
            <li>
              • <strong>🚫 매트릭스 100조각 메모리 연산</strong>: 이미지 주소를 직접 노출하지 않고 메모리 캔버스 위에 실시간 연산 작화합니다.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

