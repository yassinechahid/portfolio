"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const CONTACT_EMAIL = "hello@example.com";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, you would send this data to your backend
      console.log("Form Data:", data);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. I'll get back to you soon!",
        confirmButtonColor: "#6366f1",
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ];

  return (
    <div>
      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {contactMethods.map((method, idx) => (
          <a
            key={idx}
            href={method.href}
            className="p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary transition-colors"
          >
            <div className="text-light-primary dark:text-dark-primary mb-4">
              {method.icon}
            </div>
            <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-2">
              {method.label}
            </h3>
            <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              {method.value}
            </p>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-8 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow"
        >
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-8">
            Send Me a Message
          </h2>

          {/* Name */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-colors"
            />
            {errors.name && (
              <p className="text-body-small text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-colors"
            />
            {errors.email && (
              <p className="text-body-small text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-colors"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="Project inquiry, collaboration, etc."
              {...register("subject", { required: "Subject is required" })}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-colors"
            />
            {errors.subject && (
              <p className="text-body-small text-red-500 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Message
            </label>
            <textarea
              placeholder="Tell me about your project or inquiry..."
              rows={5}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-colors resize-none"
            />
            {errors.message && (
              <p className="text-body-small text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 disabled:opacity-50 transition-opacity text-label-large font-medium"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
