import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

export type StatTone = "default" | "yellow" | "dark" | "soft";
export type StatSize = "sm" | "md" | "lg";

export interface StatTileProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  tone?: StatTone;
  size?: StatSize;
}

const TONES: Record<StatTone, { bg: string; fg: string; lbl: string; bd: string }> = {
  default: {
    bg: "var(--surface-card)",
    fg: "var(--text-strong)",
    lbl: "var(--text-muted)",
    bd: "var(--border-subtle)",
  },
  yellow: {
    bg: "var(--accent)",
    fg: "var(--charcoal-900)",
    lbl: "var(--yellow-800)",
    bd: "transparent",
  },
  dark: {
    bg: "var(--charcoal-900)",
    fg: "var(--grey-50)",
    lbl: "var(--grey-400)",
    bd: "var(--charcoal-900)",
  },
  soft: {
    bg: "var(--surface-sunken)",
    fg: "var(--text-strong)",
    lbl: "var(--text-muted)",
    bd: "transparent",
  },
};

const SIZES: Record<StatSize, { pad: number; vSize: number; lblSize: number }> = {
  sm: { pad: 14, vSize: 22, lblSize: 11 },
  md: { pad: 18, vSize: 30, lblSize: 12 },
  lg: { pad: 22, vSize: 44, lblSize: 13 },
};

export function StatTile({
  label,
  value,
  unit,
  tone = "default",
  size = "md",
  style,
  children,
  ...rest
}: StatTileProps) {
  const t = TONES[tone];
  const s = SIZES[size];
  const baseStyle: CSSProperties = {
    background: t.bg,
    color: t.fg,
    border: `1px solid ${t.bd}`,
    borderRadius: "var(--sh-radius-lg)",
    padding: `${s.pad}px`,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    ...style,
  };

  return (
    <div style={baseStyle} {...rest}>
      {label && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: `${s.lblSize}px`,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: t.lbl,
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: `${s.vSize}px`,
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
        {unit && (
          <span
            style={{
              fontSize: "0.55em",
              fontWeight: 700,
              marginLeft: "0.2em",
              opacity: 0.75,
            }}
          >
            {unit}
          </span>
        )}
      </span>
      {children}
    </div>
  );
}