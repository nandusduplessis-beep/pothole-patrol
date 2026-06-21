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

const TABS = [
  { to: "/", label: "Snap", Icon: Camera, match: (p: string) => p === "/" },
  { to: "/cases", label: "Cases", Icon: List, match: (p: string) => p.startsWith("/cases") || p.startsWith("/case/") },
  { to: "/vote/$wardId", params: { wardId: "JHB_WARD102" }, label: "Vote", Icon: Vote, match: (p: string) => p.startsWith("/vote") },
  { to: "/you", label: "You", Icon: User, match: (p: string) => p.startsWith("/you") },
] as const;

function TabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="sh-tabbar" aria-label="Primary">
      {TABS.map(({ to, label, Icon, match }) => {
        const active = match(pathname);
        const params = (TABS.find((t) => t.to === to) as { params?: Record<string, string> })?.params;
        return (
          <Link
            key={to}
            to={to}
            params={params as never}
            className={`sh-tab${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
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