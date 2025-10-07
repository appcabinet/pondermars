import Image, { StaticImageData } from 'next/image'

interface NoteImageProps {
  src: StaticImageData | string
  alt: string
  quality?: 'low' | 'mid' | 'high' | 'max'
  children?: React.ReactNode
}

export default function NoteImage({
  src,
  alt,
  quality = 'high',
  children
}: NoteImageProps) {
  const qualityMap = {
    low: 25,
    mid: 50,
    high: 75,
    max: 100
  }

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        quality={qualityMap[quality]}
        className="w-full h-auto"
      />
      {children && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          {children}
        </figcaption>
      )}
    </figure>
  )
}
