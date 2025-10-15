import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { titleFont } from "@/utils/fonts";

interface ArticleHeaderProps {
  title: string;
  published: string;
  readingTime: string;
}

export default function ArticleHeader({
  title,
  published,
  readingTime,
}: ArticleHeaderProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-2 mb-[72px] mt-[112px] md:mt-[144px] md:mb-[92px] mb-24">
      <h1
        className={cn(
          "text-3xl md:text-4xl font-semibold bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent",
          titleFont.className,
        )}
      >
        {title}
      </h1>
      <p className="text-lg opacity-60">
        {DateTime.fromISO(published).toLocaleString(DateTime.DATE_FULL)}
        &nbsp;&nbsp;·&nbsp;&nbsp;
        {readingTime}
      </p>
    </div>
  );
}
