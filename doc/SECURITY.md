# Security

## Current posture

Repository-side controls are in place. Residual risk is mainly provider-side configuration, DNS/hosting headers and release verification. No critical or high code issues are known in the current tree.

## In-repo controls

| Area               | Control                                                                                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configuration      | `scripts/validate-env.mjs` blocks missing/placeholder site URL, wrong provider, wrong endpoint, missing/invalid Web3Forms key and invalid captcha key before build.                                                                                                    |
| Site URL           | `scripts/sync-site-url.mjs` requires an https origin and writes canonical sitemap/robots data into `public/`.                                                                                                                                                          |
| Headers/CSP        | `config/security-headers.json` is the single source. `scripts/apply-security.mjs` writes a per-page hash-based CSP meta tag plus generated `_headers` and `host-config.json`; `scripts/sync-host-config.mjs` mirrors the full set into the marked `render.yaml` block. |
| Third-party assets | Fonts and images are self-hosted. The postbuild pass fails if `fonts.googleapis.com`, `fonts.gstatic.com` or `images.unsplash.com` remains in built text assets.                                                                                                       |
| Contact form       | hCaptcha widget plus honeypots, native and client validation, max lengths, `no-referrer`, JSON success validation, generic user-facing errors and direct email fallback.                                                                                               |
| JSON-LD            | Escapes `<`, `>`, `&`, U+2028 and U+2029 before injection and keeps the script inert in the body.                                                                                                                                                                      |
| Privacy/Terms      | Pages name actual providers and data flows; a privacy notice sits beside the form.                                                                                                                                                                                     |
| Secrets            | No access key in source comments. `VITE_*` values are public by design; real credentials are not stored in the repository.                                                                                                                                             |

## Historical findings, current status

| ID      | Finding                                   | Status                                                                                                              |
| ------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| SEC-001 | Form anti-automation                      | Owner-resolved: Web3Forms strict spam filter and hCaptcha are active; repo keeps honeypots and client checks.       |
| SEC-002 | Draft privacy policy                      | Shared `LegalPage` layout in source; legal review pending.                                                          |
| SEC-003 | Web3Forms access key is public by design  | Owner decision: no rotation/redaction needed; the key is public client configuration.                               |
| SEC-004 | Missing CSP                               | Single manifest now generates hashed CSP meta, `_headers`, host config and `render.yaml`; host enforcement pending. |
| SEC-005 | Missing clickjacking protection           | `X-Frame-Options: DENY` and `frame-ancestors 'none'` are generated; host enforcement pending.                       |
| SEC-006 | Third-party fonts/images                  | Fixed by self-hosting with licences.                                                                                |
| SEC-007 | Placeholder/mismatched canonical config   | Fixed by fail-fast validation and safe sync.                                                                        |
| SEC-008 | Routable fallback host                    | Mitigated by validation; official domain pending.                                                                   |
| SEC-009 | Env typing/example drift                  | Fixed.                                                                                                              |
| SEC-010 | Provider handling of hostile form fields  | Owner-confirmed provider filtering; still verify a real submission end to end.                                      |
| SEC-011 | Unsafe JSON-LD serialization              | Fixed.                                                                                                              |
| SEC-012 | Email signature published publicly        | Fixed; generation is outside `public/`.                                                                             |
| SEC-013 | Missing referrer/permissions/COOP headers | Generated from the manifest; host enforcement pending.                                                              |
| SEC-014 | Web manifest MIME type                    | Generated from the manifest; host enforcement pending.                                                              |

## External actions before public launch

- **Apply generated header rules on the official host.** The owner is moving away from Render. Use `config/security-headers.json`, `build/client/_headers` and `build/client/host-config.json` as the exact source; verify CSP, clickjacking, referrer, permissions, MIME and cache headers over HTTP.
- **Set the official domain when supplied.** Replace `https://creaova.onrender.com` in `VITE_SITE_URL`, rebuild and verify canonicals, sitemap, robots and social URLs.
- **Verify CDN behaviour.** Confirm any CDN in front of the host sends Brotli/gzip for text assets and does not strip or override generated headers.
- **Keep provider anti-spam active.** The Web3Forms access key is public by design; the owner has confirmed the strict spam filter and hCaptcha are enabled.
- **Verify form delivery end to end.** Submit a real test enquiry and confirm it reaches `creaova.co@gmail.com`.
- **Legal review.** Have Privacy and Terms reviewed for UAE requirements; the shared effective date is already centralised.
- **Re-run `npm audit`.** Re-run before release because dependencies changed when lint/format/test tooling was added.

## Known benign console notice

`/contact` may log an hCaptcha third-party warning about a missing language property. It is not a site error and is unrelated to the form result.

## Verification expectations

- `npm run lint`, `npm run format:check`, `npm test`, `npm run typecheck` and `npm run build` pass.
- Build hardens all 10 generated HTML files with no forbidden third-party hosts, and `npm run check:host-config` passes.
- A production preview shows no console errors on public routes except the hCaptcha notice noted above.
- Security headers and compression are verified against the deployed official domain, not only the generated files.
