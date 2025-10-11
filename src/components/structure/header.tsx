import { cn } from "@/lib/utils";
import { bodyFont, titleFont } from "@/utils/fonts";

export default function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn(bodyFont.className, "text-xl font-semibold", className)}>
      {children}
    </h3>
  );
}
