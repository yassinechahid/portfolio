"use client";

import AdminHeader from "@/components/admin/Header";
import AdminSidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if this is the login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isLoginPage) {
      if (!user) {
        router.push("/admin/login");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, loading, isAdmin, router, isLoginPage]);

  // Show login page without protection
  if (isLoginPage) {
    return children;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
