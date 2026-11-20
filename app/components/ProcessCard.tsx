export function ProcessCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5">
      <h3 className="flex min-h-[3.25rem] items-start font-sans text-h3 font-semibold leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}
