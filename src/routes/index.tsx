import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Camera, User, Crosshair } from "lucide-react";
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
  const addLocalCase = useStopholeStore((s) => s.addLocalCase);
  const [locBusy, setLocBusy] = useState(false);
  const [flipping, setFlipping] = useState<null | { wardId: string; label: string }>(null);
  const [showSnap, setShowSnap] = useState(false);
  const [snapBusy, setSnapBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

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

  async function logPothole(severity: "small" | "nasty" | "axle-killer") {
    setSnapBusy(true);
    try {
      const where = await getPositionOrCenter();
      const ward = resolveAccountability(where.lat, where.lng);
      const id = `local-${Date.now().toString(36)}`;
      const c: CaseFile = {
        id,
        title: severity === "axle-killer" ? "Axle-killer" : severity === "nasty" ? "Nasty hole" : "Small hole",
        cross: `@ ${where.lat.toFixed(4)}, ${where.lng.toFixed(4)}`,
        wardId: ward.id,
        authority: ward.municipalityName,
        daysOpen: 0,
        reports: 1,
        refills: 0,
        lat: where.lat,
        lng: where.lng,
        ownerSignals: [
          { icon: "alert", text: `Logged just now · ${severity}`, tone: severity === "small" ? "amber" : "red" },
        ],
        notes: [],
      };
      addLocalCase(c);
      setActiveWard(ward.id);
      setShowSnap(false);
      flipTo(ward.id, `Logged in Ward ${ward.number}`);
    } finally {
      setSnapBusy(false);
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

  return (
    <>
      <SplashIntro />
      <PhoneShell hideTabBar>
        <div className="sh-home" style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {/* Greyscale + blurred map background */}
          <div className="sh-map-wrap is-greyscale sh-home__map">
            <MapEmbed
              cases={allCases}
              center={center}
              zoom={13}
              onSelect={() => {}}
              selectedId={null}
            />
          </div>

          {/* Centered hero (visual) + two big actions */}
          <div className="sh-home__hero" aria-hidden={false}>
            <span className="sh-home__tag sh-home__tag--top">every pothole</span>
            <span className="sh-home__mark">
              <img src={logoUrl} alt="Stophole" draggable={false} />
              <span className="sh-home__asterisk" aria-hidden>*</span>
            </span>
            <span className="sh-home__tag sh-home__tag--bot">has an asshole</span>

            <div className="sh-home__cta">
              <button
                type="button"
                className="sh-home__btn sh-home__btn--primary"
                onClick={() => setShowSnap(true)}
              >
                <Camera size={18} />
                Log a Pothole
              </button>
              <button
                type="button"
                className="sh-home__btn sh-home__btn--ghost"
                onClick={findMyCouncillor}
                disabled={locBusy}
              >
                <Crosshair size={18} />
                {locBusy ? "Finding your ward…" : "Find the Asshole"}
              </button>
            </div>
          </div>

          {/* Minimal 2-item tab bar */}
          <nav className="sh-home__tabs" aria-label="Primary">
            <button type="button" onClick={() => setShowSnap(true)} className="sh-home__tab is-active">
              <Camera size={18} />
              <span>Snap</span>
            </button>
            <Link to="/you" className="sh-home__tab">
              <User size={18} />
              <span>You</span>
            </Link>
          </nav>
        </div>
      </PhoneShell>

      {/* Log-a-Pothole bottom sheet */}
      {showSnap && (
        <div className="sh-sheet" role="dialog" aria-label="Log a pothole" onClick={() => !snapBusy && setShowSnap(false)}>
          <div className="sh-sheet__card" onClick={(e) => e.stopPropagation()}>
            <div className="sh-sheet__grab" />
            <h2 className="sh-sheet__h">Log a pothole</h2>
            <p className="sh-sheet__p">
              We'll grab your GPS, the time, and your photo. Pick a size below — that's it.
            </p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={() => { /* metadata only — image not uploaded yet */ }}
            />
            <button
              type="button"
              className="sh-home__btn sh-home__btn--ghost"
              onClick={() => fileRef.current?.click()}
              disabled={snapBusy}
              style={{ width: "100%", marginBottom: 12 }}
            >
              <Camera size={18} />
              Take photo (optional)
            </button>

            <div className="sh-sheet__grid">
              <button type="button" disabled={snapBusy} onClick={() => logPothole("small")} className="sh-sheet__sev">
                <span className="sh-sheet__sev-dot" style={{ background: "#facc15" }} />
                Small
              </button>
              <button type="button" disabled={snapBusy} onClick={() => logPothole("nasty")} className="sh-sheet__sev">
                <span className="sh-sheet__sev-dot" style={{ background: "#f97316" }} />
                Nasty
              </button>
              <button type="button" disabled={snapBusy} onClick={() => logPothole("axle-killer")} className="sh-sheet__sev">
                <span className="sh-sheet__sev-dot" style={{ background: "#dc2626" }} />
                Axle-killer
              </button>
            </div>

            <button
              type="button"
              className="sh-sheet__close"
              onClick={() => setShowSnap(false)}
              disabled={snapBusy}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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

