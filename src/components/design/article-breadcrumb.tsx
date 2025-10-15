import Link from "next/link";

interface ArticleBreadcrumbProps {
  authorName: string;
  articleTitle: string;
  articleFileName: string;
}

export default function ArticleBreadcrumb({
  authorName,
  articleTitle,
  articleFileName,
}: ArticleBreadcrumbProps) {
  return (
    <div className="text-lg pt-6 md:pt-8">
      <Link href="/" className="hover:text-accent-foreground">
        {authorName}
      </Link>
      <span className="text-muted-foreground font-semibold">
        &nbsp;&nbsp;/&nbsp;&nbsp;
      </span>
      <Link href={`/${articleFileName}`} className="hover:text-accent-foreground">
        <span className="opacity-60 hover:opacity-100">
          {articleTitle}
        </span>
      </Link>
    </div>
  );
}
