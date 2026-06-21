import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin } from "lucide-react";
import {
  LogoMark,
  PhoneShell,
  Tag,
  TopBar,
  VerdictBadge,
  type Verdict,
} from "@/components/stophole";
import { WARDS, type CaseFile } from "@/data/seed";
import { useStopholeStore } from "@/lib/stophole-store";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Your cases — Stophole" },
      {
        name: "description",
        content: "Cases you opened or follow. One tap to the councillor accountable.",
      },
    ],
  }),
  component: CasesRoute,
});

function CasesRoute() {
  const recent = useStopholeStore((s) => s.recent);

  const allCases = useMemo(() => WARDS.flatMap((w) => w.cases), []);

  const trackedCases = useMemo(() => {
    const ids = new Set(recent.map((r) => r.caseId));
    return allCases.filter((c) => ids.has(c.id));
  }, [recent, allCases]);

  const fallback = trackedCases.length ? trackedCases : allCases;

  // Split into "this week" (≤14 days open) and "earlier"
  const recent2w = fallback.filter((c) => c.daysOpen <= 14);
  const earlier = fallback.filter((c) => c.daysOpen > 14);

  return (
    <PhoneShell>
      <TopBar
        left={<LogoMark />}
        title="YOUR WATCHLIST"
        right={
          <button className="sh-iconbtn" aria-label="Search" type="button">
            <Search size={18} />
          </button>
        }
      />
      <div className="sh-scroll">
        <div className="sh-greet">
          <Tag>
            {fallback.length} case{fallback.length === 1 ? "" : "s"} ·{" "}
            {recent2w.length} fresh
          </Tag>
          <h1>Your watchlist.</h1>
          <p>Cases you've opened or follow.</p>
        </div>

        {recent2w.length > 0 && (
          <div className="sh-daterow">
            <div className="sh-daterow__label">This week</div>
            <div className="sh-stack">
              {recent2w.map((c) => (
                <CaseRow key={c.id} c={c} />
              ))}
            </div>
          </div>
        )}

        {earlier.length > 0 && (
          <div className="sh-daterow">
            <div className="sh-daterow__label">Earlier</div>
            <div className="sh-stack">
              {earlier.map((c) => (
                <CaseRow key={c.id} c={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PhoneShell>
  );
}

function CaseRow({ c }: { c: CaseFile }) {
  const ward = WARDS.find((w) => w.id === c.wardId)!;
  const verdict: Verdict =
    c.daysOpen > 60 ? "red" : c.daysOpen > 14 ? "amber" : "green";
  const label =
    verdict === "red"
      ? "Replace"
      : verdict === "amber"
        ? "Logged"
        : "Crew sent";
  return (
    <Link
      to="/case/$caseId"
      params={{ caseId: c.id }}
      className="sh-recent"
    >
      <div
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: "var(--sh-radius-md)",
          background: "var(--surface-sunken)",
          display: "grid",
          placeItems: "center",
          color: "var(--text-muted)",
        }}
      >
        <MapPin size={20} />
      </div>
      <div className="sh-recent__body">
        <div className="sh-recent__title">
          {c.title} {c.cross}
        </div>
        <div className="sh-recent__meta">
          <span
            className="sh-data"
            style={{ fontSize: 11, color: "var(--text-muted)" }}
          >
            WARD {ward.number}
          </span>
          <span className="sh-dot-sep" />
          <span
            className="sh-data"
            style={{ fontSize: 11, color: "var(--text-muted)" }}
          >
            {c.daysOpen}D OPEN
          </span>
        </div>
      </div>
      <VerdictBadge verdict={verdict} size="sm" label={label} />
    </Link>
  );
}