# Creaova Project Documentation

## Overview
Creaova is a modern web application built with React Router v7, Vite, TypeScript, and Tailwind CSS. It's a business/portfolio website showcasing digital solutions services.

**Repository:** https://github.com/CodeByHossam/creaova  
**Last Updated:** 2026-10-23

## Project Structure

### Root Files
| File | Purpose |
|---|---|
| .gitignore | Git ignore rules for node_modules, build artifacts, etc. |
| env.d.ts | TypeScript definitions for environment variables (VITE_* prefixed vars) |
| package.json | Dependencies, scripts, and project metadata |
| package-lock.json | Locked dependency versions |
| eact-router.config.ts | React Router v7 configuration (SSR/prerendering settings) |
| README.md | Project overview and getting started guide |
| 	sconfig.json | TypeScript compiler configuration |
| ite.config.ts | Vite bundler configuration with React Router and Tailwind plugins |

### /app - Application Source Code
This is the main application directory following React Router v7 conventions.

#### /app/assets
Brand assets used by the application.
| File/Folder | Purpose |
|---|---|
| icon/icon.png | The brand mark (C symbol) - source for favicon and app icons |
| logo/logo.png | The brand lockup (mark + CREAOVA wordmark) - source for site logo |

#### /app/components
Reusable React components.
| Component | Purpose |
|---|---|
| Badge.tsx | Small badge/pill component for tags/labels |
| BrandIcon.tsx | Renders the brand mark icon |
| Button.tsx | Button component with variants (primary, secondary, ghost, dark, light) |
| ConfidenceCard.tsx | Card displaying confidence/trust indicators |
| ContactForm.tsx | Contact form component |
| ContactIcon.tsx | Icon component for contact information |
| Container.tsx | Layout wrapper component with max-width constraints |
| CTABand.tsx | Call-to-action banner section |
| DisciplineCard.tsx | Card showing design/engineering disciplines |
| Footer.tsx | Site footer with logo, links, and contact info |
| HomeProjectCard.tsx | Card for featured projects on homepage |
| Logo.tsx | Brand logo component (renders lockup image). Variants: color, white. One CREAOVA wordmark baked in artwork. |
| MobileNav.tsx | Mobile navigation menu |
| Navbar.tsx | Desktop navigation header |
| ProcessCard.tsx | Card showing process steps |
| ProjectCard.tsx | Card for portfolio projects |
| QualityCard.tsx | Card highlighting quality aspects |
| ReviewsBand.tsx | Customer reviews/testimonials section |
| SectionHeading.tsx | Reusable section heading component |
| ServiceCard.tsx | Card displaying services |
| SkipLink.tsx | Accessibility skip-to-content link |

#### /app/data
Static data, constants, and configuration.
| File | Purpose |
|---|---|
| constants.ts | Site-wide constants (name, URL, logo config, navigation, social links, contact info). Contains ASSET_VERSION for cache-busting. |
| env.ts | Environment variable validation and access |
| projects.ts | Portfolio projects data |
| services.ts | Services offered data |

#### /app/layout
Layout components.
| File | Purpose |
|---|---|
| MainLayout.tsx | Main site layout wrapping all pages (includes Navbar, Footer) |

#### /app/pages
Route page components.
| Page | Purpose |
|---|---|
| About.tsx | About page |
| Contact.tsx | Contact page with form |
| Home.tsx | Homepage/landing page |
| NotFound.tsx | 404 error page |
| Portfolio.tsx | Portfolio/projects showcase page |
| Privacy.tsx | Privacy policy page |
| Services.tsx | Services page |
| Terms.tsx | Terms of service page |

#### /app/styles
Styling.
| File | Purpose |
|---|---|
| globals.css | Global styles, Tailwind imports, CSS variables/theme |

#### App Root Files
| File | Purpose |
|---|---|
| oot.tsx | Application root - HTML document setup, meta tags, favicons with cache-busting (?v=), manifest link |
| outes.ts | Route definitions for all pages |

### /public - Static Assets
Publicly served static files (copied as-is to build output).
| File | Purpose |
|---|---|
| pple-touch-icon.png | iOS home screen icon (180×180) - orange mark on ink canvas |
| email-signature.html | Email signature template output with logo and contact info |
| avicon.png | Browser tab icon (64×64) - orange mark on transparent background (no black tile) |
| icon-192.png | PWA icon (192×192) - orange mark on ink canvas |
| icon-512.png | PWA icon (512×512) - orange mark on ink canvas |
| logo.png | Main site logo - lockup (420×96), mark + CREAOVA wordmark baked in |
| logo-inverse.png | White logo for dark backgrounds (420×96) |
| obots.txt | Search engine crawler instructions |
| site.webmanifest | PWA manifest with app metadata and icons |
| sitemap.xml | Site map for search engines |

### /ai-base - Project Memory & Documentation
AI assistant memory and project management files.
| File/Folder | Purpose |
|---|---|
| PROJECT_MAP.md | Project structure map and current state |
| PROJECT_PLAN.md | Project plan, tasks, and session logs |
| SESSION_END_STATE.md | Session state and verified information |
| USER_STORIES.md | User stories and acceptance criteria |
| _toolkit/ | AI assistant toolkit and resources |

## Brand Assets & Design Decisions

### Logo Strategy
- **Site Logo**: pp/assets/logo/logo.png (lockup) - Used in header, navigation, footer as the main logo. Contains both the orange mark and "CREAOVA" wordmark baked into the image (single wordmark, no live text).
- **Brand Mark**: pp/assets/icon/icon.png - Used only for favicons and app icons, never as the site logo.
- **Logo Component**: Logo.tsx renders the lockup image only. Brand name is announced via link label/aria-label, not duplicated as text.

### Icon Strategy
- **Favicon** (avicon.png): Orange mark on **transparent background** - sits cleanly on any browser tab color (no black box background)
- **App Icons** (pple-touch-icon.png, icon-192.png, icon-512.png): Orange mark on **ink/dark canvas** - required for iOS and proper PWA display
- **Cache Busting**: All brand raster URLs include ?v= in pp/data/constants.ts (currently 2026-10-22). Browsers cache favicons aggressively, so versioning is required when updating.

## Build & Development

### Scripts (package.json)
| Script | Purpose |
|---|---|
| dev | Start development server with React Router dev |
| uild | Build for production |
| preview | Preview production build |
| 	ypegen | Generate React Router types |
| 	ypecheck | Run type generation and TypeScript checking |

### Tech Stack
- **Framework**: React Router v7.9.5
- **Build Tool**: Vite 8.0
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 4.0
- **React**: 19.2.7
- **Icons**: lucide-react
- **Runtime**: Node.js >=22.22

## Discussion Summary

### Key Changes Made

1. **Brand Asset Correction** (Initial Issue)
   - User clarified: the lockup (mark + "CREAOVA" wordmark baked in) is the site logo
   - The mark alone should only be used for favicon/app icons
   - Previous mistake had used the icon as the logo or duplicated text

2. **Logo Implementation**
   - Removed Brand component (which showed mark + live text)
   - Updated Logo.tsx to render only the lockup image
   - Updated Navbar, MobileNav, Footer to use lockup
   - Ensured only one "CREAOVA" appears on screen (baked into artwork)
   - Email signature updated to use lockup at 175×40 without duplicate text

3. **Favicon Fix**
   - Issue: favicon showed black background / wasn't visible properly
   - Solution: Made favicon transparent (mark only on clear background)
   - Device icons kept on ink canvas (iOS requirement)
   - Added cache-busting with ASSET_VERSION to force browser refresh

4. **Project Cleanup**
   - Removed unnecessary build artifacts and caches
   - Cleaned up duplicate/unused files in public/
   - Removed scripts folder (build tooling not needed for runtime)
   - Kept only essential files

5. **Deployment**
   - Committed and pushed to GitHub (commit dbe5b73)
   - Deployed to https://creaova.onrender.com
   - Verified favicon loads correctly (200, 3654 bytes)

## Notes
- All brand rasters use cache-busting query parameters
- The wordmark is never rendered as live DOM text - it's part of the image
- iOS requires apple-touch-icon to be opaque (can't be transparent)
- i-base/ contains project memory and is tracked in git
