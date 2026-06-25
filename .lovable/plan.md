
## App store description (100 words)

**StopHole — Every pothole has an asshole.**

StopHole turns South Africa's pothole problem into political accountability. Open the app, share your location, and you're on the map. Tap **Log a Pothole** to snap a photo — we capture the metadata and pin it to your ward. Tap **Find the Asshole** to pull up a football-style player card for the councillor responsible: stats, record, and the receipts. Swipe left for asshole, right for goodhole, and we score them in real time. From any card, register to vote, find your voting station, or set election reminders. Fix the hole. Fire the asshole.

---

## Review against the simplicity goal

What's working: the hero ("every pothole / has an asshole") and the single tap-to-locate gesture are on-brand and simple.

What's drifting from the brief:
- The home screen only has **one** action (tap logo to find councillor). The brief calls for **two** explicit choices: *Log a Pothole* and *Find the Asshole*.
- The bottom tab bar shows *Snap / You* — but Snap currently just re-opens home. There's no camera flow wired in.
- Ward page exists but isn't styled as a **football-style player card**, and has no **swipe left/right verdict** gesture.
- Voter actions (register, find station, reminders) exist as separate routes but aren't surfaced **from the player card** as the brief requires.
- Extra routes (`/cases`, `/how-it-works`, `/ussd`, `/whatsapp`, `/candidates`) add surface area that competes with the 3-action mental model.

## Plan — tighten to the brief

### 1. Home: two clear actions
Keep the map + logo hero. Add two large buttons under the wordmark:
- **Log a Pothole** (camera icon) → opens photo capture sheet
- **Find the Asshole** (target icon) → uses location → flips to player card

Tab bar stays minimal: *Snap* (= Log a Pothole) and *You*.

### 2. Log a Pothole flow (popup/sheet)
- Bottom sheet with: camera preview → snap → auto-capture metadata (GPS lat/lng, timestamp, device).
- Optional one-tap severity (small / nasty / axle-killer).
- Save to local store, pin on the map, toast: "Logged in Ward X. Want to see who's responsible?" → CTA to player card.

### 3. Player Card (football-style)
Redesign `/ward/$wardId` as a single-screen card:
- Header: councillor photo placeholder, name, party badge, ward + area.
- **Stats grid** (standard categories): Potholes Logged, Fixed %, Avg Days to Fix, Goodhole/Asshole score, Term length, Last seen in ward.
- Illustration placeholder slot (you'll provide art).
- "More info" links: official bio, contact, party page.
- Footer CTAs: **Register to vote**, **Find voting station**, **Remind me on election day**.

### 4. Swipe verdict
On the player card:
- Swipe **left = Asshole**, **right = Goodhole**.
- Animated card flick + haptic feedback.
- Posts vote to backend, updates running score visible on the card.
- After swipe, advance to next nearby councillor (Tinder-style stack) or return to map.

### 5. Backend (Lovable Cloud)
Tables:
- `potholes` (id, lat, lng, ward_id, photo_url, severity, user_id, created_at)
- `verdicts` (id, councillor_id, user_id, verdict: 'asshole'|'goodhole', created_at)
- `councillors` (id, ward_id, name, party, photo_url, term_start, …)
- `reminders` (user_id, election_date, channel)
- Storage bucket: `pothole-photos`
- RLS: anyone can insert verdicts/potholes (anon allowed); reads public; reminders scoped to user.

### 6. Trim surface area
- Demote/remove standalone routes that don't serve the 3-action loop: `/cases`, `/candidates/*`, `/how-it-works`, `/ussd`, `/whatsapp`. Either delete or hide behind `/you` (settings/about).
- Keep: `/`, `/ward/$wardId` (player card), `/vote/$wardId` (voting station), `/you`.

### 7. Technical notes
- Add `react-swipeable` (or simple pointer handlers) for swipe gesture.
- Use `getUserMedia` for in-browser camera capture; fall back to `<input type="file" accept="image/*" capture="environment">`.
- Enable Lovable Cloud before wiring backend; reuse existing `useStopholeStore` for optimistic UI.

### Out of scope for this pass
- Real councillor data ingestion (use existing seed data).
- Push notification reminders (use email/calendar invite first).
- Final illustrations (placeholder slot only).

Reply with **go** to start building, or tell me which step to drop/reorder.
