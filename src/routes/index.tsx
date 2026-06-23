import { useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, ArrowRight, Sun, Moon, Camera, Info, Navigation, X } from "lucide-react";
import {
  Button,
  Card,
  LogoMark,
  PhoneShell,
  Tag,
  TopBar,
  VerdictBadge,
  SplashIntro,
  AsshLoader,
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
  const [pickOpen, setPickOpen] = useState(false);
  const [addr, setAddr] = useState("");
  const [flipping, setFlipping] = useState<null | { wardId: string; label: string }>(null);

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
      flipTo(ward.id, `Ward ${ward.number} · ${ward.area}`);
    } finally {
      setLocBusy(false);
      setPickOpen(false);
    }
  }

  function flipTo(wardId: string, label: string) {
    setFlipping({ wardId, label });
    setTimeout(() => {
      navigate({ to: "/ward/$wardId", params: { wardId } });
    }, 820);
  }

  function lookupAddress() {
    const q = addr.trim().toLowerCase();
    if (!q) return;
    const fromSeed = WARDS.find((w) =>
      [w.area, w.municipalityName, ...(w.suburbs ?? [])]
        .some((s) => s?.toLowerCase().includes(q)),
    );
    const ward = fromSeed ?? resolveAccountability(center.lat, center.lng);
    setActiveWard(ward.id);
    flipTo(ward.id, `Ward ${ward.number} · ${ward.area}`);
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
    <>
      <SplashIntro />
      <PhoneShell>
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* Live OSM map */}
          <div className={`sh-map-wrap${selected || pickOpen ? "" : " is-greyscale"}`}>
            <MapEmbed
              cases={allCases}
              center={selected ? { lat: selected.lat, lng: selected.lng } : center}
              zoom={selected ? 15 : 13}
              onSelect={setSelected}
              selectedId={selected?.id ?? null}
            />
            {!selected && !pickOpen && (
              <div className="sh-map-logo">
                <div className="sh-map-logo__inner">STOPHOLE</div>
              </div>
            )}
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
          {pickOpen ? (
            <PickSheet
              addr={addr}
              setAddr={setAddr}
              onLocate={findMyCouncillor}
              onLookup={lookupAddress}
              locBusy={locBusy}
              onClose={() => setPickOpen(false)}
            />
          ) : selected ? (
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
              onFindCouncillor={() => setPickOpen(true)}
              locBusy={locBusy}
              onSnap={triggerSnap}
              snapBusy={snapBusy}
            />
          )}
        </div>
      </PhoneShell>
      {flipping && (
        <div className="sh-flip" aria-hidden>
          <div className="sh-flip__card">
            <div className="sh-flip__face sh-flip__face--front">
              <AsshLoader size={72} />
            </div>
            <div className="sh-flip__face sh-flip__face--back">
              <div className="sh-ward__sign" style={{ width: "min(560px, 92vw)" }}>
                <p className="sh-ward__sign-eyebrow">Ward Councillor Card</p>
                <h1 className="sh-ward__sign-title">{flipping.label}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PickSheet({
  addr, setAddr, onLocate, onLookup, locBusy, onClose,
}: {
  addr: string;
  setAddr: (s: string) => void;
  onLocate: () => void;
  onLookup: () => void;
  locBusy: boolean;
  onClose: () => void;
}) {
  return (
    <div className="sh-pick" role="dialog" aria-label="Find your ward">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <Tag>One tap to your ward card</Tag>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sh-iconbtn"
          style={{ width: 32, height: 32 }}
        >
          <X size={16} />
        </button>
      </div>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        leadingIcon={locBusy ? <AsshLoader size={20} /> : <Navigation size={18} />}
        trailingIcon={<ArrowRight size={16} />}
        onClick={onLocate}
        disabled={locBusy}
      >
        {locBusy ? "Finding your ward…" : "Use my current location"}
      </Button>
      <div className="sh-pick__or">OR</div>
      <form
        className="sh-pick__row"
        onSubmit={(e) => { e.preventDefault(); onLookup(); }}
      >
        <input
          placeholder="Enter your address, suburb or town"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          aria-label="Address"
        />
        <Button type="submit" variant="secondary" size="lg" fullWidth disabled={!addr.trim()}>
          Open this ward card
        </Button>
      </form>
    </div>
  );
}

function selectedVerdict(c: CaseFile): Verdict {
  return c.daysOpen > 60 ? "red" : c.daysOpen > 14 ? "amber" : "green";
}

function DefaultSheet({
  onFindCouncillor,
  locBusy,
  onSnap,
  snapBusy,
}: {
  onFindCouncillor: () => void;
  locBusy?: boolean;
  onSnap: () => void;
  snapBusy?: boolean;
}) {
  return (
    <div className="sh-sheet" role="region" aria-label="Snap a pothole">
      <span className="sh-sheet__grab" aria-hidden />
      <Tag>One tap to accountability</Tag>
      <h2 className="sh-h1" style={{ margin: 0 }}>
        Find <span className="sh-mark">your</span> councillor.{" "}
        <span className="sh-muted">One tap.</span>
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: 13,
          margin: 0,
        }}
      >
        Use your current location and we'll open the card for the councillor
        who is paid to fix your street.
      </p>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        leadingIcon={<Navigation size={18} />}
        trailingIcon={<ArrowRight size={16} />}
        onClick={onFindCouncillor}
        disabled={locBusy}
      >
        {locBusy ? "Finding your ward…" : "Use my current location"}
      </Button>
      <button
        type="button"
        onClick={onSnap}
        disabled={snapBusy}
        className="sh-muted"
        style={{
          appearance: "none",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontSize: 13,
          textDecoration: "underline",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          alignSelf: "flex-start",
        }}
      >
        <Camera size={14} />
        {snapBusy ? "Reading location…" : "Or snap a pothole instead"}
      </button>
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

