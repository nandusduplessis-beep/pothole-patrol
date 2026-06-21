// Stophole — CandidatesScreen: compare the 2026 applicants, scored.

const CandidatesScreen = ({ onBack, onVote }) => {
  const { Button, Icon, VerdictBadge, Tag, DotScore, Card } = window.StopholeDesignSystem_1ea2d7;

  const Candidate = ({ rank, name, party, verdict, label, signals, onClick }) => (
    <button className="stophole-cand" onClick={onClick}>
      <div className="stophole-cand__top">
        <span className="stophole-cand__rank">{rank}</span>
        <div className="stophole-avatar" style={{ background: verdict === 'green' ? 'var(--status-verified)' : verdict === 'amber' ? 'var(--accent)' : 'var(--charcoal-800)', color: verdict === 'amber' ? 'var(--charcoal-900)' : 'var(--grey-50)' }}>
          {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="stophole-cand__name">{name}</div>
          <div className="stophole-cand__party">{party}</div>
        </div>
        <VerdictBadge verdict={verdict} size="sm" label={label} />
      </div>
      <div className="stophole-cand__signals">
        {signals.map((s, i) => (
          <div className="stophole-cand__sig" key={i}>
            <span className="stophole-cand__sig-label">{s.label}</span>
            <DotScore score={s.score} total={5} verdict={verdict} size={10} gap={4} />
          </div>
        ))}
      </div>
    </button>
  );

  return (
    <div className="stophole-screen">
      <TopBar
        left={<button className="stophole-iconbtn" onClick={onBack} aria-label="back"><Icon name="chevron-left" size={22} /></button>}
        title={<span>WARD 102 · 2026</span>}
        right={<button className="stophole-iconbtn" aria-label="filter"><Icon name="layers" size={18} /></button>}
      />

      <div className="stophole-scroll">
        <div style={{ padding: '8px 4px 4px' }}>
          <Tag>The Pothole Test</Tag>
          <h1 className="stophole-h1" style={{ marginTop: 10 }}>
            Who actually <span className="sh-muted">fixes things?</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '6px 0 0' }}>
            Scored on delivery, not promises. Sorted best-first.
          </p>
        </div>

        <div className="stophole-stack" style={{ marginTop: 16 }}>
          <Candidate
            rank="1" name="Naledi Khumalo" party="Independent · lifelong 102 resident"
            verdict="green" label="Proven"
            signals={[
              { label: 'Proven fix rate', score: 5 },
              { label: 'Time-to-action', score: 4 },
              { label: 'Budget conversion', score: 4 },
              { label: 'Local accountability', score: 5 },
            ]}
            onClick={onVote}
          />
          <Candidate
            rank="2" name="Pieter van Wyk" party="DA · ward committee 2y"
            verdict="amber" label="Partial"
            signals={[
              { label: 'Proven fix rate', score: 3 },
              { label: 'Time-to-action', score: 3 },
              { label: 'Budget conversion', score: 2 },
              { label: 'Local accountability', score: 3 },
            ]}
            onClick={onVote}
          />
          <Candidate
            rank="3" name="Cllr. John Mokoena" party="ANC · incumbent, 12y"
            verdict="red" label="Replace"
            signals={[
              { label: 'Proven fix rate', score: 1 },
              { label: 'Time-to-action', score: 1 },
              { label: 'Budget conversion', score: 0 },
              { label: 'Local accountability', score: 1 },
            ]}
            onClick={onVote}
          />
        </div>

        <Card variant="dark" padding="lg" style={{ marginTop: 20 }}>
          <h3 className="stophole-cta-h">Know where to vote. <span style={{ color: 'var(--grey-400)' }}>One tap.</span></h3>
          <div style={{ marginTop: 14 }}>
            <Button variant="primary" size="lg" fullWidth leadingIcon={<Icon name="vote" size={18} />} onClick={onVote}>
              Your voting station
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

window.CandidatesScreen = CandidatesScreen;
