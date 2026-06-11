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
  };

  useEffect(() => {
    // 1. Right click block
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerAlert("무단 도용 및 복사를 방지하기 위해 컨텍스트 메뉴가 비활성화되어 있습니다.");
    };

    // 2. Clear Selection / Copy attempt block
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+U, Ctrl+S, F12, Cmd+Option+I 등 방지 경고 및 차단
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

    // 3. Drag, selection block
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    const handleDragStart = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("dragstart", handleDragStart);

    // 4. Print screen block (blurring CSS during print style)
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
      window.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("dragstart", handleDragStart);
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
        <CheckCircle className="w-3. h-3 text-emerald-400 animate-pulse" />
        hsw protection active
      </div>
    </>
  );
}
