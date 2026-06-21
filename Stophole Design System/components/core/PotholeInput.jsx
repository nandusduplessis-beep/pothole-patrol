/**
 * PotholeInput — the app's signature entry. A recessed, irregular asphalt hole
 * shape you tap (snap a photo) or type into (address). The pothole IS the input.
 */
export function PotholeInput(props) {
  const {
    placeholder = 'Snap the pothole',
    subtext = 'or type an address',
    width = 320,
    height = 230,
    onSnap,
    onChange,
    value,
    children,
    style: extraStyle,
    ...rest
  } = props;

  // Irregular blob radius — randomized-feeling but stable
  const blobRadius = '47% 53% 58% 42% / 52% 44% 56% 48%';

  return (
    <div
      style={{
        position: 'relative',
        width: width + 'px',
        height: height + 'px',
        cursor: 'text',
        borderRadius: blobRadius,
        background:
          'radial-gradient(120% 120% at 50% 30%, #3a3834 0%, #211f1c 42%, #161412 70%, #0c0b0a 100%)',
        boxShadow:
          'inset 0 18px 38px rgba(0,0,0,0.66), inset 0 -10px 26px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        border: '1px solid var(--charcoal-950)',
        overflow: 'hidden',
        ...extraStyle,
      }}
      onClick={onSnap}
      {...rest}
    >
      {/* cracked asphalt rim */}
      <div
        style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: 'inherit',
          border: '2px solid var(--grey-300)',
          opacity: 0.4,
          WebkitMask:
            'linear-gradient(95deg, #000 50%, transparent 56%, #000 64%, transparent 70%, #000 80%)',
          mask:
            'linear-gradient(95deg, #000 50%, transparent 56%, #000 64%, transparent 70%, #000 80%)',
          pointerEvents: 'none',
        }}
      />
      {/* center camera puck */}
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '999px',
          background: 'var(--accent)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--charcoal-900)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.55), inset 0 -2px 0 var(--yellow-700)',
          flexShrink: 0,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          color: 'var(--grey-150)',
          fontSize: '16px',
        }}
      >
        {placeholder}
      </div>
      {subtext && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--grey-400)',
          }}
        >
          {subtext}
        </div>
      )}
      {children}
    </div>
  );
}
