# Self-hosted fonts

All fonts used by the site are downloaded from Google Fonts and served from this
folder. There is **no** `@import` from `fonts.googleapis.com`, `fonts.gstatic.com`
or `fontsource.org`, and no runtime request to any third-party font host. The
`@font-face` rules live in `app/styles/globals.css` and reference `/fonts/*`.

## Active families

| Family | Weights | Source | Licence |
| --- | --- | --- | --- |
| Roboto | 400, 500, 600, 700 | https://fonts.google.com/specimen/Roboto | `licenses/OFL-Roboto.txt` (SIL OFL 1.1) |
| Roboto Slab | 400, 500, 600, 700 | https://fonts.google.com/specimen/Roboto+Slab | `licenses/Apache-RobotoSlab.txt` (Apache 2.0) |
| JetBrains Mono | 400–500 | https://fonts.google.com/specimen/JetBrains+Mono | `licenses/OFL-JetBrainsMono.txt` (SIL OFL 1.1) |

Each family ships a `latin` and a `latin-ext` WOFF2 subset with `unicode-range`
declarations, so browsers download only the subset they need. Licences are kept
next to the fonts to satisfy their redistribution terms.

## Archived families

The earlier `fraunces-*`, `instrument-sans-*` and per-weight Roboto font files
were removed with the superseded art direction. They are **not** referenced by
any stylesheet or component, and their unused licence files were removed too.
