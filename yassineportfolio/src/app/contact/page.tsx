import { Metadata } from "next";
import ContactForm from "@/components/portfolio/ContactForm";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Me - Yassine chahid",
  description:
    "Get in touch with me for projects, collaborations, or inquiries.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
              Get in Touch
            </h1>
            <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl mx-auto">
              Have a question or project in mind? I&apos;d love to hear from
              you. Send me a message and I&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Right Column - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground">
                Contact Information
              </h2>

              {/* Email */}
              <div className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-light-primary dark:text-dark-primary mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                      Email
                    </p>
                    <a
                      href="mailto:chahidyassine14@gmail.com"
                      className="text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground hover:text-light-primary dark:hover:text-dark-primary transition-colors break-all"
                    >
                      chahidyassine14@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-light-primary dark:text-dark-primary mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                      Phone
                    </p>
                    <a
                      href="tel:+212658188142"
                      className="text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                    >
                      +212 658 188 142
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
                <div className="flex items-start gap-3">
                  <div className="text-light-primary dark:text-dark-primary mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                      Location
                    </p>
                    <p className="text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground">
                      Morocco
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
                <div className="flex items-start gap-3">
                  <div className="text-light-primary dark:text-dark-primary mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                      Response Time
                    </p>
                    <p className="text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-light-outline dark:border-dark-outline shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325599.0057385506!2d-8.675197!3d31.791702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafb3d41fcc5359%3A0xb899e1e0b0b0b0b!2sMorocco!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
              <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
                Follow Me
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://portfolio-chahid.vercel.app/"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-outline dark:border-dark-outline hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-colors text-body-small font-medium"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-outline dark:border-dark-outline hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-colors text-body-small font-medium"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-outline dark:border-dark-outline hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-colors text-body-small font-medium"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-outline dark:border-dark-outline hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-colors text-body-small font-medium"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-outline dark:border-dark-outline hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-colors text-body-small font-medium"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
            Let&apos;s Create Something Amazing
          </h2>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and
            opportunities. Whether you have a full-time position, contract work,
            or just want to grab coffee, feel free to get in touch!
          </p>
        </div>
      </section>
    </main>
  );
}
