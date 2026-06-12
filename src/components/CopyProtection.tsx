/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { ShieldAlert, CheckCircle } from "lucide-react";

export default function CopyProtection() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");

  const triggerAlert = (message: string) => {
    setAlertText(message);
    setAlertVisible(true);
    
    // Auto-dismiss the copyright alert after 4 seconds to maintain great UX
    const timer = setTimeout(() => {
      setAlertVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // 1. Right click block
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerAlert("무단 도용 및 복사를 방지하기 위해 컨텍스트 메뉴가 비활성화되어 있습니다.");
    };

    // 2. Key trigger capturing block & shortcut block
    const handleKeyDown = (e: KeyboardEvent) => {
      // Win+Shift+S (Windows Snipping Tool), Cmd+Shift+4 (Mac OS Capture), PrintScreen key
      if (
        e.key === "PrintScreen" ||
        (e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === "S" || e.key === "s"))
      ) {
        e.preventDefault();
        try {
          // Clear clipboard content dynamically to prevent holding the captured screen layout in the OS buffer
          navigator.clipboard?.writeText("간판디자이너 하승완의 고유한 도면 디자인 보호를 위해 유출 복사가 금지되어 있습니다.");
        } catch (err) {
          // Fallback if clipboard writing is blocked
        }
        triggerAlert("자산 유출 방지: 창작공법 보호를 위해 화면 스크린샷 캡쳐가 금지되어 있습니다.");
      }

      // Ctrl+C, Ctrl+U, Ctrl+S, F12, Meta+S, Meta+C, Ctrl+P (Print) block
      if (
        (e.ctrlKey && e.key === "c") ||
        (e.metaKey && e.key === "c") ||
        (e.ctrlKey && e.key === "s") ||
        (e.metaKey && e.key === "s") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "p") ||
        (e.metaKey && e.key === "p") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        triggerAlert("포트폴리오 저작권 보호를 위해 소스 보기, 단축 저장, 인쇄 등의 기능이 제한됩니다.");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        try {
          navigator.clipboard?.writeText("[저작권 보호 적용] 무단 복제 불가");
        } catch (err) {
          // Fallback
        }
        triggerAlert("스크린샷 프린트 동작 수행 시 저작권 보호 텍스트로 보완 처리가 자동 작동됩니다.");
      }
    };

    // 3. Drag, selection block
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    const handleDragStart = (e: Event) => {
      e.preventDefault();
    };

    // Clipboard copy interception to completely isolate canvas logic
    const handleCopy = (e: ClipboardEvent) => {
      e.clipboardData?.setData("text/plain", "본 작품안의 무단 복제 및 활용은 전면 금지되어 있습니다.");
      e.preventDefault();
      triggerAlert("무단 도면 및 미디어 텍스트 추출이 금지된 전용 환경입니다.");
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("copy", handleCopy);

    // 4. Print screen CSS injection - blocks real rendering in printed page layouts
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
      window.removeEventListener("copy", handleCopy);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Visual notification toast for copy protection actions */}
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

      {/* Persistent Security Indicator */}
      <div className="fixed top-4 right-4 z-40 hidden md:flex items-center gap-2 bg-black/60 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        hsw protection active
      </div>
    </>
  );
}
