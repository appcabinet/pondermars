import { getNotes } from "@/utils/fetch-mdx";
import { redirect } from "next/navigation";

export async function GET() {
  const notes = await getNotes();
  
  const sortedNotes = notes.toSorted(
    (a, b) =>
      new Date(b.frontmatter.published).getTime() -
      new Date(a.frontmatter.published).getTime(),
  );

  const latestNote = sortedNotes[0];

  if (!latestNote) {
    redirect("/");
  }

  redirect(`/${latestNote.fileName}`);
}

