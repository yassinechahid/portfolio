"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

import logo from "@/public/assets/yassine.png";
import menuNormal from "@/public/assets/menuNormal.svg";

import LanguageMenu from "./LanguageMenu";
import { DrawerNav } from "./DrawerNav";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
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
    { title: t("drawerNav.home", { defaultValue: "Home" }), path: "/" },
    { title: t("about", { defaultValue: "About" }), path: "/about" },
    { title: t("projects", { defaultValue: "Projects" }), path: "/projects" },
    { title: t("skills", { defaultValue: "Skills" }), path: "/skills" },
    { title: t("blog", { defaultValue: "Blog" }), path: "/blog" },
    { title: t("resume", { defaultValue: "Resume" }), path: "/resume" },
    { title: t("contact", { defaultValue: "Contact" }), path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? "backdrop-blur-lg bg-light-surface/80 dark:bg-dark-surface/80 shadow-md border-b border-light-outlineVariant dark:border-dark-outlineVariant"
          : "bg-light-background/80 dark:bg-dark-background/80"
      }`}>
      <div className="max-w-7xl mx-auto h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Homepage link */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full px-2 py-1 focus:outline-none">
          <Image
            src={logo}
            alt="yassine"
            className="w-11 h-11 rounded-full ring-2 ring-light-primary/60 dark:ring-dark-primary/40"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-title-small font-semibold text-light-onBackground dark:text-dark-onBackground">
              Yassine chahid
            </span>
            <span className="text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              Frontend developer
            </span>
          </div>
        </Link>

        {/* Desktop navbar */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full bg-light-surfaceContainerLow/80 dark:bg-dark-surfaceContainerLow/80 px-2 py-1 shadow-sm border border-light-outlineVariant/60 dark:border-dark-outlineVariant/60">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                className={`relative px-3 py-2 rounded-full text-label-medium font-semibold transition-colors ${
                  active
                    ? "bg-light-primary/90 dark:bg-dark-primary/90 text-light-onPrimary dark:text-dark-onPrimary shadow-sm"
                    : "text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primaryContainer/50 dark:hover:bg-dark-primaryContainer/40"
                }`}
                href={link.path}
                key={link.title}
                aria-current={active ? "page" : undefined}>
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Menu, theme toggle and language */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary text-label-medium font-semibold shadow-sm hover:opacity-90 transition">
            {t("contact", { defaultValue: "Contact" })}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/admin/login"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-secondary dark:bg-dark-secondary text-light-onSecondary dark:text-dark-onSecondary text-label-medium font-semibold shadow-sm hover:opacity-90 transition">
            Login here
          </Link>

          <ThemeToggle />

          {/* Language menu */}
          <LanguageMenu changeLanguage={changeLanguage} />

          {/* Mobile menu button */}
          <div className="lg:hidden flex">
            <button
              onClick={openDrawer}
              className="p-2 hover:bg-light-primaryContainer/40 dark:hover:bg-dark-primaryContainer/40 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              aria-label="Open menu"
              aria-expanded={drawerOpen}>
              <Image
                src={menuNormal}
                className="filter-white"
                alt="Open menu"
                width={24}
                height={24}
              />
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
