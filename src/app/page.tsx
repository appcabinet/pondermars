import Link from "next/link";
import { FeaturedNote } from "@/components/design/featured-note";
import ArticleList from "@/components/structure/article-list";
import Divider from "@/components/structure/divider";
import MainLayout from "@/components/structure/main-layout";
import NewsletterSubscribe from "@/components/structure/newsletter-subscribe";
import { getNotes } from "@/utils/fetch-mdx";

export default async function Home() {
  const notes = await getNotes();
  const latestNote = notes.sort((a, b) =>
    new Date(b.frontmatter.published).getTime() - new Date(a.frontmatter.published).getTime()
  )[0];

  return (
    <MainLayout>
      <div className="flex-col md:flex-row flex justify-between items-start md:items-center gap-4">
        <Link href="/" className="text-lg font-semibold text-muted-foreground">
          Marcelo Mantilla
        </Link>
        <div className="flex items-center gap-4 text-lg hidden">
          <Link
            href="/"
            className="hover:text-accent-foreground opacity-70 hover:opacity-100"
          >
            music
          </Link>
          <Link
            href="/"
            className="hover:text-accent-foreground opacity-70 hover:opacity-100"
          >
            reading
          </Link>
          <Link
            href="/"
            className="hover:text-accent-foreground opacity-70 hover:opacity-100"
          >
            story
          </Link>
        </div>
      </div>
      <div>
        <p className="text-lg">
          Software engineer, designer, and creative writer. Passionate about crafting digital experiences others love. Currently the founder & CTO of Maxed.
        </p>
      </div>
      <Divider />
      <FeaturedNote note={latestNote.frontmatter} />
      <Divider />
      <ArticleList />
      <Divider />
      <NewsletterSubscribe />
    </MainLayout>
  );
}
