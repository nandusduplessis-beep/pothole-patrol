import type { SVGProps } from "react";

/**
 * The asshole mark — donut ring with a centred asterisk.
 * Used wherever a politician appears.
 */
export function AsshIcon({
  size = 24,
  tone = "currentColor",
  ring = "currentColor",
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number; tone?: string; ring?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <circle cx="16" cy="16" r="13" stroke={ring} strokeWidth="3" />
      <circle cx="16" cy="16" r="4.5" fill={ring} />
      <g stroke={tone} strokeWidth="2.4" strokeLinecap="round">
        <line x1="16" y1="7" x2="16" y2="25" />
        <line x1="8" y1="11.5" x2="24" y2="20.5" />
        <line x1="8" y1="20.5" x2="24" y2="11.5" />
      </g>
    </svg>
  );
}

/** Old-school dial-pad asterisk: (*) */
export function AsshGlyph({ className }: { className?: string }) {
  return <span className={className} aria-hidden="true">(*)</span>;
}