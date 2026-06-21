---
name: stophole-design
description: Use this skill to generate well-branded interfaces and assets for Stophole, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation for Stophole

- **What it is:** a civic accountability app for South African voters — snap a pothole, see the ward, name who's accountable now, compare 2026 candidates scored on delivery (the "Pothole Test" green/amber/red verdict).
- **Voice:** blunt, street-level, South African, second-person imperative. The product chrome stays clean; let *residents* swear, not the UI.
- **Look:** charcoal + hazard yellow + soft grey, minimalist-premium, light + dark. Big bold sans (Archivo display / Hanken body / Space Mono data) — **never serif**. Yellow is the only accent; use it with discipline. Phone-first, built for low-end Android.
- **Signature moves:** the pothole-shaped input, two-tone headlines (strong + muted-grey clause), yellow highlight marker, pill eyebrow tags, dot-grid scores, dark pill buttons with a yellow icon-chip, big mono stat tiles, the traffic-light verdict badge.

## Files
- `readme.md` — full design guide: content fundamentals, visual foundations, iconography, index.
- `styles.css` — link this one file; it `@import`s all tokens + fonts.
- `tokens/` — colors, typography, spacing, effects, base utilities.
- `assets/` — logo wordmarks + reticle marks (SVG).
- `components/core/` — React primitives (Button, Tag, VerdictBadge, StatTile, DotScore, Card, Icon, PotholeInput).
- `ui_kits/app/` — interactive phone-app recreation.
- `guidelines/` — foundation specimen cards.

When in doubt: one click from value, specificity over vagueness, verdict first.
