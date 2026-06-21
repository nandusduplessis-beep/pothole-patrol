// Stophole — HomeScreen: the signature pothole-input entry.

const HomeScreen = ({ onSnap, onPickRecent, onSeeCandidates }) => {
  const { Button, Icon, VerdictBadge, Tag, PotholeInput, Card } = window.StopholeDesignSystem_1ea2d7;

  const PotholeThumb = ({ verdict }) => (
    <div style={{
      width: 56, height: 56, flexShrink: 0,
      borderRadius: '52% 48% 56% 44% / 48% 56% 44% 52%',
      background: 'radial-gradient(120% 120% at 50% 30%, #3a3834 0%, #211f1c 50%, #0e0c0a 100%)',
      boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.6), inset 0 -3px 8px rgba(0,0,0,0.4)',
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: '999px',
        background: verdict === 'green' ? 'var(--status-verified)' : verdict === 'amber' ? 'var(--accent)' : 'var(--status-flagged)',
        border: '2px solid var(--surface-card)',
      }} />
    </div>
  );

  const RecentCase = ({ title, ward, days, verdict, label, onClick }) => (
    <button className="stophole-recent" onClick={onClick}>
      <PotholeThumb verdict={verdict} />
      <div className="stophole-recent__body">
        <div className="stophole-recent__title">{title}</div>
        <div className="stophole-recent__meta">
          <span className="sh-data" style={{ fontSize: 11, color: 'var(--text-muted)' }}>WARD {ward}</span>
          <span className="stophole-dot-sep" />
          <span className="sh-data" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{days} DAYS OPEN</span>
        </div>
        <div style={{ marginTop: 6 }}>
          <VerdictBadge verdict={verdict} size="sm" label={label} />
        </div>
      </div>
      <Icon name="chevron-right" size={18} style={{ color: 'var(--text-subtle)' }} />
    </button>
  );

  return (
    <div className="stophole-screen">
      <TopBar
        left={<LogoMark />}
        title={null}
        right={
          <button className="stophole-iconbtn" aria-label="notifications">
            <Icon name="bell" size={20} />
            <span className="stophole-dot" />
          </button>
        }
      />

      <div className="stophole-scroll">
        <div className="stophole-home__intro">
          <Tag>Sandton · Ward 102</Tag>
          <h1 className="stophole-display">
            Snap the <span className="sh-mark">pothole</span>.<br />
            <span className="sh-muted">Find the asshole.</span>
          </h1>
        </div>

        <div className="stophole-home__hole">
          <PotholeInput width={300} height={200} onSnap={onSnap} />
          <button className="stophole-pill-input" onClick={onSnap}>
            <Icon name="map-pin" size={14} />
            <span>or paste an address…</span>
          </button>
        </div>

        <div className="stophole-home__recent">
          <div className="stophole-row stophole-row--between">
            <span className="sh-eyebrow">Near you</span>
            <button className="stophole-link">See all <Icon name="chevron-right" size={12} /></button>
          </div>
          <div className="stophole-stack" style={{ marginTop: 10 }}>
            <RecentCase title="Rivonia Rd & Katherine" ward="102" days={102} verdict="red" label="Repeat failure" onClick={() => onPickRecent?.()} />
            <RecentCase title="William Nicol on-ramp" ward="103" days={41} verdict="amber" label="Logged, no team" onClick={() => onPickRecent?.()} />
            <RecentCase title="Grayston off-ramp" ward="102" days={6} verdict="green" label="Crew dispatched" onClick={() => onPickRecent?.()} />
          </div>
        </div>

        <Card variant="dark" padding="lg" style={{ marginTop: 22 }}>
          <Tag tone="dark" style={{ background: 'var(--charcoal-700)', color: 'var(--grey-150)', borderColor: 'transparent' }}>Election 2026</Tag>
          <h3 className="stophole-cta-h">
            Compare the people <span style={{ color: 'var(--grey-400)' }}>applying for the job.</span>
          </h3>
          <div style={{ marginTop: 14 }}>
            <Button variant="primary" size="lg" trailingIcon={<Icon name="arrow-right" size={16} />} fullWidth onClick={onSeeCandidates}>
              See ward 102 candidates
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

window.HomeScreen = HomeScreen;
