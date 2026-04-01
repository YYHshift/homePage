import Database from "better-sqlite3";
import path from "node:path";

let db: Database.Database | null = null;

export const getDb = () => {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data", "resume.db");
    db = new Database(dbPath, { readonly: true, fileMustExist: true });
  }
  return db;
};
