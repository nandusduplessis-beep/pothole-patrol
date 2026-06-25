import type { CSSProperties, ReactNode, MouseEventHandler } from "react";
import { ChevronRight } from "lucide-react";

/* ---------- HeroCard ---------- */
export interface HeroCardProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  jersey?: ReactNode;
  badge?: ReactNode;
  chip?: ReactNode;
  right?: ReactNode;
  variant?: "dark" | "yellow";
  style?: CSSProperties;
  children?: ReactNode;
}
export function HeroCard({
  eyebrow,
  title,
  sub,
  jersey,
  badge,
  chip,
  right,
  variant = "dark",
  style,
  children,
}: HeroCardProps) {
  return (
    <div
      className={`shk-hero${variant === "yellow" ? " shk-hero--yellow" : ""}`}
      style={style}
    >
      {(eyebrow || chip || right) && (
        <div className="shk-hero__top">
          <span>{eyebrow}</span>
          {chip ? <span className="shk-hero__chip">{chip}</span> : <span />}
          {right ?? null}
        </div>
      )}
      <h1 className="shk-hero__title">{title}</h1>
      {sub && <p className="shk-hero__sub">{sub}</p>}
      {children}
      {(jersey || badge) && (
        <div className="shk-hero__foot">
          <span className="shk-hero__jersey">{jersey}</span>
          {badge && <span className="shk-hero__badge">{badge}</span>}
        </div>
      )}
    </div>
  );
}

/* ---------- StatRow ---------- */
export interface StatItem {
  k: ReactNode;
  v: ReactNode;
  n?: ReactNode;
}
export function StatRow({
  items,
  cols,
  style,
}: {
  items: StatItem[];
  cols?: 2 | 3 | 4;
  style?: CSSProperties;
}) {
  const c = cols ?? Math.min(Math.max(items.length, 2), 4);
  return (
    <div
      className="shk-statrow"
      style={{ ...(style ?? {}), ["--shk-cols" as string]: c }}
    >
      {items.map((it, i) => (
        <div className="shk-stat" key={i}>
          <div className="shk-stat__k">{it.k}</div>
          <div className="shk-stat__v">{it.v}</div>
          {it.n && <div className="shk-stat__n">{it.n}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---------- ListCard ---------- */
export function ListCard({
  heading,
  children,
  style,
}: {
  heading?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="shk-list" style={style}>
      {heading && <div className="shk-list__h">{heading}</div>}
      {children}
    </div>
  );
}
export function ListRow({
  title,
  meta,
  right,
  onClick,
  href,
  external,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  right?: ReactNode;
  onClick?: MouseEventHandler;
  href?: string;
  external?: boolean;
  children?: ReactNode;
}) {
  const inner = (
    <>
      <div className="shk-list__rowmain">
        <div className="shk-list__rowtitle">{title}</div>
        {meta && <div className="shk-list__rowmeta">{meta}</div>}
        {children}
      </div>
      <div className="shk-list__rowright">
        {right ?? <ChevronRight size={16} />}
      </div>
    </>
  );
  if (href) {
    return (
      <a
        className="shk-list__row"
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className="shk-list__row" onClick={onClick}>
      {inner}
    </button>
  );
}

/* ---------- ActionCard ---------- */
export function ActionStack({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="shk-actions" style={style}>
      {children}
    </div>
  );
}
export function ActionCard({
  icon,
  title,
  sub,
  variant = "default",
  onClick,
  href,
  external,
  disabled,
}: {
  icon?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  variant?: "default" | "primary" | "dark";
  onClick?: MouseEventHandler;
  href?: string;
  external?: boolean;
  disabled?: boolean;
}) {
  const cls = `shk-action${variant === "primary" ? " shk-action--primary" : ""}${
    variant === "dark" ? " shk-action--dark" : ""
  }`;
  const inner = (
    <>
      {icon && <span className="shk-action__icon">{icon}</span>}
      <span className="shk-action__main">
        <span className="shk-action__title">{title}</span>
        {sub && <span className="shk-action__sub">{sub}</span>}
      </span>
      <ChevronRight size={18} className="shk-action__chev" />
    </>
  );
  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

/* ---------- Deck wrapper ---------- */
export function Deck({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="shk-deck" style={style}>
      {children}
    </div>
  );
}