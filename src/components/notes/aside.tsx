interface AsideProps {
  children: React.ReactNode
  translateY?: number
}

export default function Aside({ children, translateY = 0 }: AsideProps) {
  return (
    <div
      className="bg-muted p-4 rounded-md"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      {children}
    </div>
  )
}