export const StrongElement = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <strong className="font-semibold">{props.children}</strong>
)

export const BlockQuoteElement = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <blockquote className="mb-0 border-l-[3px] border-accent-foreground">{props.children}</blockquote>
)

export const ParagraphElement = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <p className="text-justify">{props.children}</p>
)


export const ATag = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    className="text-accent-foreground transition-opacity inline-flex items-center gap-1 hover:opacity-80"
  >
    {props.children}
  </a>
)

export const ListElement = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <li className="">
    {props.children}
  </li>
);