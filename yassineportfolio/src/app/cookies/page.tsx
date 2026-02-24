import React from "react";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer mb-6">
            <Cookie className="w-8 h-8 text-light-primary dark:text-dark-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
            Cookie Policy
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
                What Are Cookies
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                Cookies are small text files that are stored on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences and understanding how
                you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                How We Use Cookies
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                We use cookies for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-4">
                <li>Remembering your theme preferences (light/dark mode)</li>
                <li>Storing your language selection</li>
                <li>Analyzing site traffic and usage patterns</li>
                <li>Improving site functionality and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Types of Cookies We Use
              </h2>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-light-onBackground dark:text-dark-onBackground mb-2">
                    Essential Cookies
                  </h3>
                  <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                    These cookies are necessary for the website to function
                    properly and cannot be disabled in our systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light-onBackground dark:text-dark-onBackground mb-2">
                    Preference Cookies
                  </h3>
                  <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                    These cookies enable the website to remember your
                    preferences such as theme and language settings.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-light-onBackground dark:text-dark-onBackground mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Managing Cookies
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                You can control and manage cookies through your browser
                settings. Please note that removing or blocking cookies may
                impact your user experience and some features may no longer
                function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Contact Us
              </h2>
              <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
                If you have any questions about our use of cookies, please
                contact us at{" "}
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
