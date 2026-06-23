## Goal
Strip the current cluttered UI back to a clean Airbnb-style layout in black + yellow, using the uploaded SVG as the logo (rendered crisp, not pixelated).

## What's wrong now (from your screenshot)
- Duplicated chrome: top bar logo + big headline + bottom sheet all repeat "find your councillor"
- Bottom sheet covers the map and competes with the search field at the top
- Two CTAs ("Use my current location" + "Or snap a pothole instead" + tab bar SNAP) all do overlapping things
- Logo is rendered from a raster source, so it pixelates on retina

## Cleanup (remove duplicates)
1. Delete the bottom sheet pick card (`sh-pick` / front-card overlay on home)
2. Delete the "ONE TAP TO ACCOUNTABILITY" eyebrow + giant headline + paragraph on home
3. Remove the duplicate address input — keep only the top search bar
4. Drop the "How it works / WhatsApp version / USSD version" link row from home (move into MORE tab only)
5. Remove the splash pothole intro from the default boot (keep code, gate behind `?intro=1` for demo)

## New home layout (Airbnb-style, mobile-first)
```text
┌─────────────────────────────┐
│  [logo]   STOPHOLE     ◐    │  ← slim header, logo = SVG
├─────────────────────────────┤
│  🔍  Search address          │  ← single rounded pill, soft shadow
├─────────────────────────────┤
│                              │
│       greyscale map          │  ← fills remaining space
│        with pins             │
│                              │
│   ╭───────────────────╮      │
│   │ ◎ Use current loc │      │  ← single floating yellow pill above tabs
│   ╰───────────────────╯      │
├─────────────────────────────┤
│ SNAP  CASES  VOTE  YOU  MORE│  ← existing tab bar, restyled flat
└─────────────────────────────┘
```
- One primary action only: the yellow "Use current location" pill floating above the tab bar
- Map is the hero, not a decorative background
- Address search lives in the header pill; no second input

## Design system (Airbnb-leaning, black + yellow)
- Palette: background `#FFFFFF`, ink `#111111`, muted `#717171`, hairline `#EBEBEB`, primary yellow `#FECD00` (from your SVG), primary-ink `#111111`
- Radius: 12 (inputs), 16 (cards), 999 (pills)
- Shadow: single soft `0 6px 20px rgba(0,0,0,.08)`
- Type: one display weight for H1 only; everything else 14–16px regular/medium; no all-caps eyebrows
- Tokens updated in `src/styles/stophole-app.css` so the ward card + cases pages inherit the same look

## Logo fix (no more pixelation)
- Save `user-uploads://Untitled_design_-_1.svg` to `src/assets/stophole-logo.svg`
- Replace any `<img src=".png">` / inline raster with `<img src={logo} />` from the SVG asset, sized via CSS (height-based), `width: auto`
- Use the same SVG in header, splash, and ward-card sign so it stays vector at every size

## Ward card (keep flow, tighten visuals)
- Keep the yellow rectangular ward sign at top, but slimmer (use the same yellow token, black text, 16px radius)
- Card body: white surface, sectioned rows with hairline dividers (Airbnb listing style), not heavy boxes
- Remove the card-flip animation — push a clean route transition instead (less visual noise)

## Files to touch
- `src/routes/index.tsx` — strip duplicates, new layout
- `src/components/stophole/PhoneShell.tsx` — header simplification
- `src/styles/stophole-app.css` — new tokens, remove `sh-pick` styles
- `src/components/stophole/SplashIntro.tsx` — gate behind query param
- `src/routes/ward.$wardId.tsx` — restyle to Airbnb sections, drop flip
- `src/assets/stophole-logo.svg` — new vector logo asset

## Out of scope
- Data model, ward content, routing structure, tab bar items (only restyled)
- No new features; this is purely visual cleanup + logo fix
