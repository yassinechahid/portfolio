"use client";

import ProjectCard from "@/components/portfolio/ProjectCard";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  const projectsData = [
    {
      tags: ["React", "Laravel", "Tailwind CSS"],
      image: "/yassine/1.jpg",
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/yassine-chahid/ecommerce",
    },
    {
      tags: ["React", "Node.js", "Appwrite", "TypeScript"],
      image: "/images/myPortfolio.png",
      liveUrl: "https://portfolio-chahid.vercel.app/",
      githubUrl: "https://github.com/yassine-chahid/ai-content",
    },
    {
      tags: ["Next.js", "React", "Node.js"],
      image: "/images/food.png",
      liveUrl: "https://food-dusky-six.vercel.app/",
      githubUrl: "https://github.com/yassine-chahid/analytics",
    },
    {
      tags: ["Next.js", "tailwind CSS", "TypeScript"],
      image: "/images/medcins.png",
      liveUrl: "https://montoubib.com/",
      githubUrl: "this built for a company and the code is private",
    },
    {
      tags: ["Next.js", "tailwind CSS", "TypeScript"],
      image: "/images/transport.png",
      liveUrl: "https://horizonatlstours.com/",
      githubUrl: "this built for a company and the code is private",
    },
    {
      tags: ["Next.js", "Node.js", "css", "TypeScript"],
      image: "/yassine/6.jpg",
      liveUrl: "https://social-dashboard.io",
      githubUrl: "https://github.com/yassine-chahid/social-dash",
    },
  ];

  const projectsItems = t("projects.items", {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  const projects = projectsData.map((data, idx) => ({
    title: projectsItems[idx].title,
    description: projectsItems[idx].description,
    ...data,
  }));

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            {t("projects.title")}
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            {t("projects.description")}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {projects.map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-primaryContainer dark:bg-dark-primaryContainer">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-headline-large font-bold text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer mb-4">
            {t("projects.cta.heading")}
          </h2>
          <p className="text-body-large text-light-onPrimaryContainer/80 dark:text-dark-onPrimaryContainer/80 mb-8">
            {t("projects.cta.description")}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-large font-medium">
            {t("projects.cta.button")}
          </a>
        </div>
      </section>
    </main>
  );
}
