"use client";

import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900 sm:px-6 xl:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-light-primary to-light-secondary bg-clip-text text-xl font-bold text-transparent dark:from-dark-primary dark:to-dark-secondary sm:text-2xl">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success-light dark:bg-success-dark animate-pulse" />
            Secure Administrative Panel
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          {/* Theme Toggle */}
          <div className="self-start sm:self-auto rounded-xl border border-slate-200 bg-slate-50 px-1 py-1 dark:border-slate-700 dark:bg-slate-800/80">
            <ThemeToggle />
          </div>

          {/* Time Display */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
            <Clock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {currentTime}
            </span>
          </div>

          {/* User Info */}
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-light-outlineVariant bg-gradient-to-r from-light-primaryContainer to-light-secondaryContainer px-4 py-2.5 shadow-sm dark:border-dark-outlineVariant dark:from-dark-primaryContainer dark:to-dark-secondaryContainer">
            <div className="rounded-lg bg-gradient-to-br from-light-primary to-light-secondary p-2 shadow dark:from-dark-primary dark:to-dark-secondary">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Active Session
              </span>
              <span className="max-w-[220px] truncate text-sm font-bold text-light-primary dark:text-dark-primary sm:max-w-xs">
                {user?.email}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-error-light-container px-5 py-2.5 text-sm font-semibold text-error-light transition-all duration-200 hover:scale-105 hover:bg-error-light-container hover:shadow-md active:scale-95 dark:border-error-dark-container dark:bg-slate-800 dark:text-error-dark dark:hover:bg-error-dark-container/20"
            title="Logout">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
