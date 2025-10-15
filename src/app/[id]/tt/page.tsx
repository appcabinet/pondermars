import { redirect } from "next/navigation";
import ArticleBreadcrumb from "@/components/design/article-breadcrumb";
import ArticleHeader from "@/components/design/article-header";
import ContentContainer from "@/components/notes/content-container";
import ImageDialog from "@/components/notes/image-dialog";
import Divider from "@/components/structure/divider";
import NewsletterSubscribe from "@/components/structure/newsletter-subscribe";
import SubscribeDialogWrapper from "@/components/subscribe-dialog-wrapper";
import { getNote } from "@/utils/fetch-mdx";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { content, frontmatter, fileName } = await getNote(id);

  if (frontmatter.redirectUrl) {
    return redirect(frontmatter.redirectUrl);
  }

  return (
    <main className="p-5 md:p-6">
      <ImageDialog />
      <SubscribeDialogWrapper />
      <div className="w-full mx-auto md:max-w-5xl">
        <ArticleBreadcrumb
          authorName="Marcelo Mantilla"
          articleTitle={frontmatter.title}
          articleFileName={fileName}
        />
        <ArticleHeader
          title={frontmatter.title}
          published={frontmatter.published}
          readingTime={frontmatter.readingTime}
        />

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
