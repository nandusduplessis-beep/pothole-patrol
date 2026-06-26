import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThumbsDown, ThumbsUp, MapPin, Bell, UserPlus, RotateCcw } from "lucide-react";
import type { Candidate, Ward } from "@/data/seed";
import { useStopholeStore } from "@/lib/stophole-store";
import { AsshIcon } from "./AsshIcon";

const PARTY_THEME: Record<string, { grad: string; ink: string }> = {
  ANC: { grad: "radial-gradient(120% 80% at 20% 0%, #1b6b3a 0%, #0a2614 60%, #050d07 100%)", ink: "#e8ffe8" },
  DA: { grad: "radial-gradient(120% 80% at 20% 0%, #1a3a8f 0%, #0a1430 60%, #050912 100%)", ink: "#eaf1ff" },
  EFF: { grad: "radial-gradient(120% 80% at 20% 0%, #8c1414 0%, #2c0606 60%, #0c0202 100%)", ink: "#ffecec" },
  "FF+": { grad: "radial-gradient(120% 80% at 20% 0%, #5a3b18 0%, #1f1409 60%, #0a0604 100%)", ink: "#fff2dd" },
  PA: { grad: "radial-gradient(120% 80% at 20% 0%, #4d3a86 0%, #16102e 60%, #08060f 100%)", ink: "#efeaff" },
  GOOD: { grad: "radial-gradient(120% 80% at 20% 0%, #1d6f6a 0%, #0a2624 60%, #04100f 100%)", ink: "#e7fffb" },
  ActionSA: { grad: "radial-gradient(120% 80% at 20% 0%, #b34e00 0%, #311500 60%, #0e0600 100%)", ink: "#fff0dd" },
  Independent: { grad: "radial-gradient(120% 80% at 20% 0%, #4a4a4a 0%, #161616 60%, #050505 100%)", ink: "#f4f4f4" },
};
const DEFAULT_THEME = PARTY_THEME.Independent;

function themeFor(party: string) {
  return PARTY_THEME[party] ?? DEFAULT_THEME;
}

function avg(c: Candidate) {
  return c.signals.reduce((a, s) => a + s.score, 0) / c.signals.length;
}

function quoteFor(c: Candidate) {
  // Synthesize a "quote" from the highest-signal evidence until real quotes exist.
  const top = [...c.signals].sort((a, b) => b.score - a.score)[0];
  return top?.evidence ?? "";
}

function bucketsFor(c: Candidate) {
  const get = (label: string) => c.signals.find((s) => s.label === label)?.score ?? 0;
  return [
    { key: "delivery", label: "Delivery", value: get("Proven fix rate"), max: 5 },
    { key: "speed", label: "Speed", value: get("Time-to-action"), max: 5 },
    { key: "money", label: "Money", value: get("Budget conversion"), max: 5 },
    { key: "presence", label: "Presence", value: get("System presence"), max: 5 },
    { key: "local", label: "Local", value: get("Local accountability"), max: 5 },
  ];
}

export function WalletStack({ ward }: { ward: Ward }) {
  const ordered = useMemo(() => {
    const inc = ward.candidates.find((c) => c.isIncumbent);
    const rest = ward.candidates.filter((c) => !c.isIncumbent).sort((a, b) => avg(b) - avg(a));
    return inc ? [inc, ...rest] : rest;
  }, [ward]);

  const [order, setOrder] = useState<string[]>(ordered.map((c) => c.id));
  const cards = order
    .map((id) => ordered.find((c) => c.id === id))
    .filter((c): c is Candidate => Boolean(c));

  function promote(id: string) {
    setOrder((cur) => [id, ...cur.filter((x) => x !== id)]);
  }
  function sendToBack() {
    setOrder((cur) => (cur.length < 2 ? cur : [...cur.slice(1), cur[0]]));
  }

  return (
    <div className="sh-wallet">
      {cards.map((c, i) => (
        <WalletCard
          key={c.id}
          candidate={c}
          ward={ward}
          depth={i}
          isFront={i === 0}
          onPeekTap={() => promote(c.id)}
          onCollapse={sendToBack}
        />
      ))}
    </div>
  );
}

function WalletCard({
  candidate,
  ward,
  depth,
  isFront,
  onPeekTap,
  onCollapse,
}: {
  candidate: Candidate;
  ward: Ward;
  depth: number;
  isFront: boolean;
  onPeekTap: () => void;
  onCollapse: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [dy, setDy] = useState(0);
  const startY = useRef<number | null>(null);
  const castVerdict = useStopholeStore((s) => s.castVerdict);
  const verdicts = useStopholeStore((s) => s.verdicts[candidate.id]) ?? { asshole: 0, goodhole: 0 };

  const theme = themeFor(candidate.party);
  const buckets = bucketsFor(candidate);
  const quote = quoteFor(candidate);

  // Peek offsets — header strip visible for cards behind the front.
  const peekY = depth === 0 ? 0 : 60 + (depth - 1) * 54;
  const scale = depth === 0 ? 1 : Math.max(0.86, 1 - depth * 0.04);
  const z = 100 - depth;

  function onPointerDown(e: React.PointerEvent) {
    if (!isFront) return;
    startY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (startY.current == null) return;
    setDy(e.clientY - startY.current);
  }
  function onPointerUp() {
    if (startY.current == null) return;
    if (dy < -90) setFlipped((f) => !f); // swipe up → flip
    else if (dy > 110) onCollapse(); // swipe down → restack
    setDy(0);
    startY.current = null;
  }

  const dragTransform = isFront
    ? `translateY(${Math.max(-160, Math.min(160, dy))}px)`
    : `translateY(${peekY}px) scale(${scale})`;

  return (
    <article
      className={[
        "sh-wcard",
        isFront ? "is-front" : "is-peek",
        candidate.isIncumbent ? "is-incumbent" : "is-challenger",
        flipped ? "is-flipped" : "",
      ].join(" ")}
      style={{
        zIndex: z,
        transform: dragTransform,
        ["--sh-party-grad" as never]: theme.grad,
        ["--sh-party-ink" as never]: theme.ink,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={() => {
        if (!isFront) onPeekTap();
      }}
    >
      <div className="sh-wcard__flipper">
        {/* FRONT */}
        <div className="sh-wcard__face sh-wcard__face--front">
          <header className="sh-wcard__strip">
            <span className="sh-wcard__status">
              {candidate.isIncumbent ? "INCUMBENT" : "CHALLENGER"}
            </span>
            <span className="sh-wcard__ward">W{ward.number}</span>
            <span className="sh-wcard__name-strip">{candidate.name}</span>
            <span className="sh-wcard__party-strip">{candidate.party}</span>
          </header>

          {isFront && (
            <div className="sh-wcard__hero">
              <div className="sh-wcard__name-block">
                <div className="sh-wcard__first">{candidate.name.split(" ")[0]}</div>
                <div className="sh-wcard__last">
                  {candidate.name.split(" ").slice(1).join(" ")}
                </div>
              </div>

              <blockquote className="sh-wcard__quote">
                <span className="sh-wcard__quote-mark">“</span>
                {quote}
              </blockquote>

              <div className="sh-wcard__photo">
                <AsshIcon size={88} tone="rgba(255,255,255,.18)" ring="rgba(255,255,255,.35)" />
                <span className="sh-wcard__photo-tag">photo</span>
              </div>

              <div className="sh-wcard__foot">
                <div className="sh-wcard__jersey">{ward.number}</div>
                <div className="sh-wcard__party-badge">
                  <AsshIcon size={14} tone="currentColor" ring="currentColor" />
                  {candidate.party}
                </div>
              </div>

              <div className="sh-wcard__buckets" onClick={(e) => e.stopPropagation()}>
                {buckets.map((b) => (
                  <div className="sh-wcard__bucket" key={b.key}>
                    <div className="sh-wcard__bucket-v">
                      {b.value}<i>/{b.max}</i>
                    </div>
                    <div className="sh-wcard__bucket-k">{b.label}</div>
                  </div>
                ))}
              </div>

              <div className="sh-wcard__verdict" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="sh-wcard__vbtn sh-wcard__vbtn--bad"
                  onClick={() => castVerdict(candidate.id, "asshole")}
                >
                  <ThumbsDown size={16} /> Asshole · {verdicts.asshole}
                </button>
                <button
                  type="button"
                  className="sh-wcard__vbtn sh-wcard__vbtn--good"
                  onClick={() => castVerdict(candidate.id, "goodhole")}
                >
                  <ThumbsUp size={16} /> Goodhole · {verdicts.goodhole}
                </button>
              </div>

              <div className="sh-wcard__hint">
                swipe ↑ to flip · swipe ↓ to restack
              </div>
            </div>
          )}
        </div>

        {/* BACK */}
        <div className="sh-wcard__face sh-wcard__face--back">
          <header className="sh-wcard__strip">
            <span className="sh-wcard__status">DOSSIER</span>
            <span className="sh-wcard__ward">W{ward.number}</span>
            <span className="sh-wcard__name-strip">{candidate.name}</span>
          </header>

          <div className="sh-wcard__back">
            <div className="sh-wcard__back-grid">
              <BackTile k="Tenure" v={candidate.tenureYears != null ? `${candidate.tenureYears}y` : "New"} />
              <BackTile k="Reach" v={candidate.contactability.toUpperCase()} />
              <BackTile k="Asshole" v={String(verdicts.asshole)} tone="bad" />
              <BackTile k="Goodhole" v={String(verdicts.goodhole)} tone="good" />
            </div>

            <ul className="sh-wcard__evidence">
              {candidate.signals.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <b>{s.label}</b>
                  <span>{s.evidence}</span>
                </li>
              ))}
            </ul>

            <div className="sh-wcard__back-foot">
              <Link
                to="/candidate/$candidateId"
                params={{ candidateId: candidate.id }}
                className="sh-wcard__deep"
              >
                Full dossier →
              </Link>
              <button
                type="button"
                className="sh-wcard__flipback"
                onClick={(e) => {
                  e.stopPropagation();
                  setFlipped(false);
                }}
              >
                <RotateCcw size={14} /> Flip
              </button>
            </div>

            <div className="sh-wcard__voter">
              <a href="https://registertovote.elections.org.za/" target="_blank" rel="noopener noreferrer">
                <UserPlus size={14} /> Register
              </a>
              <Link to="/vote/$wardId" params={{ wardId: ward.id }}>
                <MapPin size={14} /> Station
              </Link>
              <a href={calHref(ward)} target="_blank" rel="noopener noreferrer">
                <Bell size={14} /> Remind
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BackTile({ k, v, tone }: { k: string; v: string; tone?: "bad" | "good" }) {
  return (
    <div className={`sh-wcard__btile ${tone ? `is-${tone}` : ""}`}>
      <div className="sh-wcard__btile-v">{v}</div>
      <div className="sh-wcard__btile-k">{k}</div>
    </div>
  );
}

function calHref(ward: Ward) {
  const date = (ward.electionDate ?? "2026-11-04").replace(/-/g, "");
  const title = encodeURIComponent(`Vote — Ward ${ward.number} ${ward.area}`);
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}`;
}