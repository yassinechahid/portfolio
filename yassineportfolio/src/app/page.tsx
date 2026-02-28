"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import AnimatedText from "@/components/portfolio/AnimatedText";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const skills = [
    { name: t("home.skills.skillNames.nextjs"), level: 95 },
    { name: t("home.skills.skillNames.typescript"), level: 90 },
    { name: t("home.skills.skillNames.tailwind"), level: 95 },
  ];

  const projects = [
    {
      title: t("home.projects.project1.title"),
      description: t("home.projects.project1.description"),
      tags: Object.values(
        t("home.projects.project1.tags", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
      image: "/yassine/1.jpg",
    },
    {
      title: t("home.projects.project2.title"),
      description: t("home.projects.project2.description"),
      tags: Object.values(
        t("home.projects.project2.tags", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
      image: "/yassine/2.webp",
    },
    {
      title: t("home.projects.project3.title"),
      description: t("home.projects.project3.description"),
      tags: Object.values(
        t("home.projects.project3.tags", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
      image: "/yassine/3.jpg",
    },
  ];

  const stats = [
    {
      label: t("home.stats.projectsCompleted"),
      value: t("home.stats.projectsValue"),
    },
    {
      label: t("home.stats.happyClients"),
      value: t("home.stats.clientsValue"),
    },
    {
      label: t("home.stats.yearsExperience"),
      value: t("home.stats.experienceValue"),
    },
    {
      label: t("home.stats.openSourceRepos"),
      value: t("home.stats.reposValue"),
    },
  ];

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-label-medium">
                    {t("home.hero.badge")}
                  </span>
                </div>

                <h1 className="text-display-small md:text-display-medium lg:text-display-large text-light-onBackground dark:text-dark-onBackground font-bold leading-tight">
                  <AnimatedText
                    phrases={[
                      t("home.hero.animatedPhrases.phrase1"),
                      t("home.hero.animatedPhrases.phrase2"),
                      t("home.hero.animatedPhrases.phrase3"),
                    ]}
                    speed={80}
                    deleteSpeed={40}
                    delayBetweenPhrases={6500}
                    className="text-light-primary dark:text-dark-primary"
                  />
                </h1>

                <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-2xl">
                  {t("home.hero.intro")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-xl active:scale-95 transition-all duration-300 text-label-large font-medium">
                  {t("home.hero.startProject")}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary hover:bg-light-primaryContainer/30 dark:hover:bg-dark-primaryContainer/30 hover:border-light-primary dark:hover:border-dark-primary active:scale-95 transition-all duration-300 text-label-large font-medium">
                  {t("home.hero.viewWork")}
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://github.com/yassinechahid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-primaryContainer dark:hover:bg-dark-primaryContainer hover:text-light-primary dark:hover:text-dark-primary hover:scale-[1.05] transition-all duration-300 shadow-sm hover:shadow-md">
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yassine-chahid-15ab54354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-primaryContainer dark:hover:bg-dark-primaryContainer hover:text-light-primary dark:hover:text-dark-primary hover:scale-[1.05] transition-all duration-300 shadow-sm hover:shadow-md">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/2vdUkvownfF8Ian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-primaryContainer dark:hover:bg-dark-primaryContainer hover:text-light-primary dark:hover:text-dark-primary hover:scale-[1.05] transition-all duration-300 shadow-sm hover:shadow-md">
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="mailto:chahidyassine14@gmail.com"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-primaryContainer dark:hover:bg-dark-primaryContainer hover:text-light-primary dark:hover:text-dark-primary hover:scale-[1.05] transition-all duration-300 shadow-sm hover:shadow-md">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right Content - Hero Image/Visual */}
            <div className="relative mx-6">
              <div className="relative w-full aspect-square max-w-xs mx-auto">
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-light-primary/30 to-light-secondaryContainer/30 dark:from-dark-primary/30 dark:to-dark-secondaryContainer/30 blur-3xl" />

                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-visible border-2 border-light-outlineVariant dark:border-dark-outlineVariant shadow-2xl">
                  <Image
                    src="/assets/yassine.png"
                    alt={t("home.hero.imageAlt")}
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover rounded-3xl"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 md:p-8 rounded-3xl">
                    <div className="text-white">
                      <h3 className="text-base sm:text-lg md:text-headline-small font-bold mb-1 sm:mb-2">
                        {t("home.hero.name")}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-body-medium">
                        {t("home.hero.title")}
                      </p>
                    </div>
                  </div>

                  {/* Floating Badge - Top Right */}
                  <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-light-tertiaryContainer to-light-secondaryContainer dark:from-dark-tertiaryContainer dark:to-dark-secondaryContainer border border-light-outline dark:border-dark-outline xs:border-2 sm:border-2 md:border-2 shadow-lg p-1 xs:p-2 sm:p-3 md:p-4 flex items-center justify-center z-20">
                    <div className="text-center">
                      <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer leading-none">
                        2+
                      </div>
                      <p className="text-xs xs:text-label-small sm:text-label-small md:text-label-small text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer">
                        {t("home.hero.yearsLabel")}
                      </p>
                    </div>
                  </div>

                  {/* Floating Badge - Bottom Right */}
                  <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-light-primaryContainer to-light-primary dark:from-dark-primaryContainer dark:to-dark-primary border border-light-outline dark:border-dark-outline xs:border-2 sm:border-2 md:border-2 shadow-lg p-1 xs:p-2 sm:p-3 md:p-3 flex items-center justify-center z-20">
                    <Sparkles className="w-full h-full text-light-onPrimary dark:text-dark-onPrimary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLowest dark:bg-dark-surfaceContainerLowest">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group h-full">
                <div className="aspect-square p-6 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-outline/20 dark:border-dark-outline/20 group-hover:border-light-primary/50 dark:group-hover:border-dark-primary/50 transition-all duration-300 group-hover:shadow-lg flex flex-col items-center justify-center">
                  <div className="text-display-small text-light-primary dark:text-dark-primary font-bold">
                    {stat.value}
                  </div>
                  <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-headline-large text-light-onBackground dark:text-dark-onBackground font-bold mb-4">
              {t("home.skills.heading")}
            </h2>
            <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl mx-auto">
              {t("home.skills.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow border border-light-outlineVariant dark:border-dark-outlineVariant hover:border-light-primary/50 dark:hover:border-dark-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-body-large text-light-onSurface dark:text-dark-onSurface font-medium">
                    {skill.name}
                  </span>
                  <span className="text-label-large text-light-primary dark:text-dark-primary font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-light-surfaceVariant dark:bg-dark-surfaceVariant overflow-hidden shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-light-primary to-light-primary/80 dark:from-dark-primary dark:to-dark-primary/80 transition-all duration-1000 shadow-sm"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLowest dark:bg-dark-surfaceContainerLowest">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-headline-large text-light-onBackground dark:text-dark-onBackground font-bold mb-4">
                {t("home.projects.heading")}
              </h2>
              <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                {t("home.projects.subheading")}
              </p>
            </div>
            <Link
              href="/projects"
              className="text-label-large text-light-primary dark:text-dark-primary hover:underline">
              {t("home.projects.viewAll")}
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-video bg-gradient-to-br from-light-primaryContainer/30 to-light-surfaceContainer/30 dark:from-dark-primaryContainer/30 dark:to-dark-surfaceContainer/30 relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-label-large text-white font-semibold flex items-center gap-2">
                      {t("home.projects.viewCaseStudy")}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <h3 className="text-headline-small text-light-onBackground dark:text-dark-onBackground font-semibold mb-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 rounded-full text-label-small bg-light-secondaryContainer dark:bg-dark-secondaryContainer text-light-onSecondaryContainer dark:text-dark-onSecondaryContainer font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-light-primary/20 via-light-secondaryContainer/20 to-light-primary/20 dark:from-dark-primary/20 dark:via-dark-secondaryContainer/20 dark:to-dark-primary/20 rounded-3xl blur-3xl" />

            <div className="relative rounded-3xl p-12 border-2 border-light-outlineVariant dark:border-dark-outlineVariant bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primaryContainer/50 dark:bg-dark-primaryContainer/50 text-light-primary dark:text-dark-primary mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="text-label-large font-semibold">
                  {t("home.cta.badge")}
                </span>
              </div>

              <h2 className="text-headline-large text-light-onBackground dark:text-dark-onBackground font-bold mb-6">
                {t("home.cta.heading")}
              </h2>

              <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("home.cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-xl active:scale-95 transition-all duration-300 text-label-large font-semibold">
                  {t("home.cta.getInTouch")}
                  <Mail className="w-5 h-5" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary hover:bg-light-primaryContainer/30 dark:hover:bg-dark-primaryContainer/30 hover:border-light-primary dark:hover:border-dark-primary active:scale-95 transition-all duration-300 text-label-large font-medium">
                  {t("home.cta.learnMore")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
