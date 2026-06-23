import { useEffect, useState } from "react";

/**
 * Black pothole splash — pulls the viewer out of the hole into the map.
 * Auto-hides after ~1.6s; honors session flag so it only plays once per visit.
 */
export function SplashIntro() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("sh_splash_done") !== "1";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      try { sessionStorage.setItem("sh_splash_done", "1"); } catch {}
      setShow(false);
    }, 1700);
    return () => clearTimeout(t);
  }, [show]);
  if (!show) return null;
  return (
    <div className="sh-splash" aria-hidden>
      <div className="sh-splash__hole" />
      <div className="sh-splash__word">STOPHOLE</div>
    </div>
  );
}
