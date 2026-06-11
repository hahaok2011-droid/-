/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ToolSkill, Certification } from "../types";
import { Award, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

interface SkillsCertProps {
  skills: ToolSkill[];
  certs: Certification[];
}

export default function SkillsCert({ skills, certs }: SkillsCertProps) {
  const [filter, setFilter] = useState<"전체" | "자격증" | "수상" | "교육이수">("전체");

  const filteredCerts = certs.filter(
    (c) => filter === "전체" || c.category === filter
  );

  const getCertIcon = (cat: "자격증" | "수상" | "교육이수") => {
    switch (cat) {
      case "자격증":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "수상":
        return <Award className="w-4 h-4 text-[#07569b]" />;
      case "교육이수":
      default:
        return <GraduationCap className="w-4 h-4 text-[#07569b]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24" id="skills-cert-section">
      
      {/* TOOL SKILLS (Left Column) */}
      <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm h-full">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">Production Readiness Gauge</span>
          <h3 className="text-xl md:text-2xl font-sans font-black text-slate-900 tracking-tight mt-1">
            엔지니어 툴 역량 (TOOL SKILLS)
          </h3>
          <p className="text-slate-500 text-[11px] font-sans mt-0.5 leading-relaxed font-semibold">
            단순 수치 마케팅이 아닌, 실제 공장에 즉각 벡터 도면 송출과 오차 없는 3D 렌더 실무 압출이 가능한 검증 능력치입니다.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {skills.map((skill, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 hover:scale-[1.01] transition-transform">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="font-sans text-slate-700">{skill.name}</span>
                <span className="font-mono text-[#07569b] font-black">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="h-full bg-gradient-to-r from-blue-700 to-[#07569b] rounded-full transition-all duration-1000 ease-in-out" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS & AWARD HIGHLIGHT (Right Column) */}
      <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm h-full">
        <div className="mb-4 border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">Honors & Qualifications</span>
            <h3 className="text-xl md:text-2xl font-sans font-black text-slate-900 tracking-tight mt-1">
              자격증 & 수상 이력 (CREDENTIALS)
            </h3>
          </div>

          {/* Tag Filter Controls */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60 shrink-0 align-middle">
            {(["전체", "자격증", "수상", "교육이수"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded text-[10px] font-sans transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-white border border-slate-200/50 text-[#07569b] font-semibold font-bold shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials List with custom hover card design */}
        <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
          {filteredCerts.length === 0 ? (
            <div className="text-slate-400 text-xs text-center py-10 font-bold">
              해당 분류의 인증 내용 데이터가 존재하지 않습니다.
            </div>
          ) : (
            filteredCerts.map((cert, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 bg-slate-50/80 border border-slate-150 p-4 rounded-xl hover:border-slate-350 transition-all group shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-slate-150">
                  {getCertIcon(cert.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                      {cert.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">
                      {cert.date}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-sans font-bold text-slate-800 group-hover:text-[#07569b] transition-colors truncate">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] font-sans text-slate-500 mt-0.5 font-medium">
                    {cert.organization}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
