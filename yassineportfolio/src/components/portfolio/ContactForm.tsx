"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Send, ChevronDown } from "lucide-react";
import Swal from "sweetalert2";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const COUNTRIES = [
  { code: "MA", name: "Morocco", dial: "+212" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "DZ", name: "Algeria", dial: "+213" },
  { code: "TN", name: "Tunisia", dial: "+216" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "AE", name: "UAE", dial: "+971" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CO", name: "Colombia", dial: "+57" },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    const fullPhone = data.phone
      ? `${selectedCountry.dial} ${data.phone}`
      : "Not provided";

    const text =
      `📩 New Contact from Portfolio\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${fullPhone}\n` +
      `Subject: ${data.subject}\n\n` +
      `Message:\n${data.message}`;

    try {
      // Send email via API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: fullPhone,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      // Send via WhatsApp
      const waUrl = `https://wa.me/212658188142?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent to my email and WhatsApp!",
        confirmButtonColor: "#6366f1",
      });

      reset();
    } catch {
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

  return (
    <div>
      {/* Contact Form */}
      <div className="p-8 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground">
            Send Me a Message
          </h2>

          {/* Name */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-light-primary/20 dark:focus:ring-dark-primary/20 transition-all"
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
              Email Address <span className="text-red-500">*</span>
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
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-light-primary/20 dark:focus:ring-dark-primary/20 transition-all"
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
              Phone Number{" "}
              <span className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-body-small">
                (Optional)
              </span>
            </label>
            <div className="flex items-stretch rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background focus-within:border-light-primary dark:focus-within:border-dark-primary focus-within:ring-2 focus-within:ring-light-primary/20 dark:focus-within:ring-dark-primary/20 transition-all">
              {/* Country Selector */}
              <div ref={dropdownRef} className="relative flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 h-full px-3 border-r border-light-outline dark:border-dark-outline hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-colors rounded-l-lg"
                >
                  <span className="text-body-small font-medium text-light-onBackground dark:text-dark-onBackground">
                    {selectedCountry.name}
                  </span>
                  <span className="text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                    {selectedCountry.dial}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant" />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 max-h-60 overflow-y-auto rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background shadow-xl z-50">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-colors ${
                          selectedCountry.code === country.code
                            ? "bg-light-primaryContainer dark:bg-dark-primaryContainer"
                            : ""
                        }`}
                      >
                        <span className="text-body-small text-light-onBackground dark:text-dark-onBackground">
                          {country.name}
                        </span>
                        <span className="text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant ml-auto">
                          {country.dial}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Phone Input */}
              <input
                type="tel"
                placeholder="6XX XXX XXX"
                {...register("phone")}
                className="flex-1 px-3 py-3 bg-transparent text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Project inquiry, collaboration, etc."
              {...register("subject", { required: "Subject is required" })}
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-light-primary/20 dark:focus:ring-dark-primary/20 transition-all"
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
              Message <span className="text-red-500">*</span>
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
              className="w-full px-4 py-3 rounded-lg border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-light-onBackground dark:text-dark-onBackground placeholder-light-onSurfaceVariant dark:placeholder-dark-onSurfaceVariant focus:outline-none focus:border-light-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-light-primary/20 dark:focus:ring-dark-primary/20 transition-all resize-none"
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
            className="w-full mt-8 flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-label-large font-medium"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
