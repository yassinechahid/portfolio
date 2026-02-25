import { Metadata } from "next";
import SkillBar from "@/components/portfolio/SkillBar";
import StatCard from "@/components/portfolio/StatCard";
import { Award, Users, Code, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills - Yassine Chahid",
  description:
    "Explore my technical skills in React, Next.js, Laravel, MySQL, and modern web development technologies.",
};

export default function Skills() {
  const skillsByCategory = {
    Frontend: [
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Bootstrap", level: 90 },
    ],
    Backend: [
      { name: "Laravel", level: 88 },
      { name: "PHP", level: 85 },
      { name: "MySQL", level: 90 },
      { name: "Appwrite BaaS", level: 87 },
      { name: "RESTful APIs", level: 90 },
    ],
    Tools: [
      { name: "Git/GitHub", level: 92 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 88 },
      { name: "npm/Composer", level: 90 },
    ],
    Soft: [
      { name: "Communication", level: 90 },
      { name: "Problem Solving", level: 92 },
      { name: "Team Collaboration", level: 88 },
      { name: "English Language", level: 95 },
    ],
  };

  const stats = [
    {
      label: "Projects Built",
      value: "Many",
      icon: <Code className="w-8 h-8" />,
    },
    {
      label: "Technologies Mastered",
      value: "8+",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      label: "Years Experience",
      value: "2+",
      icon: <Award className="w-8 h-8" />,
    },
    {
      label: "Educational Degrees",
      value: "2",
      icon: <Users className="w-8 h-8" />,
    },
  ];

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            My Skills
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            A comprehensive overview of my technical expertise across modern web
            development. I&apos;ve built many projects and applications using
            these technologies, constantly improving and learning new skills.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <h2 className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-8">
                  {category}
                </h2>
                <div className="space-y-6">
                  {skills.map((skill, idx) => (
                    <SkillBar key={idx} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-12 text-center">
            Education & Credentials
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Full-Stack Development Digital",
                issuer:
                  "OFPPT (Office de la Formation Professionnelle et de la Promotion du Travail)",
                year: "Diploma",
              },
              {
                title: "English Language Studies",
                issuer: "University",
                year: "License Degree",
              },
            ].map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background hover:border-light-primary dark:hover:border-dark-primary transition-colors">
                <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-2">
                  {cert.title}
                </h3>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-3">
                  {cert.issuer}
                </p>
                <p className="text-label-medium text-light-primary dark:text-dark-primary">
                  {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
