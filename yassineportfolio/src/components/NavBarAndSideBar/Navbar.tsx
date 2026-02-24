"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";

import logo from "@/public/assets/yassine.png";

import LanguageMenu from "./LanguageMenu";
import { DrawerNav } from "./DrawerNav";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const changeLanguage = (lang: string) => i18n.changeLanguage(lang);

  const navLinks = [
    { title: t("about", { defaultValue: "About" }), path: "/about" },
    { title: t("projects", { defaultValue: "Projects" }), path: "/projects" },
    { title: t("skills", { defaultValue: "Skills" }), path: "/skills" },
    { title: t("blog", { defaultValue: "Blog" }), path: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-light-surface/90 dark:bg-dark-surface/90 shadow-lg border-b border-light-outline/10 dark:border-dark-outline/10"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Home">
            <div className="relative">
              <Image
                src={logo}
                alt="Yassine Chahid"
                className="w-12 h-12 rounded-full ring-2 ring-light-primary/20 dark:ring-dark-primary/20 group-hover:ring-light-primary/60 dark:group-hover:ring-dark-primary/60 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-light-surface dark:border-dark-surface" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-light-onSurface dark:text-dark-onSurface">
                Yassine Chahid
              </div>
              <div className="text-xs text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                Full-Stack Developer
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                isActive("/")
                  ? "text-light-primary dark:text-dark-primary bg-light-primaryContainer/50 dark:bg-dark-primaryContainer/50"
                  : "text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primaryContainer/30 dark:hover:bg-dark-primaryContainer/30"
              }`}>
              Home
            </Link>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                    active
                      ? "text-light-primary dark:text-dark-primary bg-light-primaryContainer/50 dark:bg-dark-primaryContainer/50"
                      : "text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primaryContainer/30 dark:hover:bg-dark-primaryContainer/30"
                  }`}
                  aria-current={active ? "page" : undefined}>
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Contact CTA - Desktop */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-1.5 text-sm font-semibold bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200">
              {t("contact", { defaultValue: "Contact Me" })}
            </Link>

            {/* Admin Button - Desktop */}
            <Link
              href="/admin/dashboard"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primaryContainer/30 dark:hover:bg-dark-primaryContainer/30 rounded-full transition-all duration-200">
              Admin
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Menu */}
            <LanguageMenu changeLanguage={changeLanguage} />

            {/* Mobile Menu Button */}
            <button
              onClick={openDrawer}
              className="lg:hidden p-2.5 rounded-lg text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainerLow dark:hover:bg-dark-surfaceContainerLow transition-colors"
              aria-label="Open menu"
              aria-expanded={drawerOpen}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer component */}
      <DrawerNav open={drawerOpen} closeDrawerAction={closeDrawer} />
    </header>
  );
};

export default Navbar;
