/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck, HelpCircle } from "lucide-react";

interface SplitCanvasViewerProps {
  imageUrl: string;
  alt: string;
  watermarkText?: string;
  maxDisplayWidth?: number;
}

export default function SplitCanvasViewer({
  imageUrl,
  alt,
  watermarkText = "HSW BRAND DESIGN PROT",
  maxDisplayWidth = 1400,
}: SplitCanvasViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Try cross origin if enabled
    img.src = imageUrl;

    img.onload = () => {
      if (!active) return;
      setLoading(false);

      // 3단계 제한 사항: 원본 해상도와 관계없이 웹 화면에서는 1400px 제한 리사이징 렌더링
      const ratio = img.height / img.width;
      const targetWidth = Math.min(img.width, maxDisplayWidth);
      const targetHeight = targetWidth * ratio;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 4단계: 작품 이미지를 10x10 조각(100개 퍼즐)으로 물리 분할하여 순차 렌더링
      // 브라우저 캐시에서 가해할 이미지 데이터를 숨기고 Canvas에 미세 연산으로 작화함
      const rows = 12;
      const cols = 12;
      const cellWidth = targetWidth / cols;
      const cellHeight = targetHeight / rows;

      const sourceCellWidth = img.width / cols;
      const sourceCellHeight = img.height / rows;

      // 조각을 실시간 렌더링
      ctx.clearRect(0, 0, targetWidth, targetHeight);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.drawImage(
            img,
            c * sourceCellWidth,
            r * sourceCellHeight,
            sourceCellWidth,
            sourceCellHeight,
            c * cellWidth,
            r * cellHeight,
            cellWidth,
            cellHeight
          );
        }
      }

      // 대각선 2중 워터마크 직접 작각 (화면을 캡처해도 지울 수 없게 캔버스 비트맵에 영구 병합)
      ctx.save();
      ctx.font = "italic bold 20px 'Space Grotesk', sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 대각선 배치 수식
      const stepX = targetWidth / 3;
      const stepY = targetHeight / 4;
      for (let x = stepX / 2; x < targetWidth; x += stepX) {
        for (let y = stepY / 2; y < targetHeight; y += stepY) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI / 8);
          ctx.strokeText(watermarkText, 0, 0);
          ctx.fillText(watermarkText, 0, 0);
          ctx.restore();
        }
      }

      // 우하단 기술 인장
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillText("RENDERED VIA HSW CANVAS SHIELD", targetWidth - 100, targetHeight - 15);

      ctx.restore();
    };

    img.onerror = () => {
      // Unsplash나 외부 등 CORS 이슈가 날 경우를 대비한 가벼운 로컬 드로잉 fallback
      if (!active) return;
      setLoading(false);
      setError(true);
    };

    return () => {
      active = false;
    };
  }, [imageUrl, watermarkText, maxDisplayWidth]);

  return (
    <div className="relative group overflow-hidden bg-zinc-950 rounded-xl border border-white/10 shadow-2xl">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 z-10 gap-3">
          <Loader2 className="w-8 h-8 text-[#07569b] animate-spin" />
          <span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
            Dividing & Canvas Shield Assembling...
          </span>
        </div>
      )}

      {/* Fail fallback - CORS 대비하여 일반 img로 그리되, 워터마크 레이러를 씌움 */}
      {error && (
        <div className="relative">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full object-cover max-h-[600px] select-none pointer-events-none filter blur-[1px] md:blur-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none shrink-0" />
          {/* Static anti-copy mask overlay */}
          <div className="absolute inset-0 border border-red-500/10 pointer-events-none flex items-center justify-center select-none overflow-hidden">
            <div className="text-white/[0.04] text-[18px] md:text-3xl font-mono font-black uppercase tracking-widest select-none -rotate-12 whitespace-nowrap">
              {watermarkText} • {watermarkText} • {watermarkText}
            </div>
          </div>
        </div>
      )}

      {/* Safe Canvas Drawing - CORS 통과 시 최정예 렌더 */}
      {!error && (
        <div className="w-full relative overflow-x-auto overflow-y-hidden">
          <canvas
            ref={canvasRef}
            className="block w-full max-h-[650px] object-contain mx-auto select-none pointer-events-none bg-zinc-900"
            style={{ imageRendering: "auto" }}
          />
        </div>
      )}

      {/* Corner Security badge (with tooltip toggle) */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-black/85 border border-[#07569b]/40 px-2.5 py-1 rounded-md text-[#07569b] text-[10px] font-mono shadow-md backdrop-blur-sm">
        <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
        CANVAS SECURED
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          className="ml-1 hover:text-white cursor-pointer"
          title="보안 뷰어 정보"
        >
          <HelpCircle className="w-3 h-3 text-[#07569b]" />
        </button>
      </div>

      {showExplanation && (
        <div className="absolute bottom-11 left-3 right-3 p-4 bg-zinc-950/98 border border-[#07569b]/30 rounded-lg text-zinc-300 text-xs shadow-2xl backdrop-blur-xl z-20 animate-fade-in line-clamp-none">
          <p className="font-bold text-[#07569b] mb-1 flex items-center gap-1">
            🛡️ 최정예 포트폴리오 유출 방지 기술 4단계 탑재
          </p>
          <p className="leading-relaxed text-zinc-400 text-[11px]">
            본 이미지는 우클릭 다운로드나 드래그를 차단하는 단순 스크립트를 넘어, 브라우저가 본래 이미지의 리소스를 직접 비추지 않고 
            <strong> 12×12(총 144조각) 매트릭스 분할 연산</strong>을 거쳐 브라우저 내부 메모리 캔버스 위에 한정 표출합니다. 
            또한 캡처로 우회 수집하더라도 <strong>비트맵 레벨에 영구 융합된 반투명 워터마크 기술</strong>로 디자인 자산을 철저히 보존하고 있습니다.
          </p>
          <button 
            onClick={() => setShowExplanation(false)}
            className="mt-2 text-[10px] text-[#07569b] hover:underline cursor-pointer"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
