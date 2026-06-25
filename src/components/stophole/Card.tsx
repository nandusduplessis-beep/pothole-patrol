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
    bg: "#ffffff",
    bd: "#1a1a1a",
    fg: "#111",
  },
  sunken: {
    bg: "#f7f7f7",
    bd: "#ececec",
    fg: "#111",
  },
  dark: {
    bg: "radial-gradient(120% 90% at 70% 20%, #2a2a2a 0%, #0b0b0b 70%)",
    bd: "#0b0b0b",
    fg: "#ffffff",
  },
  yellow: {
    bg: "#fecd00",
    bd: "transparent",
    fg: "#0a0a0a",
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
    borderRadius: "22px",
    boxShadow: variant === "dark" ? "0 16px 38px rgba(0,0,0,.45)" : "0 8px 24px rgba(0,0,0,.18)",
    overflow: "hidden",
    padding: `${PADS[padding]}px`,
    ...style,
  };
  return (
    <div data-sh-card={variant} style={baseStyle} {...rest}>
      {children}
    </div>
  );
}