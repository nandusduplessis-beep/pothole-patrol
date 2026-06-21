
# Stophole MVP — Port design system + build clickable flow

The `pothole-patrol` repo already contains a complete **Stophole Design System** (tokens, 8 core components, 5 screen layouts, brand assets). The plan is to **port it wholesale** into this TanStack Start project rather than rebuild — then wire the screens into real routes with seeded demo data and a Leaflet map.

## What's in the repo to reuse

```
Stophole Design System/
├── tokens/         6 CSS files (fonts, colors, typography, spacing, effects, base)
├── components/core/  8 components: Button, Tag, VerdictBadge, StatTile,
│                     DotScore, Card, Icon, PotholeInput
├── ui_kits/app/    HomeScreen, CaseScreen, CandidatesScreen, VoteScreen,
│                   CasesScreen, Shell, Shared, app.css
├── assets/         mark.svg, mark-yellow.svg, logo-wordmark(-dark).svg
└── readme.md       Brand voice, scoring model, tone rules
```

The components are written as standalone JSX with CSS variables — they assume a `window.StopholeDesignSystem_*` global. I'll convert them to plain ES module imports.

## Build steps

### 1. Port the design tokens
- Copy `tokens/*.css` → `src/styles/tokens/`.
- In `src/styles.css`, `@import` the 6 token files and bridge them to Tailwind v4 `@theme` variables so utilities work alongside the raw CSS vars.
- Install `@fontsource/archivo`, `@fontsource/hanken-grotesk`, `@fontsource/space-mono`; import in `src/router.tsx` or `__root.tsx`.
- Copy `assets/*.svg` → `src/assets/stophole/`. Set `mark-yellow.svg` as favicon.

### 2. Port the 8 core components
For each in `Stophole Design System/components/core/`:
- Convert `.jsx` from global-object pattern → `export function Component(...)`.
- Land at `src/components/stophole/{Button,Tag,VerdictBadge,StatTile,DotScore,Card,Icon,PotholeInput}.tsx`.
- Keep prop shapes from the `.d.ts` files. `Icon` becomes a thin wrapper around `lucide-react`.

### 3. Port the 5 screens as route components
Convert each ui_kit screen into a TanStack route:

| Repo screen | New route | Purpose |
|---|---|---|
| `HomeScreen.jsx` | `src/routes/index.tsx` | Map landing + pothole-input + recent cases |
| `CaseScreen.jsx` | `src/routes/case.$caseId.tsx` | Address, ward, councillor, community signals |
| `CandidatesScreen.jsx` | `src/routes/candidates.$wardId.tsx` | 2026 applicants ranked by Pothole Test |
| `VoteScreen.jsx` | `src/routes/vote.$wardId.tsx` | Voting station + 4 Nov 2026 date |
| `CasesScreen.jsx` | `src/routes/cases.tsx` | User's tracked cases list |

`Shell.jsx` (phone frame + status bar + tab bar) becomes a `<PhoneShell>` wrapper used by `__root.tsx`. Each route gets unique `head()` metadata (title, description, og).

### 4. Map landing (the one big addition)
The repo's HomeScreen uses a stylized static map. Replace it with **Leaflet + OpenStreetMap** (`react-leaflet`, no API key) inside the phone frame:
- Centered on Johannesburg by default.
- Two seeded pothole markers (Ward 102 JHB, Ward 55 CPT) using red drop-pin SVG matching the storyboard.
- Tap pin → rises the existing pothole-input sheet → CTA goes to `/case/{id}`.
- Search input with 3 hardcoded autocomplete demo addresses.
- Camera CTA opens a mocked overlay (`Shared.jsx` already has the camera UI).

### 5. Seed data (`src/data/seed.ts`)
Plain TypeScript. Two fully populated wards:

- **Ward 102, City of Johannesburg** — incumbent + 4 challengers, 1 open case ("Corlett Drive @ Athol").
- **Ward 55, City of Cape Town** — incumbent + 3 challengers, 1 open case.

Each candidate carries the 5 Pothole Test signals (proven fix rate, time-to-action, budget conversion, system presence, local accountability) scored 0–5 with one-line evidence, plus tenure and contactability.

Each ward carries: `municipality_name`, `auditor_general_status`, `total_salary_budget_zar`, `actual_maintenance_spend_zar`, `avg_household_income_monthly_zar`, derived per-worker salary — rendered exactly as the PRD copy block, with the aggregate-vs-localized disclaimer.

A `resolveAccountability(lat,lng)` helper picks the nearest demo ward by haversine distance — same signature the real PostGIS lookup will use later.

### 6. Pothole Test verdict
Helper computes verdict from the 5 signals: avg ≥ 4 → 🟢 GREEN, 2–4 → 🟡 AMBER, < 2 → 🔴 RED. Candidates list sorts green → amber → red; incumbent pinned at top with "OWNS THIS FAILURE NOW" tag.

### 7. Theme, persistence, polish
- Light/dark toggle in top bar (writes `data-theme` on `<html>`, persisted to localStorage).
- Zustand store for "recent cases" persisted to localStorage so the Home screen feels lived-in.
- Respect `prefers-reduced-motion` (the pin pulse, sheet rise).
- 44px tap targets verified throughout.

## What I will not do in this build

- No Lovable Cloud / database (deferred — `resolveAccountability` is the swap point).
- No real ward polygons / IEC ingest / PostGIS.
- No real photo upload (camera is mocked).
- No auth, no user accounts, no push.

## Deliverable

Open preview → phone-frame map of Joburg → tap pothole pin → bottom sheet rises → "See who's accountable" → case file with councillor, ward stats, community signals → "Compare the applicants" → ranked candidate list with DotScore signals → tap candidate → scorecard → "Where & when to vote" → voting station + 4 Nov 2026. Full Stophole brand fidelity, full flow, mock data, ready for real data to slot in.
