"use client";

import { useState, useEffect } from "react";
import {
  databases,
  QueryBuilder,
  DATABASE_ID,
  COLLECTION_MESSAGES,
} from "@/lib/appwrite";

import Swal from "sweetalert2";
import {
  Search,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Eye,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  $id: string;
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
  isRead: boolean;
  name: string;
  email: string;
  message: string;
  phone: string;
  $createdAt: string;
  $updatedAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">(
    "all",
  );
  const { isAdmin } = useAuth();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      console.log(
        "🔍 Fetching messages from:",
        DATABASE_ID,
        COLLECTION_MESSAGES,
      );

      const queries = [QueryBuilder.orderDesc("$createdAt")];

      if (filterStatus === "read") {
        queries.push(QueryBuilder.equal("isRead", true));
      } else if (filterStatus === "unread") {
        queries.push(QueryBuilder.equal("isRead", false));
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_MESSAGES,
        queries,
      );

      console.log("✅ Messages fetched:", response.total, "messages");
      console.log("📧 Documents:", response.documents);

      setMessages(response.documents as unknown as Message[]);
    } catch (error) {
      const err = error as { message?: string; code?: number; type?: string };
      console.error("❌ Error fetching messages:", error);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        type: err.type,
      });
      Swal.fire({
        icon: "error",
        title: "Error Loading Messages",
        text:
          err.message ||
          "Failed to load messages. Please check console for details.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔐 Is Admin:", isAdmin);
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const markAsRead = async (messageId: string) => {
    try {
      console.log("📝 Marking message as read:", messageId);

      const updateData = { isRead: true };
      console.log("Update data:", updateData);

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_MESSAGES,
        messageId,
        updateData,
      );

      console.log("✅ Message marked as read successfully");

      setMessages((prev) =>
        prev.map((msg) =>
          msg.$id === messageId ? { ...msg, isRead: true } : msg,
        ),
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Message marked as read",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      const err = error as { message?: string; code?: number; type?: string };
      console.error("❌ Error marking message as read:", error);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        type: err.type,
      });

      let errorMsg = "Failed to update message status";
      if (err.code === 401) {
        errorMsg =
          "Permission denied. Please check Appwrite permissions for UPDATE.";
      } else if (err.message) {
        errorMsg = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await databases.deleteDocument(
          DATABASE_ID,
          COLLECTION_MESSAGES,
          messageId,
        );

        setMessages((prev) => prev.filter((msg) => msg.$id !== messageId));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Message has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting message:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete message",
        });
      }
    }
  };

  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.$id);
    }
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You don&apos;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Debug Panel (Remove after testing) */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
        <h3 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">
          🔍 Debug Info (Check Browser Console)
        </h3>
        <div className="text-sm space-y-1 text-yellow-800 dark:text-yellow-300">
          <p>Database ID: {DATABASE_ID}</p>
          <p>Collection ID: {COLLECTION_MESSAGES}</p>
          <p>Is Admin: {String(isAdmin)}</p>
          <p>Messages Count: {messages.length}</p>
          <p>Loading: {String(loading)}</p>
          <p>Filter: {filterStatus}</p>
          <button
            onClick={fetchMessages}
            className="mt-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
            🔄 Manually Refresh Messages
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Messages
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage contact form submissions
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
              filterStatus === "all"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}>
            All
          </button>
          <button
            onClick={() => setFilterStatus("unread")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
              filterStatus === "unread"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}>
            Unread
          </button>
          <button
            onClick={() => setFilterStatus("read")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
              filterStatus === "read"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}>
            Read
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              No messages found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredMessages.map((message) => (
              <div
                key={message.$id}
                className={`p-6 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all ${
                  !message.isRead
                    ? "bg-teal-50/50 dark:bg-teal-900/10 border-l-4 border-teal-500"
                    : ""
                }`}>
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {message.isRead ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <h3
                          className={`text-lg truncate ${
                            !message.isRead
                              ? "text-slate-900 dark:text-white font-bold"
                              : "text-slate-700 dark:text-slate-300 font-semibold"
                          }`}>
                          {message.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>
                          {new Date(message.$createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => viewMessage(message)}
                      className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg transition-colors"
                      title="View message">
                      <Eye className="w-5 h-5" />
                    </button>
                    {!message.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(message.$id);
                        }}
                        className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg transition-colors"
                        title="Mark as read">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.$id);
                      }}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                      title="Delete message">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 min-w-0">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`mailto:${message.email}`}
                      className="text-sm hover:text-teal-600 dark:hover:text-teal-400 truncate">
                      {message.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`tel:${message.phone}`}
                      className="text-sm hover:text-teal-600 dark:hover:text-teal-400">
                      {message.phone}
                    </a>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                    {message.message || message.content || "No message"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}>
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-b border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
                    <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Message Details
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {new Date(selectedMessage.$createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-2xl font-bold">
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Sender Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Name</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-semibold">
                    {selectedMessage.name}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                    {selectedMessage.phone}
                  </a>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Sent At</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {new Date(selectedMessage.$createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-3">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Message</span>
                </div>
                <p className="text-slate-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message || selectedMessage.content}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  {selectedMessage.isRead ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Read
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-teal-600" />
                      <span className="text-teal-600 dark:text-teal-400 font-medium">
                        Unread
                      </span>
                    </>
                  )}
                </div>
                {!selectedMessage.isRead && (
                  <button
                    onClick={() => markAsRead(selectedMessage.$id)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium">
                    Mark as Read
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
              <button
                onClick={() => {
                  deleteMessage(selectedMessage.$id);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Message
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
