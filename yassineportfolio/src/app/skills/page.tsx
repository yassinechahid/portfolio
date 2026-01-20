import { Metadata } from "next";
import SkillBar from "@/components/portfolio/SkillBar";
import StatCard from "@/components/portfolio/StatCard";
import { Award, Users, Code, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills - Yassine chahid",
  description:
    "Explore my technical skills and expertise in web and mobile development.",
};

export default function Skills() {
  const skillsByCategory = {
    Frontend: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "State Management", level: 88 },
    ],
    Backend: [
      { name: "Node.js/Express", level: 85 },
      { name: "GraphQL", level: 80 },
      { name: "API Design", level: 88 },
      { name: "Database Design", level: 82 },
      { name: "Authentication/Security", level: 85 },
    ],
    Mobile: [
      { name: "React Native", level: 80 },
      { name: "iOS Development", level: 75 },
      { name: "Android Development", level: 75 },
      { name: "Native Modules", level: 70 },
    ],
    Tools: [
      { name: "Git/GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "AWS/DevOps", level: 75 },
      { name: "Figma", level: 85 },
      { name: "CI/CD", level: 80 },
    ],
    Soft: [
      { name: "Team Leadership", level: 85 },
      { name: "Communication", level: 90 },
      { name: "Problem Solving", level: 92 },
      { name: "Project Management", level: 80 },
    ],
  };

  const stats = [
    {
      label: "Projects Completed",
      value: "50+",
      icon: <Code className="w-8 h-8" />,
    },
    {
      label: "Happy Clients",
      value: "30+",
      icon: <Users className="w-8 h-8" />,
    },
    {
      label: "Years Experience",
      value: "5+",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      label: "Awards & Recognition",
      value: "10+",
      icon: <Award className="w-8 h-8" />,
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
            A comprehensive overview of my technical expertise and proficiency
            levels across different domains of software development.
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
            Certifications & Learning
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                year: "2023",
              },
              {
                title: "Google UX Design Certificate",
                issuer: "Google / Coursera",
                year: "2022",
              },
              {
                title: "Full Stack Development Bootcamp",
                issuer: "Codecademy",
                year: "2021",
              },
              {
                title: "React Advanced Patterns",
                issuer: "Frontend Masters",
                year: "2023",
              },
            ].map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background hover:border-light-primary dark:hover:border-dark-primary transition-colors"
              >
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
