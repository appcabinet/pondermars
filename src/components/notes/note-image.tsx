"use client";

import { useSetAtom } from "jotai";
import Image, { type StaticImageData } from "next/image";
import { imageDialogAtom } from "@/atoms";

interface NoteImageProps {
  src: StaticImageData | string;
  alt: string;
  quality?: "low" | "mid" | "high" | "max";
  children?: React.ReactNode;
}

export default function NoteImage({
  src,
  alt,
  quality = "high",
  children,
}: NoteImageProps) {
  const qualityMap = {
    low: 25,
    mid: 50,
    high: 75,
    max: 100,
  };

  const setImageDialog = useSetAtom(imageDialogAtom);

  return (
    <figure className="not-prose flex flex-col items-center space-y-3 mt-4">
      <button
        type="button"
        onClick={() => setImageDialog({ src, alt })}
        className="cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
      >
        <Image
          width={1000}
          height={1000}
          src={src}
          alt={alt}
          quality={qualityMap[quality]}
          className="w-full h-auto rounded-sm"
        />
      </button>
      {children && (
        <figcaption className="text-sm text-muted-foreground text-center">
          {children}
        </figcaption>
      )}
    </figure>
  );
}
