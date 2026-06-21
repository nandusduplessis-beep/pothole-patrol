// Stophole — CasesScreen: history dashboard, dated rows + greeting

const CasesScreen = ({ onOpenCase }) => {
  const { Icon, VerdictBadge, Tag } = window.StopholeDesignSystem_1ea2d7;

  const Row = ({ title, ward, verdict, label, time, onClick }) => (
    <button className="stophole-recent" onClick={onClick}>
      <div style={{
        width: 44, height: 44, flexShrink: 0, borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', color: 'var(--text-muted)',
      }}>
        <Icon name="map-pin" size={20} />
      </div>
      <div className="stophole-recent__body">
        <div className="stophole-recent__title">{title}</div>
        <div className="stophole-recent__meta">
          <span className="sh-data" style={{ fontSize: 11, color: 'var(--text-muted)' }}>WARD {ward}</span>
          <span className="stophole-dot-sep" />
          <span className="sh-data" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{time}</span>
        </div>
      </div>
      <VerdictBadge verdict={verdict} size="sm" label={label} />
    </button>
  );

  return (
    <div className="stophole-screen">
      <TopBar
        left={<LogoMark />}
        title={null}
        right={<button className="stophole-iconbtn" aria-label="search"><Icon name="search" size={18} /></button>}
      />
      <div className="stophole-scroll">
        <div className="stophole-greet">
          <Tag>3 cases · 1 fixed</Tag>
          <h1>Your watchlist, Lerato.</h1>
          <p>Cases you opened or follow in Ward 102.</p>
        </div>

        <div className="stophole-daterow">
          <div className="stophole-daterow__label">This week</div>
          <div className="stophole-stack">
            <Row title="Rivonia Rd & Katherine" ward="102" verdict="red" label="Replace" time="MON" onClick={onOpenCase} />
            <Row title="Grayston off-ramp" ward="102" verdict="green" label="Crew sent" time="SUN" onClick={onOpenCase} />
          </div>
        </div>

        <div className="stophole-daterow">
          <div className="stophole-daterow__label">Earlier</div>
          <div className="stophole-stack">
            <Row title="William Nicol on-ramp" ward="103" verdict="amber" label="Logged" time="12 MAY" onClick={onOpenCase} />
            <Row title="Marlboro Dr dip" ward="105" verdict="amber" label="Logged" time="03 MAY" onClick={onOpenCase} />
            <Row title="Katherine St crack" ward="102" verdict="green" label="Fixed" time="28 APR" onClick={onOpenCase} />
          </div>
        </div>
      </div>
    </div>
  );
};

window.CasesScreen = CasesScreen;
