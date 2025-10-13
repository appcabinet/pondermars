export default function NoteContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose">{children}</div>;
}
