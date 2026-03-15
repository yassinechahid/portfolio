"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, Shield, Palette, LogOut, Home, Save } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import LabeledInput from "@/components/LabeledInput";

export default function AdminSettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [defaultAdminPage, setDefaultAdminPage] = useState("/admin/dashboard");

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Settings className="h-3.5 w-3.5" />
              Admin settings
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Manage your admin profile, appearance, and quick preferences.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-light-primary dark:text-dark-primary" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Account Information
              </h2>
            </div>

            <div className="space-y-4">
              <LabeledInput
                label="Full name"
                name="fullName"
                value={user?.name || "Admin"}
                onChange={() => undefined}
                isDisabled
                bgColor="bg-white dark:bg-slate-900"
              />

              <LabeledInput
                label="Email"
                name="email"
                value={user?.email || ""}
                onChange={() => undefined}
                isDisabled
                bgColor="bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-light-tertiary dark:text-dark-tertiary" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Appearance
              </h2>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Theme mode
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch between light and dark mode.
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Preferences
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep your most used admin page one click away.
            </p>

            <div className="mt-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Default admin page
              </label>
              <select
                value={defaultAdminPage}
                onChange={(e) => setDefaultAdminPage(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-light-primary focus:ring-2 focus:ring-light-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-dark-primary dark:focus:ring-dark-primary/20">
                <option value="/admin/dashboard">Dashboard</option>
                <option value="/admin/users">Users</option>
                <option value="/admin/messages">Messages</option>
                <option value="/admin/settings">Settings</option>
              </select>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-light-primary to-light-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 dark:from-dark-primary dark:to-dark-secondary dark:text-dark-onPrimary">
              <Save className="h-4 w-4" />
              Save preferences
            </button>
          </div>

          <div className="rounded-3xl border border-error-light-container bg-error-light-container p-5 shadow-md dark:border-error-dark-container dark:bg-error-dark-container/20 sm:p-6">
            <h2 className="text-lg font-semibold text-error-light dark:text-error-dark">
              Session
            </h2>
            <p className="mt-1 text-sm text-error-light/80 dark:text-error-dark/90">
              End your admin session securely when you are done.
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-error-light bg-white px-4 py-2.5 text-sm font-semibold text-error-light transition hover:bg-error-light-container dark:border-error-dark-container dark:bg-slate-800 dark:text-error-dark dark:hover:bg-error-dark-container/30">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
