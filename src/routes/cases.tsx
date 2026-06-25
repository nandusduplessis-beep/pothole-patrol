import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  LogoMark,
  PhoneShell,
  TopBar,
  HeroCard,
  StatRow,
  ListCard,
  ListRow,
  Deck,
} from "@/components/stophole";
import { WARDS } from "@/data/seed";
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

  const recent2w = fallback.filter((c) => c.daysOpen <= 14);
  const earlier = fallback.filter((c) => c.daysOpen > 14);
  const stale = fallback.filter((c) => c.daysOpen > 60).length;

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
      <Deck>
        <HeroCard
          eyebrow="Watchlist"
          chip={`${fallback.length} cases`}
          title="Your watchlist."
          sub="Cases you've opened or follow."
          jersey={String(fallback.length)}
          badge={`${recent2w.length} FRESH`}
        />
        <StatRow
          items={[
            { k: "This week", v: recent2w.length },
            { k: "Earlier", v: earlier.length },
            { k: "Stale 60d+", v: stale },
          ]}
        />
        {recent2w.length > 0 && (
          <ListCard heading="This week">
            {recent2w.map((c) => {
              const ward = WARDS.find((w) => w.id === c.wardId)!;
              return (
                <ListRowLink
                  key={c.id}
                  to={c.id}
                  title={`${c.title} ${c.cross}`}
                  meta={`Ward ${ward.number} · ${c.daysOpen}d open`}
                />
              );
            })}
          </ListCard>
        )}
        {earlier.length > 0 && (
          <ListCard heading="Earlier">
            {earlier.map((c) => {
              const ward = WARDS.find((w) => w.id === c.wardId)!;
              return (
                <ListRowLink
                  key={c.id}
                  to={c.id}
                  title={`${c.title} ${c.cross}`}
                  meta={`Ward ${ward.number} · ${c.daysOpen}d open`}
                />
              );
            })}
          </ListCard>
        )}
      </Deck>
    </PhoneShell>
  );
}

function ListRowLink({
  to,
  title,
  meta,
}: {
  to: string;
  title: string;
  meta: string;
}) {
  return (
    <Link
      to="/case/$caseId"
      params={{ caseId: to }}
      className="shk-list__row"
    >
      <div className="shk-list__rowmain">
        <div className="shk-list__rowtitle">{title}</div>
        <div className="shk-list__rowmeta">{meta}</div>
      </div>
      <div className="shk-list__rowright">›</div>
    </Link>
  );
}