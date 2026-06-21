import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { Camera } from "lucide-react";

export interface PotholeInputProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  subtext?: string;
  width?: number;
  height?: number;
  onSnap?: () => void;
  children?: ReactNode;
}

export function PotholeInput({
  placeholder = "Snap the pothole",
  subtext = "or type an address",
  width = 300,
  height = 200,
  onSnap,
  style,
  children,
  ...rest
}: PotholeInputProps) {
  const blobRadius = "47% 53% 58% 42% / 52% 44% 56% 48%";
  const baseStyle: CSSProperties = {
    position: "relative",
    width: `${width}px`,
    height: `${height}px`,
    cursor: "pointer",
    borderRadius: blobRadius,
    background:
      "radial-gradient(120% 120% at 50% 30%, #3a3834 0%, #211f1c 42%, #161412 70%, #0c0b0a 100%)",
    boxShadow:
      "inset 0 18px 38px rgba(0,0,0,0.66), inset 0 -10px 26px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    border: "1px solid var(--charcoal-950)",
    overflow: "hidden",
    ...style,
  };
  return (
    <div role="button" tabIndex={0} onClick={onSnap} style={baseStyle} {...rest}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "inherit",
          border: "2px solid var(--grey-300)",
          opacity: 0.4,
          WebkitMask:
            "linear-gradient(95deg, #000 50%, transparent 56%, #000 64%, transparent 70%, #000 80%)",
          mask: "linear-gradient(95deg, #000 50%, transparent 56%, #000 64%, transparent 70%, #000 80%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "999px",
          background: "var(--accent)",
          display: "grid",
          placeItems: "center",
          color: "var(--charcoal-900)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.55), inset 0 -2px 0 var(--yellow-700)",
        }}
      >
        <Camera size={24} strokeWidth={2} />
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          color: "var(--grey-150)",
          fontSize: "16px",
        }}
      >
        {placeholder}
      </div>
      {subtext && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--grey-400)",
          }}
        >
          {subtext}
        </div>
      )}
      {children}
    </div>
  );
}