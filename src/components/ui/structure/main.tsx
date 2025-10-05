import { cn } from "@/lib/utils";

export default function Main({ children,className }: { children: React.ReactNode, className?: string }) {

  return (
    <main className={cn("flex flex-col gap-6 mx-auto max-w-3xl my-12", className)}>
      {children}
    </main>
  )
}