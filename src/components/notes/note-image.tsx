import Image, { type StaticImageData } from "next/image";

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

  return (
    <figure className="not-prose flex flex-col items-center space-y-3">
      <Image
        width={1000}
        height={1000}
        src={src}
        alt={alt}
        quality={qualityMap[quality]}
        className="w-full h-auto"
      />
      {children && (
        <figcaption className="text-sm text-muted-foreground text-center">
          {children}
        </figcaption>
      )}
    </figure>
  );
}
