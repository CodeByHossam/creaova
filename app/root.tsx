import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router";

import { SkipLink } from "~/components/SkipLink";
import { site } from "~/data/constants";
import "~/styles/globals.css";

/**
 * JSON.stringify alone is not enough inside a <script> data block: a string
 * containing `</script>` or an HTML comment opener can terminate the block
 * early. Escaping the dangerous characters keeps the JSON-LD inert even if a
 * content field is changed later.
 */
function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function Layout({ children }: { children: ReactNode }) {
  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#16130f" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      {/*
        No global <link rel="canonical"> here on purpose. A single canonical in
        the layout would point every route at the homepage, which tells search
        engines the whole site is one page. Each route owns its own canonical,
        built from `site.url` (see `absoluteUrl` in data/constants).
      */}
      <meta property="og:site_name" content="Creaova Digital Solutions [ CDS ]" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {/*
        The `?v=` query is not decoration. Browsers cache favicons per origin
        and never re-fetch them on a normal reload, so a replaced artwork file
        keeps serving the old icon. The version comes from `site.assetVersion`
        - bump it when scripts/prepare-logo.ps1 regenerates the artwork.
      */}
      <link rel="icon" type="image/png" sizes="64x64" href={`/favicon.png?v=${site.assetVersion}`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`/apple-touch-icon.png?v=${site.assetVersion}`} />
      <link rel="manifest" href="/site.webmanifest" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            alternateName: site.name,
            url: site.url,
            email: site.contact.email,
            telephone: site.contact.phoneDisplay,
            areaServed: "AE",
            address: {
              "@type": "PostalAddress",
              addressRegion: site.contact.address.region,
              addressCountry: site.contact.address.region,
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: site.contact.email,
              telephone: site.contact.phoneDisplay,
            },
            sameAs: site.socialLinks.map((link) => link.href).filter(Boolean),
          }),
        }}
      />
      <Meta />
      <Links />
    </head>
    <body><SkipLink />{children}<ScrollRestoration /><Scripts /></body>
  </html>;
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return <main className="mx-auto flex min-h-screen w-full max-w-page flex-col items-start justify-center px-5 py-24 sm:px-8">
    <p className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">{isNotFound ? "404" : "Error"}</p>
    <h1 className="mt-4 font-display text-h2 text-ink">{isNotFound ? "That page doesn’t exist." : "Something went wrong."}</h1>
    <p className="mt-4 max-w-[var(--measure)] text-lede text-muted">{isNotFound ? "The link may be out of date, or the page may have moved." : "This page failed to load. Try again, or head back to the homepage."}</p>
    <a href="/" className="mt-8 inline-flex min-h-11 items-center rounded-control bg-ink px-6 py-3 text-sm font-semibold text-on-dark transition-colors duration-200 ease-out hover:bg-primary hover:text-on-primary">Back to homepage</a>
  </main>;
}
