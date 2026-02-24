import { Metadata } from "next";
import ContactForm from "@/components/portfolio/ContactForm";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact - Yassine Chahid",
  description: "Get in touch with me for projects and collaborations.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Simple Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-display-medium md:text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
            Let&apos;s Work Together
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-2xl mx-auto">
            I&apos;m available for freelance work and full-time opportunities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info - 1 column */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh rounded-2xl p-6 border border-light-outlineVariant dark:border-dark-outlineVariant">
                <h3 className="text-title-medium font-semibold text-light-onSurface dark:text-dark-onSurface mb-4">
                  Contact Details
                </h3>

                <div className="space-y-4">
                  <a
                    href="mailto:chahidyassine14@gmail.com"
                    className="flex items-center gap-3 text-body-medium text-light-onSurface dark:text-dark-onSurface hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="break-all">chahidyassine14@gmail.com</span>
                  </a>

                  <a
                    href="tel:+212658188142"
                    className="flex items-center gap-3 text-body-medium text-light-onSurface dark:text-dark-onSurface hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>+212 658 188 142</span>
                  </a>

                  <div className="flex items-center gap-3 text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span>Morocco</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh rounded-2xl p-6 border border-light-outlineVariant dark:border-dark-outlineVariant">
                <h3 className="text-title-medium font-semibold text-light-onSurface dark:text-dark-onSurface mb-4">
                  Social
                </h3>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/yassinechahid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-light-surfaceContainer dark:bg-dark-surfaceContainer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-all"
                    aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yassine-chahid-15ab54354"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-light-surfaceContainer dark:bg-dark-surfaceContainer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-all"
                    aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/2vdUkvownfF8Ian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-light-surfaceContainer dark:bg-dark-surfaceContainer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-all"
                    aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:chahidyassine14@gmail.com"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-light-surfaceContainer dark:bg-dark-surfaceContainer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-all"
                    aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh rounded-2xl overflow-hidden border border-light-outlineVariant dark:border-dark-outlineVariant">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325599.0057385506!2d-8.675197!3d31.791702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafb3d41fcc5359%3A0xb899e1e0b0b0b0b!2sMorocco!5e0!3m2!1sen!2sma!4v1234567890"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
