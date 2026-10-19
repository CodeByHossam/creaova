import { Container } from "~/components/Container";

export function meta() {
  return [
    { title: "Terms of Service | Creaova" },
    {
      name: "description",
      content: "Terms information for visitors to Creaova's website.",
    },
  ];
}

export default function Terms() {
  return (
    <Container className="py-24 lg:py-32">
      <p className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
        Legal · Draft
      </p>
      <h1 className="mt-6 max-w-[var(--measure)] text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Terms of service
      </h1>
      <p className="mt-7 max-w-[var(--measure)] text-lg leading-7 text-gray-600">
        This page is a placeholder, not a complete set of terms. Terms must be
        written and reviewed for Creaova’s actual services and jurisdiction
        before launch.
      </p>
    </Container>
  );
}
