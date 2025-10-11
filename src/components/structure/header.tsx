import { cn } from "@/lib/utils";
import { titleFont } from "@/utils/fonts";

export default function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn(titleFont.className, "text-xl font-semibold", className)}>
      {children}
    </h3>
  );
}
