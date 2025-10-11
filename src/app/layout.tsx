import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { bodyFont } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Ponder Mars",
  description: "Notes, articles, and essays",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(bodyFont.className, "antialiased bg-background")}
      >
        {children}
      </body>
    </html>
  );
}
