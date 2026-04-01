import type {
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/database";
import { getDb } from "./db";

const parseJsonArray = (payload: string | null): string[] => {
  if (!payload) return [];
  try {
    const parsed = JSON.parse(payload);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse JSON column", error);
    return [];
  }
};

export const getProfile = (): Profile => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM profile LIMIT 1").get() as Record
    string,
    unknown
  >;
  return {
    id: row.id as string,
    full_name: row.full_name as string,
    headline: (row.headline as string) ?? null,
    summary: (row.summary as string) ?? null,
    email: (row.email as string) ?? null,
    github_url: (row.github_url as string) ?? null,
    linkedin_url: (row.linkedin_url as string) ?? null,
    avatar_url: (row.avatar_url as string) ?? null,
  };
};

export const getEducation = (): Education[] => {
  const db = getDb();
  return db
    .prepare("SELECT * FROM education ORDER BY start_date DESC")
    .all() as Education[];
};

export const getExperiences = (): Experience[] => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM experience ORDER BY start_date DESC")
    .all() as Record<string, unknown>[];
  return rows.map(
    (item) =>
      ({
        ...item,
        description: parseJsonArray(item.description as string | null),
      }) as Experience,
  );
};

export const getProjects = (): Project[] => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM projects ORDER BY id ASC")
    .all() as Record<string, unknown>[];
  return rows.map(
    (item) =>
      ({
        ...item,
        description: parseJsonArray(item.description as string | null),
      }) as Project,
  );
};

export const getSkills = (): Skill[] => {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM skills ORDER BY category ASC, COALESCE(display_order, id) ASC",
    )
    .all() as Skill[];
};