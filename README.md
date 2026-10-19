# Creaova Digital Solutions

Creaova is a premium, multi-page marketing website for a UAE-based digital studio. The site presents Creaova’s web, mobile, product design, and digital experience capabilities through a calm black, white, and orange visual system.

The project is designed to be clear, fast, accessible, and easy to extend as real business content becomes available.

## Features

- Multi-page routing for Home, Services, Portfolio, About, Contact, Privacy, and Terms.
- React Router with a shared layout, navigation, footer, and responsive mobile menu.
- Vite-powered development and production builds.
- TypeScript-first component and data structure.
- Tailwind CSS v4 design system with shared color, spacing, typography, and layout tokens.
- Responsive layouts designed for mobile, tablet, and desktop screens.
- Accessible navigation, form labels, focus states, semantic landmarks, and skip-link support.
- Static prerendering for the public routes.
- Shared project, service, navigation, contact, and social-link data files.
- Approved Creaova artwork stored in `app/assets/images/logo/`.

## Technology

- React 19
- React Router 8
- Vite 8
- TypeScript
- Tailwind CSS 4
- Manrope for interface typography
- IBM Plex Mono for metadata and technical labels

## Getting started

### Requirements

- Node.js `22.22` or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The development server will print the local URL in the terminal.

### Validate the project

```bash
npm run typecheck
npm run build
```

To preview the production client build locally:

```bash
npm run preview
```

## Project structure

```text
creaova/
├── app/
│   ├── assets/
│   │   ├── images/logo/       # Approved Creaova logo artwork
│   │   ├── logo-icon.svg      # Legacy/local icon asset
│   │   └── logo-full.svg      # Legacy/local lockup asset
│   ├── components/            # Reusable UI components
│   ├── data/                  # Site configuration and content data
│   ├── layout/                # Shared route layout
│   ├── pages/                 # Route-level page components
│   ├── styles/                # Global CSS and design tokens
│   ├── root.tsx               # Document shell and application entry
│   └── routes.ts              # React Router route configuration
├── public/                    # Public static files
├── scripts/                   # Asset preparation utilities
├── plans/                     # Product and UI planning references
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and primary value proposition |
| `/services` | Service disciplines and delivery process |
| `/portfolio` | Selected concept work and project directions |
| `/about` | Studio principles and working model |
| `/contact` | Project enquiry form and contact details |
| `/privacy` | Privacy policy draft for review |
| `/terms` | Terms of service draft for review |
| `*` | Custom not-found page |

All routes use the shared layout defined in `app/layout/MainLayout.tsx`.

## Content and configuration

Site-wide configuration lives in `app/data/constants.ts`. This includes:

- Brand and legal name
- Navigation links
- Social links
- Contact details
- Footer links
- Logo metadata

Portfolio content is maintained in `app/data/projects.ts`, while service content and process steps are maintained in `app/data/services.ts`.

Keep content in these data modules where possible instead of duplicating it inside multiple page components.

## Environment configuration

Copy `.env.example` to `.env` when configuring a real deployment:

```bash
Copy-Item .env.example .env
```

Available variables include:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical website origin |
| `VITE_FORM_PROVIDER` | Contact form provider name |
| `VITE_FORM_ENDPOINT` | Public form submission endpoint |

The repository currently contains reserved demo values such as `example.com`, placeholder contact details, and generic social URLs. Replace these before launch. The privacy and terms pages are also drafts and require review against the final business, hosting, form, analytics, and legal setup.

Never place private API keys or server secrets in `VITE_` variables; Vite exposes them to the browser bundle.

## Brand assets

The active brand artwork is [Creaova_Logo1.png](app/assets/images/logo/Creaova_Logo1.png). Shared components reference this asset directly from the application bundle. If the artwork changes, update the intrinsic dimensions in `app/data/constants.ts` and verify the header, mobile navigation, and footer at all responsive breakpoints.

The logo preparation script is located at `scripts/prepare-logo.ps1` and reads from the new application asset path.

## Design direction

The interface follows the Creaova design direction:

- Soft off-white surfaces with deep black structural sections.
- Orange used as a focused accent for emphasis and interaction states.
- Generous vertical spacing and restrained card layouts.
- Manrope for clear, contemporary UI typography.
- IBM Plex Mono for metadata, labels, and technical moments.
- Rounded controls, subtle borders, and measured hover transitions.
- Content that avoids fabricated testimonials, client logos, or performance claims.

## Deployment checklist

Before publishing:

1. Replace all demo contact, social, canonical URL, and form configuration values.
2. Confirm the form endpoint and test successful and failed submissions.
3. Review and approve the privacy and terms pages.
4. Confirm the final logo artwork and image optimization strategy.
5. Run `npm run typecheck` and `npm run build`.
6. Test every route on mobile and desktop, including keyboard navigation and form validation.
7. Verify metadata, canonical URLs, favicon, robots rules, and production hosting redirects.

## License

This project is private and proprietary to Creaova Digital Solutions unless a separate written agreement states otherwise.
