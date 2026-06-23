I’ll undo the broken parts of the last pass and rebuild the opening experience as a clean, responsive sequence instead of oversized overlays.

Plan:

1. Fix the runtime error first
- Make the splash SSR-safe so the server and client render the same tree.
- Remove the `sessionStorage`-based first render branch that caused the hydration mismatch.
- Keep the intro optional but trigger it only after mount.

2. Rebuild the front card sizing
- Replace the bulky bottom sheet with a compact front-card panel sized for mobile first.
- Keep it inside the responsive web app frame, not a fake phone shell.
- Ensure desktop/tablet/mobile dimensions don’t stretch or overflow.

3. Correct the opening visual sequence
- Black pothole full-screen intro that pulls out into the map.
- Greyscale map behind the front card.
- STOPHOLE logo visible and centered as a brand anchor, not floating awkwardly.

4. Correct the user choice step
- First meaningful click opens a compact choice state:
  - Use current location
  - Enter address/suburb
- Current location should resolve directly to the ward card.
- Address input should resolve Ward 32 for Welkom / Ward 32 / Matjhabeng demo terms.

5. Correct the loader and flip
- Use the asterisk-in-donut loader only while resolving location/address.
- Make the card itself flip, not the whole browser viewport.
- Flip lands into the ward card preview cleanly.

6. Rework the ward card presentation
- Keep the yellow rectangular Ward 32 sign across the top.
- Present data as a sportscard/player-stat layout with repeatable categories:
  - Ward identity
  - Incumbent councillor
  - Community context
  - Money monitor
  - Repair economics
  - Audit/governance
  - Voting/candidates
- Tighten typography and spacing so the card feels designed, not dumped.

7. Verify before reporting back
- Check the preview for hydration/runtime errors.
- Check mobile width around 393px and desktop width.
- Confirm the flow: open app → intro → front card → current location/address → loader → flip → Ward 32 card.