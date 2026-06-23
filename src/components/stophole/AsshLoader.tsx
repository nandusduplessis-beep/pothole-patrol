/**
 * The "asshole" loader — an asterisk inside a donut-hole spinner.
 */
export function AsshLoader({ size = 64 }: { size?: number }) {
  return (
    <span
      className="sh-asshloader"
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    >
      <span className="sh-asshloader__donut" />
      <span className="sh-asshloader__star">*</span>
    </span>
  );
}
