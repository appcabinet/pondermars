import { cn } from "@/lib/utils";
import { titleFont } from "@/utils/fonts";

export const StrongElement = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => <strong className="!font-semibold">{props.children}</strong>;

export const BlockQuoteElement = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => (
  <blockquote className="mb-0 border-l-[3px] border-accent-foreground">
    {props.children}
  </blockquote>
);

export const ParagraphElement = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => <p className="">{props.children}</p>;

export const ATag = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    className="text-accent-foreground transition-opacity inline-flex items-center gap-1 hover:opacity-80"
  >
    {props.children}
  </a>
);

export const ListElement = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => <li className="">{props.children}</li>;

export const H1Element = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn("text-3xl font-semibold mb-8 mt-12 text-left", titleFont.className)}
    {...props}
  >
    {props.children}
  </h1>
);

export const H2Element = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-2xl font-semibold mb-5 mt-8 text-left", titleFont.className)}
    {...props}
  >
    {props.children}
  </h2>
);

export const H3Element = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-xl font-semibold mb-5 mt-7 text-left", titleFont.className)}
    {...props}
  >
    {props.children}
  </h3>
);
