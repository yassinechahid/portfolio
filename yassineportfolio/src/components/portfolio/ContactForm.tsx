/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { databases, IDGenerator } from "@/lib/appwrite";
import { DATABASE_ID, COLLECTION_MESSAGES } from "@/lib/appwrite";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import Swal from "sweetalert2";
import LabeledInput from "@/components/LabeledInput";
import LabeledTextArea from "@/components/LabeledTextArea";
import PhoneNumberInputField from "@/components/PhoneNumberInputField";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const formValues = watch();

  // Clear error when field becomes valid
  const handleNameChange = (value: string) => {
    setValue("name", value);
    if (
      errors.name &&
      value.trim() &&
      value.trim().length >= 2 &&
      value.trim().length <= 100
    ) {
      clearErrors("name");
    }
  };

  const handleEmailChange = (value: string) => {
    setValue("email", value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (errors.email && value.trim() && emailRegex.test(value.trim())) {
      clearErrors("email");
    }
  };

  const handlePhoneChange = (value: string) => {
    setValue("phone", value);
    if (errors.phone && (!value || value.trim().length >= 8)) {
      clearErrors("phone");
    }
  };

  const handleSubjectChange = (value: string) => {
    setValue("subject", value);
    if (
      errors.subject &&
      value.trim() &&
      value.trim().length >= 3 &&
      value.trim().length <= 200
    ) {
      clearErrors("subject");
    }
  };

  const handleMessageChange = (value: string) => {
    setValue("message", value);
    if (
      errors.message &&
      value.trim() &&
      value.trim().length >= 10 &&
      value.trim().length <= 2000
    ) {
      clearErrors("message");
    }
  };

  // Validation function for form submission - validates all fields at once
  const validateForm = (data: ContactFormData): boolean => {
    let isValid = true;

    // Name validation
    if (!data.name.trim()) {
      setError("name", { type: "required", message: "Name is required" });
      isValid = false;
    } else if (data.name.trim().length < 2) {
      setError("name", {
        type: "minLength",
        message: "Name must be at least 2 characters",
      });
      isValid = false;
    } else if (data.name.trim().length > 100) {
      setError("name", {
        type: "maxLength",
        message: "Name must not exceed 100 characters",
      });
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      setError("email", { type: "required", message: "Email is required" });
      isValid = false;
    } else if (!emailRegex.test(data.email.trim())) {
      setError("email", { type: "pattern", message: "Invalid email format" });
      isValid = false;
    }

    // Phone validation (optional but if provided, must be valid)
    if (data.phone && data.phone.trim()) {
      if (data.phone.trim().length < 8) {
        setError("phone", {
          type: "minLength",
          message: "Phone number must be at least 8 digits",
        });
        isValid = false;
      }
    }

    // Subject validation
    if (!data.subject.trim()) {
      setError("subject", { type: "required", message: "Subject is required" });
      isValid = false;
    } else if (data.subject.trim().length < 3) {
      setError("subject", {
        type: "minLength",
        message: "Subject must be at least 3 characters",
      });
      isValid = false;
    } else if (data.subject.trim().length > 200) {
      setError("subject", {
        type: "maxLength",
        message: "Subject must not exceed 200 characters",
      });
      isValid = false;
    }

    // Message validation
    if (!data.message.trim()) {
      setError("message", { type: "required", message: "Message is required" });
      isValid = false;
    } else if (data.message.trim().length < 10) {
      setError("message", {
        type: "minLength",
        message: "Message must be at least 10 characters",
      });
      isValid = false;
    } else if (data.message.trim().length > 2000) {
      setError("message", {
        type: "maxLength",
        message: "Message must not exceed 2000 characters",
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: ContactFormData) => {
    // Clear previous errors
    clearErrors();

    // Validate all fields at once
    if (!validateForm(data)) {
      // Don't show any alert, just let the error messages appear below fields
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare document for Appwrite
      const timestamp = Date.now();
      const documentData = {
        // Integer ID fields
        id: timestamp,
        senderId: timestamp + 1,
        receiverId: timestamp + 2,

        // Contact information
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone || "",
        message: `Subject: ${data.subject.trim()}\n\n${data.message.trim()}`,
        content: `Subject: ${data.subject.trim()}\n\n${data.message.trim()}`,

        // Metadata
        isRead: false,
        sentAt: new Date().toISOString(),
      };

      // Save to Appwrite Database
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_MESSAGES,
        IDGenerator.unique(),
        documentData,
      );

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        html: `
          <div class="text-left">
            <p class="mb-2">✓ Message saved to database</p>
            <p class="text-sm text-gray-600 mt-4">Thank you for reaching out. I'll get back to you soon!</p>
          </div>
        `,
        confirmButtonColor: "#6366f1",
        confirmButtonText: "Great!",
        timer: 5000,
        timerProgressBar: true,
      });

      // Reset form
      reset();
    } catch (error: any) {
      console.error("Form submission error:", error);

      // User-friendly error message
      let errorMessage = "Failed to send message. Please try again.";

      if (error?.code === 401) {
        errorMessage = "Permission denied. Please try again later.";
      } else if (error?.code === 404) {
        errorMessage = "Database connection issue. Please try again.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh border border-light-outlineVariant dark:border-dark-outlineVariant">
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div className="space-y-2 mb-8">
              <h2 className="text-headline-large font-bold text-light-onSurface dark:text-dark-onSurface">
                Send Me a Message
              </h2>
              <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                Fill out the form below and I&apos;ll get back to you soon.
              </p>
            </div>

            {/* Name and Email - Two columns on larger screens */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <LabeledInput
                  label="Full Name *"
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  isError={!!errors.name}
                  isDisabled={isSubmitting}
                  bgColor="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh"
                />
                {errors.name && (
                  <p className="text-body-small text-red-500 mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <LabeledInput
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  isError={!!errors.email}
                  isDisabled={isSubmitting}
                  bgColor="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh"
                />
                {errors.email && (
                  <p className="text-body-small text-red-500 mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone and Subject - Two columns on larger screens */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <PhoneNumberInputField
                  value={formValues.phone || ""}
                  onChange={(value) => handlePhoneChange(value)}
                  error={errors.phone?.message}
                  label="Phone Number (Optional)"
                />
              </div>

              <div>
                <LabeledInput
                  label="Subject *"
                  name="subject"
                  type="text"
                  value={formValues.subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  isError={!!errors.subject}
                  isDisabled={isSubmitting}
                  bgColor="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh"
                />
                {errors.subject && (
                  <p className="text-body-small text-red-500 mt-1.5">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message - Full width */}
            <div>
              <LabeledTextArea
                label="Message *"
                name="message"
                value={formValues.message}
                onChange={(e) => handleMessageChange(e.target.value)}
                isError={!!errors.message}
                isDisabled={isSubmitting}
                bgColor="bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh"
              />
              {errors.message && (
                <p className="text-body-small text-red-500 mt-1.5">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-300 text-label-large font-medium">
                <Send
                  className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`}
                />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
