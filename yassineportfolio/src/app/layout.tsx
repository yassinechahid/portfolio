import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { LocaleLayoutProps } from "@/types/children";
import ClientRoot from "@/components/ClientRoot";

export const metadata: Metadata = {
  title: "YassineDev",
  description:
    "YassineDev, la solution innovante pour faciliter l'accès aux soins !",
};

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <html lang="fr">
      <head>
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
