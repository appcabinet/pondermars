import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import { bodyFont } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Marcelo Mantilla",
  description: "Notes, articles, and essays",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root options={{
        smoothWheel: true,
        duration: 0.3,
      }} />
      <body className={cn(bodyFont.className, "antialiased bg-background")}>
        {children}
      </body>
    </html>
  );
}
