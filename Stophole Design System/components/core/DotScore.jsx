export function DotScore(props) {
  const { score = 0, total = 10, verdict = 'green', size = 12, gap = 5, style: extraStyle, ...rest } = props;
  const colors = {
    green: 'var(--status-verified)',
    amber: 'var(--accent)',
    red:   'var(--status-flagged)',
  };
  const fill = colors[verdict];
  const dots = [];
  for (let i = 0; i < total; i++) {
    const on = i < score;
    dots.push(
      <span
        key={i}
        style={{
          width: size + 'px',
          height: size + 'px',
          borderRadius: '999px',
          background: on ? fill : 'var(--surface-sunken)',
          border: on ? 'none' : '1px solid var(--border-subtle)',
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        gap: gap + 'px',
        alignItems: 'center',
        ...extraStyle,
      }}
      {...rest}
    >
      {dots}
    </div>
  );
}
