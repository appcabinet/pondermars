import { DateTime } from 'luxon';
import Image from 'next/image';

interface FeaturedNoteProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  duration: string;
  date: DateTime;
}

export function FeaturedNote({ 
  imageSrc, 
  title, 
  subtitle, 
  duration, 
  date 
}: FeaturedNoteProps) {
  return (
    <div className="w-full flex gap-4 md:gap-6">
      <div className="flex-shrink-0">
        <Image
          src={imageSrc}
          alt={title}
          width={128}
          height={128}
          className="w-12 h-12 md:w-30 md:h-30 object-cover"
        />
      </div>
      
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <h3 className="text-lg font-semibold leading-tight">
          {title}
        </h3>
        
        <div className="text-base text-muted-foreground opacity-70">
          {date.toLocaleString(DateTime.DATE_MED)} • {duration}
        </div>
        
        <p className="text-base text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
