/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { WorkflowStep } from "../types";
import { ChevronRight, Clipboard, Layers, Droplet, Hammer, Truck } from "lucide-react";

interface WorkflowProps {
  steps: WorkflowStep[];
}

export default function Workflow({ steps }: WorkflowProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (id: number) => {
    switch (id) {
      case 1: return <Clipboard className="w-5 h-5 text-[#07569b]" />;
      case 2: return <Layers className="w-5 h-5 text-[#07569b]" />;
      case 3: return <Droplet className="w-5 h-5 text-[#07569b]" />;
      case 4: return <Hammer className="w-5 h-5 text-[#07569b]" />;
      case 5:
      default:
        return <Truck className="w-5 h-5 text-[#07569b]" />;
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24" id="workflow-section">
      <div className="max-w-5xl mx-auto">
        
        {/* Header section */}
        <div className="mb-8 border-b border-slate-100 pb-5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">Rigorous Design-to-Install Engine</span>
          <h3 className="text-2xl md:text-3.5xl font-sans font-black text-slate-900 tracking-tight mt-1">
            실무 시공 프로세스 로드맵 (WORKFLOW)
          </h3>
          <p className="text-slate-600 text-xs mt-1 leading-relaxed font-medium">
            단순히 눈부신 결과물 뒤편에 수반되는 하승완 디자이너의 타협 없는 5대 제작 공학 여정입니다. 
            현장의 물리 데이터 수립부터 수평 하중 도킹까지, 리스크 0%를 수치적으로 입증합니다.
          </p>
        </div>

        {/* Multi-step progression bar indicators */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-8">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`py-3.5 px-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive 
                    ? "bg-[#07569b]/10 border-[#07569b] text-[#07569b] font-extrabold shadow-sm" 
                    : "bg-slate-50 border-slate-200/60 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] opacity-70 mb-1 font-bold">
                  <span>STEP 0{step.id}</span>
                </div>
                <div className="font-sans font-bold text-[11px] md:text-xs leading-snug line-clamp-1">
                  {step.title.split(" & ")[0].split(" , ")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel Display */}
        {steps[activeStep] && (
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden transition-all duration-300 animate-fade-in flex flex-col md:flex-row gap-6 items-start">
            
            {/* Geometric shadow background element */}
            <div className="absolute right-0 bottom-0 text-[180px] font-mono font-black text-slate-900/[0.03] leading-none select-none translate-y-16 translate-x-12">
              0{steps[activeStep].id}
            </div>

            {/* Left box inside details card */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 bg-[#07569b]/10 border border-[#07569b]/20 rounded-xl flex items-center justify-center shrink-0">
                  {getStepIcon(steps[activeStep].id)}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1 font-bold">
                    {steps[activeStep].subtitle}
                  </div>
                  <h4 className="text-lg md:text-xl font-sans font-extrabold text-slate-900 tracking-tight leading-none">
                    STEP 0{steps[activeStep].id}. {steps[activeStep].title}
                  </h4>
                </div>
              </div>

              <p className="text-slate-600 text-xs md:text-sm font-sans leading-relaxed mt-4 max-w-2xl font-medium">
                {steps[activeStep].desc}
              </p>
            </div>

            {/* Right box inside details card with check bullets list */}
            <div className="w-full md:w-[320px] bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 relative z-10">
              <div className="text-[9px] font-mono text-[#07569b] uppercase tracking-widest font-black">
                체크리스트 & 공정 실무
              </div>
              <ul className="flex flex-col gap-2.5">
                {steps[activeStep].details.map((detail, idx) => (
                  <li key={idx} className="flex gap-2 text-slate-700 text-xs font-sans leading-relaxed font-semibold">
                    <ChevronRight className="w-4 h-4 text-[#07569b] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
