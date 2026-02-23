"use client";

import { useState, useEffect } from "react";
import {
  databases,
  QueryBuilder,
  DATABASE_ID,
  COLLECTION_MESSAGES,
  COLLECTION_USERS,
} from "@/lib/appwrite";

import {
  Users,
  Mail,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Settings,
  Globe,
  Shield,
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
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

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
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-600",
      lightBg:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40",
      textColor: "text-blue-700 dark:text-blue-300",
      trend: "+12%",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: CheckCircle,
      color: "bg-cyan-600",
      lightBg:
        "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-900/40",
      textColor: "text-cyan-700 dark:text-cyan-300",
      trend: "+8%",
    },
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "bg-teal-600",
      lightBg:
        "bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-900/40",
      textColor: "text-teal-700 dark:text-teal-300",
      trend: "+24%",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: Mail,
      color: "bg-amber-600",
      lightBg:
        "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40",
      textColor: "text-amber-700 dark:text-amber-300",
      trend: "-5%",
    },
  ];

  const currentTime = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white border border-blue-400/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3">
              Welcome back, {user?.name || user?.email || "Admin"} 👋
            </h1>
            <p className="text-blue-100 text-lg font-medium">
              Dashboard Overview & System Status
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-2 font-medium">
              🕐 {currentTime}
            </p>
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 inline-block shadow-lg">
              <p className="text-xs font-bold text-white">
                🔧 Development Mode
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Session Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/50 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-700 dark:text-blue-300" />
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Logged In As
            </p>
          </div>
          <p className="text-sm font-mono font-semibold text-blue-900 dark:text-blue-100 break-all">
            {user?.email}
          </p>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-900/50 border-2 border-cyan-200 dark:border-cyan-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
            <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">
              Environment
            </p>
          </div>
          <p className="text-sm font-mono font-semibold text-cyan-900 dark:text-cyan-100">
            localhost:3000
          </p>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-900/50 border-2 border-teal-200 dark:border-teal-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-teal-700 dark:text-teal-300" />
            <p className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wide">
              Status
            </p>
          </div>
          <p className="text-sm font-mono font-semibold text-teal-900 dark:text-teal-100">
            Connected & Active
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white mt-3">
                    {stat.value.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {stat.trend}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`p-4 ${stat.lightBg} rounded-xl shadow-sm`}>
                  <Icon className={`w-7 h-7 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            Recent Messages
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-sm transition-shadow">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Mail className="w-5 h-5 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  New message notification
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  2 minutes ago
                </p>
              </div>
              <span className="px-3 py-1.5 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full font-bold">
                Unread
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-sm transition-shadow">
              <div className="p-2.5 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  System check passed
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  1 hour ago
                </p>
              </div>
              <span className="px-3 py-1.5 text-xs bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-full font-bold">
                Read
              </span>
            </div>
          </div>
          <button className="w-full mt-5 text-sm text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-bold transition py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
            View all messages →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-left group hover:shadow-md hover:-translate-y-0.5">
              <Users className="w-7 h-7 text-blue-700 dark:text-blue-300 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Add New User
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Create account
              </p>
            </button>
            <button className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-left group hover:shadow-md hover:-translate-y-0.5">
              <Mail className="w-7 h-7 text-cyan-700 dark:text-cyan-300 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Newsletter
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Email users
              </p>
            </button>
            <button className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-left group hover:shadow-md hover:-translate-y-0.5">
              <MessageSquare className="w-7 h-7 text-teal-700 dark:text-teal-300 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Messages
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                View unread
              </p>
            </button>
            <button className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-left group hover:shadow-md hover:-translate-y-0.5">
              <Settings className="w-7 h-7 text-slate-700 dark:text-slate-300 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Settings
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Configure system
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-medium">
          💾 Data is synced with{" "}
          <span className="font-bold text-blue-700 dark:text-blue-300">
            Appwrite
          </span>{" "}
          | Running on{" "}
          <span className="font-bold text-cyan-700 dark:text-cyan-300">
            localhost:3000
          </span>{" "}
          in development mode
        </p>
      </div>
    </div>
  );
}
