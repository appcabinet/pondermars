import Image from "next/image";
import Link from "next/link";
import Main from "@/components/ui/structure/main";

export default function Home() {
  return (
    <Main>
      <div className="flex-col md:flex-row flex justify-between items-start md:items-center gap-4">
        <Link href="/" className="text-lg font-medium text-muted-foreground">
          ponder mars
        </Link>
        <div className="flex items-center gap-4 text-base">
          <Link href="/">music</Link>
          <Link href="/">writing</Link>
          <Link href="/">reading</Link>
          <Link href="/">story</Link>
        </div>
      </div>
      <div>
        <p>
        Software engineer, designer, and creative writer. Founder & CTO of Maxed.
        </p>
      </div>
    </Main>
  );
}
