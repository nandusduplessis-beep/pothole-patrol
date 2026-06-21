export function Button(props) {
  const {
    variant = 'primary',  // 'primary' (yellow) | 'dark' (charcoal pill) | 'ghost' | 'secondary'
    size = 'md',          // 'sm' | 'md' | 'lg'
    leadingIcon,
    trailingIcon,
    iconChip = false,     // small rounded icon-chip inside dark pill (Hecta pattern)
    fullWidth = false,
    disabled = false,
    onClick,
    children,
    style: extraStyle,
    ...rest
  } = props;

  const sizes = {
    sm: { h: 36, padX: 14, fs: 13, gap: 8 },
    md: { h: 44, padX: 18, fs: 14, gap: 9 },
    lg: { h: 52, padX: 24, fs: 15, gap: 10 },
  };
  const s = sizes[size];

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid var(--yellow-600)',
      boxShadow: 'var(--shadow-xs)',
    },
    dark: {
      background: 'var(--charcoal-900)',
      color: 'var(--grey-50)',
      border: '1px solid var(--charcoal-900)',
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent',
    },
  };

  const baseStyle = {
    appearance: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap + 'px',
    height: s.h + 'px',
    padding: `0 ${s.padX}px`,
    paddingLeft: iconChip ? '6px' : s.padX + 'px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: s.fs + 'px',
    letterSpacing: '-0.005em',
    borderRadius: '999px',
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    width: fullWidth ? '100%' : 'auto',
    ...variants[variant],
    ...extraStyle,
  };

  const chipStyle = {
    width: (s.h - 12) + 'px',
    height: (s.h - 12) + 'px',
    background: 'var(--accent)',
    color: 'var(--charcoal-900)',
    borderRadius: '999px',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
  };

  return React.createElement(
    'button',
    {
      onClick: disabled ? undefined : onClick,
      disabled,
      style: baseStyle,
      ...rest,
    },
    iconChip && variant === 'dark' && leadingIcon
      ? React.createElement('span', { style: chipStyle }, leadingIcon)
      : leadingIcon,
    React.createElement('span', null, children),
    trailingIcon
  );
}
