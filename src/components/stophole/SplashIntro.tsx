import { useEffect, useState } from "react";

/**
 * Black pothole splash — pulls the viewer out of the hole into the map.
 * SSR-safe: renders nothing on the server and the first client render,
 * then mounts after hydration. Only plays once per session.
 */
export function SplashIntro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Gated: only play when explicitly requested via ?intro=1
    const wantIntro = new URLSearchParams(window.location.search).get("intro") === "1";
    if (!wantIntro) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
    }, 1700);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="sh-splash" aria-hidden>
      <div className="sh-splash__hole" />
      <div className="sh-splash__word">STOPHOLE</div>
    </div>
  );
}
