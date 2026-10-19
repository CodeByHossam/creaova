import { Container } from "~/components/Container";

export function meta() {
  return [
    { title: "Privacy Policy | Creaova" },
    {
      name: "description",
      content: "Privacy information for visitors to Creaova's website.",
    },
  ];
}

export default function Privacy() {
  return (
    <Container className="py-24 lg:py-32">
      <p className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
        Legal · Draft
      </p>
      <h1 className="mt-6 max-w-[var(--measure)] text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-7 max-w-[var(--measure)] text-lg leading-7 text-gray-600">
        This page is a placeholder, not a complete privacy policy. The policy must
        be written and reviewed for Creaova’s actual data practices before launch.
      </p>
      <p className="mt-6 max-w-[var(--measure)] leading-7 text-gray-600">
        The contact form is planned to send submissions directly to a third-party
        form provider. Do not publish this page as a final policy until the
        provider, retention practices, and applicable privacy requirements have
        been confirmed.
      </p>
    </Container>
  );
}
