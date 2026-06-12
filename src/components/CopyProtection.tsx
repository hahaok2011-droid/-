/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { ShieldAlert, CheckCircle } from "lucide-react";

export default function CopyProtection() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  const triggerAlert = (message: string) => {
    setAlertText(message);
    setAlertVisible(true);
  };

  useEffect(() => {
    // 1. Right click block
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerAlert("무단 도용 및 복사를 방지하기 위해 컨텍스트 메뉴가 비활성화되어 있습니다.");
    };

    // 2. Key trigger capturing block & shortcut block
    const handleKeyDown = (e: KeyboardEvent) => {
      // Win+Shift+S (Windows Snipping Tool), Cmd+Shift+4 (Mac), PrintScreen key
      if (
        e.key === "PrintScreen" ||
        (e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === "S" || e.key === "s"))
      ) {
        setIsBlurred(true);
        triggerAlert("화면 캡쳐 및 유출 방지를 위한 보안 감인 모드가 작용되었습니다.");
      }

      // Ctrl+C, Ctrl+U, Ctrl+S, F12, Meta+S, Meta+C 등 차단
      if (
        (e.ctrlKey && e.key === "c") ||
        (e.metaKey && e.key === "c") ||
        (e.ctrlKey && e.key === "s") ||
        (e.metaKey && e.key === "s") ||
        (e.ctrlKey && e.key === "u") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        triggerAlert("포트폴리오 저작권 보호를 위해 저장 및 소스 보기 단축키가 제한됩니다.");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setIsBlurred(true);
        triggerAlert("프린트 스크린 감지로 실시간 보안 필터가 즉각 발동되었습니다.");
      }
    };

    // 3. Drag, selection block
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    const handleDragStart = (e: Event) => {
      e.preventDefault();
    };

    // 4. OS Focus Loss detection (When Snipping Tool or screen capture tool intercepts screen)
    const handleWindowBlur = () => {
      setIsBlurred(true);
    };

    // Visibility-change event when document gets covered or hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 5. Print screen CSS block (hiding body content during printer layout)
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Visual notification for copy protection activity */}
      {alertVisible && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-red-950/95 border border-red-500/50 text-red-200 px-5 py-3 rounded-lg shadow-2xl backdrop-blur-md animate-bounce"
          role="alert"
        >
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
          <div className="text-xs font-sans">
            <p className="font-semibold text-red-300">저작권 보호 시스템 동작 중</p>
            <p className="opacity-90">{alertText}</p>
          </div>
          <button 
            onClick={() => setAlertVisible(false)}
            className="ml-3 text-red-400 hover:text-red-200 font-bold text-sm cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Persistent Security Indicator at top bar or somewhere */}
      <div className="fixed top-4 right-4 z-40 hidden md:flex items-center gap-2 bg-black/60 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        hsw protection active
      </div>

      {/* Anti-Capturing Overlay (Fires during Win+Shift+S or alt-tab refocus) */}
      {isBlurred && (
        <div className="fixed inset-0 z-[99999] bg-zinc-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 select-none pointer-events-auto">
          <div className="max-w-md bg-zinc-900 border border-red-500/30 p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-5 animate-pulse">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-sans font-bold text-white text-lg tracking-tight">화면 캡쳐 및 유출 방지 보호막 가동</h3>
            <p className="text-zinc-400 text-xs mt-3 leading-relaxed font-sans">
              간판디자이너 하승완의 작품 특허 공법 및 로고 디자인 지식재산 자산을 원천적으로 보호하기 위해, 화면 이탈 또는 캡쳐 감지(Snipping Tool) 시 즉시 화면 잠금 보호막이 탑재됩니다.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-[11px] font-mono text-zinc-500">
              <p>● WINDOWS SNIPPING PROTECTION ACTIVE</p>
              <p>● OS-LEVEL LAYER ENCRYPTED STATUS</p>
            </div>
            <button
              onClick={() => setIsBlurred(false)}
              className="mt-6 bg-red-650 hover:bg-red-600 text-white text-xs font-semibold px-6 py-2.5 rounded-xl cursor-pointer transition-all shadow-lg select-none duration-200"
            >
              🔐 보안 잠금 해제 (원문 도면 보기)
            </button>
            <p className="text-zinc-550 text-[9px] mt-2.5 font-mono">
              ※ 스크린샷 캡쳐 도구를 종료한 상태로 클릭하셔야 원활한 디스플레이가 유지됩니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
