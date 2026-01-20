import { Metadata } from "next";
import ContactForm from "@/components/portfolio/ContactForm";

export const metadata: Metadata = {
  title: "Contact Me - Yassine chahid",
  description:
    "Get in touch with me for projects, collaborations, or inquiries.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just
            want to say hello, I&apos;d love to hear from you. Feel free to
            reach out!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            Response Time
          </h2>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            I typically respond to inquiries within 24 hours. For urgent
            matters, you can also reach me via phone or LinkedIn.
          </p>
        </div>
      </section>
    </main>
  );
}
