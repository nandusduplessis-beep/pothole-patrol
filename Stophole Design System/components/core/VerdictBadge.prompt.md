# VerdictBadge

The Pothole Test verdict — a pill with the traffic-light glyph and a single word. The product's most-repeated UI atom.

```jsx
<VerdictBadge verdict="green" />
<VerdictBadge verdict="amber" size="lg" label="Partial" />
<VerdictBadge verdict="red" size="sm" label="Replace" />
```

**Rules**
- One verdict per case/candidate. Always leads — show the verdict first, reasoning second.
- Override `label` for context-specific text ("Replace", "Partial fit", "Proven"). The glyph stays.
