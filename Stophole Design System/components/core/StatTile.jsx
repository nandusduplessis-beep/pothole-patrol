export function StatTile(props) {
  const {
    label,
    value,
    unit,
    tone = 'default',  // 'default' | 'yellow' | 'dark' | 'soft'
    size = 'md',
    style: extraStyle,
    children,
    ...rest
  } = props;

  const tones = {
    default: { bg: 'var(--surface-card)', fg: 'var(--text-strong)', lbl: 'var(--text-muted)', bd: 'var(--border-subtle)' },
    yellow:  { bg: 'var(--accent)', fg: 'var(--charcoal-900)', lbl: 'var(--yellow-800)', bd: 'transparent' },
    dark:    { bg: 'var(--charcoal-900)', fg: 'var(--grey-50)', lbl: 'var(--grey-400)', bd: 'var(--charcoal-900)' },
    soft:    { bg: 'var(--surface-sunken)', fg: 'var(--text-strong)', lbl: 'var(--text-muted)', bd: 'transparent' },
  };
  const t = tones[tone];
  const sizes = {
    sm: { pad: 14, vSize: 22, lblSize: 11 },
    md: { pad: 18, vSize: 30, lblSize: 12 },
    lg: { pad: 22, vSize: 44, lblSize: 13 },
  };
  const s = sizes[size];

  return (
    <div
      style={{
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        borderRadius: 'var(--radius-lg)',
        padding: s.pad + 'px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        ...extraStyle,
      }}
      {...rest}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: s.lblSize + 'px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: t.lbl,
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: s.vSize + 'px',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: '0.55em', fontWeight: 700, marginLeft: '0.2em', opacity: 0.75 }}>
            {unit}
          </span>
        )}
      </span>
      {children}
    </div>
  );
}
