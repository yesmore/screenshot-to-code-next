import "@/styles/globals.css";

import { Metadata } from "next";
import { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import GoogleAnalytics from "@/components/layouts/GoogleAnalytics";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  // themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  manifest: siteConfig.manifest,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
