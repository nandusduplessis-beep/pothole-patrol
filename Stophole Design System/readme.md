# Stophole — Design System

> **Stop the assholes responsible for the potholes.**

Stophole is a civic accountability app for South African voters. It turns the road you
hate into a hiring decision: snap a pothole, see your ward, see who is *accountable right
now*, see the job they hold (and what taxpayers pay for it), then compare the people
applying to do that job at the next local election — scored on whether they will actually
fix things.

The product's one job: **get a voter one click away from a decision.** Built for low-end
Android phones on patchy networks across South Africa. Simple, fast, blunt, premium.

---

## What the product does (functional model)

The core flow, in order — every screen is one tap from the next:

1. **Snap or search** — take the pothole photo you were already going to send to WhatsApp,
   or type the address. Public potholes are preloaded; a missing one becomes a new case file.
2. **Locate the case** — the pothole is mapped to a **ward**. Address, ward number, road
   authority, "known since" date, community claims.
3. **Name who owns the failure now** — the current ward councillor, their contactability,
   and structured public signals (unresponsive · repeat failure · not fixed).
4. **Community intelligence** — Truecaller-style public notes. Raw resident text is stored;
   public-facing labels are shown as structured signals.
5. **Reframe the election as a hiring round** — show the **job spec** (represent the ward,
   escalate service failures, monitor delivery, report back) and the **salary band**
   taxpayers fund.
6. **Compare the applicants** — 2026 candidates scored and sorted.
7. **Where & when to vote** — ward voting station and date, one tap from any case.

### The scoring model — "The Pothole Test"

Candidates are not judged on ideology or promises. They are judged on **evidence of
execution**, surfaced as five signals:

- **Proven fix rate** — have they (or their team) fixed visible problems before?
- **Time-to-action** — response measured in days/weeks, not months/years.
- **Budget conversion** — allocated money turned into visible infrastructure.
- **System presence** — working reporting channels, scheduled maintenance, contractors that show up.
- **Local accountability** — reachable, ward-visible, doesn't vanish between elections.

These roll up to a single **traffic-light verdict** — the spine of the whole brand:

| Verdict | Meaning |
|---|---|
| 🟢 **GREEN** | Visible, local, delivery-adjacent. Most likely to execute. |
| 🟡 **AMBER** | Partial. Visible but unproven. Not automatic. |
| 🔴 **RED** | Ghost candidate, recycled, or pure party boilerplate. |

---

## Sources & provenance

This system was built from materials supplied by the client — **no production codebase or
Figma file was attached.** Keep these references in case a future contributor has access:

- `uploads/stophole-prototype.html` — an early single-screen HTML prototype (used an earlier
  teal/cream palette + Satoshi; **superseded** by the charcoal/yellow brand direction in this
  system). Source of functional model and tone of voice.
- `uploads/im asking you to summarise this conversation : Loc.md` — research conversation
  establishing the civic thesis (local government is the "execution layer" of the state;
  municipalities control ~27% of public spending), the candidate-capability model, and the
  "Pothole Test" indicator framework.

**Brand direction** (charcoal / white / hazard-yellow / soft grey, minimalist-premium, light
+ dark) was specified directly by the client and takes precedence over the prototype's visuals.

---

## CONTENT FUNDAMENTALS — how Stophole writes

The voice is the product. Get this wrong and it's just another civic dashboard.

**Vibe:** Street-level, blunt, a little angry, never corporate. It sounds like a fed-up
resident who is also organised. Confidence without polish-for-polish's-sake. South African
and proud of it — local vernacular is welcome.

**Person:** Second person, imperative. Talk to *you*, the voter. "Snap the pothole." "Name
who failed." "See who wants the job." The app does work *for* you; you are the one with power.

**Casing:**
- **Display headlines** can go ALL-CAPS for civic-poster impact, or sentence case for
  directness. Never Title Case Every Word — that reads corporate.
- **Eyebrows / labels** are ALL-CAPS, mono, tracked out (signage feel): `WARD 102`, `THE JOB`,
  `CURRENT ACCOUNTABILITY`.
- **Body** is sentence case, short sentences, hard stops.

**Tone rules:**
- Be specific, never vague. Name the street, the ward, the rand amount, the number of days.
  "102 days on public systems." "R270k–R650k." Specificity *is* the credibility.
- Verbs over nouns. "Fix," "name," "replace," "compare," "vote" — not "facilitate,"
  "leverage," "engagement."
- Short. If a sentence can be cut, cut it. Phone screens, low patience.
- Lead with the verdict. Green/Amber/Red first, reasoning second.

**Profanity:** The brand name itself is built on it ("stop the **assholes**"). Salty language
is on-brand *when it's the resident's voice* — community notes preserve raw text ("Nobody owns
it when you phone. John is a poes."). The app's *own* chrome (labels, buttons, system copy)
stays clean and structured — the contrast between raw community anger and calm structured
signals is the point. Don't make the UI itself swear; let the *people* swear.

**Emoji:** Used only as the traffic-light verdict shorthand (🟢🟡🔴) and sparingly. Not
decorative. Never in body copy.

**Examples of on-voice copy:**
- "Snap the pothole. Name who failed. Compare who wants the job next."
- "Who owns this failure now?"
- "Turn a pothole into a hiring decision."
- "Green = visible, local, delivery-adjacent. Red = ghost, recycled, or party boilerplate."
- "If they disappear between elections, they won't fix anything."
- Internal shorthand: "EskomSePush for potholes" — but the product *fixes* the problem, it
  doesn't just report it.

---

## VISUAL FOUNDATIONS

The whole system is one metaphor: **road signage on asphalt.** Charcoal is the road, hazard
yellow is the one accent that means *attention / action / brand*, soft grey is everything
structural. Premium-minimal = lots of breathing room, crisp 1px lines, one loud colour used
with discipline.

**Colour**
- **Charcoal** (`--charcoal-900 #161614` and family) — primary ink in light mode, primary
  surface in dark mode. Slightly warm, never pure black.
- **Hazard yellow** (`--yellow-500 #FFC700`) — the *only* accent. Primary buttons, brand mark,
  highlight marker on key words, active states, the GREEN-adjacent "go" energy. Text on yellow
  is always charcoal (`--text-on-accent`) for contrast. Used sparingly — if everything is
  yellow, nothing is.
- **Soft grey** (`--grey-300 #B4AFA6` + scale) — borders, muted text, sunken surfaces,
  structure. Warm-neutral, not cold.
- **Semantic** is deliberately restrained and muted so the brand yellow stays loud: green
  `#2FA66B` (verified/worthy), red `#E0473F` (flagged/the asshole), blue `#3B7BD6` (neutral
  info). These power the traffic-light verdicts.
- **Two themes**, same semantic aliases: light (cream-white page, charcoal ink) is the default;
  dark (charcoal page, soft-grey ink) for night / OLED battery saving on phones.

**Type**
- **Archivo** — display & headers. Institutional, confident grotesque; heavy weights (800/900),
  tight tracking (`-0.02em`). Reads "official" in a civic-poster way.
- **Hanken Grotesk** — body. Humanist, friendly, extremely legible at 14–16px on small screens.
- **Space Mono** — data: ward numbers, dates, rand amounts, vote counts, eyebrows/labels.
  Monospace = "this is a fact, not marketing."
- *(Substituted from Google Fonts — see Caveats. Swap for licensed brand fonts when available.)*

**Spacing & layout**
- 4px base grid. Mobile-first single column (`--container-sm: 420px`); content stacks, one idea
  per band. Generous tap targets (`--tap-min: 44px`, `--tap-comfy: 52px`) — non-negotiable for
  thumbs on cheap phones.
- Dense but never cramped: deliberate whitespace between bands, tight within a card.

**Backgrounds** — flat. No photographic hero washes, no noise textures, no decorative
gradients. The page is a calm flat surface (`--surface-page`); the *only* gradient allowed is
the subtle asphalt rendering inside the map/photo placeholder. Yellow does the talking, not
texture.

**Borders & cards** — structure is carried by **1px hairline borders** (`--border-subtle`) more
than by shadow. Cards: `--surface-card`, 1px border, `--radius-md (10px)`, `--shadow-sm` (very
soft, low). Confident rectangles with modest rounding — *not* bubbly. Emphatic elements use a
2px `--border-bold` for a signage feel.

**Shadows** — soft, neutral, low-spread (`--shadow-xs/sm/md/lg`). Never coloured (except the
optional yellow "press" ledge `--shadow-accent`). Dark mode deepens them.

**Corner radii** — modest and consistent: `4 / 6 / 10 / 14 / 20` and `pill (999px)` for
status chips and verdict badges. Default UI radius is 10px.

**The signature brand moves** *(direction confirmed by client inspiration — Hecta / Unit8 /
FeeGoo / Octopus: big bold sans, two-tone headlines, pill tags, rounded cards on soft grey,
dot-grid scoring, dark pill buttons, big stat tiles — rendered in charcoal + hazard yellow,
**never serif**):*
- **Two-tone headline** (`.sh-muted` on a clause) — the signature editorial move: lead clause in
  `--text-strong`, the trailing clause drops to `--text-muted` grey. "Smart drones for scanning,
  *spraying, and precision farming*." Used on most headlines.
- **Yellow highlight marker** (`.sh-mark`) — a key word gets a yellow box behind it, like a
  marker pen on a poster. Once per headline, max.
- **Hazard underline** (`.sh-underline`) — a thick yellow weight sitting under a heading.
- **Pill eyebrow tag** — a soft rounded-pill label above a section ("WARD 102", "THE JOB"),
  subtle grey fill, mono caps. The Hecta/FeeGoo section-tag pattern.
- **Dot-grid / bar score** — the Pothole Test verdict rendered as a row of filled vs empty dots
  or bars (FeeGoo-style), filled in the verdict colour. Quantity *is* the argument.
- **Dark pill button + icon chip** — primary actions are pill-shaped; charcoal pill with a small
  rounded yellow icon-chip leading the label (Hecta "Explore Solutions" pattern). The yellow
  *solid* pill is the loudest CTA.
- **Big stat tile** — oversized mono number + small grey label, in a rounded card. For salary
  bands, days-open, hectares, counts.
- **Yellow hero block** — one big yellow rounded card per screen carrying the single most
  important number/message (their lime "2 weeks" block → our yellow).
- **Reticle mark** — the logo: a charcoal tile with a yellow targeting reticle (vet + locate).
- **Traffic-light verdict badge** — the recurring GREEN/AMBER/RED pill, the product's heartbeat.

**Cards & containers** lean into the inspiration: large `--radius-lg`/`--radius-xl` rounded
containers, soft-grey page, white/charcoal cards, lots of internal padding, content grouped into
generous rounded blocks rather than flat lists.

**Motion** — quick and flat (cheap on low-end GPUs). `--dur-fast 120ms` / `--dur-base 180ms`,
`--ease-out`. Fades and short translations only — no bounces, no parallax, no infinite loops.
Respect `prefers-reduced-motion`.

**Hover / press** — hover darkens the accent (`--accent-hover`) or fills a sunken surface;
press darkens further (`--accent-pressed`) and may drop the 2px yellow ledge. No scale-up
flourishes; an optional subtle 0.98 press-shrink on primary CTAs is allowed.

**Transparency & blur** — used only for overlays/scrims (`--surface-overlay`) behind dialogs
and the occasional sticky header backdrop. Not decorative; blur is expensive on cheap GPUs, so
it's rationed.

---

## ICONOGRAPHY

Stophole uses **[Lucide](https://lucide.dev)** (CDN) as its icon system — clean 2px-stroke
outline icons that match the minimalist-premium, signage-adjacent feel and stay crisp at small
sizes on low-DPI screens. *(Substitution flag: no brand icon set was supplied; Lucide is the
closest-fitting open set. Swap if a bespoke set arrives.)*

Rules:
- **Stroke icons only**, 2px weight, `currentColor` so they inherit text colour and theme.
- Default sizes: 18px inline, 20px in buttons, 24px standalone. Never below 16px.
- Icons **support** text, they rarely replace it — "one click from value" means labels stay
  legible; icon-only controls are reserved for universally understood actions (close, back,
  search) and always meet the 44px tap target.
- **Emoji** appear only as the traffic-light verdict shorthand (🟢🟡🔴), never as decorative
  iconography.
- The brand **reticle mark** (`assets/mark.svg`) is the one bespoke glyph — used as app icon,
  favicon, and lockup. Don't redraw it; reference the file.

Common icons in use: `camera`, `map-pin`, `search`, `chevron-right`, `circle-check`,
`triangle-alert`, `circle-x`, `user`, `vote`, `calendar`, `banknote`, `flag`.

---

## Index — what's in this system

**Foundations (root)**
- `styles.css` — global entry point (import this one file). `@import`s everything below.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `assets/` — `mark.svg`, `mark-yellow.svg`, `logo-wordmark.svg`, `logo-wordmark-dark.svg`.
- `guidelines/` — 14 foundation specimen cards (Type · Colors · Spacing · Brand) for the DS tab.

**Components** (`components/core/`) — 8 reusable React primitives, each with `.jsx` + `.d.ts` +
`.prompt.md`, grouped into card HTMLs:
- `Button` — pill action button (primary yellow / dark / secondary / ghost, optional icon-chip)
- `Tag` — pill eyebrow section label
- `VerdictBadge` — the traffic-light GREEN/AMBER/RED pill
- `StatTile` — oversized mono stat block
- `DotScore` — dot-grid score row (the Pothole Test signals)
- `Card` — rounded container (default / sunken / dark / yellow)
- `Icon` — 2px Lucide-style stroke icons
- `PotholeInput` — the signature pothole-shaped entry

**UI kit** (`ui_kits/app/`) — interactive click-through of the Stophole phone app:
`index.html` (orchestrator + theme toggle), `Shell.jsx` (phone frame, status/top/tab bars),
`Shared.jsx` (splash, camera, success, mini-map), and one screen per file: `HomeScreen`,
`CaseScreen`, `CandidatesScreen`, `VoteScreen`, `CasesScreen`. Styled by `app.css`.

**Template** (`templates/app-screen/`) — a copy-ready starting frame for consuming projects.

**Skill** — `SKILL.md` (Agent-Skills compatible) for using this system in Claude Code.

---

*Caveats live at the end of the build — see the chat. Fonts and icon set are substitutions
pending brand assets.*
