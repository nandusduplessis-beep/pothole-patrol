// Stophole — shared bits: MiniMap, CameraOverlay, SuccessScreen, Splash

const MiniMap = ({ pinColor = 'var(--status-flagged)' }) => (
  <div style={{ position: 'absolute', inset: 0 }}>
    <div className="stophole-map-grid" />
    <div className="stophole-map-road" style={{ top: '38%', left: 0, right: 0, height: 10 }} />
    <div className="stophole-map-road" style={{ top: 0, bottom: 0, left: '58%', width: 10 }} />
    <div className="stophole-map-road" style={{ top: '38%', left: '58%', width: 60, height: 6, transform: 'rotate(34deg)', transformOrigin: 'left center' }} />
    <svg className="stophole-map-pin" style={{ top: '40%', left: '58%', color: pinColor }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </svg>
  </div>
);

const CameraOverlay = ({ onCapture, onClose }) => {
  const { Icon } = window.StopholeDesignSystem_1ea2d7;
  return (
    <div className="stophole-camera">
      <div className="stophole-camera__view">
        <button className="stophole-camera__close" onClick={onClose} aria-label="close">
          <Icon name="x" size={20} />
        </button>
        <div className="stophole-camera__hint">Frame the pothole · tap to capture</div>
        <div className="stophole-camera__reticle">
          <span style={{ position: 'absolute', top: -1, left: -1, width: 22, height: 22, borderTop: '4px solid var(--accent)', borderLeft: '4px solid var(--accent)', borderRadius: '12px 0 0 0' }} />
          <span style={{ position: 'absolute', top: -1, right: -1, width: 22, height: 22, borderTop: '4px solid var(--accent)', borderRight: '4px solid var(--accent)', borderRadius: '0 12px 0 0' }} />
          <span style={{ position: 'absolute', bottom: -1, left: -1, width: 22, height: 22, borderBottom: '4px solid var(--accent)', borderLeft: '4px solid var(--accent)', borderRadius: '0 0 0 12px' }} />
          <span style={{ position: 'absolute', bottom: -1, right: -1, width: 22, height: 22, borderBottom: '4px solid var(--accent)', borderRight: '4px solid var(--accent)', borderRadius: '0 0 12px 0' }} />
        </div>
      </div>
      <div className="stophole-camera__bar">
        <button className="stophole-camera__shutter" onClick={onCapture} aria-label="capture">
          <Icon name="camera" size={26} />
        </button>
      </div>
    </div>
  );
};

const SuccessScreen = ({ onContinue }) => {
  const { Button, Icon, Tag } = window.StopholeDesignSystem_1ea2d7;
  return (
    <div className="stophole-screen">
      <div className="stophole-success">
        <div className="stophole-success__check">
          <Icon name="check" size={48} strokeWidth={2.5} />
        </div>
        <Tag tone="success">Case #SH-1042 opened</Tag>
        <h1>Logged. Mapped.<br />Owner named.</h1>
        <p>We pinned it to <strong style={{ color: 'var(--text-strong)' }}>Ward 102</strong> and matched the councillor accountable right now.</p>
        <div style={{ width: '100%', maxWidth: 280, marginTop: 8 }}>
          <Button variant="primary" size="lg" fullWidth trailingIcon={<Icon name="arrow-right" size={16} />} onClick={onContinue}>
            See who owns this
          </Button>
        </div>
      </div>
    </div>
  );
};

const SplashScreen = ({ onEnter }) => {
  const { Icon } = window.StopholeDesignSystem_1ea2d7;
  React.useEffect(() => {
    const t = setTimeout(() => onEnter?.(), 1700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="stophole-screen" onClick={onEnter} style={{ cursor: 'pointer' }}>
      <div className="stophole-splash">
        <div className="stophole-splash__grid" />
        <div className="stophole-splash__mark">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="var(--accent)" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="3" fill="var(--accent)" />
            <rect x="11.2" y="1.5" width="1.6" height="4" rx="0.8" fill="var(--accent)" />
            <rect x="11.2" y="18.5" width="1.6" height="4" rx="0.8" fill="var(--accent)" />
            <rect x="1.5" y="11.2" width="4" height="1.6" rx="0.8" fill="var(--accent)" />
            <rect x="18.5" y="11.2" width="4" height="1.6" rx="0.8" fill="var(--accent)" />
          </svg>
        </div>
        <div className="stophole-splash__word" style={{ color: 'var(--grey-50)' }}>
          STOP<span style={{ color: 'var(--accent)' }}>HOLE</span>
        </div>
        <div className="stophole-splash__tag">Stop the assholes<br />responsible for the potholes</div>
        <div className="stophole-splash__loader" />
      </div>
    </div>
  );
};

Object.assign(window, { MiniMap, CameraOverlay, SuccessScreen, SplashScreen });
