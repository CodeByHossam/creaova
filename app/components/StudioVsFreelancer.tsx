import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";

const contrasts = [
  {
    tag: "Continuity",
    title: "One team, not one person.",
    text: "Design, engineering and support under one roof. No chasing three separate contacts when something needs to change.",
  },
  {
    tag: "Visibility",
    title: "Decisions you can see.",
    text: "You review and approve each step. No black box, no surprise invoice at the end.",
  },
  {
    tag: "Accountability",
    title: "Still here after launch.",
    text: "Fixes, guidance and the next improvement come from the people who built it.",
  },
] as const;

export function StudioVsFreelancer() {
  return (
    <section
      id="studio-vs-freelancer"
      className="scroll-mt-16 border-t border-line bg-surface-subtle py-12 sm:py-16 md:py-20 lg:scroll-mt-20"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            bold
            align="left"
            eyebrow="Studio, not a single point of failure"
            title="The cheaper option can cost more by month six."
            lede="A freelancer can be right for a small, contained task. When the site is central to your business, the risk isn't the build — it's what happens when something breaks and no one owns it."
          />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 tablet-center-odd [--odd-card-gap:0.625rem]">
            {contrasts.map(({ tag, title, text }) => (
              <li key={title} className="rounded-card border border-line bg-surface p-5 sm:p-6">
                <p className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary-text">
                  {tag}
                </p>
                <h3 className="mt-4 font-sans text-h3 font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-lede text-muted">
            Not sure which route you need? Ask us. We&apos;ll tell you honestly if a studio is
            overkill.
          </p>
        </div>
      </Container>
    </section>
  );
}
