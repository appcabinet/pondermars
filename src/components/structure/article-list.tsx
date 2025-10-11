import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NoteData } from "@/utils/fetch-mdx";
import Subheader from "./subheader";

const geistMono = Geist_Mono({ subsets: ["latin"] });

function formatReadingTime(readingTime: string | undefined): string {
  if (!readingTime) return "";
  return readingTime.replaceAll(" ", "").replace("min", "m");
}

export default async function ArticleList({ notes }: { notes: NoteData[] }) {
  return (
    <div className="flex flex-col gap-8">
      <Subheader>Writing</Subheader>
      <table className="w-full border-separate border-spacing-y-1 sm:border-spacing-y-2 table-fixed">
        <tbody>
          {notes.map((note) => (
            <tr key={note.frontmatter.title}>
              <td
                className={cn(
                  "hidden sm:table-cell text-muted-foreground opacity-70 sm:w-[120px]",
                  geistMono.className,
                )}
              >
                {note.frontmatter.published}
              </td>
              <td className="text-lg hover:text-accent-foreground w-full">
                <div className="flex items-center gap-0 min-w-0">
                  <span className="sm:hidden pr-4 opacity-70 flex-shrink-0">•</span>
                  <Link href={`/${note.fileName}`} className="truncate">{note.frontmatter.title}</Link>
                </div>
              </td>
              <td
                className={cn(
                  "text-right text-muted-foreground opacity-70 text-[15px] sm:w-[80px] w-[40px]",
                  geistMono.className,
                )}
              >
                <span className="hidden sm:inline">
                  {note.frontmatter.readingTime}
                </span>
                <span className="inline sm:hidden">
                  {formatReadingTime(note.frontmatter.readingTime)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
