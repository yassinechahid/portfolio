"use client";

import { Code, Zap, Layout, Rocket, Shield, Smartphone } from "lucide-react";
import ServiceCard from "@/components/portfolio/ServiceCard";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const services = [
    {
      title: t("about.services.service1.title"),
      description: t("about.services.service1.description"),
      icon: <Code className="w-8 h-8" />,
      features: Object.values(
        t("about.services.service1.features", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
    },
    {
      title: t("about.services.service2.title"),
      description: t("about.services.service2.description"),
      icon: <Rocket className="w-8 h-8" />,
      features: Object.values(
        t("about.services.service2.features", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
    },
    {
      title: t("about.services.service3.title"),
      description: t("about.services.service3.description"),
      icon: <Zap className="w-8 h-8" />,
      features: Object.values(
        t("about.services.service3.features", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
    },
    {
      title: t("about.services.service4.title"),
      description: t("about.services.service4.description"),
      icon: <Layout className="w-8 h-8" />,
      features: Object.values(
        t("about.services.service4.features", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
    },
    {
      title: t("about.services.service5.title"),
      description: t("about.services.service5.description"),
      icon: <Shield className="w-8 h-8" />,
      features: Object.values(
        t("about.services.service5.features", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
    },
    {
      title: t("about.services.service6.title"),
      description: t("about.services.service6.description"),
      icon: <Smartphone className="w-8 h-8" />,
      features: Object.values(
        t("about.services.service6.features", {
          returnObjects: true,
        }) as Record<string, string>,
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            {t("about.header.title")}
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            {t("about.header.intro")}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
              {t("about.journey.heading")}
            </h2>
            <div className="space-y-4 text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              <p>{t("about.journey.paragraph1")}</p>
              <p>{t("about.journey.paragraph2")}</p>
              <p>{t("about.journey.paragraph3")}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-light-primaryContainer to-light-secondaryContainer dark:from-dark-primaryContainer dark:to-dark-secondaryContainer p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-4">
                  {t("about.journey.experienceYears")}
                </div>
                <p className="text-body-large text-light-onBackground dark:text-dark-onBackground">
                  {t("about.journey.experienceLabel")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-12 text-center">
            {t("about.services.heading")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-12 text-center">
            {t("about.techStack.heading")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(
              t("about.techStack.technologies", {
                returnObjects: true,
              }) as Record<string, string>,
            ).map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-center text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground hover:border-light-primary dark:hover:border-dark-primary transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
