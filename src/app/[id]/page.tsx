import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/structure/divider";
import NewsletterSubscribe from "@/components/structure/newsletter-subscribe";
import { cn } from "@/lib/utils";
import { getNote } from "@/utils/fetch-mdx";
import { titleFont } from "@/utils/fonts";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { content, frontmatter, fileName } = await getNote(id);

  return (
    <main className="p-6">
      {/* <div className="h-[33vh] w-full bg-red-500 rounded-t-xl overflow-hidden">
        <Image
          src={"/blue-background.webp"}
          width={10000}
          height={1000}
          alt="Blue background"
        />
      </div> */}
      <div className="w-full mx-auto md:max-w-5xl">
        <div className="text-lg pt-8">
          <Link href="/" className="hover:text-accent-foreground">
            Marcelo Mantilla
          </Link>
          <span className="text-muted-foreground font-medium">
            &nbsp;/&nbsp;
          </span>
          <Link href={`/${fileName}`} className="hover:text-accent-foreground">
            <span className="opacity-70 hover:opacity-100">{fileName}</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1 mt-[144px] mb-[92px] mb-24">
          <h1
            className={cn(
              "text-[32px] text-5xl font-medium",
              titleFont.className,
            )}
          >
            {frontmatter.title}
          </h1>
          <p className="text-lg opacity-70">
            {DateTime.fromISO(frontmatter.published).toLocaleString(
              DateTime.DATE_MED,
            )}
          </p>
        </div>
        <article className="w-full md:max-w-2xl prose-lg">{content}</article>
        <div className="flex flex-col gap-12">
          <div />
          <Divider />
          <NewsletterSubscribe />
          <div />
          <div />
        </div>
      </div>
    </main>
  );
}
