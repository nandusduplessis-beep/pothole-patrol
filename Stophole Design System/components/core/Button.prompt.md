# Button

One-sentence: A pill-shaped action button — `primary` (yellow) for the single loud CTA per screen, `dark` (charcoal) for default actions, often with an `iconChip` for the Hecta-pattern leading yellow icon-chip.

```jsx
<Button variant="primary" size="lg" fullWidth>Snap the pothole</Button>
<Button variant="dark" iconChip leadingIcon={<Icon name="arrow-right" />}>Explore candidates</Button>
<Button variant="secondary" size="sm">Skip</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

**Variants**
- `primary` — yellow pill, charcoal text. Use ONCE per screen for the most important action.
- `dark` — charcoal pill with light text; the workhorse. Pair with `iconChip` for headline CTAs.
- `secondary` — white pill, charcoal text, 1px border. For low-emphasis options.
- `ghost` — transparent, charcoal text. For dismissals and inline links.

**Sizes** — `sm` 36px, `md` 44px (default, meets tap target), `lg` 52px (primary CTAs, --tap-comfy).
