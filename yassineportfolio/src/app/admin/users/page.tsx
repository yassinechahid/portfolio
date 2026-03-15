/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
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
  Edit,
  Trash2,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LabeledInput from "@/components/LabeledInput";
import PhoneNumberInputField from "@/components/PhoneNumberInputField";

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
  const isDialogOpen = showAddModal || Boolean(editingUser);

  // Form state - MATCHES YOUR COLLECTION EXACTLY
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user" as "admin" | "user",
    status: "active" as "active" | "inactive",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_USERS,
        [QueryBuilder.orderDesc("$createdAt")],
      );
      setUsers(response.documents as unknown as User[]);
    } catch {
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

      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || "",
        role: cleanRole,
        status: cleanStatus,
      };

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
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `
        <div class="text-left">
          <p class="font-bold">Failed to create user</p>
          <p class="text-sm mt-2">Role sent: "${formData.role}"</p>
          <p class="text-sm">Status sent: "${formData.status}"</p>
        </div>
      `,
        confirmButtonColor: "#6366f1",
      });
    }
  };

  const updateUser = async () => {
    if (!editingUser) return;

    try {
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || "",
        role: formData.role.trim() as "admin" | "user",
        status: formData.status.trim() as "active" | "inactive",
      };

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_USERS,
        editingUser.$id,
        dataToSend,
      );

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
        await databases.deleteDocument(DATABASE_ID, COLLECTION_USERS, userId);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "User deleted successfully",
          confirmButtonColor: "#6366f1",
          timer: 3000,
        });

        fetchUsers();
      } catch {
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

  const closeDialog = () => {
    setShowAddModal(false);
    setEditingUser(null);
    resetForm();
  };

  // Edit user
  const handleEdit = (user: User) => {
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

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-flex p-6 bg-gradient-to-br from-error-light-container to-warning-light-container dark:from-error-dark-container/30 dark:to-warning-dark-container/30 rounded-2xl mb-4 border-2 border-error-light-container dark:border-error-dark-container shadow-lg">
            <Shield className="w-16 h-16 text-error-light dark:text-error-dark" />
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
    <div className="max-w-full overflow-hidden space-y-6">
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
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-light-primary to-light-secondary px-5 py-2.5 font-bold text-white transition-all shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 dark:from-dark-primary dark:to-dark-secondary dark:text-dark-onPrimary">
            <Plus className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-800 p-5">
        <LabeledInput
          label="Search users by name or email"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bgColor="bg-white dark:bg-slate-900"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="mb-4 inline-flex rounded-full bg-light-primaryContainer p-4 dark:bg-dark-primaryContainer">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-light-primary border-t-transparent dark:border-dark-primary" />
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
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-light-outlineVariant bg-gradient-to-br from-light-primaryContainer to-light-secondaryContainer shadow-sm dark:border-dark-outlineVariant dark:from-dark-primaryContainer dark:to-dark-secondaryContainer">
                              <UserIcon className="h-5 w-5 text-light-primary dark:text-dark-primary" />
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
                              ? "border border-light-outlineVariant bg-light-primaryContainer text-light-onPrimaryContainer dark:border-dark-outlineVariant dark:bg-dark-primaryContainer dark:text-dark-onPrimaryContainer"
                              : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
                          }`}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full shadow-sm whitespace-nowrap ${
                            user.status === "active"
                              ? "border border-light-secondaryContainer bg-light-secondaryContainer text-light-onSecondaryContainer dark:border-dark-secondaryContainer dark:bg-dark-secondaryContainer dark:text-dark-onSecondaryContainer"
                              : "border border-error-light-container bg-error-light-container text-error-light-on-container dark:border-error-dark-container dark:bg-error-dark-container/30 dark:text-error-dark"
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
                            className="rounded-lg p-2 text-light-primary transition-all hover:bg-light-primaryContainer hover:text-light-primary dark:text-dark-primary dark:hover:bg-dark-primaryContainer dark:hover:text-dark-primary"
                            title="Edit user">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteUser(user.$id, user.email)}
                            className="text-error-light hover:text-error-light dark:text-error-dark dark:hover:text-error-dark p-2 hover:bg-error-light-container dark:hover:bg-error-dark-container/20 rounded-lg transition-all"
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

      {/* Add/Edit User Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          className:
            "!rounded-2xl !border-2 !border-slate-200 dark:!border-slate-800 !bg-white dark:!bg-slate-900",
        }}>
        <DialogTitle className="!p-6 !pb-3 !font-black !text-2xl !text-slate-900 dark:!text-white !flex !items-center !justify-between">
          <span>{editingUser ? "Edit User" : "Add New User"}</span>
          <IconButton onClick={closeDialog} aria-label="Close dialog">
            <X className="h-5 w-5 text-slate-500 dark:text-slate-300" />
          </IconButton>
        </DialogTitle>

        <DialogContent className="!px-6 !py-3 !overflow-y-auto">
          <div className="space-y-4 py-1">
            <LabeledInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleFormInputChange}
              bgColor="bg-white dark:bg-slate-900"
            />

            <LabeledInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormInputChange}
              bgColor="bg-white dark:bg-slate-900"
            />

            <PhoneNumberInputField
              value={formData.phone}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: value,
                }))
              }
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Shield className="h-3.5 w-3.5" />
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setFormData((prev) => ({
                      ...prev,
                      role: value as "admin" | "user",
                    }));
                  }}
                  className="w-full cursor-pointer rounded-lg border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 transition-all focus:border-light-primary focus:outline-none focus:ring-2 focus:ring-light-primary/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-dark-primary dark:focus:ring-dark-primary/20">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Calendar className="h-3.5 w-3.5" />
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setFormData((prev) => ({
                      ...prev,
                      status: value as "active" | "inactive",
                    }));
                  }}
                  className="w-full cursor-pointer rounded-lg border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 transition-all focus:border-light-primary focus:outline-none focus:ring-2 focus:ring-light-primary/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-dark-primary dark:focus:ring-dark-primary/20">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="!px-6 !pb-6 !pt-3 !border-t-2 !border-slate-200 dark:!border-slate-700 !gap-2.5">
          <button
            onClick={closeDialog}
            className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all font-bold border-2 border-slate-300 dark:border-slate-600">
            Cancel
          </button>
          <button
            onClick={editingUser ? updateUser : createUser}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-light-primary to-light-secondary px-4 py-2 text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl dark:from-dark-primary dark:to-dark-secondary dark:text-dark-onPrimary">
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
