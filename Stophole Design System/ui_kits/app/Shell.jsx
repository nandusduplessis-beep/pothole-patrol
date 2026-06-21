// Stophole — phone-frame app shell (used by ui_kits/app/index.html)
// Loads after _ds_bundle.js. Exposes <PhoneShell /> on window.

const { Button, Icon, VerdictBadge, Tag, StatTile, Card, DotScore, PotholeInput } =
  window.StopholeDesignSystem_1ea2d7;

// -----------------------------------------------------------
// Tiny utilities
// -----------------------------------------------------------
const cn = (...xs) => xs.filter(Boolean).join(' ');

function PhoneFrame({ children, theme = 'light' }) {
  return (
    <div className="stophole-phone" data-theme={theme}>
      <div className="stophole-phone__bezel">
        <div className="stophole-phone__notch" />
        <div className="stophole-phone__screen">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ theme }) {
  return (
    <div className="stophole-status">
      <span>9:41</span>
      <div className="stophole-status__icons">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="4" y="4" width="3" height="6"/><rect x="8" y="2" width="3" height="8"/><rect x="12" y="0" width="3" height="10"/></svg>
        <span style={{fontSize:10, fontWeight:700, marginLeft:4}}>LTE</span>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none" stroke="currentColor" strokeWidth="1"><rect x="0.5" y="0.5" width="18" height="10" rx="2"/><rect x="20" y="3" width="1.5" height="5" rx="0.5" fill="currentColor" stroke="none"/><rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor" stroke="none"/></svg>
      </div>
    </div>
  );
}

// -----------------------------------------------------------
// TopBar — small charcoal logo mark + label + right icon
// -----------------------------------------------------------
function TopBar({ left, title, right }) {
  return (
    <div className="stophole-topbar">
      <div className="stophole-topbar__l">{left}</div>
      <div className="stophole-topbar__t">{title}</div>
      <div className="stophole-topbar__r">{right}</div>
    </div>
  );
}

function LogoMark({ size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 7,
      background: 'var(--charcoal-900)',
      display: 'grid', placeItems: 'center', flexShrink: 0,
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7" stroke="var(--accent)" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="2.6" fill="var(--accent)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------
// Bottom tab bar
// -----------------------------------------------------------
function TabBar({ active, onNav }) {
  const items = [
    { id: 'home', label: 'Snap', icon: 'camera' },
    { id: 'cases', label: 'Cases', icon: 'list' },
    { id: 'vote', label: 'Vote', icon: 'vote' },
    { id: 'profile', label: 'You', icon: 'user' },
  ];
  return (
    <div className="stophole-tabbar">
      {items.map(it => (
        <button
          key={it.id}
          className={cn('stophole-tab', active === it.id && 'is-active')}
          onClick={() => onNav?.(it.id)}
        >
          <Icon name={it.icon} size={20} />
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { PhoneFrame, StatusBar, TopBar, LogoMark, TabBar, cn });
