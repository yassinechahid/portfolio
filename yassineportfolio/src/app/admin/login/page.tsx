/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, LogIn, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DEMO_EMAIL = "admin@portfolio.local";
  const DEMO_PASSWORD = "admin123";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-full mb-4">
              <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Secure access for administrators only
            </p>
            <div className="mt-2 inline-block px-3 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-full">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                🔧 Development Mode (Localhost)
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Enter email"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Card */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              📋 Demo Credentials
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Email
                  </p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white">
                    {DEMO_EMAIL}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(DEMO_EMAIL)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Password
                  </p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white">
                    ••••••••
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(DEMO_PASSWORD)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail(DEMO_EMAIL);
                setPassword(DEMO_PASSWORD);
              }}
              className="w-full text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium py-2 transition">
              ➜ Auto-fill credentials
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
            <p className="text-xs text-red-700 dark:text-red-300 text-center font-medium">
              ⚠️ This area is restricted to authorized administrators only.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>
            🚀 Running on{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              localhost
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
