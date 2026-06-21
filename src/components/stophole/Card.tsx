import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

export type CardVariant = "default" | "sunken" | "dark" | "yellow";
export type CardPadding = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children?: ReactNode;
}

const VARIANTS: Record<CardVariant, { bg: string; bd: string; fg: string }> = {
  default: {
    bg: "var(--surface-card)",
    bd: "var(--border-subtle)",
    fg: "var(--text-body)",
  },
  sunken: {
    bg: "var(--surface-sunken)",
    bd: "transparent",
    fg: "var(--text-body)",
  },
  dark: {
    bg: "var(--charcoal-900)",
    bd: "var(--charcoal-900)",
    fg: "var(--grey-50)",
  },
  yellow: {
    bg: "var(--accent)",
    bd: "transparent",
    fg: "var(--charcoal-900)",
  },
};

const PADS: Record<CardPadding, number> = { sm: 14, md: 20, lg: 26 };

export function Card({
  variant = "default",
  padding = "md",
  style,
  children,
  ...rest
}: CardProps) {
  const v = VARIANTS[variant];
  const baseStyle: CSSProperties = {
    background: v.bg,
    color: v.fg,
    border: `1px solid ${v.bd}`,
    borderRadius: "var(--sh-radius-lg)",
    padding: `${PADS[padding]}px`,
    ...style,
  };
  return (
    <div style={baseStyle} {...rest}>
      {children}
    </div>
  );
}