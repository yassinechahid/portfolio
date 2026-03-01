"use client";

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
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/yassinechahid",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/yassine-chahid-15ab54354",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/2vdUkvownfF8Ian",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:chahidyc15@gmail.com",
      label: "Email",
    },
  ];

  const legalLinks = [
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
    { label: t("footer.cookies"), href: "/cookies" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-light-surface via-light-surfaceContainerLow to-light-surfaceContainer dark:from-dark-surface dark:via-dark-surfaceContainerLow dark:to-dark-surfaceContainer border-t border-light-outline/20 dark:border-dark-outline/20">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-light-primary dark:via-dark-primary to-transparent opacity-50" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-light-primary/20 to-light-primaryContainer dark:from-dark-primary/20 dark:to-dark-primaryContainer shadow-md">
                <Code className="w-7 h-7 text-light-primary dark:text-dark-primary" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-light-primary to-light-primary/70 dark:from-dark-primary dark:to-dark-primary/70 bg-clip-text text-transparent">
                Yassine Chahid
              </span>
            </div>
            <p className="text-base text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed max-w-md">
              {t("footer.description")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== Mail ? "_blank" : undefined}
                    rel={link.icon !== Mail ? "noopener noreferrer" : undefined}
                    className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainer dark:hover:bg-dark-surfaceContainer hover:text-light-primary dark:hover:text-dark-primary hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label={link.label}>
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-light-onSurface dark:text-dark-onSurface">
              {t("footer.navigation")}
            </h3>
            <nav>
              <ul className="space-y-3">
                {[
                  { label: t("nav.home"), href: "/" },
                  { label: t("nav.about"), href: "/about" },
                  { label: t("nav.projects"), href: "/projects" },
                  { label: t("nav.skills"), href: "/skills" },
                  { label: t("nav.contact"), href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200 inline-flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-light-primary dark:bg-dark-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact & Status */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-light-onSurface dark:text-dark-onSurface">
              {t("footer.getInTouch")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-light-primary dark:text-dark-primary mb-2">
                  {t("footer.email")}
                </p>
                <a
                  href="mailto:chahidyc15@gmail.com"
                  className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                  chahidyc15@gmail.com
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-light-primary dark:text-dark-primary mb-2">
                  {t("footer.location")}
                </p>
                <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                  {t("footer.locationValue")}
                </p>
              </div>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {t("footer.available")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-light-outline/30 dark:border-dark-outline/30" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-sm text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              &copy; {currentYear}{" "}
              <span className="font-semibold text-light-onSurface dark:text-dark-onSurface">
                Yassine Chahid
              </span>
              . {t("footer.allRightsReserved")}
            </p>
            <p className="text-sm text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant inline-flex items-center gap-1.5">
              {t("footer.madeWith")}{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
              {t("footer.usingTech")}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-light-outline dark:text-dark-outline">
                    •
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-onPrimary dark:hover:text-dark-onPrimary transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Back to top">
            <span className="text-sm font-medium">{t("footer.backToTop")}</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
