import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import initSqlJs from "sql.js";

const profile = {
  id: "yuhe-yang",
  full_name: "Yuhe (Stewie) Yang",
  headline: "Data & AI Engineer",
  summary:
    "Data-driven engineer delivering end-to-end products across Next.js, FastAPI, and Supabase with deep experience in clinical data platforms and enterprise AI systems.",
  email: "yyh-shift@outlook.com",
  github_url: "https://github.com/YYHshift",
  linkedin_url: "https://www.linkedin.com/in/stewieyang",
  avatar_url: "/portrait.png",
};

const education = [
  {
    id: 1,
    school: "The University of Western Australia",
    degree: "Master of Information Technology",
    location: "Perth, WA",
    start_date: "2024-07",
    end_date: "2026-07",
  },
  {
    id: 2,
    school: "Hubei University of Automotive Technology",
    degree: "Bachelor of Computer Science and Technology",
    location: "Hubei, China",
    start_date: "2020-09",
    end_date: "2024-06",
  },
];

const experiences = [
  {
    id: 1,
    position: "Digital Health Data Analyst (Intern)",
    company: "Cancer Network WA, North Metropolitan Health Service",
    location: "Perth, WA",
    start_date: "2025-10",
    end_date: "2025-12",
    description: [
      "Architected and deployed a Microsoft Lists + SharePoint clinical tracking platform with a 52+ attribute relational model (Regimen, ECOG, Risk Flags), achieving full digitisation of patient referrals.",
      "Consolidated MOSAIQ, EPISOFT, and SCGH Admin sources into a single source of truth, eliminating redundancy and reducing manual tracking latency by 40%.",
      "Implemented automated workflow governance with five dynamic dashboard views (Active Referrals, Need NP Action, Upcoming Home Visits) and conditional logic, improving team coordination by 35%.",
      "Built clinical risk-flagging algorithms for six critical indicators (e.g., Infection Risk, Falls Risk, ECOG ≥ 3) to enable proactive intervention and zero compliance breaches.",
      "Mapped the cross-institution SCGH-NP-Chemo@home process in Visio, surfacing three triage bottlenecks and aligning information flow with ABF/WIES funding models.",
      "Established field-level validation (e.g., URN/Referral Date checks) plus a taxonomy covering 414+ object categories, cutting data-entry errors by 25% during the pilot.",
      "Produced ER diagrams, data dictionaries, and user manuals to support statewide scalability and onboarding.",
      "Defined KPI dashboards tracking Acceptance Rate and Time-to-Treatment, feeding executive steering insights for HSP-wide evaluations.",
    ],
  },
  {
    id: 2,
    position: "Program Developer (Intern)",
    company: "Wuhan Yinsi Borui Technology Co., Ltd",
    location: "Wuhan, China",
    start_date: "2024-02",
    end_date: "2024-06",
    description: [
      "Developed internal tooling in Java and contributed responsive HTML/CSS frontends.",
      "Created and executed structured QA test procedures to validate features and isolate defects.",
      "Leveraged SQL to extract, cleanse, and simulate datasets for feature testing scenarios.",
    ],
  },
];

const projects = [
  {
    id: 1,
    title: "LangMap · Vision-Language Navigation Benchmark",
    description: [
      "Co-engineered the Ground Truth (GT) pipeline for a large-scale embodied AI benchmark, generating high-fidelity semantic annotations for 36 HM3D environments to address hallucinations in VLM-generated datasets such as GOAT-Bench.",
      "Executed a contrastive semantic annotation protocol that produced 7,230+ discriminative instance descriptions across 414 object categories, ensuring linguistic uniqueness for fine-grained navigation tasks.",
      "Integrated f3d (Fast 3D Viewer) into the validation workflow to inspect mesh geometries and occlusions, verifying 890+ region-level boundaries and improving Sim-to-Real consistency.",
      "Engineered structured JSON metadata schemas (Scene → Room → Region → Instance) that automated the creation of 18,000+ navigation-instruction tasks.",
      "Spearheaded the semantic QA loop with dual verification between language cues and 3D visuals, yielding higher discriminative accuracy than baseline benchmarks.",
      "Refined the hierarchical object taxonomy by resolving ambiguous long-tail categories (e.g., yoga mat vs. gym mat), strengthening support for long-tail navigation research.",
    ],
    tech_stack: "Python, JSON, 3D Data Processing",
    link_url: "https://cvpr.thecvf.com/",
    date_range: "Jun 2025 – Nov 2025",
  },
  {
    id: 2,
    title: "Global AI Job Market & Salary Trends 2025",
    description: [
      "Architected an enterprise-grade ELT pipeline with Power Query to ingest and standardise 15,000+ job records from 20+ countries, enforcing currency normalisation and schema validation for global consistency.",
      "Designed a star-schema model with fact tables for job listings and optimised dimensions (Country, Company, Skills), reducing complex aggregation latency by 40%.",
      "Engineered advanced DAX calculations for multi-dimensional metrics such as salary-to-benefit ratios and time-series forecasts, uncovering a 35% surge in remote AI roles.",
      "Delivered strategic insights that quantified a 40% dominance in senior-level demand and measured the GenAI adoption effect on hiring trends.",
      "Built an interactive Power BI dashboard with slicers and drill-through, enabling benchmarking of salary offerings against cost-of-living indices across 50+ regions.",
    ],
    tech_stack: "Power BI, DAX, Power Query, Enterprise ELT, Star Schema",
    link_url: "https://github.com/YYHshift/global-ai-job-market-2025",
    date_range: "Jun 2025 – Sep 2025",
  },
  {
    id: 3,
    title: "Smart Course Selection Tool",
    description: [
      "Engineered a conflict-detection algorithm in Python to automate scheduling against complex CSV course datasets, resolving 80% of clashes without manual intervention.",
      "Designed a normalised SQLite schema with targeted indexing, reducing timetable retrieval latency by 40% under simulated high-concurrency workloads.",
      "Developed a Flask-based RESTful API with a resilient ingestion pipeline that validated and transformed raw course data while maintaining 100% integrity.",
      "Championed TDD with 50+ pytest suites that ensured 99.9% stability across conflict-checking modules.",
    ],
    tech_stack: "Python, Flask, SQLite, Pandas, Pytest, RESTful API",
    link_url: "https://github.com/Xin-Wang1/2025-CITS5505-Agile-Web-Dev",
    date_range: "Mar 2025 – May 2025",
  },
  {
    id: 4,
    title: "Computational Data Analysis Project",
    description: [
      "Built a robust ETL pipeline with Tidyverse for the Adult Census Income dataset (32k+ rows), adding advanced imputation and categorical encoding for full analysis readiness.",
      "Trained Decision Tree and Naive Bayes classifiers with ROSE balancing to boost sensitivity by 15% for income forecast tasks.",
      "Optimised models via 10-fold cross-validation and CP pruning, achieving >0.85 AUC-ROC and strong generalisation on hold-out tests.",
      "Applied K-Means clustering with the elbow method (k=3) to surface hidden socio-economic segments.",
      "Delivered an R Shiny analytics app with reactive ggplot2 visuals and configurable inputs so stakeholders could simulate scenarios in real time.",
      "Performed deep EDA that highlighted correlations such as Capital Gain vs. Education Level, informing socio-economic policy discussions.",
    ],
    tech_stack: "R, Shiny, Tidyverse, Caret, ROSE, Unsupervised Learning",
    link_url: null,
    date_range: "Aug 2024 – Nov 2024",
  },
  {
    id: 5,
    title: "JobPilot · Enterprise AI Job Intelligence Platform",
    description: [
      "Designed a hybrid edge/cloud architecture that separated Selenium ingestion clusters from the Vercel/Render presentation tier, sustaining 99.9% uptime while bypassing cloud memory ceilings.",
      "Built an LLM-powered ETL pipeline using Google Gemini 1.5 Flash to normalise tech stacks, salary bands, and seniority levels with 95% accuracy.",
      "Developed asynchronous FastAPI services with Pydantic and Supabase that cut complex aggregation latency by 60% through careful indexing and SQL view optimisation.",
      "Shipped a high-fidelity Next.js 14 SSR dashboard with Recharts visualisations, client-side caching, and responsive UX for large datasets.",
      "Orchestrated CI/CD across Vercel and Render with strict environment-variable governance to safeguard ingestion credentials and keep Python + cloud layers in sync.",
    ],
    tech_stack:
      "Next.js 14 (SSR), FastAPI, Google Gemini 1.5, Selenium Grid, Supabase (PostgreSQL), CI/CD",
    link_url: "https://jobpilot-h1ih.vercel.app",
    date_range: "Jan 2026 – Mar 2026",
  },
];

const skills = [
  { id: 1, category: "Languages", skill_name: "Python", display_order: 1 },
  { id: 2, category: "Languages", skill_name: "TypeScript", display_order: 2 },
  { id: 3, category: "Languages", skill_name: "SQL", display_order: 3 },
  { id: 4, category: "Frameworks", skill_name: "Next.js", display_order: 1 },
  { id: 5, category: "Frameworks", skill_name: "FastAPI", display_order: 2 },
  { id: 6, category: "Frameworks", skill_name: "Spring Boot", display_order: 3 },
  { id: 7, category: "Cloud & Platforms", skill_name: "Supabase", display_order: 1 },
  { id: 8, category: "Cloud & Platforms", skill_name: "Vercel", display_order: 2 },
  { id: 9, category: "Cloud & Platforms", skill_name: "Render", display_order: 3 },
  { id: 10, category: "Libraries", skill_name: "Selenium", display_order: 1 },
  { id: 11, category: "Libraries", skill_name: "pandas", display_order: 2 },
  { id: 12, category: "Libraries", skill_name: "Pydantic", display_order: 3 },
  { id: 13, category: "Tools", skill_name: "GitHub Actions", display_order: 1 },
  { id: 14, category: "Tools", skill_name: "Docker", display_order: 2 },
  { id: 15, category: "Tools", skill_name: "Power BI", display_order: 3 },
];

const schemaSQL = `
  CREATE TABLE profile (
    id TEXT PRIMARY KEY,
    full_name TEXT,
    headline TEXT,
    summary TEXT,
    email TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    avatar_url TEXT
  );
  CREATE TABLE education (
    id INTEGER PRIMARY KEY,
    school TEXT,
    degree TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT
  );
  CREATE TABLE experience (
    id INTEGER PRIMARY KEY,
    position TEXT,
    company TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT
  );
  CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    tech_stack TEXT,
    link_url TEXT,
    date_range TEXT
  );
  CREATE TABLE skills (
    id INTEGER PRIMARY KEY,
    category TEXT,
    skill_name TEXT,
    display_order INTEGER
  );
`;

const locateFile = (file) =>
  path.join("node_modules", "sql.js", "dist", file);

const SQL = await initSqlJs({ locateFile });
const db = new SQL.Database();
db.run(schemaSQL);

db.run(
  `INSERT INTO profile (id, full_name, headline, summary, email, github_url, linkedin_url, avatar_url)
   VALUES ($id, $full_name, $headline, $summary, $email, $github_url, $linkedin_url, $avatar_url)`,
  {
    $id: profile.id,
    $full_name: profile.full_name,
    $headline: profile.headline,
    $summary: profile.summary,
    $email: profile.email,
    $github_url: profile.github_url,
    $linkedin_url: profile.linkedin_url,
    $avatar_url: profile.avatar_url,
  },
);

for (const edu of education) {
  db.run(
    `INSERT INTO education (id, school, degree, location, start_date, end_date)
     VALUES ($id, $school, $degree, $location, $start_date, $end_date)`,
    {
      $id: edu.id,
      $school: edu.school,
      $degree: edu.degree,
      $location: edu.location,
      $start_date: edu.start_date,
      $end_date: edu.end_date,
    },
  );
}

for (const exp of experiences) {
  db.run(
    `INSERT INTO experience (id, position, company, location, start_date, end_date, description)
     VALUES ($id, $position, $company, $location, $start_date, $end_date, $description)`,
    {
      $id: exp.id,
      $position: exp.position,
      $company: exp.company,
      $location: exp.location,
      $start_date: exp.start_date,
      $end_date: exp.end_date,
      $description: JSON.stringify(exp.description, null, 2),
    },
  );
}

for (const project of projects) {
  db.run(
    `INSERT INTO projects (id, title, description, tech_stack, link_url, date_range)
     VALUES ($id, $title, $description, $tech_stack, $link_url, $date_range)`,
    {
      $id: project.id,
      $title: project.title,
      $description: JSON.stringify(project.description, null, 2),
      $tech_stack: project.tech_stack,
      $link_url: project.link_url,
      $date_range: project.date_range,
    },
  );
}

for (const skill of skills) {
  db.run(
    `INSERT INTO skills (id, category, skill_name, display_order)
     VALUES ($id, $category, $skill_name, $display_order)`,
    {
      $id: skill.id,
      $category: skill.category,
      $skill_name: skill.skill_name,
      $display_order: skill.display_order,
    },
  );
}

const bytes = db.export();
const outPath = path.join(process.cwd(), "data", "resume.db");
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.from(bytes));
console.log(`SQLite database written to ${outPath}`);
