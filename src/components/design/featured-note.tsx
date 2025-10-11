import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import type { NoteData } from "@/utils/fetch-mdx";
import Subheader from "../structure/subheader";

interface FeaturedNoteProps {
  noteData: NoteData;
}

export function FeaturedNote({ noteData }: FeaturedNoteProps) {
  const frontmatter = noteData.frontmatter;
  const date = DateTime.fromISO(frontmatter.published);
  const url = frontmatter.redirectUrl || `/${noteData.fileName}`;

  return (
    <Link href={url} className="group w-full">
      {frontmatter.coverImage && (
        <div className="flex-shrink-0">
          <Image
            src={frontmatter.coverImage || ""}
            alt={frontmatter.title}
            width={120}
            height={120}
            className="w-12 h-12 md:w-[100px] md:h-[100px] object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <Subheader className="group-hover:text-accent-foreground">{frontmatter.title}</Subheader>

        <div className="text-lg text-muted-foreground opacity-70">
          {date.toLocaleString(DateTime.DATE_MED)} • {frontmatter.readingTime}
        </div>

        <p className="text-lg text-muted-foreground">{frontmatter.description}</p>
      </div>
    </Link>
  );
}
