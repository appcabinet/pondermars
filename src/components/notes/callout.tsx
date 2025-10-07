interface CalloutProps {
  type?: string
  children: React.ReactNode
}

export default function Callout({ type = 'INFO', children }: CalloutProps) {
  return (
    <div className="border-l-4 border-primary pl-4 py-3 my-4">
      {type && (
        <div className="font-semibold text-sm uppercase mb-2">{type}</div>
      )}
      <div className="text-sm">{children}</div>
    </div>
  )
}
