// src/types/database.ts

// 个人档案
export interface Profile {
  id: string;
  full_name: string;
  headline: string | null;
  summary: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
}

// 工作经历
export interface Experience {
  id: number;
  position: string;
  company: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string[] | null;
}

// 教育背景
export interface Education {
  id: number;
  school: string;
  degree: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
}

// 项目经历
export interface Project {
  id: number;
  title: string;
  description: string[] | null;
  tech_stack: string | null;
  link_url: string | null;
  date_range: string | null;
}

// 技能矩阵
export interface Skill {
  id: number;
  category: string;
  skill_name: string;
  display_order?: number;
}
