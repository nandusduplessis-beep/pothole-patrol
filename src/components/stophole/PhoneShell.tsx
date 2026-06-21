import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Camera, List, Vote, User } from "lucide-react";

export function PhoneShell({
  children,
  hideTabBar = false,
}: {
  children: ReactNode;
  hideTabBar?: boolean;
}) {
  return (
    <div className="sh-frame">
      <div className="sh-phone__screen">
        {children}
        {!hideTabBar && <TabBar />}
      </div>
    </div>
  );
}

function TabBar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isCases = pathname.startsWith("/cases") || pathname.startsWith("/case/");
  const isVote = pathname.startsWith("/vote");
  const isYou = pathname.startsWith("/you");
  return (
    <nav className="sh-tabbar" aria-label="Primary">
      <Link to="/" className={`sh-tab${isHome ? " is-active" : ""}`}>
        <Camera size={20} />
        <span>Snap</span>
      </Link>
      <Link to="/cases" className={`sh-tab${isCases ? " is-active" : ""}`}>
        <List size={20} />
        <span>Cases</span>
      </Link>
      <Link
        to="/vote/$wardId"
        params={{ wardId: "JHB_WARD102" }}
        className={`sh-tab${isVote ? " is-active" : ""}`}
      >
        <Vote size={20} />
        <span>Vote</span>
      </Link>
      <Link to="/you" className={`sh-tab${isYou ? " is-active" : ""}`}>
        <User size={20} />
        <span>You</span>
      </Link>
    </nav>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 7,
        background: "var(--charcoal-900)",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
      aria-label="Stophole"
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7" stroke="var(--accent)" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="2.6" fill="var(--accent)" />
      </svg>
    </div>
  );
}

export function TopBar({
  left,
  title,
  right,
}: {
  left?: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="sh-topbar">
      <div className="sh-topbar__l">{left}</div>
      <div className="sh-topbar__t">{title}</div>
      <div className="sh-topbar__r">{right}</div>
    </div>
  );
}