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
      color: "bg-blue-500",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      trend: "+12%",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: CheckCircle,
      color: "bg-green-500",
      lightBg: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      trend: "+8%",
    },
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "bg-purple-500",
      lightBg: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      trend: "+24%",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: Mail,
      color: "bg-orange-500",
      lightBg: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
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
          <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white border border-indigo-400/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || user?.email || "Admin"} 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Dashboard Overview & System Status
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-100 text-sm mb-2">🕐 {currentTime}</p>
            <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-lg border border-white/30 inline-block">
              <p className="text-xs font-semibold text-white">
                🔧 Development Mode
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Session Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-700 dark:text-blue-300" />
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Logged In As
            </p>
          </div>
          <p className="text-sm font-mono text-blue-900 dark:text-blue-100 break-all">
            {user?.email}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-green-700 dark:text-green-300" />
            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
              Environment
            </p>
          </div>
          <p className="text-sm font-mono text-green-900 dark:text-green-100">
            localhost:3000
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-purple-700 dark:text-purple-300" />
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
              Status
            </p>
          </div>
          <p className="text-sm font-mono text-purple-900 dark:text-purple-100">
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-green-500">
                      {stat.trend}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 ${stat.lightBg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Recent Messages
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New message notification
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 minutes ago
                </p>
              </div>
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full font-medium">
                Unread
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  System check passed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1 hour ago
                </p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full font-medium">
                Read
              </span>
            </div>
          </div>
          <button className="w-full mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition">
            View all messages →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Add New User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Create account
              </p>
            </button>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Newsletter
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email users
              </p>
            </button>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group">
              <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Messages
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View unread
              </p>
            </button>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group">
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Settings
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Configure system
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          💾 Data is synced with <span className="font-semibold">Appwrite</span>{" "}
          | Running on <span className="font-semibold">localhost:3000</span> in
          development mode
        </p>
      </div>
    </div>
  );
}
