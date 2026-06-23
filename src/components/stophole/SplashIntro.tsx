import { useEffect, useState } from "react";

/**
 * Black pothole splash — pulls the viewer out of the hole into the map.
 * SSR-safe: renders nothing on the server and the first client render,
 * then mounts after hydration. Only plays once per session.
 */
export function SplashIntro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem("sh_splash_done") === "1";
    } catch {}
    if (alreadyShown) return;
    setShow(true);
    const t = setTimeout(() => {
      try { sessionStorage.setItem("sh_splash_done", "1"); } catch {}
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
