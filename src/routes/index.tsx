import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, ArrowRight, Sun, Moon, Navigation } from "lucide-react";
import {
  LogoMark,
  PhoneShell,
  TopBar,
  SplashIntro,
  AsshLoader,
} from "@/components/stophole";
import { MapEmbed } from "@/components/stophole/MapEmbed";
import { WARDS, resolveAccountability, type CaseFile } from "@/data/seed";
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
  const setActiveWard = useStopholeStore((s) => s.setActiveWard);
  const localCases = useStopholeStore((s) => s.localCases);
  const [locBusy, setLocBusy] = useState(false);
  const [addr, setAddr] = useState("");
  const [flipping, setFlipping] = useState<null | { wardId: string; label: string }>(null);

  const allCases = useMemo<CaseFile[]>(
    () => [...localCases, ...WARDS.flatMap((w) => w.cases)],
    [localCases],
  );

  // Default to Welkom Ward 32 (our fully populated demo ward).
  const center = { lat: -27.9784, lng: 26.7359 };

  async function findMyCouncillor() {
    setLocBusy(true);
    try {
      const where = await getPositionOrCenter();
      const ward = resolveAccountability(where.lat, where.lng);
      setActiveWard(ward.id);
      flipTo(ward.id, `Ward ${ward.number} · ${ward.area}`);
    } finally {
      setLocBusy(false);
    }
  }

  function flipTo(wardId: string, label: string) {
    setFlipping({ wardId, label });
    setTimeout(() => {
      navigate({ to: "/ward/$wardId", params: { wardId } });
    }, 600);
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

  return (
    <>
      <SplashIntro />
      <PhoneShell>
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* Live OSM map */}
          <div className="sh-map-wrap is-greyscale">
            <MapEmbed
              cases={allCases}
              center={center}
              zoom={13}
              onSelect={() => {}}
              selectedId={null}
            />
          </div>

          {/* Floating top bar */}
          <div style={{ position: "relative", zIndex: 400 }}>
            <TopBar
              left={<LogoMark />}
              title=""
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

          {/* Single search pill — top of map */}
          <form
            className="sh-airbar"
            onSubmit={(e) => { e.preventDefault(); lookupAddress(); }}
            role="search"
          >
            <MapPin size={16} aria-hidden />
            <input
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="Search an address or suburb"
              aria-label="Search an address or suburb"
            />
          </form>

          {/* Single floating yellow CTA above tab bar */}
          <button
            type="button"
            className="sh-airfab"
            onClick={findMyCouncillor}
            disabled={locBusy}
          >
            {locBusy ? <AsshLoader size={18} /> : <Navigation size={18} />}
            <span>{locBusy ? "Finding your ward…" : "Use my current location"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </PhoneShell>
      {flipping && (
        <div className="sh-flip" aria-hidden>
          <div className="sh-airloader">
            <AsshLoader size={56} />
            <p>{flipping.label}</p>
          </div>
        </div>
      )}
    </>
  );
}

