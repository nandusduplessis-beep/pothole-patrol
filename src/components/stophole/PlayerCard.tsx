import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThumbsDown, ThumbsUp, MapPin, Bell, UserPlus, ExternalLink, User as UserIcon } from "lucide-react";
import type { Candidate, Ward } from "@/data/seed";
import { useStopholeStore } from "@/lib/stophole-store";

function avg(c: Candidate) {
  return c.signals.reduce((a, s) => a + s.score, 0) / c.signals.length;
}

export function PlayerCardStack({ ward }: { ward: Ward }) {
  // Stack: incumbent first, then others by avg score desc
  const incumbent = ward.candidates.find((c) => c.isIncumbent);
  const others = ward.candidates
    .filter((c) => !c.isIncumbent)
    .sort((a, b) => avg(b) - avg(a));
  const ordered = incumbent ? [incumbent, ...others] : others;

  const [idx, setIdx] = useState(0);
  const cur = ordered[idx];

  if (!cur) {
    return (
      <div className="sh-player">
        <div className="sh-player__hint">You've judged every candidate in this ward.</div>
      </div>
    );
  }

  return (
    <div className="sh-player">
      <PlayerCard
        key={cur.id}
        candidate={cur}
        ward={ward}
        onNext={() => setIdx((i) => i + 1)}
        position={idx + 1}
        total={ordered.length}
      />
    </div>
  );
}

function PlayerCard({
  candidate,
  ward,
  onNext,
  position,
  total,
}: {
  candidate: Candidate;
  ward: Ward;
  onNext: () => void;
  position: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const castVerdict = useStopholeStore((s) => s.castVerdict);
  const verdicts = useStopholeStore((s) => s.verdicts[candidate.id]);
  const score = verdicts ?? { asshole: 0, goodhole: 0 };

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (startX.current == null) return;
    setDx(e.clientX - startX.current);
  }
  function commit(verdict: "asshole" | "goodhole") {
    castVerdict(candidate.id, verdict);
    const dir = verdict === "asshole" ? -1 : 1;
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 240ms ease, opacity 240ms ease";
      cardRef.current.style.transform = `translateX(${dir * 600}px) rotate(${dir * 18}deg)`;
      cardRef.current.style.opacity = "0";
    }
    window.setTimeout(() => onNext(), 240);
  }
  function onPointerUp() {
    if (startX.current == null) return;
    const threshold = 90;
    if (dx < -threshold) commit("asshole");
    else if (dx > threshold) commit("goodhole");
    else setDx(0);
    startX.current = null;
  }

  const rot = dx * 0.06;
  const initials = candidate.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const [first, ...rest] = candidate.name.split(" ");
  const last = rest.join(" ");
  // Two headline stats for the dark hero (mimics "264 Games / 422 Goals").
  const heroStats = candidate.signals.slice(0, 2);

  return (
    <div className="sh-player__stack">
      <div
        ref={cardRef}
        className="sh-player__card"
        style={{ transform: `translateX(${dx}px) rotate(${rot}deg)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Dark hero — Gareth Bale style */}
        <div className="sh-player__hero">
          <div className="sh-player__hero-top">
            <span className="sh-player__chip">
              {candidate.isIncumbent ? "Incumbent" : "Challenger"} · Ward {ward.number}
            </span>
            <span className="sh-player__count">{position}/{total}</span>
          </div>

          <div className="sh-player__hero-body">
            <h2 className="sh-player__hero-name">
              <span>{first}</span>
              {last && <span>{last}</span>}
            </h2>

            {heroStats.length >= 2 && (
              <div className="sh-player__hero-stats">
                <div className="sh-player__hero-stat">
                  <div className="sh-player__hero-stat-v">{heroStats[0].score}<i>/5</i></div>
                  <div className="sh-player__hero-stat-k">{heroStats[0].label}</div>
                </div>
                <div className="sh-player__hero-stat sh-player__hero-stat--r">
                  <div className="sh-player__hero-stat-v">{heroStats[1].score}<i>/5</i></div>
                  <div className="sh-player__hero-stat-k">{heroStats[1].label}</div>
                </div>
              </div>
            )}

            {/* Photo placeholder */}
            <div className="sh-player__photo" aria-label="Photo placeholder">
              <UserIcon size={64} strokeWidth={1.4} />
              <span className="sh-player__photo-tag">Photo</span>
            </div>

            <div className="sh-player__hero-foot">
              <div className="sh-player__jersey">{ward.number}</div>
              <div className="sh-player__badge" title={candidate.party}>
                {candidate.party.slice(0, 3).toUpperCase()}
              </div>
            </div>
          </div>

          <span className="sh-player__swipe-tag left" style={{ opacity: Math.max(0, -dx / 100) }}>Asshole</span>
          <span className="sh-player__swipe-tag right" style={{ opacity: Math.max(0, dx / 100) }}>Goodhole</span>
        </div>

        <div className="sh-player__body">
          <div className="sh-player__meta">
            {candidate.party} · {candidate.contactability.toUpperCase()}
            {candidate.tenureYears != null && ` · ${candidate.tenureYears}y in office`}
          </div>

          <div className="sh-player__stats">
            {candidate.signals.slice(0, 4).map((s) => (
              <div className="sh-player__stat" key={s.label}>
                <div className="sh-player__stat-v">{s.score}<span style={{ fontSize: 11, color: "#999" }}>/5</span></div>
                <div className="sh-player__stat-k">{s.label.split(" ")[0]}</div>
              </div>
            ))}
          </div>

          <div className="sh-player__score">
            <div className="sh-player__score-bad">
              <span>Asshole votes</span><b>{score.asshole}</b>
            </div>
            <div className="sh-player__score-good">
              <span>Goodhole votes</span><b>{score.goodhole}</b>
            </div>
          </div>

          <div className="sh-player__actions">
            <button type="button" className="sh-player__btn sh-player__btn--bad" onClick={() => commit("asshole")}>
              <ThumbsDown size={16} /> Asshole
            </button>
            <button type="button" className="sh-player__btn sh-player__btn--good" onClick={() => commit("goodhole")}>
              <ThumbsUp size={16} /> Goodhole
            </button>
          </div>

          <div className="sh-player__hint">← swipe left for asshole · swipe right for goodhole →</div>

          <div className="sh-player__voter">
            <a
              href="https://registertovote.elections.org.za/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <UserPlus size={18} />
              Register to vote
            </a>
            <Link to="/vote/$wardId" params={{ wardId: ward.id }}>
              <MapPin size={18} />
              Voting station
            </Link>
            <a
              href={makeCalendarHref(ward)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Bell size={18} />
              Remind me
            </a>
          </div>

          <div style={{ marginTop: 10, textAlign: "center" }}>
            <Link
              to="/candidate/$candidateId"
              params={{ candidateId: candidate.id }}
              style={{ font: "700 12px/1 var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              More info <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function makeCalendarHref(ward: Ward) {
  const date = (ward.electionDate ?? "2026-11-04").replace(/-/g, "");
  const title = encodeURIComponent(`Vote — Ward ${ward.number} ${ward.area}`);
  const details = encodeURIComponent(`Local government election day. Voting station: ${ward.votingStation.name}, ${ward.votingStation.address}.`);
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}&details=${details}`;
}