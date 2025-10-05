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
      <table className="w-full border-separate border-spacing-y-0.5 table-fixed">
        <tbody>
          {sortedNotes.map((note) => (
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
                <span className="sm:hidden">-</span>
                <Link href={`/${note.fileName}`} className="block w-full">{note.frontmatter.title}</Link>
              </td>
              <td
                className={cn(
                  "text-right text-muted-foreground opacity-70 text-[15px] w-[80px]",
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
