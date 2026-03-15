"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  Settings,
  Home,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    color: "text-light-primary dark:text-dark-primary",
    bgColor: "bg-light-primaryContainer dark:bg-dark-primaryContainer",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-light-secondary dark:text-dark-secondary",
    bgColor: "bg-light-secondaryContainer dark:bg-dark-secondaryContainer",
  },
  {
    title: "Messages",
    icon: Mail,
    href: "/admin/messages",
    color: "text-light-tertiary dark:text-dark-tertiary",
    bgColor: "bg-light-tertiaryContainer dark:bg-dark-tertiaryContainer",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-50 dark:bg-slate-900/20",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-full border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex lg:min-h-screen lg:w-72 lg:flex-col lg:border-b-0 lg:border-r">
      {/* Logo */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-light-primaryContainer to-light-secondaryContainer p-4 dark:border-slate-800 dark:from-dark-primaryContainer dark:to-dark-secondaryContainer sm:p-6">
        <div className="flex items-center justify-between gap-4 lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-light-primary to-light-secondary p-2 shadow-lg dark:from-dark-primary dark:to-dark-secondary">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 dark:text-white block">
                Admin
                <span className="text-light-primary dark:text-dark-primary">
                  Panel
                </span>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Dashboard Control
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/70">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 rounded-xl border border-error-light-container px-3 py-2 text-sm font-medium text-error-light transition hover:bg-error-light-container dark:border-error-dark-container dark:bg-slate-800 dark:text-error-dark dark:hover:bg-error-dark-container/20">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 lg:px-4 lg:py-3.5 ${
                  isActive
                    ? `${item.bgColor} ${item.color} shadow-sm font-semibold`
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/90 font-medium"
                }`}>
                <Icon
                  className={`w-5 h-5 ${isActive ? item.color : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"} transition-colors`}
                />
                <span>{item.title}</span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-light-primary to-light-secondary shadow-sm dark:from-dark-primary dark:to-dark-secondary" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Menu */}
      <div className="hidden border-t border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950 lg:block">
        <div className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-slate-700 transition-all duration-200 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/90">
            <Home className="w-5 h-5" />
            <span>Back To Home</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-error-light dark:text-error-dark hover:bg-error-light-container dark:hover:bg-error-dark-container/20 transition-all duration-200 font-medium group">
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
