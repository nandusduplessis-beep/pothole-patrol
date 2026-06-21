export function VerdictBadge(props) {
  const {
    verdict = 'green',  // 'green' | 'amber' | 'red'
    size = 'md',        // 'sm' | 'md' | 'lg'
    label,
    style: extraStyle,
    ...rest
  } = props;

  const verdicts = {
    green: { bg: 'var(--status-verified)', fg: '#fff', glyph: '🟢', word: 'GREEN' },
    amber: { bg: 'var(--accent)',           fg: 'var(--charcoal-900)', glyph: '🟡', word: 'AMBER' },
    red:   { bg: 'var(--status-flagged)',  fg: '#fff', glyph: '🔴', word: 'RED' },
  };
  const v = verdicts[verdict];

  const sizes = {
    sm: { h: 22, padX: 8, fs: 10, gap: 4 },
    md: { h: 28, padX: 11, fs: 11, gap: 5 },
    lg: { h: 36, padX: 14, fs: 13, gap: 7 },
  };
  const s = sizes[size];

  return React.createElement(
    'span',
    {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap + 'px',
        height: s.h + 'px',
        padding: `0 ${s.padX}px`,
        background: v.bg,
        color: v.fg,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: s.fs + 'px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: '999px',
        ...extraStyle,
      },
      ...rest,
    },
    React.createElement('span', { style: { fontSize: s.fs + 1, lineHeight: 1 } }, v.glyph),
    label || v.word
  );
}
