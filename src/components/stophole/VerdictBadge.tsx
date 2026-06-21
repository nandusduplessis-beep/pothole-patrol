import type { HTMLAttributes, CSSProperties } from "react";

export type Verdict = "green" | "amber" | "red";
export type VerdictSize = "sm" | "md" | "lg";

export interface VerdictBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  verdict?: Verdict;
  size?: VerdictSize;
  label?: string;
}

const VERDICTS: Record<
  Verdict,
  { bg: string; fg: string; glyph: string; word: string }
> = {
  green: { bg: "var(--status-verified)", fg: "#fff", glyph: "🟢", word: "GREEN" },
  amber: { bg: "var(--accent)", fg: "var(--charcoal-900)", glyph: "🟡", word: "AMBER" },
  red: { bg: "var(--status-flagged)", fg: "#fff", glyph: "🔴", word: "RED" },
};

const SIZES: Record<VerdictSize, { h: number; padX: number; fs: number; gap: number }> = {
  sm: { h: 22, padX: 8, fs: 10, gap: 4 },
  md: { h: 28, padX: 11, fs: 11, gap: 5 },
  lg: { h: 36, padX: 14, fs: 13, gap: 7 },
};

export function VerdictBadge({
  verdict = "green",
  size = "md",
  label,
  style,
  ...rest
}: VerdictBadgeProps) {
  const v = VERDICTS[verdict];
  const s = SIZES[size];
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: `${s.gap}px`,
    height: `${s.h}px`,
    padding: `0 ${s.padX}px`,
    background: v.bg,
    color: v.fg,
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    fontSize: `${s.fs}px`,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderRadius: "999px",
    whiteSpace: "nowrap",
    ...style,
  };
  return (
    <span style={baseStyle} {...rest}>
      <span style={{ fontSize: s.fs + 1, lineHeight: 1 }}>{v.glyph}</span>
      {label || v.word}
    </span>
  );
}