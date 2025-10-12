"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ParallaxImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const rect = containerRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const parallaxOffset = (scrolled - elementTop) * 0.5;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[30vh] w-full rounded-t-xl overflow-hidden"
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
          willChange: "transform",
        }}
      >
        <Image
          src="/blue-background.webp"
          width={10000}
          height={1000}
          alt="Blue background"
          priority
        />
      </div>
    </div>
  );
}
