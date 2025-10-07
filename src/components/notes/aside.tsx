export default function Aside({ children }: { children: React.ReactNode }) {  
  return (
    <div className="bg-muted p-4 rounded-md">
      {children}
    </div>
  )
}