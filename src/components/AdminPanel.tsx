/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project, ColorSwatch, WorkflowStep, ToolSkill, Certification } from "../types";
import { Lock, ShieldCheck, Check, Trash2, Plus, Edit3, RefreshCw, Save, Layers, Award, Hammer, Briefcase, Upload, GripVertical, ChevronUp, ChevronDown } from "lucide-react";

interface AdminPanelProps {
  projects: Project[];
  onUpdateProjects: (updated: Project[]) => void;
  workflowSteps: WorkflowStep[];
  onUpdateWorkflow: (updated: WorkflowStep[]) => void;
  toolSkills: ToolSkill[];
  onUpdateSkills: (updated: ToolSkill[]) => void;
  certs: Certification[];
  onUpdateCerts: (updated: Certification[]) => void;
  onResetToDefault: () => void;
}

function ImageUploadField({
  label,
  value,
  onChange,
  onFileLoaded,
  id,
  accentColorClass,
  borderColorClass,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onFileLoaded: (base64: string) => void;
  id: string;
  accentColorClass: string;
  borderColorClass: string;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기가 너무 큽니다. 브라우저 저장 한계를 준수하기 위해 5MB 이하의 이미지를 사용해주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        onFileLoaded(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full bg-zinc-950/20 p-3 rounded-xl border border-white/[0.03]">
      <label className={`text-[10px] font-mono uppercase tracking-widest font-bold ${accentColorClass}`}>
        {label}
      </label>
      
      {/* Drag & Drop Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center border border-dashed rounded-xl p-3 gap-2 transition-all min-h-[140px] bg-zinc-950/60 ${
          isDragOver 
            ? `${borderColorClass} border-2 bg-zinc-900/60` 
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <input 
          type="file" 
          id={id} 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />

        {value ? (
          <div className="relative w-full aspect-[16/10] max-h-[140px] rounded-lg overflow-hidden border border-white/5 bg-zinc-900 group">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
              <label 
                htmlFor={id} 
                className="cursor-pointer bg-white/95 hover:bg-white text-zinc-900 text-[10px] font-sans font-bold px-3 py-1.5 rounded-lg shadow-md transition-all transform scale-95 group-hover:scale-100"
              >
                새로 올리기
              </label>
              <button
                type="button"
                onClick={() => onChange("")}
                className="bg-red-650 hover:bg-red-600 text-white text-[10px] font-sans font-bold px-3 py-1 rounded-lg shadow-md transition-all"
              >
                지우기
              </button>
            </div>
            <div className="absolute bottom-1 right-1 bg-black/85 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-mono text-zinc-400 max-w-[90%] truncate">
              {value.startsWith("data:") ? "🔌 로컬 이미지 업로드됨" : "🌐 웹 주소 연결됨"}
            </div>
          </div>
        ) : (
          <label 
            htmlFor={id} 
            className="flex flex-col items-center justify-center py-2 px-1 w-full h-full cursor-pointer group text-center"
          >
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
              <Upload className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
            </div>
            <p className="text-[11px] text-zinc-350 font-sans font-medium">컴퓨터에서 사진 올리기</p>
            <p className="text-[9px] text-zinc-550 font-sans mt-0.5">파일을 끌어다 놓거나 클릭</p>
            <span className="text-[8px] font-mono text-zinc-600 mt-1.5 uppercase tracking-tight bg-zinc-900/40 border border-white/5 px-1.5 py-0.5 rounded">
              Limit 5MB
            </span>
          </label>
        )}
      </div>

      {/* Manual URL entry field as fall back */}
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="또는 직접 웹 이미지 주소(URL)를 입력하십시오."
        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-2.5 py-1.5 text-[10px] text-zinc-450 placeholder-zinc-700 font-sans focus:outline-none focus:border-white/15"
      />
    </div>
  );
}

export default function AdminPanel({
  projects,
  onUpdateProjects,
  workflowSteps,
  onUpdateWorkflow,
  toolSkills,
  onUpdateSkills,
  certs,
  onUpdateCerts,
  onResetToDefault,
}: AdminPanelProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Navigation tabs for editor
  const [activeTab, setActiveTab] = useState<"projects" | "workflow" | "skills" | "certs">("projects");

  // ==========================
  // [1] PORTFOLIO PROJECT STATES
  // ==========================
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [draggedProjectIndex, setDraggedProjectIndex] = useState<number | null>(null);

  const [formId, setFormId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<"태권도" | "병원" | "카페" | "학원" | "프랜차이즈" | "기타">("기타");
  const [formTagline, setFormTagline] = useState("");
  const [formProblem, setFormProblem] = useState("");
  const [formStrategyText, setFormStrategyText] = useState(""); 
  const [formLogoText, setFormLogoText] = useState("");
  const [formColorsText, setFormColorsText] = useState(""); 
  const [formFontFamily, setFormFontFamily] = useState("");
  const [formFontDescription, setFormFontDescription] = useState("");
  const [formLayoutDesc, setFormLayoutDesc] = useState("");
  const [formImgBefore, setFormImgBefore] = useState("");
  const [formImgAfter, setFormImgAfter] = useState("");
  const [formImgBeforeLabel, setFormImgBeforeLabel] = useState("");
  const [formImgAfterLabel, setFormImgAfterLabel] = useState("");
  const [formAdditionalImages, setFormAdditionalImages] = useState<{ id: string; url: string; label: string }[]>([]);
  const [formResult, setFormResult] = useState("");
  const [formIsPremium, setFormIsPremium] = useState(false);
  const [formSplitViewer, setFormSplitViewer] = useState(false);
  const [formX, setFormX] = useState(50);
  const [formY, setFormY] = useState(50);

  // ==========================
  // [2] WORKFLOW STATES
  // ==========================
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null);
  const [isCreatingStep, setIsCreatingStep] = useState(false);

  const [wId, setWId] = useState(1);
  const [wTitle, setWTitle] = useState("");
  const [wSubtitle, setWSubtitle] = useState("");
  const [wDesc, setWDesc] = useState("");
  const [wDetailsText, setWDetailsText] = useState(""); 

  // ==========================
  // [3] TOOL SKILLS STATES
  // ==========================
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [isCreatingSkill, setIsCreatingSkill] = useState(false);

  const [sName, setSName] = useState("");
  const [sLevel, setSLevel] = useState(90);

  // ==========================
  // [4] CERTIFICATIONS STATES
  // ==========================
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);
  const [isCreatingCert, setIsCreatingCert] = useState(false);

  const [cTitle, setCTitle] = useState("");
  const [cOrganization, setCOrganization] = useState("");
  const [cDate, setCDate] = useState("");
  const [cCategory, setCCategory] = useState<"자격증" | "수상" | "교육이수">("자격증");

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "0610") {
      setIsAdmin(true);
      setErrorMsg("");
    } else {
      setErrorMsg("비밀번호가 올바르지 않습니다.");
    }
  };

  // ==========================
  // PROJECT UTILS
  // ==========================
  // Drag and drop reordering handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedProjectIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedProjectIndex === null || draggedProjectIndex === index) return;

    // Instantly slide and reorder projects during drag hover for a smooth fluid effect
    const updated = [...projects];
    const draggedItem = updated[draggedProjectIndex];
    
    updated.splice(draggedProjectIndex, 1);
    updated.splice(index, 0, draggedItem);

    // Propagate state right away
    setDraggedProjectIndex(index);
    onUpdateProjects(updated);
  };

  const handleDragEnd = () => {
    setDraggedProjectIndex(null);
  };

  const moveProjectUp = (index: number) => {
    if (index === 0) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onUpdateProjects(updated);
  };

  const moveProjectDown = (index: number) => {
    if (index === projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onUpdateProjects(updated);
  };

  const startEditProject = (p: Project) => {
    setEditingProject(p);
    setIsCreatingProject(false);
    setFormId(p.id);
    setFormTitle(p.title);
    setFormCategory(p.category);
    setFormTagline(p.tagline);
    setFormProblem(p.problem);
    setFormStrategyText(p.strategy.join("\n"));
    setFormLogoText(p.logoText || "");
    setFormColorsText(p.colors.map(c => `${c.hex}:${c.name}`).join("\n"));
    setFormFontFamily(p.fontFamily);
    setFormFontDescription(p.fontDescription);
    setFormLayoutDesc(p.layoutDesc);
    setFormImgBefore(p.imgBefore);
    setFormImgAfter(p.imgAfter);
    setFormImgBeforeLabel(p.imgBeforeLabel || "대표 이미지 2");
    setFormImgAfterLabel(p.imgAfterLabel || "대표 이미지 1");
    setFormAdditionalImages(p.additionalImages || []);
    setFormResult(p.result);
    setFormIsPremium(p.isPremium);
    setFormSplitViewer(p.splitViewerEnabled);
    setFormX(p.x);
    setFormY(p.y);
  };

  const startCreateProject = () => {
    setIsCreatingProject(true);
    setEditingProject(null);
    setFormId(`project-${Date.now()}`);
    setFormTitle("");
    setFormCategory("기타");
    setFormTagline("");
    setFormProblem("");
    setFormStrategyText("");
    setFormLogoText("");
    setFormColorsText("#07569b:Sign Blue\n#F1F5F9:Soft White");
    setFormFontFamily("Pretendard Bold");
    setFormFontDescription("");
    setFormLayoutDesc("");
    setFormImgBefore("https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80");
    setFormImgAfter("https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80");
    setFormImgBeforeLabel("대표 이미지 2");
    setFormImgAfterLabel("대표 이미지 1");
    setFormAdditionalImages([]);
    setFormResult("");
    setFormIsPremium(false);
    setFormSplitViewer(false);
    setFormX(Math.floor(Math.random() * 80) + 10);
    setFormY(Math.floor(Math.random() * 60) + 20);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("정말로 이 포트폴리오 프로젝트 항목을 삭제하시겠습니까?")) {
      const filtered = projects.filter(p => p.id !== id);
      onUpdateProjects(filtered);
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const strategy = formStrategyText.split("\n").map(l => l.trim()).filter(Boolean);
    const colors: ColorSwatch[] = formColorsText
      .split("\n")
      .map(line => {
        const parts = line.split(":");
        const hex = parts[0]?.trim() || "#CCCCCC";
        const name = parts[1]?.trim() || "Color Swatch";
        return { name, hex };
      })
      .filter(c => c.hex.startsWith("#"));

    const targetProject: Project = {
      id: formId,
      title: formTitle || "무제 프로젝트",
      category: formCategory,
      tagline: formTagline || "브랜드 사인의 새로운 제안",
      problem: formProblem || "문제정의가 등록되지 않았습니다.",
      strategy,
      logoText: formLogoText,
      colors,
      fontFamily: formFontFamily || "Pretendard",
      fontDescription: formFontDescription || "가독성 우선 매치",
      layoutDesc: formLayoutDesc || "보행 인지선 중심 1:1.6 비례 레이아웃",
      imgBefore: formImgBefore,
      imgAfter: formImgAfter,
      imgBeforeLabel: formImgBeforeLabel,
      imgAfterLabel: formImgAfterLabel,
      additionalImages: formAdditionalImages,
      result: formResult || "만족도 향상 완료.",
      isPremium: formIsPremium,
      splitViewerEnabled: formSplitViewer,
      x: Number(formX),
      y: Number(formY),
    };

    let updatedList: Project[] = [];
    if (isCreatingProject) {
      updatedList = [...projects, targetProject];
    } else {
      updatedList = projects.map(p => p.id === formId ? targetProject : p);
    }

    onUpdateProjects(updatedList);
    setEditingProject(null);
    setIsCreatingProject(false);
  };

  // ==========================
  // WORKFLOW MUTATIONS
  // ==========================
  const startEditStep = (s: WorkflowStep) => {
    setEditingStep(s);
    setIsCreatingStep(false);
    setWId(s.id);
    setWTitle(s.title);
    setWSubtitle(s.subtitle);
    setWDesc(s.desc);
    setWDetailsText(s.details.join("\n"));
  };

  const startCreateStep = () => {
    setIsCreatingStep(true);
    setEditingStep(null);
    const nextId = workflowSteps.length > 0 ? Math.max(...workflowSteps.map(s => s.id)) + 1 : 1;
    setWId(nextId);
    setWTitle("");
    setWSubtitle("");
    setWDesc("");
    setWDetailsText("");
  };

  const handleDeleteStep = (id: number) => {
    if (confirm("정말로 이 프로세스 단계를 삭제하시겠습니까?")) {
      const filtered = workflowSteps.filter(s => s.id !== id);
      // Re-index steps to keep clean stepping sequence
      const reindexed = filtered.map((item, idx) => ({
        ...item,
        id: idx + 1
      }));
      onUpdateWorkflow(reindexed);
      if (editingStep?.id === id) {
        setEditingStep(null);
      }
    }
  };

  const handleSaveStep = (e: React.FormEvent) => {
    e.preventDefault();
    const details = wDetailsText.split("\n").map(l => l.trim()).filter(Boolean);
    const targetStep: WorkflowStep = {
      id: wId,
      title: wTitle || "새 프로세스 공정",
      subtitle: wSubtitle || "PROCESS STEP SUBTITLE",
      desc: wDesc || "프로세스 단계별 상세 가이드가 전제됩니다.",
      details
    };

    let updatedList: WorkflowStep[] = [];
    if (isCreatingStep) {
      updatedList = [...workflowSteps, targetStep];
    } else {
      updatedList = workflowSteps.map(s => s.id === wId ? targetStep : s);
    }

    onUpdateWorkflow(updatedList);
    setEditingStep(null);
    setIsCreatingStep(false);
  };

  // ==========================
  // SKILLS MUTATIONS
  // ==========================
  const startEditSkill = (idx: number) => {
    setEditingSkillIndex(idx);
    setIsCreatingSkill(false);
    const s = toolSkills[idx];
    setSName(s.name);
    setSLevel(s.level);
  };

  const startCreateSkill = () => {
    setIsCreatingSkill(true);
    setEditingSkillIndex(null);
    setSName("");
    setSLevel(90);
  };

  const handleDeleteSkill = (idx: number) => {
    if (confirm("정말로 이 기술 성능 역량 항목을 삭제하시겠습니까?")) {
      const filtered = toolSkills.filter((_, i) => i !== idx);
      onUpdateSkills(filtered);
      if (editingSkillIndex === idx) {
        setEditingSkillIndex(null);
      }
    }
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSkill: ToolSkill = {
      name: sName || "새로운 실무 기술",
      level: Number(sLevel)
    };

    let updatedList: ToolSkill[] = [];
    if (isCreatingSkill) {
      updatedList = [...toolSkills, targetSkill];
    } else {
      updatedList = toolSkills.map((s, i) => i === editingSkillIndex ? targetSkill : s);
    }

    onUpdateSkills(updatedList);
    setEditingSkillIndex(null);
    setIsCreatingSkill(false);
  };

  // ==========================
  // CREDENTIALS MUTATIONS
  // ==========================
  const startEditCert = (idx: number) => {
    setEditingCertIndex(idx);
    setIsCreatingCert(false);
    const c = certs[idx];
    setCTitle(c.title);
    setCOrganization(c.organization);
    setCDate(c.date);
    setCCategory(c.category);
  };

  const startCreateCert = () => {
    setIsCreatingCert(true);
    setEditingCertIndex(null);
    setCTitle("");
    setCOrganization("");
    setCDate("");
    setCCategory("자격증");
  };

  const handleDeleteCert = (idx: number) => {
    if (confirm("정말로 이 자격 및 수상 이력 데이터를 삭제하시겠습니까?")) {
      const filtered = certs.filter((_, i) => i !== idx);
      onUpdateCerts(filtered);
      if (editingCertIndex === idx) {
        setEditingCertIndex(null);
      }
    }
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCert: Certification = {
      title: cTitle || "새 수상/자격 명목",
      organization: cOrganization || "발행 주관 기관",
      date: cDate || "2026.01",
      category: cCategory
    };

    let updatedList: Certification[] = [];
    if (isCreatingCert) {
      updatedList = [...certs, targetCert];
    } else {
      updatedList = certs.map((c, i) => i === editingCertIndex ? targetCert : c);
    }

    onUpdateCerts(updatedList);
    setEditingCertIndex(null);
    setIsCreatingCert(false);
  };

  return (
    <div className="w-full bg-zinc-950 border border-red-500/10 rounded-3xl p-6 md:p-8 mt-12 backdrop-blur-xl scroll-mt-24" id="admin-section">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-5 mb-6 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-red-400 font-mono text-xs uppercase tracking-widest mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              SYSTEM PORTFOLIO MANAGER
            </div>
            <h3 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
              실무자 전용 콘텐츠 관리 허브 (ADMIN)
            </h3>
          </div>
          
          {isAdmin && (
            <button 
              onClick={() => {
                if (confirm("모든 데이터를 지우고 초기의 예시 데이터로 롤백 복구하시겠습니까?")) {
                  onResetToDefault();
                  setEditingProject(null);
                  setEditingStep(null);
                  setEditingSkillIndex(null);
                  setEditingCertIndex(null);
                  setIsCreatingProject(false);
                  setIsCreatingStep(false);
                  setIsCreatingSkill(false);
                  setIsCreatingCert(false);
                }
              }}
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 데이터 전체 복원 (Sync Default)
            </button>
          )}
        </div>

        {/* SECURITY ACCESS GATE */}
        {!isAdmin ? (
          <div className="max-w-md mx-auto text-center py-10 bg-zinc-900/40 rounded-2xl border border-white/5 p-6 md:p-8">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-widest font-mono">ADMINISTRATOR AUTHORIZATION</h4>
            <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
              프로젝트 작품, 시공 프로세스 로드맵, 엔진 툴 역량 데이터를 실시간으로 동적 수정하려면 비밀번호를 입력해 승인하십시오.
            </p>

            <form onSubmit={handleLogin} className="mt-6 flex gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-red-500/50"
              />
              <button 
                type="submit"
                className="bg-red-950/80 border border-red-500/50 text-red-200 text-xs px-4 py-2 rounded-xl hover:bg-red-900 transition-all cursor-pointer"
              >
                접속 승인
              </button>
            </form>
            {errorMsg && <p className="text-red-400 font-mono text-[11px] mt-2 text-left sm:text-center">{errorMsg}</p>}
          </div>
        ) : (
          /* MANAGER INTERFACE */
          <div className="flex flex-col gap-6">
            
            {/* Nav Management Tabs */}
            <div className="flex flex-wrap gap-1 bg-zinc-900 p-1 rounded-xl border border-white/5 self-start text-xs font-bold">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "projects"
                    ? "bg-red-950/40 text-red-400 border border-red-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> 포트폴리오 작품 ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("workflow")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "workflow"
                    ? "bg-red-950/40 text-red-400 border border-red-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" /> 시공 프로세스 ({workflowSteps.length})
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "skills"
                    ? "bg-red-950/40 text-red-400 border border-red-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Hammer className="w-3.5 h-3.5" /> 엔지니어 툴 역량 ({toolSkills.length})
              </button>
              <button
                onClick={() => setActiveTab("certs")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "certs"
                    ? "bg-red-950/40 text-red-400 border border-red-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5" /> 자격 및 수상 이력 ({certs.length})
              </button>
            </div>

            {/* TAB [1]: PROJECTS EDITOR */}
            {activeTab === "projects" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Left list panel */}
                <div className="lg:col-span-4 bg-zinc-900/30 p-4 rounded-2xl border border-white/5 h-[450px] overflow-y-auto flex flex-col gap-3">
                  <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                    <span className="text-[11px] font-sans text-amber-500/90 font-bold uppercase tracking-tight">
                      포트폴리오 목록 (드래그 순서 변경)
                    </span>
                    <button 
                      onClick={startCreateProject}
                      className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-sans font-bold px-2 py-1 rounded-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> 새 작품 등록
                    </button>
                  </div>

                  {projects.map((p, idx) => {
                    const isActive = editingProject?.id === p.id;
                    const isBeingDragged = draggedProjectIndex === idx;
                    return (
                      <div 
                        key={p.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs select-none ${
                          isBeingDragged 
                            ? "opacity-40 border-amber-500/50 bg-amber-500/[0.04] scale-[0.98]" 
                            : isActive && !isCreatingProject
                              ? "bg-red-500/[0.04] border-red-500/40 text-red-400 font-bold" 
                              : "bg-zinc-950/40 border-white/5 text-zinc-300 hover:bg-zinc-800/20"
                        }`}
                      >
                        <div className="flex items-center flex-1 min-w-0 gap-1.5">
                          {/* Drag handle */}
                          <div 
                            title="마우스로 잡고 끌어다 순서 바꾸기"
                            className="p-1 -ml-1 text-zinc-650 hover:text-white cursor-grab active:cursor-grabbing flex-shrink-0"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>

                          <button 
                            onClick={() => startEditProject(p)}
                            type="button"
                            className="text-left font-sans flex-1 truncate pr-2 cursor-pointer focus:outline-none"
                          >
                            <p className="font-semibold truncate">{p.title}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{p.tagline}</p>
                          </button>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {/* Up arrow */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveProjectUp(idx);
                            }}
                            className={`p-1 transition-colors ${
                              idx === 0 
                                ? "text-zinc-800 cursor-not-allowed opacity-30" 
                                : "text-zinc-500 hover:text-amber-500"
                            }`}
                            disabled={idx === 0}
                            title="위로 이동"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Down arrow */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveProjectDown(idx);
                            }}
                            className={`p-1 transition-colors ${
                              idx === projects.length - 1 
                                ? "text-zinc-800 cursor-not-allowed opacity-30" 
                                : "text-zinc-500 hover:text-amber-500"
                            }`}
                            disabled={idx === projects.length - 1}
                            title="아래로 이동"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>

                          <button 
                            onClick={() => startEditProject(p)}
                            type="button"
                            className="text-zinc-500 hover:text-white p-1 ml-1"
                            title="수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(p.id)}
                            type="button"
                            className="text-zinc-650 hover:text-red-400 p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right form panel */}
                <div className="lg:col-span-8">
                  {(!editingProject && !isCreatingProject) ? (
                    <div className="h-[450px] flex flex-col items-center justify-center border border-dashed border-white/5 bg-zinc-900/10 rounded-2xl p-6 text-center text-zinc-500 text-xs">
                      <Edit3 className="w-8 h-8 opacity-25 mb-2" />
                      <p className="font-sans">좌측 리스트에서 [수정]을 클릭하거나 [새 작품 등록] 버튼을 눌러주세요.</p>
                      <p className="text-[10px] opacity-75 mt-0.5">데이터는 로컬 브라우저에 저장되어 재접속 시에도 완벽 유지됩니다.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-900/20 border border-white/5 p-5 md:p-6 rounded-2xl max-h-[500px] overflow-y-auto">
                      
                      <div className="sm:col-span-2 border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
                        <span className="text-xs font-mono text-red-400 font-bold uppercase">
                          {isCreatingProject ? "⚡ [신규 등록 시스템]" : `🛠️ [작품 편집] - ${formTitle}`}
                        </span>
                        <button 
                          type="submit"
                          className="bg-red-500 hover:bg-red-400 text-black font-semibold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer shadow-lg"
                        >
                          <Save className="w-3.5 h-3.5" /> 설정 저장 완료
                        </button>
                      </div>

                      {/* Category Input (Freeform) - ID is now auto-generated & hidden for better UX */}
                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">간판 구분 카탈로그 (자유 지정)</label>
                        <input 
                          type="text"
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                          placeholder="예: 태권도, 카페, 학원, 미용실, 식당 등 직접 입력"
                          required
                        />
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.from(new Set(projects.map(p => p.category).concat(["태권도", "병원", "카페", "학원", "프랜차이즈", "기타"]))).filter(Boolean).map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setFormCategory(cat)}
                              className={`text-[9px] font-sans px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                                formCategory === cat
                                  ? "bg-blue-600/20 border-blue-500 text-blue-400 font-semibold"
                                  : "bg-zinc-950 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">작품 섶 네임 (TITLE)</label>
                        <input 
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                          placeholder="강찬 태권도 브랜딩"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">대형 슬로건 (TAGLINE)</label>
                        <input 
                          type="text"
                          value={formTagline}
                          onChange={(e) => setFormTagline(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                          placeholder="학부모의 마음을 여는 안전하고 세련된 아이덴티티"
                        />
                      </div>

                      {/* Problem & Strategy */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">가장 고질적인 문제의 정의 (PROBLEM)</label>
                        <textarea 
                          value={formProblem}
                          onChange={(e) => setFormProblem(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 h-20 placeholder-zinc-700 font-sans"
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">구체적 설계 전략 (STRATEGY - 엔터단위 줄바꿈 입력)</label>
                        <textarea 
                          value={formStrategyText}
                          onChange={(e) => setFormStrategyText(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 h-24 placeholder-zinc-750 font-mono"
                        />
                      </div>

                      {/* Logo & Font */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">로고타입 인장 타이포</label>
                        <input 
                          type="text"
                          value={formLogoText}
                          onChange={(e) => setFormLogoText(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">사용 서체 (FONT FAMILY)</label>
                        <input 
                          type="text"
                          value={formFontFamily}
                          onChange={(e) => setFormFontFamily(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                        />
                      </div>

                      {/* Font Desc & Layout Desc */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">서체 도입 의도 기술</label>
                        <input 
                          type="text"
                          value={formFontDescription}
                          onChange={(e) => setFormFontDescription(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">골각 비율 및 레이아웃 설명</label>
                        <input 
                          type="text"
                          value={formLayoutDesc}
                          onChange={(e) => setFormLayoutDesc(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                        />
                      </div>

                      {/* Colors */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">색조 코드셋 정의 swatches (#코드:색상명 - 엔터단위 줄바꿈)</label>
                        <textarea 
                          value={formColorsText}
                          onChange={(e) => setFormColorsText(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 h-20 font-mono"
                        />
                      </div>

                      {/* Image URLs */}
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">대표 이미지 1 타이틀 (Label)</label>
                        <input 
                          type="text"
                          value={formImgAfterLabel}
                          onChange={(e) => setFormImgAfterLabel(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                          placeholder="대표 이미지 1"
                        />
                        <ImageUploadField 
                          label="대표 이미지 1 등록 (메인)"
                          value={formImgAfter}
                          onChange={setFormImgAfter}
                          onFileLoaded={setFormImgAfter}
                          id="file-after"
                          accentColorClass="text-[#07569b] font-bold"
                          borderColorClass="border-[#07569b]/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">대표 이미지 2 타이틀 (Label - 선택)</label>
                        <input 
                          type="text"
                          value={formImgBeforeLabel}
                          onChange={(e) => setFormImgBeforeLabel(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                          placeholder="대표 이미지 2"
                        />
                        <ImageUploadField 
                          label="대표 이미지 2 등록 (선택)"
                          value={formImgBefore}
                          onChange={setFormImgBefore}
                          onFileLoaded={setFormImgBefore}
                          id="file-before"
                          accentColorClass="text-zinc-400 font-bold"
                          borderColorClass="border-white/10"
                        />
                      </div>

                      {/* Additional Images Section */}
                      <div className="sm:col-span-2 border-t border-white/5 pt-4 mt-2 flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900/60 p-3 rounded-xl border border-white/5 gap-2">
                          <div>
                            <h5 className="text-xs font-bold text-amber-500 font-sans flex items-center gap-1">
                              📸 추가 작품 사진 정보 ({formAdditionalImages.length}개 추가됨)
                            </h5>
                            <p className="text-[10px] text-zinc-500 mt-0.5">상세 보기 화면에서 대형 갤러리 이미지로 전환 감상할 수 있습니다.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormAdditionalImages([
                                ...formAdditionalImages,
                                { id: `add-${Date.now()}-${Math.random()}`, url: "", label: `추가 이미지 ${formAdditionalImages.length + 1}` }
                              ]);
                            }}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer self-start sm:self-center"
                          >
                            <Plus className="w-3.5 h-3.5" /> 추가 이미지 슬롯 삽입
                          </button>
                        </div>

                        {formAdditionalImages.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-2 bg-zinc-950/40 rounded-xl border border-white/5">
                            {formAdditionalImages.map((img, index) => (
                              <div key={img.id} className="relative w-full bg-zinc-900 border border-white/5 p-3 rounded-xl flex flex-col gap-2 shadow-md">
                                <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1">
                                  <span className="text-[10px] font-mono font-bold text-blue-400"># {index + 1}번째 이미지</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormAdditionalImages(formAdditionalImages.filter(item => item.id !== img.id));
                                    }}
                                    className="text-red-400 hover:text-red-300 p-1"
                                    title="슬롯 제거"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">이미지 타이틀 / 설명</label>
                                  <input
                                    type="text"
                                    value={img.label}
                                    onChange={(e) => {
                                      const updated = [...formAdditionalImages];
                                      updated[index].label = e.target.value;
                                      setFormAdditionalImages(updated);
                                    }}
                                    className="bg-zinc-950 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-200"
                                    placeholder="예: 실내 정면 뷰"
                                    required
                                  />
                                </div>

                                <ImageUploadField
                                  label="사진 등록"
                                  value={img.url}
                                  onChange={(val) => {
                                    const updated = [...formAdditionalImages];
                                    updated[index].url = val;
                                    setFormAdditionalImages(updated);
                                  }}
                                  onFileLoaded={(base64) => {
                                    const updated = [...formAdditionalImages];
                                    updated[index].url = base64;
                                    setFormAdditionalImages(updated);
                                  }}
                                  id={`file-add-${img.id}`}
                                  accentColorClass="text-zinc-500"
                                  borderColorClass="border-zinc-800"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Result */}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">최종 시공 정량적 성과 (RESULT)</label>
                        <input 
                          type="text"
                          value={formResult}
                          onChange={(e) => setFormResult(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-350"
                        />
                      </div>

                      {/* Placement */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">도시 야경 X Position % (0~100)</label>
                        <input 
                          type="number"
                          value={formX}
                          onChange={(e) => setFormX(Number(e.target.value))}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-350 font-mono"
                          min="0"
                          max="100"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">도시 야경 Y Position % (0~100)</label>
                        <input 
                          type="number"
                          value={formY}
                          onChange={(e) => setFormY(Number(e.target.value))}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-350 font-mono"
                          min="0"
                          max="100"
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 mt-4 select-none cursor-pointer">
                        <input 
                          type="checkbox"
                          id="opt-premium"
                          checked={formIsPremium}
                          onChange={(e) => setFormIsPremium(e.target.checked)}
                          className="w-4 h-4 text-red-500 border-zinc-700 bg-zinc-950 rounded"
                        />
                        <label htmlFor="opt-premium" className="text-[11px] font-sans text-amber-500 font-semibold cursor-pointer">
                          🔒 최우수 핵심 작품 설정 (비번 차단 및 보안 락 게이트 탑재)
                        </label>
                      </div>

                      <div className="flex items-center gap-2 mt-4 select-none cursor-pointer">
                        <input 
                          type="checkbox"
                          id="opt-split"
                          checked={formSplitViewer}
                          onChange={(e) => setFormSplitViewer(e.target.checked)}
                          className="w-4 h-4 text-red-500 border-zinc-700 bg-zinc-950 rounded"
                        />
                        <label htmlFor="opt-split" className="text-[11px] font-sans text-amber-500 font-semibold cursor-pointer">
                          🧩 실시간 기하조각 144분할 벡터 마스킹 뷰어 적용 (우클릭 차단)
                        </label>
                      </div>

                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB [2]: WORKFLOW EDITOR */}
            {activeTab === "workflow" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Left list panel */}
                <div className="lg:col-span-4 bg-zinc-900/30 p-4 rounded-2xl border border-white/5 h-[450px] overflow-y-auto flex flex-col gap-3">
                  <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-zinc-400 font-semibold uppercase">시공 프로세스 목록</span>
                    <button 
                      onClick={startCreateStep}
                      className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-sans font-bold px-2 py-1 rounded-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> 새 단계 등록
                    </button>
                  </div>

                  {workflowSteps.map((s) => {
                    const isActive = editingStep?.id === s.id;
                    return (
                      <div 
                        key={s.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                          isActive && !isCreatingStep
                            ? "bg-red-500/[0.04] border-red-500/40 text-red-400 font-bold" 
                            : "bg-zinc-950/40 border-white/5 text-zinc-300 hover:bg-zinc-800/20"
                        }`}
                      >
                        <button 
                          onClick={() => startEditStep(s)}
                          className="text-left font-sans flex-1 truncate pr-2 cursor-pointer"
                        >
                          <p className="font-semibold truncate">Step 0{s.id}. {s.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{s.subtitle}</p>
                        </button>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => startEditStep(s)}
                            className="text-zinc-500 hover:text-white p-1"
                            title="수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStep(s.id)}
                            className="text-zinc-650 hover:text-red-400 p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right form panel */}
                <div className="lg:col-span-8">
                  {(!editingStep && !isCreatingStep) ? (
                    <div className="h-[450px] flex flex-col items-center justify-center border border-dashed border-white/5 bg-zinc-900/10 rounded-2xl p-6 text-center text-zinc-500 text-xs">
                      <Briefcase className="w-8 h-8 opacity-25 mb-2" />
                      <p className="font-sans">좌측 리스트에서 [수정]을 클릭하거나 [새 단계 등록] 버튼을 눌러주세요.</p>
                      <p className="text-[10px] opacity-75 mt-0.5">실시간 수정 사항이 메인 프로세스 로드맵 탭에 동신 연동됩니다.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveStep} className="flex flex-col gap-4 bg-zinc-900/20 border border-white/5 p-5 md:p-6 rounded-2xl h-[450px] overflow-y-auto">
                      
                      <div className="border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
                        <span className="text-xs font-mono text-red-400 font-bold uppercase font-bold">
                          {isCreatingStep ? "⚡ [신규 단계 등록]" : `🛠️ [프로세스 편집] - STEP 0${wId}`}
                        </span>
                        <button 
                          type="submit"
                          className="bg-red-500 hover:bg-red-400 text-black font-semibold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer shadow-lg"
                        >
                          <Save className="w-3.5 h-3.5" /> 설정 저장 완료
                        </button>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">공정 명칭 (TITLE)</label>
                          <input 
                            type="text"
                            value={wTitle}
                            onChange={(e) => setWTitle(e.target.value)}
                            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                            placeholder="예: 현장 레이저 실측 & 환경 분석"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">공정 영문 서브타이포 (SUBTITLE)</label>
                          <input 
                            type="text"
                            value={wSubtitle}
                            onChange={(e) => setWSubtitle(e.target.value)}
                            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                            placeholder="예: STREET ANALYSIS & LASER MEASUREMENT"
                          />
                        </div>
                      </div>

                      {/* Brief Description */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">공정 핵심 개요 요약 (DESCRIPTION)</label>
                        <textarea 
                          value={wDesc}
                          onChange={(e) => setWDesc(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 h-20 placeholder-zinc-700 font-sans"
                          placeholder="공정을 관통하는 메인 문맥 및 시방서 성분을 압축하여 작성하십시오."
                          required
                        />
                      </div>

                      {/* Checklist details (newline separated) */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">체크리스트 & 공정 실무 (줄바꿈당 1개씩 입력)</label>
                        <textarea 
                          value={wDetailsText}
                          onChange={(e) => setWDetailsText(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 h-28 placeholder-zinc-750 font-sans"
                          placeholder="초정밀 레이저 기반 반경 100m 시선 저해물질 완벽 추적 및 스캐닝&#10;자연광 가변 각도 분석&#10;옥외광고 심의 규정 선제 심의 검토"
                          required
                        />
                      </div>

                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB [3]: TOOL SKILLS EDITOR */}
            {activeTab === "skills" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Left list panel */}
                <div className="lg:col-span-4 bg-zinc-900/30 p-4 rounded-2xl border border-white/5 h-[400px] overflow-y-auto flex flex-col gap-3">
                  <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-zinc-400 font-semibold uppercase">엔지니어 역량 목록</span>
                    <button 
                      onClick={startCreateSkill}
                      className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-sans font-bold px-2 py-1 rounded-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> 새 기술 등록
                    </button>
                  </div>

                  {toolSkills.map((s, idx) => {
                    const isActive = editingSkillIndex === idx;
                    return (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                          isActive && !isCreatingSkill
                            ? "bg-red-500/[0.04] border-red-500/40 text-red-400 font-bold" 
                            : "bg-zinc-950/40 border-white/5 text-zinc-300 hover:bg-zinc-800/20"
                        }`}
                      >
                        <button 
                          onClick={() => startEditSkill(idx)}
                          className="text-left font-sans flex-1 truncate pr-2 cursor-pointer"
                        >
                          <p className="font-semibold truncate">{s.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">가독 인지율 백분위: {s.level}%</p>
                        </button>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => startEditSkill(idx)}
                            className="text-zinc-500 hover:text-white p-1"
                            title="수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteSkill(idx)}
                            className="text-zinc-650 hover:text-red-400 p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right form panel */}
                <div className="lg:col-span-8">
                  {(editingSkillIndex === null && !isCreatingSkill) ? (
                    <div className="h-[400px] flex flex-col items-center justify-center border border-dashed border-white/5 bg-zinc-900/10 rounded-2xl p-6 text-center text-zinc-500 text-xs">
                      <Hammer className="w-8 h-8 opacity-25 mb-2" />
                      <p className="font-sans">좌측 리스트에서 [수정]을 클릭하거나 [새 기술 등록] 버튼을 눌러주세요.</p>
                      <p className="text-[10px] opacity-75 mt-0.5">등록된 역량 백분위 게이지바가 즉각 메인 스킬창에 빌드됩니다.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveSkill} className="flex flex-col gap-4 bg-zinc-900/20 border border-white/5 p-5 md:p-6 rounded-2xl h-[400px] overflow-y-auto">
                      
                      <div className="border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
                        <span className="text-xs font-mono text-red-400 font-bold uppercase">
                          {isCreatingSkill ? "⚡ [신규 기술 등록]" : "🛠️ [실무 툴 역량 편집]"}
                        </span>
                        <button 
                          type="submit"
                          className="bg-red-500 hover:bg-red-400 text-black font-semibold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer shadow-lg"
                        >
                          <Save className="w-3.5 h-3.5" /> 설정 저장 완료
                        </button>
                      </div>

                      {/* Skill Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">실무 소프트웨어 / 기술 역량명</label>
                        <input 
                          type="text"
                          value={sName}
                          onChange={(e) => setSName(e.target.value)}
                          className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                          placeholder="예: AutoCAD / Fusion 360 (입체 도면 & 하중 설계)"
                          required
                        />
                      </div>

                      {/* Skill Level Gauge % */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">역량 숙련지수 가치 (%)</label>
                          <span className="text-xs font-mono text-red-400 font-black">{sLevel}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={sLevel}
                          onChange={(e) => setSLevel(Number(e.target.value))}
                          className="w-full accent-[#07569b] bg-zinc-800 h-1 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] font-mono text-zinc-650">
                          <span>0% (입문)</span>
                          <span>50% (시공 전형)</span>
                          <span>100% (장인 등급)</span>
                        </div>
                      </div>

                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB [4]: CERTIFICATIONS EDITOR */}
            {activeTab === "certs" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Left list panel */}
                <div className="lg:col-span-4 bg-zinc-900/30 p-4 rounded-2xl border border-white/5 h-[450px] overflow-y-auto flex flex-col gap-3">
                  <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-zinc-400 font-semibold uppercase">자격 및 수상이력 목록</span>
                    <button 
                      onClick={startCreateCert}
                      className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-sans font-bold px-2 py-1 rounded-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> 새 자격 등록
                    </button>
                  </div>

                  {certs.map((c, idx) => {
                    const isActive = editingCertIndex === idx;
                    return (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                          isActive && !isCreatingCert
                            ? "bg-red-500/[0.04] border-red-500/40 text-red-400 font-bold" 
                            : "bg-zinc-950/40 border-white/5 text-zinc-300 hover:bg-zinc-800/20"
                        }`}
                      >
                        <button 
                          onClick={() => startEditCert(idx)}
                          className="text-left font-sans flex-1 truncate pr-2 cursor-pointer"
                        >
                          <p className="font-semibold truncate">{c.title}</p>
                          <div className="flex gap-2 text-[10px] text-zinc-500 mt-0.5">
                            <span className="text-red-450 uppercase font-mono">{c.category}</span>
                            <span>•</span>
                            <span>{c.date}</span>
                          </div>
                        </button>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => startEditCert(idx)}
                            className="text-zinc-500 hover:text-white p-1"
                            title="수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCert(idx)}
                            className="text-zinc-650 hover:text-red-400 p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right form panel */}
                <div className="lg:col-span-8">
                  {(editingCertIndex === null && !isCreatingCert) ? (
                    <div className="h-[450px] flex flex-col items-center justify-center border border-dashed border-white/5 bg-zinc-900/10 rounded-2xl p-6 text-center text-zinc-500 text-xs">
                      <Award className="w-8 h-8 opacity-25 mb-2" />
                      <p className="font-sans">좌측 리스트에서 [수정]을 클릭하거나 [새 자격 등록] 버튼을 눌러주세요.</p>
                      <p className="text-[10px] opacity-75 mt-0.5">자격증, 수상내역, 전문 교육이수 등 모든 프로필이 연동 동기화됩니다.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveCert} className="flex flex-col gap-4 bg-zinc-900/20 border border-white/5 p-5 md:p-6 rounded-2xl h-[450px] overflow-y-auto w-full">
                      
                      <div className="border-b border-white/5 pb-2 mb-2 flex justify-between items-center">
                        <span className="text-xs font-mono text-red-400 font-bold uppercase">
                          {isCreatingCert ? "⚡ [신규 스펙 등록]" : "🛠️ [크레덴셜 스펙 편집]"}
                        </span>
                        <button 
                          type="submit"
                          className="bg-red-500 hover:bg-red-400 text-black font-semibold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer shadow-lg"
                        >
                          <Save className="w-3.5 h-3.5" /> 설정 저장 완료
                        </button>
                      </div>

                      {/* Title & Organization */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">인증 자격 / 공헌 명치 (TITLE)</label>
                          <input 
                            type="text"
                            value={cTitle}
                            onChange={(e) => setCTitle(e.target.value)}
                            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                            placeholder="예: 국가공인 옥외광고물관리사 취득"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">주관 및 라이선싱 소속 (ORGANIZATION)</label>
                          <input 
                            type="text"
                            value={cOrganization}
                            onChange={(e) => setCOrganization(e.target.value)}
                            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200"
                            placeholder="예: 한국옥외광고협회"
                            required
                          />
                        </div>
                      </div>

                      {/* Category & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">크레덴셜 구분</label>
                          <select 
                            value={cCategory}
                            onChange={(e) => setCCategory(e.target.value as any)}
                            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-350 focus:outline-none"
                          >
                            <option value="자격증">자격증</option>
                            <option value="수상">수상</option>
                            <option value="교육이수">교육이수</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold text-slate-400">발행 일자 (DATE)</label>
                          <input 
                            type="text"
                            value={cDate}
                            onChange={(e) => setCDate(e.target.value)}
                            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 font-mono"
                            placeholder="예: 2022.11"
                            required
                          />
                        </div>
                      </div>

                    </form>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
