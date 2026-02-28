import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { LocaleLayoutProps } from "@/types/children";
import ClientRoot from "@/components/ClientRoot";

export const metadata: Metadata = {
  title: {
    default:
      "Yassine Chahid | Full-Stack Developer - React, Next.js, Laravel Expert",
    template: "%s | Yassine Chahid - Full-Stack Developer",
  },
  description:
    "Full-Stack Developer with 2+ years of experience specializing in React, Next.js, Laravel, and modern web technologies. Building scalable, user-centric web applications with clean code and best practices.",
  keywords: [
    "Yassine Chahid",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "MySQL",
    "Appwrite",
    "Web Development",
    "Portfolio",
    "Morocco Developer",
  ],
  authors: [
    { name: "Yassine Chahid", url: "https://yassinechahid.vercel.app" },
  ],
  creator: "Yassine Chahid",
  publisher: "Yassine Chahid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yassinechahid.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yassinechahid.vercel.app",
    title:
      "Yassine Chahid | Full-Stack Developer - React, Next.js, Laravel Expert",
    description:
      "Full-Stack Developer with 2+ years of experience specializing in React, Next.js, Laravel, and modern web technologies. Building scalable, user-centric web applications.",
    siteName: "Yassine Chahid Portfolio",
    images: [
      {
        url: "/assets/yassine.png",
        width: 1200,
        height: 630,
        alt: "Yassine Chahid - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassine Chahid | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, Laravel. Building modern web applications with clean code.",
    creator: "@2vdUkvownfF8Ian",
    images: ["/assets/yassine.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yassine Chahid",
    url: "https://yassinechahid.vercel.app",
    image: "https://yassinechahid.vercel.app/assets/yassine.png",
    sameAs: [
      "https://github.com/yassinechahid",
      "https://www.linkedin.com/in/yassine-chahid-15ab54354",
      "https://x.com/2vdUkvownfF8Ian",
    ],
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description:
      "Full-Stack Developer with 2+ years of experience specializing in React, Next.js, Laravel, and modern web technologies.",
    knowsAbout: [
      "React",
      "Next.js",
      "Laravel",
      "JavaScript",
      "TypeScript",
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Bootstrap",
      "Appwrite",
      "RESTful APIs",
      "Web Development",
    ],
    email: "chahidyassine14@gmail.com",
    telephone: "+212658188142",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Morocco",
    },
  };

  return (
    <html lang="fr">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Yassine Chahid" />

        {/* Favicon */}
        <link rel="icon" href="/assets/yassine.png" />
        <link rel="apple-touch-icon" href="/assets/yassine.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YM64DRCL8V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YM64DRCL8V');
          `}
        </Script>
      </head>

      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
