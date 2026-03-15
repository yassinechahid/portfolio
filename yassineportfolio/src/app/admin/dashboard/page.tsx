"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  databases,
  QueryBuilder,
  DATABASE_ID,
  COLLECTION_MESSAGES,
  COLLECTION_USERS,
} from "@/lib/appwrite";

import {
  ArrowLeft,
  ArrowUpRight,
  Users,
  Mail,
  MessageSquare,
  CheckCircle,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Stats {
  totalUsers: number;
  totalMessages: number;
  unreadMessages: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalMessages: 0,
    unreadMessages: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setLoadError(null);

      // Get users count
      const users = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_USERS,
        [QueryBuilder.limit(1)],
      );

      // Get messages count
      const messages = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_MESSAGES,
        [QueryBuilder.limit(1)],
      );

      // Get unread messages count
      const unread = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_MESSAGES,
        [QueryBuilder.equal("isRead", false), QueryBuilder.limit(1)],
      );

      // Get active users count
      const activeUsers = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_USERS,
        [QueryBuilder.equal("status", "active"), QueryBuilder.limit(1)],
      );

      setStats({
        totalUsers: users.total,
        totalMessages: messages.total,
        unreadMessages: unread.total,
        activeUsers: activeUsers.total,
      });
    } catch {
      setLoadError("Unable to load the latest dashboard metrics right now.");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      lightBg: "bg-light-primaryContainer dark:bg-dark-primaryContainer",
      textColor: "text-light-primary dark:text-dark-primary",
      note: "Registered accounts",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: CheckCircle,
      lightBg: "bg-light-secondaryContainer dark:bg-dark-secondaryContainer",
      textColor: "text-light-secondary dark:text-dark-secondary",
      note: "Healthy recurring activity",
    },
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      lightBg: "bg-light-tertiaryContainer dark:bg-dark-tertiaryContainer",
      textColor: "text-light-tertiary dark:text-dark-tertiary",
      note: "Inbound contact volume",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: Mail,
      lightBg: "bg-light-secondaryContainer dark:bg-dark-secondaryContainer",
      textColor: "text-light-secondary dark:text-dark-secondary",
      note: "Needs attention",
    },
  ];

  const quickActions = [
    {
      title: "Manage users",
      description: "Review accounts and permissions.",
      href: "/admin/users",
      icon: Users,
      accent: "text-light-primary dark:text-dark-primary",
      surface:
        "bg-light-primaryContainer hover:opacity-90 dark:bg-dark-primaryContainer dark:hover:opacity-90",
    },
    {
      title: "Open messages",
      description: "Reply to new contact requests.",
      href: "/admin/messages",
      icon: Mail,
      accent: "text-light-secondary dark:text-dark-secondary",
      surface:
        "bg-light-secondaryContainer hover:opacity-90 dark:bg-dark-secondaryContainer dark:hover:opacity-90",
    },
    {
      title: "Settings",
      description: "Update admin preferences.",
      href: "/admin/settings",
      icon: Settings,
      accent: "text-light-tertiary dark:text-dark-tertiary",
      surface:
        "bg-light-tertiaryContainer hover:opacity-90 dark:bg-dark-tertiaryContainer dark:hover:opacity-90",
    },
  ];

  const unreadRate =
    stats.totalMessages > 0
      ? Math.round((stats.unreadMessages / stats.totalMessages) * 100)
      : 0;
  const activeRate =
    stats.totalUsers > 0
      ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
      : 0;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-light-primaryContainer p-4 dark:bg-dark-primaryContainer mb-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-light-primary border-t-transparent dark:border-dark-primary" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {loadError && (
        <div className="rounded-2xl border border-light-tertiaryContainer bg-light-tertiaryContainer px-4 py-3 text-sm font-medium text-light-onTertiaryContainer dark:border-dark-tertiaryContainer dark:bg-dark-tertiaryContainer dark:text-dark-onTertiaryContainer">
          {loadError}
        </div>
      )}

      <section className="relative overflow-hidden rounded-[28px] border border-light-outlineVariant bg-gradient-to-br from-light-primary via-light-secondary to-light-tertiary px-5 py-6 text-white shadow-2xl sm:px-8 sm:py-8 dark:border-dark-outlineVariant dark:from-dark-primaryContainer dark:via-dark-secondaryContainer dark:to-dark-tertiaryContainer">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_28%)]" />
        <div className="relative flex flex-col gap-5">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
              <ArrowLeft className="h-4 w-4" />
              Back to home page
            </Link>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">
                Welcome back, {user?.name || user?.email || "Admin"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                Essential overview of users and messages, with quick access to
                the key admin pages.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-100">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                {stats.unreadMessages > 0
                  ? `${stats.unreadMessages} unread messages pending`
                  : "Inbox fully reviewed"}
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                {activeRate}% active users
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {stat.note}
                  </p>
                </div>
                <div
                  className={`rounded-2xl p-4 shadow-sm transition-transform duration-300 group-hover:scale-105 ${stat.lightBg}`}>
                  <Icon className={`h-7 w-7 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Performance Summary
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Focus on the two metrics that matter most right now.
              </p>
            </div>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-light-primary hover:text-light-primary dark:border-slate-700 dark:text-slate-300 dark:hover:border-dark-primary dark:hover:text-dark-primary">
              Open inbox
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                User engagement
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {activeRate}%
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary"
                  style={{ width: `${activeRate}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {stats.activeUsers.toLocaleString()} active of{" "}
                {stats.totalUsers.toLocaleString()} users.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Unread queue
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {unreadRate}%
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-light-tertiary to-light-secondary dark:from-dark-tertiary dark:to-dark-secondary"
                  style={{ width: `${unreadRate}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {stats.unreadMessages.toLocaleString()} unread of{" "}
                {stats.totalMessages.toLocaleString()} total messages.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-light-primary to-light-tertiary p-3 text-white shadow-lg dark:from-dark-primary dark:to-dark-tertiary">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Quick Access
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Open the most used admin sections.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`group rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 ${action.surface}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className={`inline-flex rounded-xl bg-white/80 p-2.5 dark:bg-slate-950/20 ${action.accent}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                        {action.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {action.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
