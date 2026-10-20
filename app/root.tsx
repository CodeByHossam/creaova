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
      {/* Text-based SVG favicon: the [ C DS ] monogram, live in the SVG so no
          image asset is involved. Orange on the dark tile = 6.7:1 (legible at
          favicon size in both light and dark browser chrome). */}
      <link
        rel="icon"
        href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M16.8%208.6C15.8%207.4%2014.3%206.6%2012.6%206.6C9.5%206.6%207%209.1%207%2012.2C7%2015.3%209.5%2017.8%2012.6%2017.8C14.3%2017.8%2015.8%2017%2016.8%2015.8'%20stroke='%23EA580C'%20fill='none'%20stroke-width='2.6'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E"
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
