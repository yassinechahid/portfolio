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
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: t("footer.home"), href: "/" },
      { label: t("footer.about"), href: "/about" },
      { label: t("footer.projects"), href: "/projects" },
      { label: t("footer.services"), href: "/services" },
      { label: t("footer.contact"), href: "/contact" },
    ],
    socialLinks: [
      { 
        icon: <Github className="w-5 h-5" />, 
        href: "https://github.com/yourusername", 
        label: "GitHub" 
      },
      { 
        icon: <Linkedin className="w-5 h-5" />, 
        href: "https://linkedin.com/in/yourusername", 
        label: "LinkedIn" 
      },
      { 
        icon: <Twitter className="w-5 h-5" />, 
        href: "https://twitter.com/yourusername", 
        label: "Twitter" 
      },
      { 
        icon: <Mail className="w-5 h-5" />, 
        href: "mailto:hello@yourdomain.com", 
        label: "Email" 
      },
    ],
    legalLinks: [
      { label: t("footer.privacy"), href: "/privacy" },
      { label: t("footer.terms"), href: "/terms" },
      { label: t("footer.cookies"), href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-light-onPrimary/10 dark:bg-dark-onPrimary/10">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-headline-small font-bold">
                Mon Toubib
              </span>
            </div>
            <p className="text-body-medium opacity-90 max-w-sm">
              {t("footer.description", "Innovative solutions for better digital experiences. Crafting exceptional web applications with modern technologies.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-title-large font-medium mb-6">
              {t("footer.quickLinks", "Quick Links")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-large opacity-90 hover:opacity-100 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-title-large font-medium mb-6">
              {t("footer.connect", "Connect")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {footerLinks.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-onPrimary/10 dark:bg-dark-onPrimary/10 hover:bg-light-onPrimary/20 dark:hover:bg-dark-onPrimary/20 transition-all duration-200 group"
                  aria-label={link.label}
                >
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
            
            {/* Newsletter Signup (Optional) */}
            <div className="mt-8">
              <p className="text-body-medium mb-4 opacity-90">
                {t("footer.newsletter", "Stay updated with my latest projects")}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder", "Your email")}
                  className="flex-1 px-4 py-2 rounded-full bg-light-onPrimary/10 dark:bg-dark-onPrimary/10 border border-light-onPrimary/20 dark:border-dark-onPrimary/20 placeholder:text-light-onPrimary/60 dark:placeholder:text-dark-onPrimary/60 focus:outline-none focus:ring-2 focus:ring-light-onPrimary/30 dark:focus:ring-dark-onPrimary/30"
                />
                <button className="px-6 py-2 rounded-full bg-light-onPrimary text-light-primary dark:bg-dark-onPrimary dark:text-dark-primary hover:opacity-90 transition-opacity font-medium">
                  {t("footer.subscribe", "Subscribe")}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-title-large font-medium mb-6">
              {t("footer.contact", "Get In Touch")}
            </h3>
            <address className="not-italic space-y-4">
              <div className="space-y-2">
                <p className="text-body-large font-medium">{t("footer.email", "Email")}</p>
                <a 
                  href="mailto:hello@yourdomain.com"
                  className="text-body-large opacity-90 hover:opacity-100 hover:text-white transition-all"
                >
                  hello@yourdomain.com
                </a>
              </div>
              
              <div className="space-y-2">
                <p className="text-body-large font-medium">{t("footer.location", "Location")}</p>
                <p className="text-body-large opacity-90">
                  {t("footer.locationValue", "Rabat, Morocco")}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-body-large font-medium">{t("footer.availability", "Availability")}</p>
                <p className="text-body-large opacity-90">
                  {t("footer.available", "Available for new projects")}
                </p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-onPrimary/20 dark:border-dark-onPrimary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-body-medium">
                &copy; {currentYear} {t("footer.copyright", "Mon Toubib. All rights reserved.")}
              </p>
              <p className="text-label-medium opacity-80 mt-1">
                {t("footer.madeWith", "Made with")}{" "}
                <Heart className="w-4 h-4 inline text-red-400 animate-pulse" />{" "}
                {t("footer.inMorocco", "in Morocco")}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-medium opacity-90 hover:opacity-100 hover:text-white transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 rounded-full bg-light-onPrimary/10 dark:bg-dark-onPrimary/10 hover:bg-light-onPrimary/20 dark:hover:bg-dark-onPrimary/20 transition-all duration-200 text-body-medium font-medium"
            >
              {t("footer.backToTop", "Back to top ↑")}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-light-onPrimary/5 dark:bg-dark-onPrimary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-light-onPrimary/5 dark:bg-dark-onPrimary/5 blur-3xl" />
      </div>
    </footer>
  );
}