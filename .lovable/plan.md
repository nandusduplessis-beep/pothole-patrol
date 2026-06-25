## Card-based UI optimization across the whole app

Goal: every screen reads as a stack of player-style cards — dark hero cards with bold typography, white stat tiles, and consistent 22px radii — matching the Neymar/Ronaldo/Bale reference and the PlayerCard we already built.

### Pattern library (extend `src/components/stophole/`)

1. **HeroCard** — dark radial-gradient card; big name top-left, optional photo/illustration right, status chip top-right, jersey number bottom-left, badge bottom-right. Used as the top of every screen.
2. **StatRow** — 2–4 white stat tiles in equal columns (label small caps, value big condensed numeral). Replaces the loose number lists in case/vote/you screens.
3. **ListCard** — white card with hairline rows for "Now discussing"-style lists (cases, candidates, news, voter actions).
4. **ActionCard** — dark mini-card with a single CTA, used for Snap/Find/Register/Remind.

All four share radius (22px outer / 12px inner), shadow (`0 16px 38px rgba(0,0,0,.45)` for dark, `0 4px 14px rgba(0,0,0,.06)` for white), and spacing tokens already in `stophole-app.css`.

### Screen-by-screen application

- **`/` (index)** — keep hero splash, but convert the two CTAs into a single **ActionCard stack** (Log a Pothole / Find the Asshole) sitting inside one rounded container instead of floating buttons.
- **`/ward/$wardId`** — already uses PlayerCard; wrap the footer voter actions (Register / Station / Remind) into a **ListCard** below the player card.
- **`/candidates/$wardId`** — turn the list into a horizontally scrollable row of mini PlayerCards (jersey-number tile style, like the "Players" row in the Bale reference) above a ListCard of full candidates.
- **`/case/$caseId`** — restructure as: HeroCard (case title + ward sign) → StatRow (severity, age, votes, status) → ListCard sections for Economic Context, Money Monitor, Payroll (each row = label left, value right).
- **`/cases`** — grid of small HeroCards (one per case) instead of the current list.
- **`/vote/$wardId`** — HeroCard (ward sign) → StatRow (registered / turnout / next election) → ActionCard stack for the three voter actions.
- **`/you`** — HeroCard (user handle, ward), StatRow (verdicts cast, potholes logged, streak), ListCard of recent activity.
- **`/how-it-works`, `/whatsapp`, `/ussd`** — convert each step/section into a numbered HeroCard so the page reads as a deck instead of long prose.

### Global tweaks

- `PhoneShell` page padding tightened to 16px so cards breathe edge-to-edge.
- TabBar unchanged (already dark + yellow pill).
- Remove now-redundant ad-hoc card markup in routes; everything routes through the four primitives.

### Out of scope

No data/store changes, no new routes, no logic changes — purely presentation refactor.