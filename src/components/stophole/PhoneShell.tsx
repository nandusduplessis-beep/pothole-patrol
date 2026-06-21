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
        <div className="sh-phone__notch" />
        <StatusBar />
        {children}
        {!hideTabBar && <TabBar />}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="sh-status">
      <span>9:41</span>
      <div className="sh-status__icons">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
          <rect x="0" y="6" width="3" height="4" />
          <rect x="4" y="4" width="3" height="6" />
          <rect x="8" y="2" width="3" height="8" />
          <rect x="12" y="0" width="3" height="10" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, marginLeft: 4 }}>LTE</span>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none" stroke="currentColor" strokeWidth={1}>
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" />
          <rect x="20" y="3" width="1.5" height="5" rx="0.5" fill="currentColor" stroke="none" />
          <rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor" stroke="none" />
        </svg>
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