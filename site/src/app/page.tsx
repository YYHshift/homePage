import HomePage from "@/components/HomePage";
import {
  getEducation,
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/resume";

export default function Home() {
  const profile = getProfile();
  const experiences = getExperiences();
  const education = getEducation();
  const projects = getProjects();
  const skills = getSkills();

  return (
    <HomePage
      profile={profile}
      experiences={experiences}
      education={education}
      projects={projects}
      skills={skills}
    />
  );
}
