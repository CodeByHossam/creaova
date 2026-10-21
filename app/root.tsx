import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router";

import { SkipLink } from "~/components/SkipLink";
import { site } from "~/data/constants";
import "~/styles/globals.css";

export function Layout({ children }: { children: ReactNode }) {
  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#16130f" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/*
        No global <link rel="canonical"> here on purpose. A single canonical in
        the layout would point every route at the homepage, which tells search
        engines the whole site is one page. Each route owns its own canonical,
        built from `site.url` (see `absoluteUrl` in data/constants).
      */}
      <meta property="og:site_name" content="Creaova Digital Solutions [ CDS ]" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        rel="icon"
        href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M16.8%208.6C15.8%207.4%2014.3%206.6%2012.6%206.6C9.5%206.6%207%209.1%207%2012.2C7%2015.3%209.5%2017.8%2012.6%2017.8C14.3%2017.8%2015.8%2017%2016.8%2015.8'%20stroke='%23EA580C'%20fill='none'%20stroke-width='2.6'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
