import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";

export type ButtonVariant = "primary" | "dark" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  iconChip?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

const SIZES: Record<ButtonSize, { h: number; padX: number; fs: number; gap: number }> = {
  sm: { h: 36, padX: 14, fs: 13, gap: 8 },
  md: { h: 44, padX: 18, fs: 14, gap: 9 },
  lg: { h: 52, padX: 24, fs: 15, gap: 10 },
};

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--accent)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--yellow-600)",
    boxShadow: "var(--sh-shadow-xs)",
  },
  dark: {
    background: "var(--charcoal-900)",
    color: "var(--grey-50)",
    border: "1px solid var(--charcoal-900)",
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-strong)",
    border: "1px solid var(--border-default)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid transparent",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  iconChip = false,
  fullWidth = false,
  disabled,
  style,
  children,
  ...rest
}: ButtonProps) {
  const s = SIZES[size];
  const baseStyle: CSSProperties = {
    appearance: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: `${s.gap}px`,
    height: `${s.h}px`,
    padding: `0 ${s.padX}px`,
    paddingLeft: iconChip ? "6px" : `${s.padX}px`,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: `${s.fs}px`,
    letterSpacing: "-0.005em",
    borderRadius: "999px",
    transition:
      "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
    width: fullWidth ? "100%" : "auto",
    ...VARIANTS[variant],
    ...style,
  };

  const chipStyle: CSSProperties = {
    width: `${s.h - 12}px`,
    height: `${s.h - 12}px`,
    background: "var(--accent)",
    color: "var(--charcoal-900)",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  };

  return (
    <button disabled={disabled} style={baseStyle} {...rest}>
      {iconChip && variant === "dark" && leadingIcon ? (
        <span style={chipStyle}>{leadingIcon}</span>
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}