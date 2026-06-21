export function Tag(props) {
  const { tone = 'neutral', children, style: extraStyle, ...rest } = props;
  const tones = {
    neutral: { bg: 'var(--surface-sunken)', fg: 'var(--text-muted)', bd: 'var(--border-subtle)' },
    yellow:  { bg: 'var(--accent)', fg: 'var(--charcoal-900)', bd: 'var(--yellow-600)' },
    dark:    { bg: 'var(--charcoal-900)', fg: 'var(--grey-50)', bd: 'var(--charcoal-900)' },
    success: { bg: 'var(--status-verified-bg)', fg: 'var(--status-verified)', bd: 'transparent' },
    danger:  { bg: 'var(--status-flagged-bg)',  fg: 'var(--status-flagged)',  bd: 'transparent' },
  };
  const t = tones[tone];
  return React.createElement(
    'span',
    {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderRadius: '999px',
        whiteSpace: 'nowrap',
        ...extraStyle,
      },
      ...rest,
    },
    children
  );
}
