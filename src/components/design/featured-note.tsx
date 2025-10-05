import { DateTime } from 'luxon';
import Image from 'next/image';
import Subheader from '../structure/subheader';

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
          className="w-12 h-12 md:w-[112px] md:h-[112px] object-cover"
        />
      </div>
      
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Subheader>
          {title}
        </Subheader>

        <div className="text-lg text-muted-foreground opacity-70">
          {date.toLocaleString(DateTime.DATE_MED)} • {duration}
        </div>
        
        <p className="text-lg text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
