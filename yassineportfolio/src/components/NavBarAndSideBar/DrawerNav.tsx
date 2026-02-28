"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Home, Briefcase, User, Zap, BookOpen, Mail } from "lucide-react";

import menuClose from "@/public/assets/menuClose.svg";

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
      title: t("drawerNav.projects"),
      icon: <Briefcase className="w-5 h-5" />,
      onIcon: <Briefcase className="w-5 h-5" />,
      path: "/projects",
    },
    {
      title: t("drawerNav.about"),
      icon: <User className="w-5 h-5" />,
      onIcon: <User className="w-5 h-5" />,
      path: "/about",
    },
    {
      title: t("drawerNav.skills"),
      icon: <Zap className="w-5 h-5" />,
      onIcon: <Zap className="w-5 h-5" />,
      path: "/skills",
    },
    {
      title: t("drawerNav.blog"),
      icon: <BookOpen className="w-5 h-5" />,
      onIcon: <BookOpen className="w-5 h-5" />,
      path: "/blog",
    },
    {
      title: t("drawerNav.contact"),
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
            </button>
          </div>
        </div>

        {/* Navigation Links - Scrollable area */}
        <div className="flex-1 overflow-y-auto mx-1 px-4 py-6">
          <ul className="space-y-2">
            {NavLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`h-[56px] w-full rounded-full flex items-center gap-3 text-label-large font-roboto font-medium transition-all duration-200 ${
                    isRTL ? "pr-[16px]" : "pl-[16px]"
                  } ${
                    pathname === item.path
                      ? "bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer shadow-sm"
                      : "text-light-onSurface dark:text-dark-onSurface hover:bg-light-primaryContainer/50 dark:hover:bg-dark-primaryContainer/50 hover:text-light-primary dark:hover:text-dark-primary"
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

        {/* Admin Button */}
        <div className="flex-shrink-0 px-4 pb-6 mr-4">
          <Link
            href="/admin/login"
            className="w-full h-10 flex items-center justify-center gap-2 rounded-full bg-light-surfaceContainer dark:bg-dark-surfaceContainer text-light-onSurface dark:text-dark-onSurface hover:bg-light-primaryContainer dark:hover:bg-dark-primaryContainer hover:text-light-primary dark:hover:text-dark-primary text-sm font-medium transition-all duration-200 shadow-sm"
            onClick={closeDrawerAction}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            {t("drawerNav.admin")}
          </Link>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 px-6 pb-6 text-center text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="mx-1">•</span>
          <span>{t("drawerNav.allRightsReserved")}</span>
        </div>
      </div>
    </>
  );
};
