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
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don&#39;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage system users and their permissions
          </p>
        </div>
        <div className="flex gap-2">
          {/* Debug Button - Only visible in development */}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={debugHardcodedCreate}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
              <span className="text-xs">🐛</span>
              Test Create
            </button>
          )}
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading users...
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        {searchTerm
                          ? "No users found matching your search"
                          : "No users yet"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.$id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {user.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}>
                          {user.role === "admin" ? "Administrator" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(user.$createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.$id, user.email)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <Trash2 className="w-5 h-5" />
                        </button>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    console.log("Name changed to:", e.target.value);
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    console.log("Email changed to:", e.target.value);
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+212 600000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Cancel
              </button>
              <button
                onClick={editingUser ? updateUser : createUser}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                {editingUser ? "Update User" : "Create User"}
              </button>
            </div>

            {/* Debug Info - Only visible in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                <p className="font-bold mb-1">🔧 Debug Info:</p>
                <p>
                  Role: {formData.role} ({typeof formData.role})
                </p>
                <p>
                  Status: {formData.status} ({typeof formData.status})
                </p>
                <p>
                  Char codes: Role=
                  {[...formData.role].map((c) => c.charCodeAt(0)).join(",")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
