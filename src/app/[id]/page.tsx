import { DateTime } from "luxon";
import Link from "next/link";
import ContentContainer from "@/components/notes/content-container";
import ImageDialog from "@/components/notes/image-dialog";
import ParallaxImage from "@/components/notes/parallax-image";
import Divider from "@/components/structure/divider";
import NewsletterSubscribe from "@/components/structure/newsletter-subscribe";
import { cn } from "@/lib/utils";
import { getNote } from "@/utils/fetch-mdx";
import { bodyFont, titleFont } from "@/utils/fonts";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { content, frontmatter, fileName } = await getNote(id);

  return (
    <main className="p-5 md:p-6">
      <ImageDialog />
      <ParallaxImage />
      <div className="w-full mx-auto md:max-w-5xl">
        <div className="text-lg pt-8">
          <Link href="/" className="hover:text-accent-foreground">
            Marcelo Mantilla
          </Link>
          <span className="text-muted-foreground font-semibold">
            &nbsp;&nbsp;/&nbsp;&nbsp;
          </span>
          <Link href={`/${fileName}`} className="hover:text-accent-foreground">
            <span className="opacity-60 hover:opacity-100">
              {frontmatter.title}
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-[144px] mb-[92px] mb-24">
          <h1
            className={cn(
              "text-4xl font-semibold bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent",
              titleFont.className,
            )}
          >
            {frontmatter.title}
          </h1>
          <p className="text-lg opacity-60">
            {DateTime.fromISO(frontmatter.published).toLocaleString(
              DateTime.DATE_FULL,
            )}
            &nbsp;&nbsp;·&nbsp;&nbsp;
            {frontmatter.readingTime}
          </p>
        </div>

        <ContentContainer>{content}</ContentContainer>

        <div className="flex flex-col gap-12">
          <div />
          <Divider />
          <NewsletterSubscribe />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </main>
  );
}
