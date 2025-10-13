interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ title, children }: CalloutProps) {
  return (
    <div className="bg-card p-3 py-4 md:p-5 rounded-lg my-6 callout border border-border -mx-3 md:mx-0">
      {title && (
        <div className="font-semibold text-muted-foreground">{title}</div>
      )}
      <div className="[&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
