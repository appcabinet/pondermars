import { DateTime } from "luxon";
import Image from "next/image";
import type { Note } from "@/utils/fetch-mdx";
import Subheader from "../structure/subheader";

interface FeaturedNoteProps {
  note: Note;
}

export function FeaturedNote({ note }: FeaturedNoteProps) {
  const date = DateTime.fromISO(note.published);

  return (
    <div className="w-full flex gap-4 md:gap-6">
      {note.coverImage && (
        <div className="flex-shrink-0">
          <Image
            src={note.coverImage || ""}
            alt={note.title}
            width={120}
            height={120}
            className="w-12 h-12 md:w-[100px] md:h-[100px] object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Subheader>{note.title}</Subheader>

        <div className="text-[17px] text-muted-foreground opacity-70">
          {date.toLocaleString(DateTime.DATE_MED)} • {note.readingTime}
        </div>

        <p className="text-lg text-muted-foreground">{note.description}</p>
      </div>
    </div>
  );
}
