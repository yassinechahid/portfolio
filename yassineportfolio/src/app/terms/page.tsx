"use client";

import React from "react";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12 mt-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer mb-6">
            <FileText className="w-8 h-8 text-light-primary dark:text-dark-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
            {t("terms.title")}
          </h1>
          <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            {t("terms.lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("terms.useOfService.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("terms.useOfService.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("terms.intellectualProperty.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("terms.intellectualProperty.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("terms.limitationOfLiability.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("terms.limitationOfLiability.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("terms.externalLinks.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("terms.externalLinks.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("terms.changesToTerms.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("terms.changesToTerms.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                {t("terms.contact.heading")}
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                {t("terms.contact.content")}{" "}
                <a
                  href="mailto:chahidyc15@gmail.com"
                  className="text-light-primary dark:text-dark-primary hover:underline">
                  chahidyc15@gmail.com
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
