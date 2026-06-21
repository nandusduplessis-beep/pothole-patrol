import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

export type TagTone = "neutral" | "yellow" | "dark" | "success" | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  children?: ReactNode;
}

const TONES: Record<TagTone, { bg: string; fg: string; bd: string }> = {
  neutral: { bg: "var(--surface-sunken)", fg: "var(--text-muted)", bd: "var(--border-subtle)" },
  yellow: { bg: "var(--accent)", fg: "var(--charcoal-900)", bd: "var(--yellow-600)" },
  dark: { bg: "var(--charcoal-900)", fg: "var(--grey-50)", bd: "var(--charcoal-900)" },
  success: { bg: "var(--status-verified-bg)", fg: "var(--status-verified)", bd: "transparent" },
  danger: { bg: "var(--status-flagged-bg)", fg: "var(--status-flagged)", bd: "transparent" },
};

export function Tag({ tone = "neutral", style, children, ...rest }: TagProps) {
  const t = TONES[tone];
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    background: t.bg,
    color: t.fg,
    border: `1px solid ${t.bd}`,
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderRadius: "999px",
    whiteSpace: "nowrap",
    ...style,
  };
  return (
    <span style={baseStyle} {...rest}>
      {children}
    </span>
  );
}