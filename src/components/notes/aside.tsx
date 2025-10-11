interface AsideProps {
  children: React.ReactNode
  translateY?: number
}

export default function Aside({ children, translateY = 0 }: AsideProps) {
  return (
    <div
      className="absolute h-0 w-0 overflow-visible hidden lg:block"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="absolute w-[280px] left-[700px] aside">
        <div className="h-[1px] bg-accent-foreground mt-0.5 mb-2"/>
        <div className="prose-sm text-justify leading-snug">
          {children}
        </div>
      </div>
    </div>
  )
}