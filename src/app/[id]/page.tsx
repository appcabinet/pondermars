import { getNote } from "@/utils/fetch-mdx";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { content, frontmatter } = await getNote(id);

  return <div className="prose">{content}</div>;
}