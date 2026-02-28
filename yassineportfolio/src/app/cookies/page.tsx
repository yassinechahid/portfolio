"use client";

import React from "react";
import { Cookie } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer mb-6">
            <Cookie className="w-8 h-8 text-light-primary dark:text-dark-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
            {t("cookies.title")}
          </h1>
          <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            {t("cookies.lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("cookies.whatAreCookies.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("cookies.whatAreCookies.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("cookies.howWeUseCookies.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("cookies.howWeUseCookies.intro")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-4">
                {Object.values(
                  t("cookies.howWeUseCookies.purposes", {
                    returnObjects: true,
                  }) as Record<string, string>,
                ).map((purpose, idx) => (
                  <li key={idx}>{purpose}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("cookies.typesOfCookies.heading")}
              </h2>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-light-onBackground dark:text-dark-onBackground mb-2">
                    {t("cookies.typesOfCookies.essential.title")}
                  </h3>
                  <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                    {t("cookies.typesOfCookies.essential.description")}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light-onBackground dark:text-dark-onBackground mb-2">
                    {t("cookies.typesOfCookies.preference.title")}
                  </h3>
                  <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                    {t("cookies.typesOfCookies.preference.description")}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light-onBackground dark:text-dark-onBackground mb-2">
                    {t("cookies.typesOfCookies.analytics.title")}
                  </h3>
                  <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                    {t("cookies.typesOfCookies.analytics.description")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("cookies.managingCookies.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("cookies.managingCookies.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("cookies.contactUs.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("cookies.contactUs.content")}{" "}
                <a
                  href="mailto:chahidyassine14@gmail.com"
                  className="text-light-primary dark:text-dark-primary hover:underline">
                  chahidyassine14@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
