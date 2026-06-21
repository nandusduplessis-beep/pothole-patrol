import type { HTMLAttributes, CSSProperties } from "react";
import type { Verdict } from "./VerdictBadge";

export interface DotScoreProps extends HTMLAttributes<HTMLDivElement> {
  score?: number;
  total?: number;
  verdict?: Verdict;
  size?: number;
  gap?: number;
}

const COLORS: Record<Verdict, string> = {
  green: "var(--status-verified)",
  amber: "var(--accent)",
  red: "var(--status-flagged)",
};

export function DotScore({
  score = 0,
  total = 5,
  verdict = "green",
  size = 12,
  gap = 5,
  style,
  ...rest
}: DotScoreProps) {
  const fill = COLORS[verdict];
  const baseStyle: CSSProperties = {
    display: "flex",
    gap: `${gap}px`,
    alignItems: "center",
    ...style,
  };
  return (
    <div style={baseStyle} {...rest}>
      {Array.from({ length: total }, (_, i) => {
        const on = i < score;
        return (
          <span
            key={i}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "999px",
              background: on ? fill : "var(--surface-sunken)",
              border: on ? "none" : "1px solid var(--border-subtle)",
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
}