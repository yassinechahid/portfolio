import React from "react";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12 mt-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer mb-6">
            <FileText className="w-8 h-8 text-light-primary dark:text-dark-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
            Terms of Service
          </h1>
          <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            Last updated: February 24, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Use of Service
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                By accessing and using this website, you accept and agree to be
                bound by the terms and provisions of this agreement. The content
                of this portfolio website is for your general information and
                use only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Intellectual Property
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                All content, designs, code, and materials on this website are
                the intellectual property of Yassine Chahid unless otherwise
                stated. You may not reproduce, distribute, or create derivative
                works without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Limitation of Liability
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                This website is provided {"as is"} without any representations
                or warranties. We shall not be liable for any damages arising
                from the use of this website or the information contained
                herein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                External Links
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                This website may contain links to external websites. We are not
                responsible for the content or practices of these external sites
                and do not endorse them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Changes to Terms
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                We reserve the right to modify these terms at any time. Your
                continued use of the website following any changes constitutes
                acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Contact
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                For any questions regarding these terms, please contact us at{" "}
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
