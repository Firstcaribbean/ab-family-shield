import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PwaRegister } from "../components/pwa-register";

export const metadata: Metadata = {
  title: "AB Family Shield",
  description: "Family safety app prototype with mobile-first monitoring flows.",
  manifest: "/manifest.webmanifest",
  applicationName: "AB Family Shield",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AB Family Shield"
  },
  themeColor: "#1f6fff",
  icons: {
    apple: "/apple-icon",
    icon: [
      { url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml" }
    ]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
