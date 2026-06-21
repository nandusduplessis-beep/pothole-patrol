// Stophole — VoteScreen: where & when to vote (the payoff)

const VoteScreen = ({ onBack }) => {
  const { Button, Icon, Tag, StatTile, Card } = window.StopholeDesignSystem_1ea2d7;
  return (
    <div className="stophole-screen">
      <TopBar
        left={<button className="stophole-iconbtn" onClick={onBack} aria-label="back"><Icon name="chevron-left" size={22} /></button>}
        title={<span>WHERE & WHEN</span>}
        right={<button className="stophole-iconbtn" aria-label="share"><Icon name="share" size={18} /></button>}
      />
      <div className="stophole-scroll">
        <div className="stophole-vote__hero">
          <Tag tone="dark" style={{ background: 'var(--charcoal-700)', color: 'var(--accent)', borderColor: 'transparent' }}>Local Election</Tag>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div className="stophole-vote__date">04 NOV</div>
              <div className="sh-data" style={{ color: 'var(--grey-400)', fontSize: 13, marginTop: 4 }}>2026 · WEDNESDAY</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="sh-data" style={{ color: 'var(--accent)', fontSize: 30 }}>156</div>
              <div className="sh-data" style={{ color: 'var(--grey-400)', fontSize: 11 }}>DAYS TO GO</div>
            </div>
          </div>
        </div>

        <div className="stophole-block" style={{ marginTop: 18 }}>
          <span className="sh-eyebrow">Your voting station</span>
          <div className="stophole-station">
            <div className="stophole-station__icon"><Icon name="map-pin" size={20} /></div>
            <div style={{ flex: 1 }}>
              <div className="stophole-person__name">Rivonia Primary School</div>
              <div className="stophole-person__role">9 Mutual Rd, Rivonia · Ward 102</div>
              <div className="sh-data" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>OPEN 07:00–21:00 · 1.2KM AWAY</div>
            </div>
          </div>
          <div className="stophole-case__map" style={{ height: 150, marginTop: 10 }}><MiniMap pinColor="var(--status-verified)" /></div>
        </div>

        <div className="stophole-case__stats" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <StatTile label="You are" value="Registered" tone="soft" size="sm" />
          <StatTile label="Ward" value="102" size="sm" />
        </div>

        <div style={{ marginTop: 18 }}>
          <Button variant="primary" size="lg" fullWidth leadingIcon={<Icon name="calendar" size={18} />}>
            Remind me on the day
          </Button>
        </div>
      </div>
    </div>
  );
};

window.VoteScreen = VoteScreen;
