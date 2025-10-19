import Link from "next/link";
import { FeaturedNote } from "@/components/design/featured-note";
import ArticleList from "@/components/structure/article-list";
import Divider from "@/components/structure/divider";
import Header from "@/components/structure/header";
import MainLayout from "@/components/structure/main-layout";
import NewsletterSubscribe from "@/components/structure/newsletter-subscribe";
import { cn } from "@/lib/utils";
import { getNotes } from "@/utils/fetch-mdx";
import Music from "@/components/design/music";

export default async function Home() {
  const notes = await getNotes();
  const sortedNotes = notes.toSorted(
    (a, b) =>
      new Date(b.frontmatter.published).getTime() -
      new Date(a.frontmatter.published).getTime(),
  );
  const [latestNote, ...remainingNotes] = sortedNotes;

  return (
    <MainLayout>
      <div className="flex-col md:flex-row flex justify-between items-start md:items-center gap-4">
        <Link href="/" className="">
          <Header>Marcelo Mantilla</Header>
        </Link>
      </div>
      <div>
        <p className={cn("text-lg leading-tight")}>
          Software engineer, composer, and creative writer. Passionate about
          crafting digital experiences others love. Currently the founder & CTO
          of Maxed.
        </p>
      </div>
      <Divider />
      <FeaturedNote noteData={latestNote} />
      <Divider />
      <ArticleList notes={remainingNotes} />
      <Divider />
      <Music />
      <Divider />
      <NewsletterSubscribe />
      <div />
      <div />
      <div />
    </MainLayout>
  );
}
