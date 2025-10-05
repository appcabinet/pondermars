import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getNotes } from "@/utils/fetch-mdx";
import Subheader from "./subheader";

const geistMono = Geist_Mono({ subsets: ["latin"] });

function formatReadingTime(readingTime: string | undefined): string {
  if (!readingTime) return "";
  return readingTime.replaceAll(" ", "").replace("min", "m");
}

export default async function ArticleList() {
  const notes = await getNotes();

  const sortedNotes = notes.sort((a, b) => {
    return (
      new Date(b.frontmatter.published).getTime() -
      new Date(a.frontmatter.published).getTime()
    );
  });

  return (
    <div className="flex flex-col gap-8">
      <Subheader>Writing</Subheader>
      <table className="w-full border-separate border-spacing-y-1">
        <tbody>
          {sortedNotes.map((note) => (
            <tr key={note.frontmatter.title}>
              <td
                className={cn(
                  "hidden md:table-cell text-muted-foreground opacity-70",
                  geistMono.className,
                )}
              >
                {note.frontmatter.published}
              </td>
              <td>
                <Link href={`/${note.fileName}`}>{note.frontmatter.title}</Link>
              </td>
              <td
                className={cn(
                  "text-right text-muted-foreground opacity-70",
                  geistMono.className,
                )}
              >
                <span className="hidden md:inline">
                  {note.frontmatter.readingTime}
                </span>
                <span className="inline md:hidden">
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
