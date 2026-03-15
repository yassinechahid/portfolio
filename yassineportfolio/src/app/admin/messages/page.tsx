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
import LabeledInput from "@/components/LabeledInput";

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

      setMessages(response.documents as unknown as Message[]);
    } catch (error) {
      const err = error as { message?: string; code?: number; type?: string };
      Swal.fire({
        icon: "error",
        title: "Error Loading Messages",
        text: err.message || "Failed to load messages. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const markAsRead = async (messageId: string) => {
    try {
      const updateData = { isRead: true };

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_MESSAGES,
        messageId,
        updateData,
      );

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
      } catch {
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
          <AlertCircle className="w-16 h-16 text-error-light dark:text-error-dark mx-auto mb-4" />
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Messages
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage contact form submissions
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-light-tertiaryContainer px-2 py-1 text-sm font-medium text-light-onTertiaryContainer dark:bg-dark-tertiaryContainer dark:text-dark-onTertiaryContainer">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
        <div className="flex-1 w-full">
          <LabeledInput
            label="Search messages"
            name="messageSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bgColor="bg-white dark:bg-slate-900"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
              filterStatus === "all"
                ? "bg-light-primary text-white shadow-md dark:bg-dark-primary dark:text-dark-onPrimary"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}>
            All
          </button>
          <button
            onClick={() => setFilterStatus("unread")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
              filterStatus === "unread"
                ? "bg-light-primary text-white shadow-md dark:bg-dark-primary dark:text-dark-onPrimary"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}>
            Unread
          </button>
          <button
            onClick={() => setFilterStatus("read")}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
              filterStatus === "read"
                ? "bg-light-primary text-white shadow-md dark:bg-dark-primary dark:text-dark-onPrimary"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}>
            Read
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-light-primary dark:border-dark-primary"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              No messages found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredMessages.map((message) => (
              <div
                key={message.$id}
                className={`p-6 hover:bg-slate-50 dark:hover:bg-slate-800/90 transition-all ${
                  !message.isRead
                    ? "border-l-4 border-light-tertiary bg-light-tertiaryContainer/40 dark:border-dark-tertiary dark:bg-dark-tertiaryContainer/30"
                    : ""
                }`}>
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {message.isRead ? (
                        <CheckCircle className="w-6 h-6 text-success-light dark:text-success-dark" />
                      ) : (
                        <Mail className="w-6 h-6 text-light-tertiary dark:text-dark-tertiary" />
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
                      className="rounded-lg p-2 text-light-primary transition-colors hover:bg-light-primaryContainer dark:text-dark-primary dark:hover:bg-dark-primaryContainer"
                      title="View message">
                      <Eye className="w-5 h-5" />
                    </button>
                    {!message.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(message.$id);
                        }}
                        className="p-2 hover:bg-success-light-container dark:hover:bg-success-dark-container/30 text-success-light dark:text-success-dark rounded-lg transition-colors"
                        title="Mark as read">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.$id);
                      }}
                      className="p-2 hover:bg-error-light-container dark:hover:bg-error-dark-container/20 text-error-light dark:text-error-dark rounded-lg transition-colors"
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
                      className="truncate text-sm hover:text-light-primary dark:hover:text-dark-primary">
                      {message.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`tel:${message.phone}`}
                      className="text-sm hover:text-light-primary dark:hover:text-dark-primary">
                      {message.phone}
                    </a>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
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
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-light-primaryContainer to-light-secondaryContainer border-b border-slate-200 p-6 dark:border-slate-800 dark:from-dark-primaryContainer dark:to-dark-secondaryContainer">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-light-primaryContainer p-3 dark:bg-dark-primaryContainer">
                    <Mail className="w-6 h-6 text-light-primary dark:text-dark-primary" />
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
                    className="font-medium text-light-primary hover:underline dark:text-dark-primary">
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
                    className="font-medium text-light-primary hover:underline dark:text-dark-primary">
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
                      <CheckCircle className="w-5 h-5 text-success-light dark:text-success-dark" />
                      <span className="text-success-light dark:text-success-dark font-medium">
                        Read
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-light-tertiary dark:text-dark-tertiary" />
                      <span className="font-medium text-light-tertiary dark:text-dark-tertiary">
                        Unread
                      </span>
                    </>
                  )}
                </div>
                {!selectedMessage.isRead && (
                  <button
                    onClick={() => markAsRead(selectedMessage.$id)}
                    className="rounded-lg bg-light-primary px-4 py-2 font-medium text-white transition-colors hover:opacity-90 dark:bg-dark-primary dark:text-dark-onPrimary">
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
                className="px-4 py-2 rounded-lg border border-error-light bg-error-light text-error-light-on transition-colors hover:opacity-90 dark:border-error-dark-container dark:bg-error-dark-container dark:text-error-dark-on-container font-medium flex items-center gap-2">
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
