import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import Script from "next/script";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burger Lab Menu | Online Ordering",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src={process.env.FONT_AWESOME_SCRIPT} crossOrigin="anonymous" />
      <body
        className={cn(
          "flex min-h-screen flex-col bg-primaryBg",
          inter.className
        )}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-left" />
        </Providers>
      </body>
    </html>
  );
}
