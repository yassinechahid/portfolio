"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Home,
  Briefcase,
  User,
  Zap,
  BookOpen,
  FileText,
  Mail,
} from "lucide-react";

import menuClose from "@/public/assets/menuClose.svg";
import logo from "@/public/assets/sideIcon5.svg";

interface DrawerNavProps {
  open: boolean;
  closeDrawerAction: () => void;
}

export const DrawerNav: React.FC<DrawerNavProps> = ({
  open,
  closeDrawerAction,
}) => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        closeDrawerAction();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeDrawerAction]);

  const NavLinks = [
    {
      title: t("drawerNav.home"),
      icon: <Home className="w-5 h-5" />,
      onIcon: <Home className="w-5 h-5" />,
      path: "/",
    },
    {
      title: t("projects"),
      icon: <Briefcase className="w-5 h-5" />,
      onIcon: <Briefcase className="w-5 h-5" />,
      path: "/projects",
    },
    {
      title: t("about"),
      icon: <User className="w-5 h-5" />,
      onIcon: <User className="w-5 h-5" />,
      path: "/about",
    },
    {
      title: t("skills", { defaultValue: "Skills" }),
      icon: <Zap className="w-5 h-5" />,
      onIcon: <Zap className="w-5 h-5" />,
      path: "/skills",
    },
    {
      title: t("blog", { defaultValue: "Blog" }),
      icon: <BookOpen className="w-5 h-5" />,
      onIcon: <BookOpen className="w-5 h-5" />,
      path: "/blog",
    },
    {
      title: t("resume", { defaultValue: "Resume" }),
      icon: <FileText className="w-5 h-5" />,
      onIcon: <FileText className="w-5 h-5" />,
      path: "/resume",
    },
    {
      title: t("contact"),
      icon: <Mail className="w-5 h-5" />,
      onIcon: <Mail className="w-5 h-5" />,
      path: "/contact",
    },
  ];

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={closeDrawerAction}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-screen w-[290px] bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow z-50 shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 ease-out rounded-r-[12px]"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex-shrink-0 p-4">
          <div className="flex items-center justify-between h-[40px]">
            <button
              onClick={closeDrawerAction}
              className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-light-secondaryContainer dark:hover:bg-dark-secondaryContainer transition duration-200"
              aria-label="Close menu">
              <div className="hover:bg-light-primaryContainer/40 dark:hover:bg-dark-primaryContainer/40 p-2 rounded-md">
                <Image
                  src={menuClose}
                  alt="menu close"
                  className="dark:filter dark:invert"
                />
              </div>
              <Link
                href="/"
                className="text-label-large font-roboto font-medium">
                <Image
                  src={logo}
                  alt="logo"
                  className="dark:filter dark:invert"
                />
              </Link>
            </button>
          </div>
        </div>

        {/* Navigation Links - Scrollable area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {NavLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`h-[56px] w-full rounded-full flex items-center gap-3 text-label-large font-roboto font-medium transition-colors ${
                    isRTL ? "pr-[16px]" : "pl-[16px]"
                  } ${
                    pathname === item.path
                      ? "bg-light-secondaryContainer dark:bg-dark-secondaryContainer text-light-onSecondaryContainer dark:text-dark-onSecondaryContainer"
                      : "text-light-onSurface dark:text-dark-onSurface hover:bg-light-secondaryContainer/50 dark:hover:bg-dark-secondaryContainer/50"
                  }`}
                  onClick={closeDrawerAction}>
                  <div className="flex-shrink-0">
                    {pathname === item.path ? item.onIcon : item.icon}
                  </div>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-light-outline dark:border-dark-outline text-center text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
          <span className="mx-1">&copy;{new Date().getFullYear()}</span>
          <span className="mx-1">{t("All rights reserved")}</span>
        </div>
      </div>
    </>
  );
};
