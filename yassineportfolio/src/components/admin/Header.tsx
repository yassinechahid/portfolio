"use client";

import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            🔒 Secure Administrative Panel
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentTime}
            </span>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Logged in as
              </span>
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 truncate max-w-xs">
                {user?.email}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
            title="Logout">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
