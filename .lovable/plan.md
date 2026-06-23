
## What I actually saw (audited mobile 393px + desktop 1280px)

- **Home / "front card" is broken as a tool.** "Snap the pothole" doesn't snap anything — it just navigates to a hard-coded first case. There's no camera/upload, no geolocation, no "create new pothole". The big pin near Soweto is fictional and doesn't represent the user.
- **Desktop layout is a stretched phone.** The bottom "sheet" spans the full 1200px column, the search bar is the same — neither reads as a card. The TopBar is overlaid centered on the map, separated from the sheet.
- **Vote tab is hard-coded to `JHB_WARD102`.** Any other ward (e.g. the Ward 32 Welkom example you sent) 404s. The TabBar destination must be derived from the active/last-viewed ward, with a fallback.
- **Ward councillor card is missing ~80% of the content** you pasted (suburbs, households, density, income, repair cost band, budget vs spend, returned-to-Treasury, audit outcome, payroll, action steps, pothole engine count).
- **No `/how-it-works`, `/whatsapp`, `/ussd` routes exist.**
- **Ward 32 / Matjhabeng is not in seed data** — your example can't be loaded at all.

## Plan

### A. Fix the front (home) card — functionality, not redesign

`src/routes/index.tsx` + `src/lib/stophole-store.ts`

1. Replace the "Snap the pothole" button's `onClick` with a real flow:
   - Trigger a hidden `<input type="file" accept="image/*" capture="environment">`.
   - On file pick, call `navigator.geolocation.getCurrentPosition` (with a graceful fallback to the search bar / map-tap location if denied).
   - Create a new `CaseFile` in the store (`addLocalCase`) tagged `source: "user"`, attach the photo as an object URL, snap to the nearest ward in seed (or `unassigned` if outside).
   - Navigate to `/case/$caseId` for the new record.
2. Add a secondary "Tap the map to drop a pin" affordance when geolocation is denied — `MapEmbed` already supports `onSelect`; extend it with an `onMapTap(lat,lng)` callback for empty space.
3. Desktop: constrain the bottom sheet + search bar to `max-width: 520px` and pin to the bottom-right of the map rather than stretching across 1200px. Mobile unchanged.

### B. Make `/vote` and the Vote tab work for any ward

`src/components/stophole/PhoneShell.tsx` + store

- Add `activeWardId` to the store (set whenever the user opens a case or selects on the map; persisted to localStorage).
- TabBar's Vote link uses `activeWardId ?? DEFAULT_WARD_ID`. If still missing, the link routes to `/vote` (new index) that prompts the user to pick or detect their ward.
- Add `src/routes/vote.index.tsx` for that fallback.

### C. Enrich the ward councillor data + add Ward 32 (Welkom)

`src/data/seed.ts`

- Extend `Ward` with: `municipalityName`, `suburbs[]`, `households`, `avgHouseholdDensity`, `avgMonthlyIncomeZAR`, `repairCostPerM2: {min,max}`, `neglectMultiplier`, `infra: {capitalGrantsZAR, maintenanceSpendZAR, returnedToTreasuryZAR}`, `auditOutcome`, `auditNote`, `payroll: {totalPerYearZAR, avgAnnualZAR, headcount, note}`, `electionDate`, `potholesPreloaded`.
- Extend incumbent `Candidate` with `tenureYears`, `electedCycle`.
- Add `WD_MATJ_32` with the exact figures from your brief (René Steyn / DA, R202.9M grants vs R13.7M spend, R209M returned, Qualified Opinion, R1.12B payroll, R319,611 avg across 3,512 staff, election 2026-11-04, 12 preloaded potholes, suburbs: Welkom CBD, Jan Cilliers Park, Sandania, Reitz Park, Voorspoed).
- Generate 12 plausible preloaded pothole `CaseFile`s scattered around the Ward 32 centroid.

`src/routes/case.$caseId.tsx` — append new content blocks under the existing "Who owns this failure now":

```text
[ Tag: Local economic & community context ]
- Suburbs chips
- Households · Density · Avg income (StatTiles)
- Pothole repair cost band + 18× neglect callout

[ Tag: Municipal money monitor ]
- Tenure line (incumbent · party · years · cycle)
- StatTiles: Capital grants / Maintenance spend / Returned to Treasury
- Audit outcome badge (red for Qualified Opinion) + one-line auditNote
- Payroll block: total/yr, avg/yr, headcount, ghost-employee note

[ Action steps card (already yellow) ]
- Existing "Compare who wants the job" CTA → /candidates/$wardId
- New secondary CTA → /whatsapp (Get WhatsApp reminders)
- New line: "Final decision: 04 Nov 2026" with electionDate

[ Tag: Pothole reporting engine ]
- "{N} potholes preloaded nearby in Ward {n}"
- "Log a new pothole at your current location" → triggers the same snap flow as the home button
```

Add `src/lib/format.ts` with `formatZAR(n)` → "R 202.9M / R 1.12B / R 4,120" used across the card.

### D. New routes

1. `src/routes/how-it-works.tsx` — 4 numbered steps (Snap → Ward → Incumbent → 2026 candidates), data sources block (AGSA, National Treasury, IEC), disclaimer, CTA back to `/`.
2. `src/routes/whatsapp.tsx` — explainer + mock WhatsApp transcript (location pin → ward card reply → `CANDIDATES` / `REMIND ME` / `REPORT`), command list, `wa.me/<placeholder>?text=Start` CTA, POPIA opt-out note.
3. `src/routes/ussd.tsx` — explainer + interactive USSD simulator (pure React state) for `*120*7867#`: Welcome → 1) Report 2) Find ward 3) Voter reminder → end screen, with carrier list + cost note.

Each route: own `head()` with unique title/description/og:title/og:description.

### E. Navigation wiring

- Add a "More" overflow on `PhoneShell` TabBar linking to How it works · WhatsApp · USSD. On desktop, surface them inline in the TopBar.
- Add a small footer link cluster on `/` for the same three pages.

## Technical notes

- All new pages are static (no loaders, no server functions, no Cloud).
- Pothole creation stays client-side (Zustand + localStorage). Image lives as a blob URL — fine for demo, real upload can come later with Cloud.
- Geolocation + camera APIs need HTTPS, which the preview already provides.
- No design-token changes; reuse existing `Button`, `Card`, `Tag`, `StatTile`, `VerdictBadge`, `PhoneShell`, `TopBar`.

## Out of scope (flag for later)

- Real WhatsApp Business / USSD aggregator integration.
- Real backend persistence of user-snapped potholes (would need Lovable Cloud).
- Full national ward dataset — we keep three seeded wards (JHB 102, CPT 55, Matjhabeng 32).
