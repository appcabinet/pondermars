import { getNote } from "@/utils/fetch-mdx";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { content, frontmatter } = await getNote(id);

  return (
    <main className="prose">
      <div className="w-full mx-auto md:max-w-5xl">
        <div className="w-full md:max-w-2xl">
        {content}
        </div>
      </div>
    </main>
  );
}