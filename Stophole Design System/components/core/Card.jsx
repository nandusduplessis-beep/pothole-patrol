export function Card(props) {
  const {
    variant = 'default',  // 'default' (white) | 'sunken' | 'dark' | 'yellow'
    padding = 'md',
    children,
    style: extraStyle,
    ...rest
  } = props;
  const variants = {
    default: { bg: 'var(--surface-card)', bd: 'var(--border-subtle)', fg: 'var(--text-body)' },
    sunken:  { bg: 'var(--surface-sunken)', bd: 'transparent', fg: 'var(--text-body)' },
    dark:    { bg: 'var(--charcoal-900)', bd: 'var(--charcoal-900)', fg: 'var(--grey-50)' },
    yellow:  { bg: 'var(--accent)', bd: 'transparent', fg: 'var(--charcoal-900)' },
  };
  const v = variants[variant];
  const pads = { sm: 14, md: 20, lg: 26 };
  return (
    <div
      style={{
        background: v.bg,
        color: v.fg,
        border: `1px solid ${v.bd}`,
        borderRadius: 'var(--radius-lg)',
        padding: pads[padding] + 'px',
        ...extraStyle,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
