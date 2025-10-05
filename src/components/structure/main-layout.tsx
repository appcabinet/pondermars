import { cn } from "@/lib/utils";

export default function MainLayout({ children,className }: { children: React.ReactNode, className?: string }) {

  return (
    <main className={cn("flex flex-col gap-12 mx-auto max-w-2xl my-20 px-4 md:px-0", className)}>
      {children}
    </main>
  )
}