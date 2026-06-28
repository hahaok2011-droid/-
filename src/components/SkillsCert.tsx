/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ToolSkill } from "../types";

interface SkillsCertProps {
  skills: ToolSkill[];
  certs?: any; // 하위 호환성 유지
}

export default function SkillsCert({ skills }: SkillsCertProps) {
  return (
    <div className="w-full scroll-mt-24" id="skills-cert-section">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">Production Readiness Gauge</span>
          <h3 className="text-xl md:text-2xl font-sans font-black text-slate-900 tracking-tight mt-1">
            엔지니어 툴 역량 (TOOL SKILLS)
          </h3>
          <p className="text-slate-500 text-[11px] font-sans mt-0.5 leading-relaxed font-semibold">
            단순 수치 마케팅이 아닌, 실제 공장에 즉각 벡터 도면 송출과 오차 없는 3D 렌더 실무 압출이 가능한 검증 능력치입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-10 md:gap-y-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="flex flex-col gap-2 p-5 bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl hover:scale-[1.01] hover:shadow-md transition-all">
              <div className="flex justify-between items-center text-sm font-black">
                <span className="font-sans text-slate-900 text-[13px] md:text-sm">{skill.name}</span>
                <span className="font-mono text-[#07569b] text-base font-black">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden border border-slate-300/40">
                <div 
                  className="h-full bg-gradient-to-r from-blue-700 via-[#07569b] to-sky-500 rounded-full transition-all duration-1000 ease-in-out" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              {skill.desc && (
                <div className="mt-1.5 pt-2 border-t border-slate-200/60">
                  <p className="text-[12px] font-sans font-medium text-slate-700 leading-relaxed break-keep">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#07569b] mr-1.5 align-middle -mt-0.5" />
                    {skill.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

