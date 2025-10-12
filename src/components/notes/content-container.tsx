"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { bodyFont } from "@/utils/fonts";

export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "w-full max-w-2xl prose-lg md:text-justify",
        bodyFont.className,
      )}
    >
      {children}
    </article>
  );
}
