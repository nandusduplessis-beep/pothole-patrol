&nbsp;

## Understanding (100 words)

Got it — not Tinder. Think Apple Wallet: councillor cards stack behind each other with their tops peeking out, you tap the front one to expand it full-size, swipe down to send it back into the stack, swipe up to flip and see the deep stats. Plus a richer visual language — gradient mesh backgrounds, glass/foil accents, soft inner shadows, depth — not the current flat Web 1.0 look. The card itself stays the Gareth-Bale-style sportscard, but framed inside a wallet stack with proper hierarchy, depth, and tactile motion. Voting (Asshole / Goodhole) happens on the expanded card via dedicated buttons, not horizontal swipe.

&nbsp;

What is very important to note with regards to the data that has been displayed on the card of a politician you need to group data together that will be the same for oral counsellor within the board meaning Battery budgetary all those different things of a certain municipality will be more or less the same those need to be grouped into buckets because there's too many individual lines of data so I need them to be grouped an interesting little bucket name so there is the demographic there's the behavioural there's my past as my criminal or whatever it is whatever the 46 categories is that can easily be laid out on a vent Gridr style underneath the photo whatever it is that allows for a one score and a double click if you need to I'd rather wanna go for that so at the moment there is a long ass list of data that is not surfaced as an anomaly the purpose of this is to give people enough information to make them want to vote so for me it would ideally be but I don't know if we will find real world quote but ideally if there was a quote that would go on the header of the speak of the candidate and then it would be quicker demographics of many from a demographic point of view all you wanna shows the age but whatever it is they need some thought into what the grouping looks like and that is determined by the size of the card also make sure that all of the incumbent have a colour-coded card relevant to their overall performance or even keep them just read so let's make it simpler for all of the new candidates their cards is yellow coated I mean like the top bars and stuff not the whole card and then for the incumbent it has got a red border and whatever it is I also need you to start implementing the logo as I pornography and the iconography needs to be defined so what I mean by echography whenever there is a politician in play somewhere there needs to be a icon of an asshole which is basically either a ring a doughnut ring circle with a Asterix in the middle or it is two brackets and an Asterix in the middle as old school done phones type of way that people run that needs to be the fat icon that is putting in the middle of those good things and then the Infiniti loop is all the figure loop that you see in the logo the whole purpose of that when I designed it was to showcase the never-ending problem or if it was a solution or it was positive the never-ending solution so basically it reinforces the pot hole and the arsehole I want you to in general whenever I ask you to work on something immediately think about it how do I reduce the copy with 50% 

## What changes

**1. WalletStack component** (`src/components/stophole/WalletStack.tsx`)

- Vertically stacked cards, ~80px header of each card peeking from behind the next
- Front card sits expanded; cards behind scaled 0.95/0.90 with header strip showing ward number + name + party badge
- Tap a peeking card → it animates to the front, current front slides to the back of the stack
- Front card: swipe up → flip to back face (deep stats), swipe down → collapse back into stack
- Verdict buttons (red Asshole / green Goodhole) live on the expanded front card

**2. Card visual upgrade (kill Web 1.0 flatness)**

- Front: layered gradient mesh background per party (ANC green-noir, DA blue-noir, EFF red-noir), foil-style party badge, subtle grain texture, inner highlight on top edge, deep drop shadow
- Big condensed display type for name + ward number, monospace for stat numbers
- Glass pill for incumbent/challenger status with backdrop blur
- Photo placeholder: hatched silhouette with radial light from upper-left

**3. Back of card (flip)**

- 2×2 stat grid: Budget, Payroll, Suburbs, Verdict tally
- One "Open full dossier →" link to deep-dive route
- No long scroll lists on the card itself

**4. Routes**

- Rewrite `candidates.$wardId.tsx` to host the WalletStack (full dark frame, ward sign header, no other chrome)
- New `ward.$wardId.deep.tsx` for the heavy data (budget breakdown, payroll, suburbs, money monitor) — only reached from the card's flip side
- Home, nav, splash, you, vote, cases, how-it-works, whatsapp, ussd all untouched

## Technical notes

- Motion via Framer Motion (`motion` package). Use `layoutId` for card promotion from stack to front, `AnimatePresence` for flip, `drag="y"` with directional thresholds for up-flip / down-collapse
- Z-index + translateY + scale on the stack to fake depth; capped at 4 visible peeks then "+N more" chip
- Gradient mesh = layered radial-gradients in CSS, no images
- Verdict recording reuses `castVerdict` in `stophole-store.ts` — no business logic changes
- Need design directions first to lock the exact wallet-card visual language before building (avoids another Web-1.0 round)

## Next step before building

Before I write any code I'll generate 3 rendered wallet-card design directions (same locked palette/type, different depth/foil/gradient treatments) and let you pick one. Then I build that exact look into WalletStack.

## Out of scope

- No new data, no backend
- Home screen and global nav stay as-is
- No horizontal swipe-to-vote — voting is explicit buttons on the front card