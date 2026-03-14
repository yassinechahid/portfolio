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
          <h1 className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
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
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2.5 shadow-sm dark:border-cyan-900/40 dark:from-slate-800 dark:to-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg shadow dark:from-cyan-600 dark:to-blue-700">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Active Session
              </span>
              <span className="max-w-[220px] truncate text-sm font-bold text-blue-700 dark:text-cyan-300 sm:max-w-xs">
                {user?.email}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-50 hover:shadow-md active:scale-95 dark:border-red-900/50 dark:bg-slate-800 dark:text-red-300 dark:hover:bg-red-900/20"
            title="Logout">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
