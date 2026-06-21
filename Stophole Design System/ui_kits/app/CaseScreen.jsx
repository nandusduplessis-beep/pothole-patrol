// Stophole — CaseScreen: a single pothole case file

const CaseScreen = ({ onBack, onSeeCandidates }) => {
  const { Button, Icon, VerdictBadge, Tag, StatTile, Card } = window.StopholeDesignSystem_1ea2d7;

  const SignalRow = ({ icon, text, tone }) => (
    <div className={`stophole-signal stophole-signal--${tone}`}>
      <Icon name={icon} size={16} />
      <span className="stophole-signal__txt">{text}</span>
    </div>
  );

  const Note = ({ name, days, text, raw }) => (
    <div className="stophole-note">
      <div className="stophole-note__head">
        <span>{name}</span>
        <span className="stophole-dot-sep" />
        <span>{days}</span>
        {raw && <span className="raw">raw · unedited</span>}
      </div>
      <div className="stophole-note__txt">{text}</div>
    </div>
  );

  return (
    <div className="stophole-screen">
      <TopBar
        left={<button className="stophole-iconbtn" onClick={onBack} aria-label="back"><Icon name="chevron-left" size={22} /></button>}
        title={<span>CASE · #SH-1042</span>}
        right={<button className="stophole-iconbtn" aria-label="share"><Icon name="share" size={18} /></button>}
      />

      <div className="stophole-scroll">
        <div className="stophole-case__hero">
          <div className="stophole-case__photo">
            <div className="stophole-case__photo-inner">
              <Tag tone="dark" style={{ background: 'rgba(14,14,13,0.7)', color: 'var(--grey-50)', borderColor: 'transparent' }}>102 days</Tag>
            </div>
          </div>
          <div className="stophole-case__map"><MiniMap /></div>
        </div>

        <div className="stophole-case__head">
          <Tag>Ward 102 · Sandton</Tag>
          <h1 className="stophole-h1">Rivonia Rd <span className="sh-muted">@ Katherine St.</span></h1>
          <span className="sh-data" style={{ fontSize: 12, color: 'var(--text-muted)' }}>JOHANNESBURG ROADS AGENCY (JRA)</span>
        </div>

        <div className="stophole-case__stats">
          <StatTile label="Open" value="102" unit="d" />
          <StatTile label="Reports" value="38" />
          <StatTile label="Refills" value="2" tone="soft" />
        </div>

        <div className="stophole-block">
          <span className="sh-eyebrow">Who owns this failure now</span>
          <Card style={{ marginTop: 10 }}>
            <div className="stophole-person">
              <div className="stophole-avatar">JM</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="stophole-person__name">Cllr. John Mokoena</div>
                <div className="stophole-person__role">Ward Councillor · 102</div>
              </div>
              <VerdictBadge verdict="red" size="sm" label="Replace" />
            </div>
            <div className="stophole-signals">
              <SignalRow icon="phone" text="Unreachable on 3 of 5 numbers" tone="red" />
              <SignalRow icon="triangle-alert" text="Same pothole — 4 election cycles" tone="red" />
              <SignalRow icon="banknote" text="R1.2m allocated · R0 visible" tone="red" />
            </div>
          </Card>
        </div>

        <div className="stophole-block">
          <span className="sh-eyebrow">Community intel · 38 voices</span>
          <Card variant="sunken" style={{ marginTop: 10 }}>
            <Note name="Thandi M." days="4d" text="Nobody owns it when you phone. The JRA bounces you to the ward office. The office bounces you back." />
            <Note name="Sipho K." days="1w" text="They poured cold-mix in March. Lasted one storm. Same hole, same week. We are not stupid." />
            <Note name="Resident · 102" days="2w" text="He only shows up two months before elections. The rest of the time? Ghost." raw />
          </Card>
        </div>

        <Card variant="yellow" padding="lg" style={{ marginTop: 18 }}>
          <Tag tone="dark" style={{ background: 'var(--charcoal-900)', color: 'var(--accent)', borderColor: 'var(--charcoal-900)' }}>The job</Tag>
          <h3 className="stophole-cta-h" style={{ color: 'var(--charcoal-900)', marginTop: 10 }}>
            Represent ward 102. <span style={{ color: 'var(--yellow-800)' }}>Escalate failures. Report back.</span>
          </h3>
          <div className="stophole-row stophole-row--gap" style={{ marginTop: 12, color: 'var(--yellow-800)' }}>
            <span className="sh-data" style={{ fontSize: 12 }}>SALARY R270k–R650k/yr</span>
            <span className="stophole-dot-sep" style={{ background: 'var(--yellow-800)' }} />
            <span className="sh-data" style={{ fontSize: 12 }}>TAXPAYER FUNDED</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <Button variant="dark" size="lg" fullWidth trailingIcon={<Icon name="arrow-right" size={16} />} onClick={onSeeCandidates}>
              Compare who wants the job
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

window.CaseScreen = CaseScreen;
