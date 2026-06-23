import { useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, ArrowRight, Sun, Moon, Camera, Info, Navigation } from "lucide-react";
import {
  Button,
  Card,
  LogoMark,
  PhoneShell,
  Tag,
  TopBar,
  VerdictBadge,
  type Verdict,
} from "@/components/stophole";
import { MapEmbed } from "@/components/stophole/MapEmbed";
import { WARDS, resolveAccountability, type CaseFile } from "@/data/seed";
import { useStopholeStore } from "@/lib/stophole-store";
import { Link } from "@tanstack/react-router";

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
  const setActiveWard = useStopholeStore((s) => s.setActiveWard);
  const addLocalCase = useStopholeStore((s) => s.addLocalCase);
  const localCases = useStopholeStore((s) => s.localCases);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [snapBusy, setSnapBusy] = useState(false);
  const [locBusy, setLocBusy] = useState(false);

  const allCases = useMemo<CaseFile[]>(
    () => [...localCases, ...WARDS.flatMap((w) => w.cases)],
    [localCases],
  );
  const [selected, setSelected] = useState<CaseFile | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  // Default to Welkom Ward 32 (our fully populated demo ward).
  const center = { lat: -27.9784, lng: 26.7359 };

  function openCase(c: CaseFile) {
    trackCase(c.id);
    setActiveWard(c.wardId);
    navigate({ to: "/case/$caseId", params: { caseId: c.id } });
  }

  function triggerSnap() {
    fileRef.current?.click();
  }

  async function findMyCouncillor() {
    setLocBusy(true);
    try {
      const where = await getPositionOrCenter();
      const ward = resolveAccountability(where.lat, where.lng);
      setActiveWard(ward.id);
      navigate({ to: "/candidates/$wardId", params: { wardId: ward.id } });
    } finally {
      setLocBusy(false);
    }
  }

  async function getPositionOrCenter(): Promise<{ lat: number; lng: number }> {
    if (typeof navigator === "undefined" || !navigator.geolocation) return center;
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(center), 4000);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(timer);
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          clearTimeout(timer);
          resolve(center);
        },
        { enableHighAccuracy: true, timeout: 3500 },
      );
    });
  }

  async function handlePhotoPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setSnapBusy(true);
    try {
      const where = await getPositionOrCenter();
      const ward = resolveAccountability(where.lat, where.lng);
      const id = `local-${Date.now().toString(36)}`;
      const newCase: CaseFile = {
        id,
        title: "Your snap",
        cross: `Logged ${new Date().toLocaleDateString("en-ZA")}`,
        wardId: ward.id,
        authority: ward.municipalityName,
        daysOpen: 0,
        reports: 1,
        refills: 0,
        lat: where.lat,
        lng: where.lng,
        ownerSignals: [
          { icon: "alert", text: "Reported by you · just now", tone: "amber" },
          { icon: "phone", text: `Routed to ${ward.municipalityName}`, tone: "amber" },
        ],
        notes: [
          {
            author: "You",
            ago: "just now",
            text: "Snapped from the Stophole app. Photo attached locally for this demo.",
          },
        ],
      };
      addLocalCase(newCase);
      openCase(newCase);
    } finally {
      setSnapBusy(false);
    }
  }

  return (
      <PhoneShell>
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* Live OSM map */}
          <div className="sh-map-wrap">
            <MapEmbed
              cases={allCases}
              center={selected ? { lat: selected.lat, lng: selected.lng } : center}
              zoom={selected ? 15 : 13}
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
                <div style={{ display: "inline-flex", gap: 8 }}>
                  <Link to="/how-it-works" className="sh-iconbtn" aria-label="How it works">
                    <Info size={18} />
                  </Link>
                  <button
                    className="sh-iconbtn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    type="button"
                  >
                    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </div>
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

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handlePhotoPicked}
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
              onFindCouncillor={findMyCouncillor}
              locBusy={locBusy}
              onSnap={triggerSnap}
              snapBusy={snapBusy}
            />
          )}
        </div>
      </PhoneShell>
  );
}

function selectedVerdict(c: CaseFile): Verdict {
  return c.daysOpen > 60 ? "red" : c.daysOpen > 14 ? "amber" : "green";
}

function DefaultSheet({ onSnap, busy }: { onSnap: () => void; busy?: boolean }) {
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
      <Button
        variant="primary"
        size="lg"
        fullWidth
        leadingIcon={<Camera size={18} />}
        trailingIcon={<ArrowRight size={16} />}
        onClick={onSnap}
        disabled={busy}
      >
        {busy ? "Reading location…" : "Snap the pothole"}
      </Button>
      <div
        style={{
          display: "flex",
          gap: 12,
          fontSize: 12,
          color: "var(--text-muted)",
          flexWrap: "wrap",
        }}
      >
        <Link to="/how-it-works" className="sh-muted" style={{ textDecoration: "underline" }}>
          How it works
        </Link>
        <Link to="/whatsapp" className="sh-muted" style={{ textDecoration: "underline" }}>
          WhatsApp version
        </Link>
        <Link to="/ussd" className="sh-muted" style={{ textDecoration: "underline" }}>
          USSD version
        </Link>
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

