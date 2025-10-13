export default function CenterQuote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-b text-center py-2 my-8 text-muted-foreground">
      {children}
    </div>
  );
}
