/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  strategy: string[];
  logoText?: string;
  logoUrl?: string; // fallback SVG or simple rendering configuration
  colors: ColorSwatch[];
  fontFamily: string;
  fontDescription: string;
  layoutDesc: string;
  imgBefore: string;
  imgAfter: string;
  imgBeforeLabel?: string; // custom title for before image
  imgAfterLabel?: string;  // custom title for after image
  additionalImages?: { id: string; url: string; label: string }[];
  detailImages?: { id: string; url: string; label: string }[];
  result: string;
  isPremium: boolean; // Locked behind premium access
  splitViewerEnabled: boolean; // Fragment partition viewer enabled for copyright protect
  x: number; // Night city interactive relative placement X (0-100)
  y: number; // Night city interactive relative placement Y (0-100)
}

export interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  details: string[];
}

export interface ToolSkill {
  name: string;
  level: number;
  badge?: string;
  desc?: string;
  tags?: string[];
}

export interface Certification {
  title: string;
  organization: string;
  date: string;
  category: "자격증" | "수상" | "교육이수";
}
