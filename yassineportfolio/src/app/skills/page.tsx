"use client";

import SkillBar from "@/components/portfolio/SkillBar";
import StatCard from "@/components/portfolio/StatCard";
import { Award, Users, Code, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Skills() {
  const { t } = useTranslation();
  const skillsByCategory = {
    [t("skills.categories.frontend")]: [
      { name: t("skills.skillNames.javascript"), level: 92 },
      { name: t("skills.skillNames.react"), level: 90 },
      { name: t("skills.skillNames.nextjs"), level: 88 },
      { name: t("skills.skillNames.tailwind"), level: 95 },
      { name: t("skills.skillNames.bootstrap"), level: 90 },
    ],
    [t("skills.categories.backend")]: [
      { name: t("skills.skillNames.laravel"), level: 88 },
      { name: t("skills.skillNames.php"), level: 85 },
      { name: t("skills.skillNames.mysql"), level: 90 },
      { name: t("skills.skillNames.appwrite"), level: 87 },
      { name: t("skills.skillNames.restfulApis"), level: 90 },
    ],
    [t("skills.categories.tools")]: [
      { name: t("skills.skillNames.git"), level: 92 },
      { name: t("skills.skillNames.vscode"), level: 95 },
      { name: t("skills.skillNames.postman"), level: 88 },
      { name: t("skills.skillNames.npm"), level: 90 },
    ],
    [t("skills.categories.soft")]: [
      { name: t("skills.skillNames.communication"), level: 90 },
      { name: t("skills.skillNames.problemSolving"), level: 92 },
      { name: t("skills.skillNames.teamCollaboration"), level: 88 },
      { name: t("skills.skillNames.englishLanguage"), level: 95 },
    ],
  };

  const stats = [
    {
      label: t("skills.stats.projectsBuilt"),
      value: t("skills.stats.projectsBuiltValue"),
      icon: <Code className="w-8 h-8" />,
    },
    {
      label: t("skills.stats.technologiesMastered"),
      value: "8+",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      label: t("skills.stats.yearsExperience"),
      value: "2+",
      icon: <Award className="w-8 h-8" />,
    },
    {
      label: t("skills.stats.educationalDegrees"),
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
            {t("skills.title")}
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            {t("skills.description")}
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
            {t("skills.education.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(
              t("skills.education.items", {
                returnObjects: true,
              }) as Record<
                string,
                { title: string; issuer: string; year: string }
              >,
            ).map((cert, idx) => (
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
