import { ExternalLink } from "lucide-react"

export const ATag = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    {...props}
    className="text-accent-foreground transition-opacity inline-flex items-center gap-1 hover:opacity-80"
  >
    {props.children}
  </a>
)

export const ListElement = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <li className="my-0">
    {props.children}
  </li>
);