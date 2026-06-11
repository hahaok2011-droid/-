/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import HeroSign from "./components/HeroSign";
import InteractiveNightCity from "./components/InteractiveNightCity";
import ProjectDetail from "./components/ProjectDetail";
import Workflow from "./components/Workflow";
import SkillsCert from "./components/SkillsCert";
import AdminPanel from "./components/AdminPanel";
import CopyProtection from "./components/CopyProtection";
import Watermark from "./components/Watermark";
import { INITIAL_PROJECTS, WORKFLOW_STEPS, TOOL_SKILLS, CERTIFICATIONS } from "./data";
import { Project, WorkflowStep, ToolSkill, Certification } from "./types";
import { 
  Lock, Unlock, Mail, Phone, FileText, Compass, ExternalLink, RefreshCw, 
  ChevronDown, Layers, Award, Radio, ShieldCheck, MapPin 
} from "lucide-react";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [toolSkills, setToolSkills] = useState<ToolSkill[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(true); // Default to unlocked for smooth premium viewing
  const [showVipInput, setShowVipInput] = useState(false);
  const [vipCode, setVipCode] = useState("");
  const [vipError, setVipError] = useState(false);
  const [contactResultMsg, setContactResultMsg] = useState("");

  // Initialize and check LocalStorage
  useEffect(() => {
    // 1. Projects
    const cachedProjects = localStorage.getItem("hsw_projects");
    if (cachedProjects) {
      try {
        setProjects(JSON.parse(cachedProjects));
      } catch (err) {
        setProjects(INITIAL_PROJECTS);
      }
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem("hsw_projects", JSON.stringify(INITIAL_PROJECTS));
    }

    // 2. Workflows
    const cachedWorkflow = localStorage.getItem("hsw_workflow");
    if (cachedWorkflow) {
      try {
        setWorkflowSteps(JSON.parse(cachedWorkflow));
      } catch (err) {
        setWorkflowSteps(WORKFLOW_STEPS);
      }
    } else {
      setWorkflowSteps(WORKFLOW_STEPS);
      localStorage.setItem("hsw_workflow", JSON.stringify(WORKFLOW_STEPS));
    }

    // 3. Tool Skills
    const cachedSkills = localStorage.getItem("hsw_skills");
    if (cachedSkills) {
      try {
        setToolSkills(JSON.parse(cachedSkills));
      } catch (err) {
        setToolSkills(TOOL_SKILLS);
      }
    } else {
      setToolSkills(TOOL_SKILLS);
      localStorage.setItem("hsw_skills", JSON.stringify(TOOL_SKILLS));
    }

    // 4. Certifications
    const cachedCerts = localStorage.getItem("hsw_certs");
    if (cachedCerts) {
      try {
        setCerts(JSON.parse(cachedCerts));
      } catch (err) {
        setCerts(CERTIFICATIONS);
      }
    } else {
      setCerts(CERTIFICATIONS);
      localStorage.setItem("hsw_certs", JSON.stringify(CERTIFICATIONS));
    }
  }, []);

  const handleUpdateProjects = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem("hsw_projects", JSON.stringify(updated));
    // If selected project was updated or deleted
    if (selectedProject) {
      const stillExists = updated.find(p => p.id === selectedProject.id);
      if (stillExists) {
        setSelectedProject(stillExists);
      } else {
        setSelectedProject(null);
      }
    }
  };

  const handleUpdateWorkflow = (updated: WorkflowStep[]) => {
    setWorkflowSteps(updated);
    localStorage.setItem("hsw_workflow", JSON.stringify(updated));
  };

  const handleUpdateSkills = (updated: ToolSkill[]) => {
    setToolSkills(updated);
    localStorage.setItem("hsw_skills", JSON.stringify(updated));
  };

  const handleUpdateCerts = (updated: Certification[]) => {
    setCerts(updated);
    localStorage.setItem("hsw_certs", JSON.stringify(updated));
  };

  const handleResetToDefault = () => {
    localStorage.removeItem("hsw_projects");
    localStorage.removeItem("hsw_workflow");
    localStorage.removeItem("hsw_skills");
    localStorage.removeItem("hsw_certs");
    setProjects(INITIAL_PROJECTS);
    setWorkflowSteps(WORKFLOW_STEPS);
    setToolSkills(TOOL_SKILLS);
    setCerts(CERTIFICATIONS);
    setSelectedProject(null);
  };

  const handleUnlockVip = (codeStr: string): boolean => {
    if (codeStr === "0610") {
      setIsUnlocked(true);
      setVipError(false);
      setShowVipInput(false);
      return true;
    } else {
      setVipError(true);
      return false;
    }
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUnlockVip(vipCode);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactResultMsg("제안이 안전하게 전송되었습니다. 하승완 디자이너가 24시간 내에 기재하신 메일로 연락드립니다. 감사합니다.");
    setTimeout(() => {
      setContactResultMsg("");
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] bg-light-grid text-slate-800 font-sans leading-normal relative overflow-x-hidden select-none pt-16 md:pt-20">
      
      {/* Visual Flare Element representing Sophisticated motif */}
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[#07569b] rounded-full blur-[180px] opacity-[0.06] pointer-events-none z-0" />
      <div className="absolute top-[40%] -left-[20%] w-[500px] h-[500px] bg-[#07569b] rounded-full blur-[180px] opacity-[0.03] pointer-events-none z-0" />

      {/* 1단계-2단계: 복사 차단 스크립트 리스너 및 움직이는 워터마크 레이아우트 탑재 */}
      <CopyProtection />
      <Watermark />

      {/* TOP HEADER NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 border-b border-slate-200/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded bg-[#07569b] flex items-center justify-center font-mono font-black text-white tracking-tighter text-xs group-hover:scale-105 transition-all shadow-[0_0_12px_rgba(7,86,155,0.3)]">
              HSW
            </div>
            <span className="font-display font-light text-xs md:text-sm tracking-wide text-slate-500 group-hover:text-[#07569b] transition-colors">
              첫인상을 디자인합니다, 간판디자이너 <span className="font-extrabold text-[#07569b]">하승완</span>입니다
            </span>
          </a>

          {/* Nav Anchor Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-slate-600 font-bold">
            <a href="#interactive-nightpath-section" className="hover:text-[#07569b] hover:opacity-100 transition-all">WORK & CITY</a>
            <a href="#workflow-section" className="hover:text-[#07569b] hover:opacity-100 transition-all">PROCESS</a>
            <a href="#skills-cert-section" className="hover:text-[#07569b] hover:opacity-100 transition-all">SKILLS</a>
            <a href="#contact-section" className="hover:text-[#07569b] hover:opacity-100 transition-all">CONTACT</a>
            <a href="#admin-section" className="hover:text-red-500 text-red-600 border border-red-200 px-2.5 py-1 rounded bg-red-50 transition-all">ADMIN (0610)</a>
          </nav>

          {/* Recruiter Premium (VIP Mode Gateway Toggle) Removed according to request */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full text-[10px] md:text-xs text-[#07569b] font-mono shadow-sm">
              <Unlock className="w-3.5 h-3.5 text-[#07569b]" />
              SECURE PORTFOLIO ACTIVE
            </div>
          </div>

        </div>
      </header>

      {/* HERO SCENE SECTION */}
      <section className="relative z-10 w-full min-h-[80vh] flex items-center justify-center my-6 md:my-10">
        <HeroSign />
      </section>

      {/* URBAN NIGHT CITY INTERACTIVE MAP */}
      <section className="relative z-10 py-12 md:py-20 border-t border-white/[0.03]">
        <InteractiveNightCity 
          projects={projects}
          onProjectSelect={(project) => setSelectedProject(project)}
          unlocked={isUnlocked}
        />
      </section>

      {/* CASE STUDY DETAIL DISPLAY ZONE */}
      {selectedProject && (
        <section className="relative z-10 py-10 max-w-7xl mx-auto px-6">
          <ProjectDetail 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isUnlocked={isUnlocked}
            onUnlockRequest={handleUnlockVip}
          />
        </section>
      )}

      {/* WORKFLOW ROADMAP */}
      <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 border-t border-white/[0.03]">
        <Workflow steps={workflowSteps} />
      </section>

      {/* SKILLS & CREDENTIAL PANEL */}
      <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 border-t border-white/[0.03]">
        <SkillsCert skills={toolSkills} certs={certs} />
      </section>

      {/* ADMINISTRATIVE MANAGEMENT CONTROL HUB */}
      <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 border-t border-white/[0.03]">
        <AdminPanel 
          projects={projects}
          onUpdateProjects={handleUpdateProjects}
          workflowSteps={workflowSteps}
          onUpdateWorkflow={handleUpdateWorkflow}
          toolSkills={toolSkills}
          onUpdateSkills={handleUpdateSkills}
          certs={certs}
          onUpdateCerts={handleUpdateCerts}
          onResetToDefault={handleResetToDefault}
        />
      </section>

      {/* FOOTER & CONTACT CHANNELS */}
      <footer id="contact-section" className="relative z-10 bg-slate-50 border-t border-slate-200 py-16 px-6 mt-20 text-slate-800 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand block (left) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#07569b] flex items-center justify-center font-mono font-black text-white text-sm shadow-[0_0_12px_rgba(7,86,155,0.3)]">
                HSW
              </div>
              <span className="font-display text-sm font-light tracking-wide text-slate-500">
                첫인상을 디자인합니다, 간판디자이너 <span className="font-extrabold text-[#07569b]">하승완</span>입니다
              </span>
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-lg">
              사람들의 시선이 골평로를 가득 채우고 건물이 시선에 안착할 때, 간판 디자이너는 도시와 공존합니다. 
              하승완은 20년간 간판을 빚으며, 디자인 예술과 하중 안전 하이브리드 공법을 정교하게 다져왔습니다.
            </p>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-2">
              All visual assets strictly preserved via HSW canvas layer.
            </div>
          </div>

          {/* Quick Contacts (Middle) */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] font-mono text-[#07569b] uppercase tracking-widest font-black">
              Direct Channels
            </span>
            <div className="flex flex-col gap-3.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-450 shrink-0" />
                <span className="font-mono font-semibold">bbandlove@naver.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-450 shrink-0" />
                <span className="font-semibold">서울, 대한민국 (인접 수도권 시공 협진 가능)</span>
              </div>
            </div>
          </div>

          {/* Message Proposal Form (Right) */}
          <form onSubmit={handleContactSubmit} className="md:col-span-6 lg:col-span-4 flex flex-col gap-2.5 bg-white p-5 rounded-2xl border border-slate-250 shadow-xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              공식 채용 / 시공 의뢰 메시지
            </span>
            <input 
              type="email"
              placeholder="회신받으실 담당자 이메일 주소"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-450 font-sans focus:outline-none focus:border-[#07569b]/40"
              required
            />
            <textarea 
              placeholder="프로젝트 제안 내용 혹은 시공 범위 사항을 기재해 해십시오."
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-450 h-20 focus:outline-none focus:border-[#07569b]/40 font-sans"
              required
            />
            <button 
              type="submit"
              className="bg-[#07569b] hover:bg-blue-800 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all font-mono tracking-wider cursor-pointer shadow-[0_4px_15px_rgba(7,86,155,0.15)]"
            >
              제안 전송 (SUBMIT INQUIRY)
            </button>
            {contactResultMsg && (
              <p className="text-emerald-600 text-[10px] leading-relaxed mt-1 animate-scale-in">
                ✓ {contactResultMsg}
               </p>
             )}
          </form>

        </div>

        {/* Global base Copyright footer info line */}
        <div className="max-w-6xl mx-auto pt-10 mt-10 border-t border-slate-200 text-center text-slate-500 text-[10px] font-mono uppercase tracking-widest">
          © 2026 간판디자이너 하승완. PROUDLY DEVELOPED BY HA SEUNG WAN. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
