import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, ArrowRight, Sun, Moon } from "lucide-react";
import {
  Button,
  Card,
  LogoMark,
  PhoneShell,
  PotholeInput,
  Tag,
  TopBar,
  VerdictBadge,
  type Verdict,
} from "@/components/stophole";
import { MapEmbed } from "@/components/stophole/MapEmbed";
import { WARDS, type CaseFile } from "@/data/seed";
import { useStopholeStore } from "@/lib/stophole-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stophole — Snap the pothole, find the asshole" },
      {
        name: "description",
        content:
          "Drop a pin on a pothole anywhere in South Africa. See your ward, the councillor accountable now, and the candidates standing in 2026.",
      },
      { property: "og:title", content: "Stophole — Snap the pothole" },
      {
        property: "og:description",
        content:
          "Civic accountability for South African voters. Turn a pothole into a hiring decision.",
      },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  const navigate = useNavigate();
  const theme = useStopholeStore((s) => s.theme);
  const toggleTheme = useStopholeStore((s) => s.toggleTheme);
  const trackCase = useStopholeStore((s) => s.trackCase);

  const allCases = useMemo<CaseFile[]>(
    () => WARDS.flatMap((w) => w.cases),
    [],
  );
  const [selected, setSelected] = useState<CaseFile | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const center = { lat: -28.4793, lng: 24.6727 }; // SA-centered

  function openCase(c: CaseFile) {
    trackCase(c.id);
    navigate({ to: "/case/$caseId", params: { caseId: c.id } });
  }

  return (
      <PhoneShell>
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* Live OSM map */}
          <div className="sh-map-wrap">
            <MapEmbed
              cases={allCases}
              center={selected ? { lat: selected.lat, lng: selected.lng } : center}
              zoom={selected ? 14 : 5}
              onSelect={setSelected}
              selectedId={selected?.id ?? null}
            />
          </div>

          {/* Floating top bar */}
          <div style={{ position: "relative", zIndex: 400 }}>
            <TopBar
              left={<LogoMark />}
              title="STOPHOLE"
              right={
                <button
                  className="sh-iconbtn"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  type="button"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              }
            />
          </div>

          {/* Search bar */}
          <SearchBar
            open={showSearch}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 150)}
            onPick={(c) => {
              setSelected(c);
              setShowSearch(false);
            }}
            cases={allCases}
          />

          {/* Bottom sheet — selected case OR default pothole-input prompt */}
          {selected ? (
            <>
              <button
                className="sh-sheet-scrim"
                aria-label="Dismiss"
                onClick={() => setSelected(null)}
                style={{ appearance: "none", border: "none", cursor: "pointer" }}
              />
              <div className="sh-sheet" role="dialog" aria-label={selected.title}>
                <span className="sh-sheet__grab" aria-hidden />
                <Tag>
                  Ward {WARDS.find((w) => w.id === selected.wardId)?.number} ·{" "}
                  {WARDS.find((w) => w.id === selected.wardId)?.area}
                </Tag>
                <h2 className="sh-h1" style={{ margin: 0 }}>
                  {selected.title} <span className="sh-muted">{selected.cross}</span>
                </h2>
                <div className="sh-row sh-row--gap" style={{ color: "var(--text-muted)" }}>
                  <span className="sh-data" style={{ fontSize: 11 }}>
                    {selected.daysOpen} DAYS OPEN
                  </span>
                  <span className="sh-dot-sep" />
                  <span className="sh-data" style={{ fontSize: 11 }}>
                    {selected.reports} REPORTS
                  </span>
                  <span className="sh-dot-sep" />
                  <VerdictBadge
                    verdict={selectedVerdict(selected)}
                    size="sm"
                    label={selected.daysOpen > 60 ? "Repeat failure" : "Logged"}
                  />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  trailingIcon={<ArrowRight size={16} />}
                  onClick={() => openCase(selected)}
                >
                  See who owns this
                </Button>
              </div>
            </>
          ) : (
            <DefaultSheet
              onSnap={() => {
                // pothole input as snap → open the first case
                openCase(allCases[0]);
              }}
            />
          )}
        </div>
      </PhoneShell>
  );
}

function selectedVerdict(c: CaseFile): Verdict {
  return c.daysOpen > 60 ? "red" : c.daysOpen > 14 ? "amber" : "green";
}

function DefaultSheet({ onSnap }: { onSnap: () => void }) {
  return (
    <div className="sh-sheet" role="region" aria-label="Snap a pothole">
      <span className="sh-sheet__grab" aria-hidden />
      <Tag>Pothole-to-accountability</Tag>
      <h2 className="sh-h1" style={{ margin: 0 }}>
        Snap the <span className="sh-mark">pothole</span>.{" "}
        <span className="sh-muted">Find the asshole.</span>
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: 13,
          margin: 0,
        }}
      >
        Tap any pin to see who is paid to fix it — and who's standing to replace
        them in 2026.
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <PotholeInput width={300} height={150} onSnap={onSnap} />
      </div>
    </div>
  );
}

function SearchBar({
  open,
  onFocus,
  onBlur,
  onPick,
  cases,
}: {
  open: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onPick: (c: CaseFile) => void;
  cases: CaseFile[];
}) {
  const [q, setQ] = useState("");
  const matches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return cases.slice(0, 3);
    return cases.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.cross.toLowerCase().includes(term),
    );
  }, [q, cases]);
  return (
    <div className="sh-map-search">
      <div className="sh-map-search__bar">
        <span className="sh-map-search__rt" aria-hidden>
          <MapPin size={14} />
        </span>
        <input
          placeholder="Paste an address or street name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label="Search potholes"
        />
      </div>
      {open && matches.length > 0 && (
        <div className="sh-map-search__drop">
          {matches.map((c) => (
            <button
              type="button"
              key={c.id}
              className="sh-ac"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(c)}
            >
              <span className="sh-ac__pin">
                <MapPin size={14} />
              </span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className="sh-ac__t">
                  {c.title} {c.cross}
                </span>
                <span className="sh-ac__s">
                  Ward {WARDS.find((w) => w.id === c.wardId)?.number} ·{" "}
                  {c.daysOpen} days open
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

