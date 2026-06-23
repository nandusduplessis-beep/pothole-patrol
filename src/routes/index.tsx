import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Camera, User } from "lucide-react";
import {
  PhoneShell,
  SplashIntro,
  AsshLoader,
} from "@/components/stophole";
import logoUrl from "@/assets/stophole/logo.svg?url";
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
  const setActiveWard = useStopholeStore((s) => s.setActiveWard);
  const localCases = useStopholeStore((s) => s.localCases);
  const [locBusy, setLocBusy] = useState(false);
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
      <PhoneShell hideTabBar>
        <div className="sh-splash" style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* Greyscale + blurred map background */}
          <div className="sh-map-wrap is-greyscale sh-splash__map">
            <MapEmbed
              cases={allCases}
              center={center}
              zoom={13}
              onSelect={() => {}}
              selectedId={null}
            />
          </div>

          {/* Centered hero */}
          <button
            type="button"
            className="sh-splash__hero"
            onClick={findMyCouncillor}
            disabled={locBusy}
            aria-label="Find your councillor"
          >
            <span className="sh-splash__tag sh-splash__tag--top">every pothole</span>
            <span className="sh-splash__mark">
              <img src={logoUrl} alt="Stophole" draggable={false} />
              <span className="sh-splash__asterisk" aria-hidden>*</span>
            </span>
            <span className="sh-splash__tag sh-splash__tag--bot">
              {locBusy ? "finding your ward…" : "has an asshole"}
            </span>
          </button>

          {/* Minimal 2-item tab bar */}
          <nav className="sh-splash__tabs" aria-label="Primary">
            <Link to="/" className="sh-splash__tab is-active">
              <Camera size={18} />
              <span>Snap</span>
            </Link>
            <Link to="/you" className="sh-splash__tab">
              <User size={18} />
              <span>You</span>
            </Link>
          </nav>
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

