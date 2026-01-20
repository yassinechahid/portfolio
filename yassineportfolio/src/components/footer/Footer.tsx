import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  Code,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: t("home"), href: "/" },
      { label: t("about"), href: "/about" },
      { label: t("projects"), href: "/projects" },
      { label: t("services"), href: "/services" },
      { label: t("contact"), href: "/contact" },
    ],
    socialLinks: [
      {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/yourusername",
        label: "GitHub",
      },
      {
        icon: <Linkedin className="w-5 h-5" />,
        href: "https://linkedin.com/in/yourusername",
        label: "LinkedIn",
      },
      {
        icon: <Twitter className="w-5 h-5" />,
        href: "https://twitter.com/yourusername",
        label: "Twitter",
      },
      {
        icon: <Mail className="w-5 h-5" />,
        href: "mailto:hello@yourdomain.com",
        label: "Email",
      },
    ],
    legalLinks: [
      { label: t("privacy"), href: "/privacy" },
      { label: t("terms"), href: "/terms" },
      { label: t("cookies"), href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-light-surfaceContainerHigh to-light-surfaceContainerHighest dark:from-dark-surfaceContainerHigh dark:to-dark-surfaceContainerHighest border-t border-light-outline dark:border-dark-outline">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer">
                <Code className="w-6 h-6 text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer" />
              </div>
              <span className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground">
                Yassine chahid
              </span>
            </div>
            <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-sm leading-relaxed">
              {t(
                "description",
                "Crafting beautiful, high-performance web applications with modern technologies. Turning ideas into reality.",
              )}
            </p>
            <div className="flex gap-3 pt-4">
              {footerLinks.socialLinks.slice(0, 4).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 text-light-onBackground dark:text-dark-onBackground hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
              {t("quickLinks", "Quick Links")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-light-primary dark:bg-dark-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
              {t("newsletter", "Newsletter")}
            </h3>
            <div className="space-y-4">
              <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                {t(
                  "newsletterDesc",
                  "Get updates on my latest projects and insights",
                )}
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder", "Your email")}
                  className="w-full px-4 py-2.5 rounded-lg bg-light-background dark:bg-dark-background border border-light-outline dark:border-dark-outline text-light-onBackground dark:text-dark-onBackground placeholder:text-light-onSurfaceVariant dark:placeholder:text-dark-onSurfaceVariant focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all"
                />
                <button className="w-full px-4 py-2.5 rounded-lg bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 active:scale-95 transition-all duration-200 font-medium text-body-medium">
                  {t("subscribe", "Subscribe")}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
              {t("contact", "Get In Touch")}
            </h3>
            <address className="not-italic space-y-4">
              <div>
                <p className="text-label-large font-medium text-light-primary dark:text-dark-primary mb-1">
                  {t("email", "Email")}
                </p>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  hello@yourdomain.com
                </a>
              </div>

              <div>
                <p className="text-label-large font-medium text-light-primary dark:text-dark-primary mb-1">
                  {t("location", "Location")}
                </p>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                  {t("locationValue", "Rabat, Morocco")}
                </p>
              </div>

              <div>
                <p className="text-label-large font-medium text-light-primary dark:text-dark-primary mb-1">
                  {t("availability", "Status")}
                </p>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {t("available", "Available for new projects")}
                </p>
              </div>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-light-outline dark:border-dark-outline" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-body-medium text-light-onBackground dark:text-dark-onBackground">
              &copy; {currentYear}{" "}
              {t("copyright", "Yassine chahid. All rights reserved.")}
            </p>
            <p className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2">
              {t("madeWith", "Made with")}{" "}
              <Heart className="w-4 h-4 inline text-red-500 animate-pulse" />{" "}
              {t("inMorocco", "using Next.js & Tailwind CSS")}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-2.5 rounded-lg bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 transition-all duration-200 text-body-medium font-medium hover:scale-105 active:scale-95"
          >
            {t("backToTop", "↑ Back to Top")}
          </button>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-light-primary/50 dark:via-dark-primary/50 to-transparent" />
    </footer>
  );
}
