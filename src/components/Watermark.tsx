/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";

export default function Watermark() {
  const [position1, setPosition1] = useState({ x: 10, y: 20 });
  const [position2, setPosition2] = useState({ x: 60, y: 70 });
  const [position3, setPosition3] = useState({ x: 40, y: 40 });

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.01;
      
      // Screen fluid bouncing logic
      setPosition1({
        x: 15 + Math.sin(angle * 0.8) * 10,
        y: 20 + Math.cos(angle * 0.5) * 15,
      });

      setPosition2({
        x: 65 + Math.sin(angle * 0.6) * 12,
        y: 60 + Math.sin(angle * 1.1) * 20,
      });

      setPosition3({
        x: 45 + Math.cos(angle * 0.9) * 15,
        y: 40 + Math.sin(angle * 0.7) * 12,
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Flying diagonal watermarks with subtle blue neon tints */}
      <div 
        className="absolute transition-all duration-300 ease-out text-[11px] font-mono font-black tracking-[0.3em] text-[#07569b]/10 whitespace-nowrap uppercase transform -rotate-12 bg-[#07569b]/1 px-3 py-1 rounded border border-[#07569b]/10 shadow-[0_0_8px_rgba(7,86,155,0.02)]"
        style={{ left: `${position1.x}%`, top: `${position1.y}%` }}
      >
        HSW PORTFOLIO PROTECTED // DO NOT COPY
      </div>

      <div 
        className="absolute transition-all duration-300 ease-out text-[11px] font-mono font-black tracking-[0.3em] text-white/5 whitespace-nowrap uppercase transform -rotate-12 bg-white/1 px-3 py-1 rounded border border-white/[0.02]"
        style={{ left: `${position2.x}%`, top: `${position2.y}%` }}
      >
        LANDSCAPE BRANDING DESIGNER HSW // 2026
      </div>

      <div 
        className="absolute transition-all duration-300 ease-out text-[11px] font-mono font-black tracking-[0.3em] text-[#07569b]/10 whitespace-nowrap uppercase transform -rotate-12 bg-[#07569b]/1 px-3 py-1 rounded border border-[#07569b]/10 shadow-[0_0_8px_rgba(7,86,155,0.02)]"
        style={{ left: `${position3.x}%`, top: `${position3.y}%` }}
      >
        SIGN MAKERS PLAYGROUND // HSW DESIGN
      </div>

      {/* Grid pattern watermarks slightly visible at corner */}
      <div className="absolute top-1/4 left-10 text-[9px] font-mono text-[#07569b]/10 transform rotate-90 origin-left pointer-events-none uppercase tracking-widest leading-none">
        DESIGN IP PRESERVATION LAYER ACTIVE IN PREVIEW MODE • HSW DESIGN
      </div>
    </div>
  );
}
