import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router";

import { SkipLink } from "~/components/SkipLink";
import "~/styles/globals.css";

export function Layout({ children }: { children: ReactNode }) {
  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" />
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
    <a href="/" className="mt-8 inline-flex min-h-11 items-center rounded-control bg-ink px-6 py-3 text-sm font-semibold text-on-dark transition-colors duration-200 hover:bg-primary hover:text-on-primary">Back to homepage</a>
  </main>;
}
