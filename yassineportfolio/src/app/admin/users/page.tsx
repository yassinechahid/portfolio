/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  databases,
  IDGenerator,
  QueryBuilder,
  DATABASE_ID,
  COLLECTION_USERS,
} from "@/lib/appwrite";

import Swal from "sweetalert2";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  $id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  $createdAt: string;
  $updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { isAdmin } = useAuth();

  // Form state - MATCHES YOUR COLLECTION EXACTLY
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user" as "admin" | "user",
    status: "active" as "active" | "inactive",
  });

  // ============= DEBUG FUNCTIONS =============

  // 1. Debug: Check collection attributes
  const debugCollectionAttributes = async () => {
    try {
      console.log("🔍 DEBUG: Fetching collection attributes...");
      // This is a hack to get collection info - try to list with limit 0
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_USERS,
        [QueryBuilder.limit(1)],
      );
      console.log("✅ Collection accessible. Total documents:", response.total);
      return true;
    } catch (error: any) {
      console.error("❌ Collection access error:", {
        message: error.message,
        code: error.code,
        type: error.type,
      });
      return false;
    }
  };

  // 2. Debug: Test with hardcoded values
  const debugHardcodedCreate = async () => {
    try {
      console.log("🧪 DEBUG: Testing with hardcoded values...");
      const testData = {
        name: "Debug User",
        email: `debug${Date.now()}@example.com`,
        phone: "1234567890",
        role: "admin",
        status: "active",
      };

      console.log(
        "📤 Hardcoded data being sent:",
        JSON.stringify(testData, null, 2),
      );

      const result = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_USERS,
        IDGenerator.unique(),
        testData,
      );

      console.log("✅ Hardcoded test SUCCESS! Document created:", result.$id);
      return true;
    } catch (error: any) {
      console.error("❌ Hardcoded test FAILED:", {
        message: error.message,
        code: error.code,
        type: error.type,
        response: error.response,
      });
      return false;
    }
  };

  // 3. Debug: Check what users exist
  const debugListUsers = async () => {
    try {
      console.log("📋 DEBUG: Fetching existing users...");
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_USERS,
        [QueryBuilder.limit(5)],
      );
      console.log(`✅ Found ${response.total} users total`);
      console.log(
        "Sample user (if any):",
        response.documents[0] || "No users yet",
      );
      return response.documents;
    } catch (error: any) {
      console.error("❌ Failed to fetch users:", error.message);
      return [];
    }
  };

  // Run debug on component mount
  useEffect(() => {
    const runDebug = async () => {
      console.log("=".repeat(50));
      console.log("🚀 STARTING DEBUG SEQUENCE");
      console.log("=".repeat(50));

      await debugCollectionAttributes();
      await debugListUsers();
      // Uncomment to test hardcoded create (will create a test user)
      // await debugHardcodedCreate();

      console.log("=".repeat(50));
      console.log("🏁 DEBUG SEQUENCE COMPLETE");
      console.log("=".repeat(50));
    };

    runDebug();
  }, []);

  // ============= END DEBUG FUNCTIONS =============

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("📥 Fetching users list...");
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_USERS,
        [QueryBuilder.orderDesc("$createdAt")],
      );
      console.log(`✅ Fetched ${response.documents.length} users`);
      setUsers(response.documents as unknown as User[]);
    } catch (error: any) {
      console.error("❌ Error fetching users:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user with extensive debugging
  const createUser = async () => {
    if (!formData.name || !formData.email) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name and email are required",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    try {
      // AGGRESSIVE CLEANING
      const cleanRole = formData.role
        .trim() // Remove spaces
        .toLowerCase() // Force lowercase
        .replace(/[^a-z]/g, ""); // Remove any non-alphabetic characters

      const cleanStatus = formData.status
        .trim()
        .toLowerCase()
        .replace(/[^a-z]/g, "");

      console.log("🔍 ORIGINAL role:", JSON.stringify(formData.role));
      console.log("🔍 CLEANED role:", JSON.stringify(cleanRole));
      console.log("🔍 ORIGINAL status:", JSON.stringify(formData.status));
      console.log("🔍 CLEANED status:", JSON.stringify(cleanStatus));

      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || "",
        role: cleanRole,
        status: cleanStatus,
      };

      console.log("📤 SENDING:", JSON.stringify(dataToSend, null, 2));

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_USERS,
        IDGenerator.unique(),
        dataToSend,
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User created successfully",
        confirmButtonColor: "#6366f1",
        timer: 3000,
      });

      setShowAddModal(false);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      console.error("❌ ERROR:", error);

      // Show exactly what was sent
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `
        <div class="text-left">
          <p class="font-bold">Failed to create user</p>
          <p class="text-sm mt-2">Role sent: "${formData.role}"</p>
          <p class="text-sm">Status sent: "${formData.status}"</p>
          <p class="text-xs text-gray-500 mt-2">Check console for details</p>
        </div>
      `,
        confirmButtonColor: "#6366f1",
      });
    }
  };

  // Update user with debugging
  const updateUser = async () => {
    if (!editingUser) return;

    console.log("=".repeat(50));
    console.log("📝 UPDATE USER - User ID:", editingUser.$id);
    console.log("Form Data:", formData);

    try {
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || "",
        role: formData.role.trim() as "admin" | "user",
        status: formData.status.trim() as "active" | "inactive",
      };

      console.log(
        "📤 Updating user with data:",
        JSON.stringify(dataToSend, null, 2),
      );

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_USERS,
        editingUser.$id,
        dataToSend,
      );

      console.log("✅ User updated successfully");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User updated successfully",
        confirmButtonColor: "#6366f1",
        timer: 3000,
      });

      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error: any) {
      console.error("❌ Error updating user:", error);

      let errorMessage = "Failed to update user. ";
      if (error?.message?.includes("role")) {
        errorMessage = `Role must be 'admin' or 'user'. You sent: "${formData.role}"`;
      } else if (error?.message?.includes("status")) {
        errorMessage = `Status must be 'active' or 'inactive'. You sent: "${formData.status}"`;
      } else {
        errorMessage += error?.message || "Please try again.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#6366f1",
      });
    }
  };

  // Delete user
  const deleteUser = async (userId: string, userEmail: string) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${userEmail}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        console.log("🗑️ Deleting user:", userId);
        await databases.deleteDocument(DATABASE_ID, COLLECTION_USERS, userId);
        console.log("✅ User deleted successfully");

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "User deleted successfully",
          confirmButtonColor: "#6366f1",
          timer: 3000,
        });

        fetchUsers();
      } catch (error: any) {
        console.error("❌ Error deleting user:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete user",
          confirmButtonColor: "#6366f1",
        });
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "user",
      status: "active",
    });
  };

  // Edit user
  const handleEdit = (user: User) => {
    console.log("✏️ Editing user:", user.$id);
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      status: user.status,
    });
  };

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-flex p-6 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl mb-4 border-2 border-red-300 dark:border-red-800 shadow-lg">
            <Shield className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            Access Denied
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            You don&#39;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
            Manage system users and their permissions
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Debug Button - Only visible in development */}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={debugHardcodedCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-colors shadow-md font-semibold">
              <span className="text-xs">🐛</span>
              Test Create
            </button>
          )}
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-bold">
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700 p-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Loading users...
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full min-w-max">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="inline-flex p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl mb-4">
                          <UserIcon className="w-12 h-12 text-slate-400" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-bold text-lg mb-2">
                          {searchTerm ? "No users found" : "No users yet"}
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-sm">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Click 'Add New User' to create your first user"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.$id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 shadow-sm">
                              <UserIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-slate-900 dark:text-white flex items-center gap-1.5 font-medium truncate max-w-[180px]">
                          <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            {user.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full shadow-sm whitespace-nowrap ${
                            user.role === "admin"
                              ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-700"
                              : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
                          }`}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full shadow-sm whitespace-nowrap ${
                            user.status === "active"
                              ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-teal-900/30 dark:to-cyan-900/30 dark:text-teal-300 border border-teal-300 dark:border-teal-700"
                              : "bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-300 border border-red-300 dark:border-red-700"
                          }`}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="text-xs">
                            {new Date(user.$createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                            title="Edit user">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteUser(user.$id, user.email)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete user">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {(showAddModal || editingUser) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-slate-200 dark:border-slate-700 relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditingUser(null);
                resetForm();
              }}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors group">
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-5 flex-shrink-0">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
            </div>

            {/* Form - Scrollable Content */}
            <div className="space-y-3.5 overflow-y-auto flex-1 pr-2">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <UserIcon className="w-3.5 h-3.5" />
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      console.log("Name changed to:", e.target.value);
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all text-sm"
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      console.log("Email changed to:", e.target.value);
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all text-sm"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Role and Status in Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Role Field */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      console.log("Role selected - raw:", e.target.value);
                      console.log("Role selected - trimmed:", value);
                      console.log(
                        "Role char codes:",
                        [...value].map((c) => c.charCodeAt(0)),
                      );
                      setFormData({
                        ...formData,
                        role: value as "admin" | "user",
                      });
                    }}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold transition-all cursor-pointer text-sm">
                    <option value="user">👤 User</option>
                    <option value="admin">⭐ Admin</option>
                  </select>
                </div>

                {/* Status Field */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      console.log("Status selected - raw:", e.target.value);
                      console.log("Status selected - trimmed:", value);
                      console.log(
                        "Status char codes:",
                        [...value].map((c) => c.charCodeAt(0)),
                      );
                      setFormData({
                        ...formData,
                        status: value as "active" | "inactive",
                      });
                    }}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold transition-all cursor-pointer text-sm">
                    <option value="active">✅ Active</option>
                    <option value="inactive">⛔ Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 mt-5 pt-4 border-t-2 border-slate-200 dark:border-slate-700 flex-shrink-0">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  resetForm();
                }}
                className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all font-bold border-2 border-slate-300 dark:border-slate-600 hover:scale-105 active:scale-95">
                Cancel
              </button>
              <button
                onClick={editingUser ? updateUser : createUser}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-bold flex items-center gap-2">
                {editingUser ? (
                  <>
                    <Edit className="w-3.5 h-3.5" />
                    Update User
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    Create User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
