import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Cpu,
  Share2,
} from "lucide-react";

import {
  getEducation,
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/resume";

const formatRange = (start: string | null, end: string | null) => {
  const parse = (value: string | null) => {
    if (!value) return null;
    const [year, month] = value.split("-").map(Number);
    return new Date(year, (month ?? 1) - 1).toLocaleString("en-AU", {
      month: "short",
      year: "numeric",
    });
  };

  const startLabel = parse(start) ?? "N/A";
  const endLabel = parse(end) ?? "Present";
  return `${startLabel} – ${endLabel}`;
};

const techList = (value: string | null) =>
  value
    ? value
        .split(/[·|,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

const skillClass = (category: string) => {
  switch (category) {
    case "Languages":
      return "bg-blue-500/20 border-blue-500/30 text-white";
    case "Frameworks":
      return "bg-cyan-500/15 border-cyan-500/30 text-cyan-100";
    case "Libraries":
      return "bg-purple-500/10 border-purple-500/25 text-purple-100";
    case "Tools":
      return "bg-emerald-500/10 border-emerald-500/25 text-emerald-100";
    default:
      return "bg-slate-500/10 border-slate-500/30 text-slate-200";
  }
};

export default function Home() {
  const profile = getProfile();
  const experiences = getExperiences();
  const education = getEducation();
  const projects = getProjects();
  const skills = getSkills();

  const contacts = [
    profile.github_url && {
      label: "GitHub",
      icon: <Code size={16} />,
      href: profile.github_url,
      tone: "outline" as const,
    },
    profile.linkedin_url && {
      label: "LinkedIn",
      icon: <Share2 size={16} />,
      href: profile.linkedin_url,
      tone: "accent" as const,
    },
    profile.email && {
      label: "Email",
      icon: <Mail size={16} />,
      href: `mailto:${profile.email}`,
      tone: "outline" as const,
    },
    {
      label: "Resume PDF",
      icon: <ExternalLink size={16} />,
      href: "/Yuhe_Yang_Resume.pdf",
      tone: "ghost" as const,
    },
  ].filter(Boolean) as {
    label: string;
    icon: ReactNode;
    href: string;
    tone: "outline" | "accent" | "ghost";
  }[];

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))] text-slate-100">
      <header className="w-full border-b border-white/5 bg-slate-950/60 px-6 py-8 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={profile.avatar_url ?? "/portrait.png"}
                alt={profile.full_name}
                fill
                sizes="120px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Perth, AU · Data & AI Engineer
              </p>
              <h1 className="mt-2 text-4xl font-bold text-white">
                {profile.full_name}
              </h1>
              <p className="mt-2 text-base text-slate-300">
                {profile.headline}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {contacts.map(({ label, icon, href, tone }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                      tone === "accent"
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : tone === "outline"
                          ? "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                          : "border border-white/10 bg-transparent text-slate-200 hover:bg-white/5"
                    }`}
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 md:w-1/3">
            {profile.summary}
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-10">
          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-xl bg-cyan-500/20 p-3 text-cyan-300">
                <Cpu size={20} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Technical Skills
                </h2>
                <p className="text-sm text-slate-400">
                  Categorised selection of languages, frameworks, and tools.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium ${skillClass(skill.category)}`}
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-xl bg-purple-500/20 p-3 text-purple-300">
                <Briefcase size={20} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Experience Timeline
                </h2>
                <p className="text-sm text-slate-400">
                  High-impact internships and consulting work.
                </p>
              </div>
            </div>
            <div className="relative border-l-2 border-white/10 pl-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pb-10">
                  <span className="absolute -left-[11px] mt-2 h-4 w-4 rounded-full border-2 border-slate-900 bg-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.6)]" />
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-200">
                        {formatRange(exp.start_date, exp.end_date)}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm text-slate-200">
                      {exp.description?.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-purple-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-xl bg-blue-500/20 p-3 text-blue-300">
                <Code size={20} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Featured Projects
                </h2>
                <p className="text-sm text-slate-400">
                  Products that combine AI, data pipelines, and UX polish.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {project.date_range}
                      </p>
                    </div>
                    {project.link_url && (
                      <Link
                        href={project.link_url}
                        target="_blank"
                        className="text-xs font-semibold text-blue-300 hover:underline"
                      >
                        View <ExternalLink className="inline h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {techList(project.tech_stack).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-200">
                      {project.description?.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-xl bg-teal-500/20 p-3 text-teal-300">
                <GraduationCap size={20} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">Education</h2>
                <p className="text-sm text-slate-400">
                  Academic foundations in computer science and IT.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-slate-400">{edu.degree}</p>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="rounded-full bg-teal-500/15 px-3 py-1 text-center text-xs font-semibold text-teal-200">
                      {formatRange(edu.start_date, edu.end_date)}
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1 text-slate-400 md:justify-end">
                      <MapPin size={14} /> {edu.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {profile.full_name}. Data source: data/resume.db
      </footer>
    </div>
  );
}
