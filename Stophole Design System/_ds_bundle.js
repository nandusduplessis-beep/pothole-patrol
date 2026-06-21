/* @ds-bundle: {"format":3,"namespace":"StopholeDesignSystem_1ea2d7","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"DotScore","sourcePath":"components/core/DotScore.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"PotholeInput","sourcePath":"components/core/PotholeInput.jsx"},{"name":"StatTile","sourcePath":"components/core/StatTile.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"VerdictBadge","sourcePath":"components/core/VerdictBadge.jsx"}],"sourceHashes":{"components/core/Button.jsx":"6b310be202bf","components/core/Card.jsx":"23c3a45de179","components/core/DotScore.jsx":"8b39b89a87fc","components/core/Icon.jsx":"8369860111a2","components/core/PotholeInput.jsx":"33d1c9078784","components/core/StatTile.jsx":"8ebe962a1e12","components/core/Tag.jsx":"02c9b7a28de1","components/core/VerdictBadge.jsx":"4fbabe07068d","grid-glyph.js":"3f6b7e315ac1","ui_kits/app/CandidatesScreen.jsx":"245696ef797f","ui_kits/app/CaseScreen.jsx":"3f8372d609be","ui_kits/app/CasesScreen.jsx":"29eef8db1ca3","ui_kits/app/HomeScreen.jsx":"ce97089169fb","ui_kits/app/Shared.jsx":"b2c6b1828da4","ui_kits/app/Shell.jsx":"674915c46abc","ui_kits/app/VoteScreen.jsx":"2f665ad3b3ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StopholeDesignSystem_1ea2d7 = window.StopholeDesignSystem_1ea2d7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function Button(props) {
  const {
    variant = 'primary',
    // 'primary' (yellow) | 'dark' (charcoal pill) | 'ghost' | 'secondary'
    size = 'md',
    // 'sm' | 'md' | 'lg'
    leadingIcon,
    trailingIcon,
    iconChip = false,
    // small rounded icon-chip inside dark pill (Hecta pattern)
    fullWidth = false,
    disabled = false,
    onClick,
    children,
    style: extraStyle,
    ...rest
  } = props;
  const sizes = {
    sm: {
      h: 36,
      padX: 14,
      fs: 13,
      gap: 8
    },
    md: {
      h: 44,
      padX: 18,
      fs: 14,
      gap: 9
    },
    lg: {
      h: 52,
      padX: 24,
      fs: 15,
      gap: 10
    }
  };
  const s = sizes[size];
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid var(--yellow-600)',
      boxShadow: 'var(--shadow-xs)'
    },
    dark: {
      background: 'var(--charcoal-900)',
      color: 'var(--grey-50)',
      border: '1px solid var(--charcoal-900)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent'
    }
  };
  const baseStyle = {
    appearance: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap + 'px',
    height: s.h + 'px',
    padding: `0 ${s.padX}px`,
    paddingLeft: iconChip ? '6px' : s.padX + 'px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: s.fs + 'px',
    letterSpacing: '-0.005em',
    borderRadius: '999px',
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    width: fullWidth ? '100%' : 'auto',
    ...variants[variant],
    ...extraStyle
  };
  const chipStyle = {
    width: s.h - 12 + 'px',
    height: s.h - 12 + 'px',
    background: 'var(--accent)',
    color: 'var(--charcoal-900)',
    borderRadius: '999px',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0
  };
  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    disabled,
    style: baseStyle,
    ...rest
  }, iconChip && variant === 'dark' && leadingIcon ? React.createElement('span', {
    style: chipStyle
  }, leadingIcon) : leadingIcon, React.createElement('span', null, children), trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card(props) {
  const {
    variant = 'default',
    // 'default' (white) | 'sunken' | 'dark' | 'yellow'
    padding = 'md',
    children,
    style: extraStyle,
    ...rest
  } = props;
  const variants = {
    default: {
      bg: 'var(--surface-card)',
      bd: 'var(--border-subtle)',
      fg: 'var(--text-body)'
    },
    sunken: {
      bg: 'var(--surface-sunken)',
      bd: 'transparent',
      fg: 'var(--text-body)'
    },
    dark: {
      bg: 'var(--charcoal-900)',
      bd: 'var(--charcoal-900)',
      fg: 'var(--grey-50)'
    },
    yellow: {
      bg: 'var(--accent)',
      bd: 'transparent',
      fg: 'var(--charcoal-900)'
    }
  };
  const v = variants[variant];
  const pads = {
    sm: 14,
    md: 20,
    lg: 26
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: v.bg,
      color: v.fg,
      border: `1px solid ${v.bd}`,
      borderRadius: 'var(--radius-lg)',
      padding: pads[padding] + 'px',
      ...extraStyle
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/DotScore.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DotScore(props) {
  const {
    score = 0,
    total = 10,
    verdict = 'green',
    size = 12,
    gap = 5,
    style: extraStyle,
    ...rest
  } = props;
  const colors = {
    green: 'var(--status-verified)',
    amber: 'var(--accent)',
    red: 'var(--status-flagged)'
  };
  const fill = colors[verdict];
  const dots = [];
  for (let i = 0; i < total; i++) {
    const on = i < score;
    dots.push(/*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: size + 'px',
        height: size + 'px',
        borderRadius: '999px',
        background: on ? fill : 'var(--surface-sunken)',
        border: on ? 'none' : '1px solid var(--border-subtle)',
        flexShrink: 0
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: gap + 'px',
      alignItems: 'center',
      ...extraStyle
    }
  }, rest), dots);
}
Object.assign(__ds_scope, { DotScore });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DotScore.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Lucide-style 2px stroke icons. `currentColor` inherits text color + theme.
const ICON_PATHS = {
  camera: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z|c12,13,3'
};
function Icon(props) {
  const {
    name,
    size = 18,
    strokeWidth = 2,
    style: extraStyle,
    ...rest
  } = props;
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      flexShrink: 0,
      verticalAlign: 'middle',
      ...extraStyle
    },
    ...rest
  };
  switch (name) {
    case 'camera':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "13",
        r: "3"
      }));
    case 'map-pin':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "10",
        r: "3"
      }));
    case 'search':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m20 20-3.5-3.5"
      }));
    case 'chevron-right':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m9 6 6 6-6 6"
      }));
    case 'chevron-left':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m15 6-6 6 6 6"
      }));
    case 'arrow-right':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M5 12h14"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m12 5 7 7-7 7"
      }));
    case 'arrow-up-right':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M7 17 17 7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M7 7h10v10"
      }));
    case 'x':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M18 6 6 18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m6 6 12 12"
      }));
    case 'circle-check':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m9 12 2 2 4-4"
      }));
    case 'circle-x':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m15 9-6 6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m9 9 6 6"
      }));
    case 'triangle-alert':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m21.7 18-9-15.5a2 2 0 0 0-3.4 0L.3 18A2 2 0 0 0 2 21h20a2 2 0 0 0 1.7-3Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 9v4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 17h.01"
      }));
    case 'user':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "8",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 21a8 8 0 0 1 16 0"
      }));
    case 'vote':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m9 12 2 2 4-4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M22 19H2"
      }));
    case 'calendar':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 2v4M8 2v4M3 10h18"
      }));
    case 'banknote':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "6",
        width: "20",
        height: "12",
        rx: "2"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 12h.01M18 12h.01"
      }));
    case 'flag':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M4 22V4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 4h13l-2 4 2 4H4"
      }));
    case 'phone':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0 1 22 16.92Z"
      }));
    case 'bell':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 12h14"
      }));
    case 'sun':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      }));
    case 'moon':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      }));
    case 'share':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "18",
        cy: "5",
        r: "3"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "6",
        cy: "12",
        r: "3"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "18",
        cy: "19",
        r: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m8.59 13.51 6.83 3.98M15.41 6.51 8.59 10.49"
      }));
    case 'home':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 22V12h6v10"
      }));
    case 'list':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 6h.01M3 12h.01M3 18h.01"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 6h13M8 12h13M8 18h13"
      }));
    case 'message-square':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
      }));
    case 'menu':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M3 6h18M3 12h18M3 18h18"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
        d: "M20 6 9 17l-5-5"
      }));
    default:
      return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }));
  }
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/PotholeInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PotholeInput — the app's signature entry. A recessed, irregular asphalt hole
 * shape you tap (snap a photo) or type into (address). The pothole IS the input.
 */
function PotholeInput(props) {
  const {
    placeholder = 'Snap the pothole',
    subtext = 'or type an address',
    width = 320,
    height = 230,
    onSnap,
    onChange,
    value,
    children,
    style: extraStyle,
    ...rest
  } = props;

  // Irregular blob radius — randomized-feeling but stable
  const blobRadius = '47% 53% 58% 42% / 52% 44% 56% 48%';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: width + 'px',
      height: height + 'px',
      cursor: 'text',
      borderRadius: blobRadius,
      background: 'radial-gradient(120% 120% at 50% 30%, #3a3834 0%, #211f1c 42%, #161412 70%, #0c0b0a 100%)',
      boxShadow: 'inset 0 18px 38px rgba(0,0,0,0.66), inset 0 -10px 26px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.18)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      border: '1px solid var(--charcoal-950)',
      overflow: 'hidden',
      ...extraStyle
    },
    onClick: onSnap
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-6px',
      borderRadius: 'inherit',
      border: '2px solid var(--grey-300)',
      opacity: 0.4,
      WebkitMask: 'linear-gradient(95deg, #000 50%, transparent 56%, #000 64%, transparent 70%, #000 80%)',
      mask: 'linear-gradient(95deg, #000 50%, transparent 56%, #000 64%, transparent 70%, #000 80%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '54px',
      height: '54px',
      borderRadius: '999px',
      background: 'var(--accent)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--charcoal-900)',
      boxShadow: '0 6px 18px rgba(0,0,0,0.55), inset 0 -2px 0 var(--yellow-700)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "3"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      color: 'var(--grey-150)',
      fontSize: '16px'
    }
  }, placeholder), subtext && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--grey-400)'
    }
  }, subtext), children);
}
Object.assign(__ds_scope, { PotholeInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PotholeInput.jsx", error: String((e && e.message) || e) }); }

// components/core/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatTile(props) {
  const {
    label,
    value,
    unit,
    tone = 'default',
    // 'default' | 'yellow' | 'dark' | 'soft'
    size = 'md',
    style: extraStyle,
    children,
    ...rest
  } = props;
  const tones = {
    default: {
      bg: 'var(--surface-card)',
      fg: 'var(--text-strong)',
      lbl: 'var(--text-muted)',
      bd: 'var(--border-subtle)'
    },
    yellow: {
      bg: 'var(--accent)',
      fg: 'var(--charcoal-900)',
      lbl: 'var(--yellow-800)',
      bd: 'transparent'
    },
    dark: {
      bg: 'var(--charcoal-900)',
      fg: 'var(--grey-50)',
      lbl: 'var(--grey-400)',
      bd: 'var(--charcoal-900)'
    },
    soft: {
      bg: 'var(--surface-sunken)',
      fg: 'var(--text-strong)',
      lbl: 'var(--text-muted)',
      bd: 'transparent'
    }
  };
  const t = tones[tone];
  const sizes = {
    sm: {
      pad: 14,
      vSize: 22,
      lblSize: 11
    },
    md: {
      pad: 18,
      vSize: 30,
      lblSize: 12
    },
    lg: {
      pad: 22,
      vSize: 44,
      lblSize: 13
    }
  };
  const s = sizes[size];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: 'var(--radius-lg)',
      padding: s.pad + 'px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...extraStyle
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: s.lblSize + 'px',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: t.lbl
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: s.vSize + 'px',
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.55em',
      fontWeight: 700,
      marginLeft: '0.2em',
      opacity: 0.75
    }
  }, unit)), children);
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag(props) {
  const {
    tone = 'neutral',
    children,
    style: extraStyle,
    ...rest
  } = props;
  const tones = {
    neutral: {
      bg: 'var(--surface-sunken)',
      fg: 'var(--text-muted)',
      bd: 'var(--border-subtle)'
    },
    yellow: {
      bg: 'var(--accent)',
      fg: 'var(--charcoal-900)',
      bd: 'var(--yellow-600)'
    },
    dark: {
      bg: 'var(--charcoal-900)',
      fg: 'var(--grey-50)',
      bd: 'var(--charcoal-900)'
    },
    success: {
      bg: 'var(--status-verified-bg)',
      fg: 'var(--status-verified)',
      bd: 'transparent'
    },
    danger: {
      bg: 'var(--status-flagged-bg)',
      fg: 'var(--status-flagged)',
      bd: 'transparent'
    }
  };
  const t = tones[tone];
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      borderRadius: '999px',
      whiteSpace: 'nowrap',
      ...extraStyle
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/VerdictBadge.jsx
try { (() => {
function VerdictBadge(props) {
  const {
    verdict = 'green',
    // 'green' | 'amber' | 'red'
    size = 'md',
    // 'sm' | 'md' | 'lg'
    label,
    style: extraStyle,
    ...rest
  } = props;
  const verdicts = {
    green: {
      bg: 'var(--status-verified)',
      fg: '#fff',
      glyph: '🟢',
      word: 'GREEN'
    },
    amber: {
      bg: 'var(--accent)',
      fg: 'var(--charcoal-900)',
      glyph: '🟡',
      word: 'AMBER'
    },
    red: {
      bg: 'var(--status-flagged)',
      fg: '#fff',
      glyph: '🔴',
      word: 'RED'
    }
  };
  const v = verdicts[verdict];
  const sizes = {
    sm: {
      h: 22,
      padX: 8,
      fs: 10,
      gap: 4
    },
    md: {
      h: 28,
      padX: 11,
      fs: 11,
      gap: 5
    },
    lg: {
      h: 36,
      padX: 14,
      fs: 13,
      gap: 7
    }
  };
  const s = sizes[size];
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap + 'px',
      height: s.h + 'px',
      padding: `0 ${s.padX}px`,
      background: v.bg,
      color: v.fg,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: s.fs + 'px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      borderRadius: '999px',
      ...extraStyle
    },
    ...rest
  }, React.createElement('span', {
    style: {
      fontSize: s.fs + 1,
      lineHeight: 1
    }
  }, v.glyph), label || v.word);
}
Object.assign(__ds_scope, { VerdictBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/VerdictBadge.jsx", error: String((e && e.message) || e) }); }

// grid-glyph.js
try { (() => {
/* ============================================================
   Stophole — Grid Glyph helper
   ------------------------------------------------------------
   Generative brand primitive. A grid glyph is a small NxM
   matrix of cells; each non-zero cell renders as a shape token:
     1 = filled square (rounded)
     2 = filled circle
     3 = top-half circle
     4 = right-half circle
     5 = bottom-half circle
     6 = left-half circle
     7 = quarter circle (tl), 8 = (tr), 9 = (br), 10 = (bl)
     0 = empty
   Used for: pothole blobs, score dot-matrices, locator glyphs.
   Concept inspired by an external grid-glyph studio; this is a
   minimal re-implementation owned by this design system.
   Usage:
     <svg-glyph data-matrix="0,1,1,0;1,1,1,1;1,1,1,0" data-cell="14" data-fg="#FFC700"></svg-glyph>
   ============================================================ */
(function () {
  function build(el) {
    var raw = el.getAttribute('data-matrix') || '';
    var cell = parseInt(el.getAttribute('data-cell') || '12', 10);
    var fg = el.getAttribute('data-fg') || 'currentColor';
    var bg = el.getAttribute('data-bg') || 'transparent';
    var radius = parseFloat(el.getAttribute('data-radius') || '0.35'); // % of cell for square
    var rows = raw.split(';').map(function (r) {
      return r.split(',').map(function (n) {
        return parseInt(n, 10) || 0;
      });
    });
    var h = rows.length;
    var w = rows[0] ? rows[0].length : 0;
    var W = w * cell,
      H = h * cell;
    var parts = [];
    parts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" style="background:' + bg + ';display:block">');
    parts.push('<g fill="' + fg + '">');
    var rd = cell * radius;
    for (var r = 0; r < h; r++) {
      for (var c = 0; c < w; c++) {
        var id = rows[r][c];
        if (!id) continue;
        var x = c * cell,
          y = r * cell;
        if (id === 1) {
          parts.push('<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" rx="' + rd + '"/>');
        } else if (id === 2) {
          parts.push('<circle cx="' + (x + cell / 2) + '" cy="' + (y + cell / 2) + '" r="' + cell / 2 + '"/>');
        } else if (id === 3) {
          // top-half (flat down)
          parts.push('<path d="M' + x + ' ' + (y + cell / 2) + ' a' + cell / 2 + ' ' + cell / 2 + ' 0 0 1 ' + cell + ' 0 z"/>');
        } else if (id === 4) {
          // right-half (flat left)
          parts.push('<path d="M' + (x + cell / 2) + ' ' + y + ' a' + cell / 2 + ' ' + cell / 2 + ' 0 0 1 0 ' + cell + ' z"/>');
        } else if (id === 5) {
          // bottom-half (flat up)
          parts.push('<path d="M' + x + ' ' + (y + cell / 2) + ' a' + cell / 2 + ' ' + cell / 2 + ' 0 0 0 ' + cell + ' 0 z"/>');
        } else if (id === 6) {
          // left-half (flat right)
          parts.push('<path d="M' + (x + cell / 2) + ' ' + y + ' a' + cell / 2 + ' ' + cell / 2 + ' 0 0 0 0 ' + cell + ' z"/>');
        } else if (id === 7) {
          // quarter tl
          parts.push('<path d="M' + x + ' ' + y + ' h' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 -' + cell + ' ' + cell + ' z"/>');
        } else if (id === 8) {
          // quarter tr
          parts.push('<path d="M' + (x + cell) + ' ' + y + ' v' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 -' + cell + ' -' + cell + ' z"/>');
        } else if (id === 9) {
          // quarter br
          parts.push('<path d="M' + (x + cell) + ' ' + (y + cell) + ' h-' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 ' + cell + ' -' + cell + ' z"/>');
        } else if (id === 10) {
          // quarter bl
          parts.push('<path d="M' + x + ' ' + (y + cell) + ' v-' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 ' + cell + ' ' + cell + ' z"/>');
        }
      }
    }
    parts.push('</g></svg>');
    el.innerHTML = parts.join('');
    el.setAttribute('role', 'img');
  }
  function init() {
    document.querySelectorAll('svg-glyph').forEach(build);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // expose for programmatic use
  window.StopholeGlyph = {
    build: build,
    init: init
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "grid-glyph.js", error: String((e && e.message) || e) }); }

// ui_kits/app/CandidatesScreen.jsx
try { (() => {
// Stophole — CandidatesScreen: compare the 2026 applicants, scored.

const CandidatesScreen = ({
  onBack,
  onVote
}) => {
  const {
    Button,
    Icon,
    VerdictBadge,
    Tag,
    DotScore,
    Card
  } = window.StopholeDesignSystem_1ea2d7;
  const Candidate = ({
    rank,
    name,
    party,
    verdict,
    label,
    signals,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    className: "stophole-cand",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-cand__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stophole-cand__rank"
  }, rank), /*#__PURE__*/React.createElement("div", {
    className: "stophole-avatar",
    style: {
      background: verdict === 'green' ? 'var(--status-verified)' : verdict === 'amber' ? 'var(--accent)' : 'var(--charcoal-800)',
      color: verdict === 'amber' ? 'var(--charcoal-900)' : 'var(--grey-50)'
    }
  }, name.split(' ').map(w => w[0]).slice(0, 2).join('')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-cand__name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "stophole-cand__party"
  }, party)), /*#__PURE__*/React.createElement(VerdictBadge, {
    verdict: verdict,
    size: "sm",
    label: label
  })), /*#__PURE__*/React.createElement("div", {
    className: "stophole-cand__signals"
  }, signals.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "stophole-cand__sig",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "stophole-cand__sig-label"
  }, s.label), /*#__PURE__*/React.createElement(DotScore, {
    score: s.score,
    total: 5,
    verdict: verdict,
    size: 10,
    gap: 4
  })))));
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen"
  }, /*#__PURE__*/React.createElement(TopBar, {
    left: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      onClick: onBack,
      "aria-label": "back"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22
    })),
    title: /*#__PURE__*/React.createElement("span", null, "WARD 102 \xB7 2026"),
    right: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      "aria-label": "filter"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layers",
      size: 18
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 4px 4px'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "The Pothole Test"), /*#__PURE__*/React.createElement("h1", {
    className: "stophole-h1",
    style: {
      marginTop: 10
    }
  }, "Who actually ", /*#__PURE__*/React.createElement("span", {
    className: "sh-muted"
  }, "fixes things?")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 14,
      margin: '6px 0 0'
    }
  }, "Scored on delivery, not promises. Sorted best-first.")), /*#__PURE__*/React.createElement("div", {
    className: "stophole-stack",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Candidate, {
    rank: "1",
    name: "Naledi Khumalo",
    party: "Independent \xB7 lifelong 102 resident",
    verdict: "green",
    label: "Proven",
    signals: [{
      label: 'Proven fix rate',
      score: 5
    }, {
      label: 'Time-to-action',
      score: 4
    }, {
      label: 'Budget conversion',
      score: 4
    }, {
      label: 'Local accountability',
      score: 5
    }],
    onClick: onVote
  }), /*#__PURE__*/React.createElement(Candidate, {
    rank: "2",
    name: "Pieter van Wyk",
    party: "DA \xB7 ward committee 2y",
    verdict: "amber",
    label: "Partial",
    signals: [{
      label: 'Proven fix rate',
      score: 3
    }, {
      label: 'Time-to-action',
      score: 3
    }, {
      label: 'Budget conversion',
      score: 2
    }, {
      label: 'Local accountability',
      score: 3
    }],
    onClick: onVote
  }), /*#__PURE__*/React.createElement(Candidate, {
    rank: "3",
    name: "Cllr. John Mokoena",
    party: "ANC \xB7 incumbent, 12y",
    verdict: "red",
    label: "Replace",
    signals: [{
      label: 'Proven fix rate',
      score: 1
    }, {
      label: 'Time-to-action',
      score: 1
    }, {
      label: 'Budget conversion',
      score: 0
    }, {
      label: 'Local accountability',
      score: 1
    }],
    onClick: onVote
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "lg",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "stophole-cta-h"
  }, "Know where to vote. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey-400)'
    }
  }, "One tap.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "vote",
      size: 18
    }),
    onClick: onVote
  }, "Your voting station")))));
};
window.CandidatesScreen = CandidatesScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CandidatesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CaseScreen.jsx
try { (() => {
// Stophole — CaseScreen: a single pothole case file

const CaseScreen = ({
  onBack,
  onSeeCandidates
}) => {
  const {
    Button,
    Icon,
    VerdictBadge,
    Tag,
    StatTile,
    Card
  } = window.StopholeDesignSystem_1ea2d7;
  const SignalRow = ({
    icon,
    text,
    tone
  }) => /*#__PURE__*/React.createElement("div", {
    className: `stophole-signal stophole-signal--${tone}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "stophole-signal__txt"
  }, text));
  const Note = ({
    name,
    days,
    text,
    raw
  }) => /*#__PURE__*/React.createElement("div", {
    className: "stophole-note"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-note__head"
  }, /*#__PURE__*/React.createElement("span", null, name), /*#__PURE__*/React.createElement("span", {
    className: "stophole-dot-sep"
  }), /*#__PURE__*/React.createElement("span", null, days), raw && /*#__PURE__*/React.createElement("span", {
    className: "raw"
  }, "raw \xB7 unedited")), /*#__PURE__*/React.createElement("div", {
    className: "stophole-note__txt"
  }, text));
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen"
  }, /*#__PURE__*/React.createElement(TopBar, {
    left: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      onClick: onBack,
      "aria-label": "back"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22
    })),
    title: /*#__PURE__*/React.createElement("span", null, "CASE \xB7 #SH-1042"),
    right: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      "aria-label": "share"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "share",
      size: 18
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__photo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__photo-inner"
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "dark",
    style: {
      background: 'rgba(14,14,13,0.7)',
      color: 'var(--grey-50)',
      borderColor: 'transparent'
    }
  }, "102 days"))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__map"
  }, /*#__PURE__*/React.createElement(MiniMap, null))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__head"
  }, /*#__PURE__*/React.createElement(Tag, null, "Ward 102 \xB7 Sandton"), /*#__PURE__*/React.createElement("h1", {
    className: "stophole-h1"
  }, "Rivonia Rd ", /*#__PURE__*/React.createElement("span", {
    className: "sh-muted"
  }, "@ Katherine St.")), /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "JOHANNESBURG ROADS AGENCY (JRA)")), /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__stats"
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Open",
    value: "102",
    unit: "d"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Reports",
    value: "38"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Refills",
    value: "2",
    tone: "soft"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stophole-block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-eyebrow"
  }, "Who owns this failure now"), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-person"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-avatar"
  }, "JM"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-person__name"
  }, "Cllr. John Mokoena"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-person__role"
  }, "Ward Councillor \xB7 102")), /*#__PURE__*/React.createElement(VerdictBadge, {
    verdict: "red",
    size: "sm",
    label: "Replace"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stophole-signals"
  }, /*#__PURE__*/React.createElement(SignalRow, {
    icon: "phone",
    text: "Unreachable on 3 of 5 numbers",
    tone: "red"
  }), /*#__PURE__*/React.createElement(SignalRow, {
    icon: "triangle-alert",
    text: "Same pothole \u2014 4 election cycles",
    tone: "red"
  }), /*#__PURE__*/React.createElement(SignalRow, {
    icon: "banknote",
    text: "R1.2m allocated \xB7 R0 visible",
    tone: "red"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-eyebrow"
  }, "Community intel \xB7 38 voices"), /*#__PURE__*/React.createElement(Card, {
    variant: "sunken",
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Note, {
    name: "Thandi M.",
    days: "4d",
    text: "Nobody owns it when you phone. The JRA bounces you to the ward office. The office bounces you back."
  }), /*#__PURE__*/React.createElement(Note, {
    name: "Sipho K.",
    days: "1w",
    text: "They poured cold-mix in March. Lasted one storm. Same hole, same week. We are not stupid."
  }), /*#__PURE__*/React.createElement(Note, {
    name: "Resident \xB7 102",
    days: "2w",
    text: "He only shows up two months before elections. The rest of the time? Ghost.",
    raw: true
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "yellow",
    padding: "lg",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "dark",
    style: {
      background: 'var(--charcoal-900)',
      color: 'var(--accent)',
      borderColor: 'var(--charcoal-900)'
    }
  }, "The job"), /*#__PURE__*/React.createElement("h3", {
    className: "stophole-cta-h",
    style: {
      color: 'var(--charcoal-900)',
      marginTop: 10
    }
  }, "Represent ward 102. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--yellow-800)'
    }
  }, "Escalate failures. Report back.")), /*#__PURE__*/React.createElement("div", {
    className: "stophole-row stophole-row--gap",
    style: {
      marginTop: 12,
      color: 'var(--yellow-800)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 12
    }
  }, "SALARY R270k\u2013R650k/yr"), /*#__PURE__*/React.createElement("span", {
    className: "stophole-dot-sep",
    style: {
      background: 'var(--yellow-800)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 12
    }
  }, "TAXPAYER FUNDED")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "lg",
    fullWidth: true,
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    onClick: onSeeCandidates
  }, "Compare who wants the job")))));
};
window.CaseScreen = CaseScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CaseScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CasesScreen.jsx
try { (() => {
// Stophole — CasesScreen: history dashboard, dated rows + greeting

const CasesScreen = ({
  onOpenCase
}) => {
  const {
    Icon,
    VerdictBadge,
    Tag
  } = window.StopholeDesignSystem_1ea2d7;
  const Row = ({
    title,
    ward,
    verdict,
    label,
    time,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    className: "stophole-recent",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      flexShrink: 0,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "stophole-recent__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-recent__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "stophole-recent__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "WARD ", ward), /*#__PURE__*/React.createElement("span", {
    className: "stophole-dot-sep"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, time))), /*#__PURE__*/React.createElement(VerdictBadge, {
    verdict: verdict,
    size: "sm",
    label: label
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen"
  }, /*#__PURE__*/React.createElement(TopBar, {
    left: /*#__PURE__*/React.createElement(LogoMark, null),
    title: null,
    right: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      "aria-label": "search"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-greet"
  }, /*#__PURE__*/React.createElement(Tag, null, "3 cases \xB7 1 fixed"), /*#__PURE__*/React.createElement("h1", null, "Your watchlist, Lerato."), /*#__PURE__*/React.createElement("p", null, "Cases you opened or follow in Ward 102.")), /*#__PURE__*/React.createElement("div", {
    className: "stophole-daterow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-daterow__label"
  }, "This week"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-stack"
  }, /*#__PURE__*/React.createElement(Row, {
    title: "Rivonia Rd & Katherine",
    ward: "102",
    verdict: "red",
    label: "Replace",
    time: "MON",
    onClick: onOpenCase
  }), /*#__PURE__*/React.createElement(Row, {
    title: "Grayston off-ramp",
    ward: "102",
    verdict: "green",
    label: "Crew sent",
    time: "SUN",
    onClick: onOpenCase
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-daterow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-daterow__label"
  }, "Earlier"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-stack"
  }, /*#__PURE__*/React.createElement(Row, {
    title: "William Nicol on-ramp",
    ward: "103",
    verdict: "amber",
    label: "Logged",
    time: "12 MAY",
    onClick: onOpenCase
  }), /*#__PURE__*/React.createElement(Row, {
    title: "Marlboro Dr dip",
    ward: "105",
    verdict: "amber",
    label: "Logged",
    time: "03 MAY",
    onClick: onOpenCase
  }), /*#__PURE__*/React.createElement(Row, {
    title: "Katherine St crack",
    ward: "102",
    verdict: "green",
    label: "Fixed",
    time: "28 APR",
    onClick: onOpenCase
  })))));
};
window.CasesScreen = CasesScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CasesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeScreen.jsx
try { (() => {
// Stophole — HomeScreen: the signature pothole-input entry.

const HomeScreen = ({
  onSnap,
  onPickRecent,
  onSeeCandidates
}) => {
  const {
    Button,
    Icon,
    VerdictBadge,
    Tag,
    PotholeInput,
    Card
  } = window.StopholeDesignSystem_1ea2d7;
  const PotholeThumb = ({
    verdict
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      flexShrink: 0,
      borderRadius: '52% 48% 56% 44% / 48% 56% 44% 52%',
      background: 'radial-gradient(120% 120% at 50% 30%, #3a3834 0%, #211f1c 50%, #0e0c0a 100%)',
      boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.6), inset 0 -3px 8px rgba(0,0,0,0.4)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 14,
      height: 14,
      borderRadius: '999px',
      background: verdict === 'green' ? 'var(--status-verified)' : verdict === 'amber' ? 'var(--accent)' : 'var(--status-flagged)',
      border: '2px solid var(--surface-card)'
    }
  }));
  const RecentCase = ({
    title,
    ward,
    days,
    verdict,
    label,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    className: "stophole-recent",
    onClick: onClick
  }, /*#__PURE__*/React.createElement(PotholeThumb, {
    verdict: verdict
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-recent__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-recent__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "stophole-recent__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "WARD ", ward), /*#__PURE__*/React.createElement("span", {
    className: "stophole-dot-sep"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sh-data",
    style: {
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, days, " DAYS OPEN")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(VerdictBadge, {
    verdict: verdict,
    size: "sm",
    label: label
  }))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    style: {
      color: 'var(--text-subtle)'
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen"
  }, /*#__PURE__*/React.createElement(TopBar, {
    left: /*#__PURE__*/React.createElement(LogoMark, null),
    title: null,
    right: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      "aria-label": "notifications"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      className: "stophole-dot"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-home__intro"
  }, /*#__PURE__*/React.createElement(Tag, null, "Sandton \xB7 Ward 102"), /*#__PURE__*/React.createElement("h1", {
    className: "stophole-display"
  }, "Snap the ", /*#__PURE__*/React.createElement("span", {
    className: "sh-mark"
  }, "pothole"), ".", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "sh-muted"
  }, "Find the asshole."))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-home__hole"
  }, /*#__PURE__*/React.createElement(PotholeInput, {
    width: 300,
    height: 200,
    onSnap: onSnap
  }), /*#__PURE__*/React.createElement("button", {
    className: "stophole-pill-input",
    onClick: onSnap
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "or paste an address\u2026"))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-home__recent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-row stophole-row--between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-eyebrow"
  }, "Near you"), /*#__PURE__*/React.createElement("button", {
    className: "stophole-link"
  }, "See all ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-stack",
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(RecentCase, {
    title: "Rivonia Rd & Katherine",
    ward: "102",
    days: 102,
    verdict: "red",
    label: "Repeat failure",
    onClick: () => onPickRecent?.()
  }), /*#__PURE__*/React.createElement(RecentCase, {
    title: "William Nicol on-ramp",
    ward: "103",
    days: 41,
    verdict: "amber",
    label: "Logged, no team",
    onClick: () => onPickRecent?.()
  }), /*#__PURE__*/React.createElement(RecentCase, {
    title: "Grayston off-ramp",
    ward: "102",
    days: 6,
    verdict: "green",
    label: "Crew dispatched",
    onClick: () => onPickRecent?.()
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "lg",
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "dark",
    style: {
      background: 'var(--charcoal-700)',
      color: 'var(--grey-150)',
      borderColor: 'transparent'
    }
  }, "Election 2026"), /*#__PURE__*/React.createElement("h3", {
    className: "stophole-cta-h"
  }, "Compare the people ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey-400)'
    }
  }, "applying for the job.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    fullWidth: true,
    onClick: onSeeCandidates
  }, "See ward 102 candidates")))));
};
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Shared.jsx
try { (() => {
// Stophole — shared bits: MiniMap, CameraOverlay, SuccessScreen, Splash

const MiniMap = ({
  pinColor = 'var(--status-flagged)'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "stophole-map-grid"
}), /*#__PURE__*/React.createElement("div", {
  className: "stophole-map-road",
  style: {
    top: '38%',
    left: 0,
    right: 0,
    height: 10
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "stophole-map-road",
  style: {
    top: 0,
    bottom: 0,
    left: '58%',
    width: 10
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "stophole-map-road",
  style: {
    top: '38%',
    left: '58%',
    width: 60,
    height: 6,
    transform: 'rotate(34deg)',
    transformOrigin: 'left center'
  }
}), /*#__PURE__*/React.createElement("svg", {
  className: "stophole-map-pin",
  style: {
    top: '40%',
    left: '58%',
    color: pinColor
  },
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "9",
  r: "2.6",
  fill: "#fff"
})));
const CameraOverlay = ({
  onCapture,
  onClose
}) => {
  const {
    Icon
  } = window.StopholeDesignSystem_1ea2d7;
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-camera"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-camera__view"
  }, /*#__PURE__*/React.createElement("button", {
    className: "stophole-camera__close",
    onClick: onClose,
    "aria-label": "close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "stophole-camera__hint"
  }, "Frame the pothole \xB7 tap to capture"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-camera__reticle"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -1,
      left: -1,
      width: 22,
      height: 22,
      borderTop: '4px solid var(--accent)',
      borderLeft: '4px solid var(--accent)',
      borderRadius: '12px 0 0 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -1,
      right: -1,
      width: 22,
      height: 22,
      borderTop: '4px solid var(--accent)',
      borderRight: '4px solid var(--accent)',
      borderRadius: '0 12px 0 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -1,
      left: -1,
      width: 22,
      height: 22,
      borderBottom: '4px solid var(--accent)',
      borderLeft: '4px solid var(--accent)',
      borderRadius: '0 0 0 12px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: -1,
      right: -1,
      width: 22,
      height: 22,
      borderBottom: '4px solid var(--accent)',
      borderRight: '4px solid var(--accent)',
      borderRadius: '0 0 12px 0'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-camera__bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "stophole-camera__shutter",
    onClick: onCapture,
    "aria-label": "capture"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 26
  }))));
};
const SuccessScreen = ({
  onContinue
}) => {
  const {
    Button,
    Icon,
    Tag
  } = window.StopholeDesignSystem_1ea2d7;
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-success__check"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 48,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement(Tag, {
    tone: "success"
  }, "Case #SH-1042 opened"), /*#__PURE__*/React.createElement("h1", null, "Logged. Mapped.", /*#__PURE__*/React.createElement("br", null), "Owner named."), /*#__PURE__*/React.createElement("p", null, "We pinned it to ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "Ward 102"), " and matched the councillor accountable right now."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 280,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    onClick: onContinue
  }, "See who owns this"))));
};
const SplashScreen = ({
  onEnter
}) => {
  const {
    Icon
  } = window.StopholeDesignSystem_1ea2d7;
  React.useEffect(() => {
    const t = setTimeout(() => onEnter?.(), 1700);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen",
    onClick: onEnter,
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-splash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-splash__grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-splash__mark"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "56",
    height: "56",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8",
    stroke: "var(--accent)",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11.2",
    y: "1.5",
    width: "1.6",
    height: "4",
    rx: "0.8",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11.2",
    y: "18.5",
    width: "1.6",
    height: "4",
    rx: "0.8",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "1.5",
    y: "11.2",
    width: "4",
    height: "1.6",
    rx: "0.8",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18.5",
    y: "11.2",
    width: "4",
    height: "1.6",
    rx: "0.8",
    fill: "var(--accent)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-splash__word",
    style: {
      color: 'var(--grey-50)'
    }
  }, "STOP", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "HOLE")), /*#__PURE__*/React.createElement("div", {
    className: "stophole-splash__tag"
  }, "Stop the assholes", /*#__PURE__*/React.createElement("br", null), "responsible for the potholes"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-splash__loader"
  })));
};
Object.assign(window, {
  MiniMap,
  CameraOverlay,
  SuccessScreen,
  SplashScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Shell.jsx
try { (() => {
// Stophole — phone-frame app shell (used by ui_kits/app/index.html)
// Loads after _ds_bundle.js. Exposes <PhoneShell /> on window.

const {
  Button,
  Icon,
  VerdictBadge,
  Tag,
  StatTile,
  Card,
  DotScore,
  PotholeInput
} = window.StopholeDesignSystem_1ea2d7;

// -----------------------------------------------------------
// Tiny utilities
// -----------------------------------------------------------
const cn = (...xs) => xs.filter(Boolean).join(' ');
function PhoneFrame({
  children,
  theme = 'light'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-phone",
    "data-theme": theme
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-phone__bezel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-phone__notch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-phone__screen"
  }, children)));
}
function StatusBar({
  theme
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-status"
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-status__icons"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "10",
    viewBox: "0 0 16 10",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6",
    width: "3",
    height: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "3",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "0",
    width: "3",
    height: "10"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      marginLeft: 4
    }
  }, "LTE"), /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "11",
    viewBox: "0 0 22 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "18",
    height: "10",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "3",
    width: "1.5",
    height: "5",
    rx: "0.5",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "14",
    height: "7",
    rx: "1",
    fill: "currentColor",
    stroke: "none"
  }))));
}

// -----------------------------------------------------------
// TopBar — small charcoal logo mark + label + right icon
// -----------------------------------------------------------
function TopBar({
  left,
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-topbar__l"
  }, left), /*#__PURE__*/React.createElement("div", {
    className: "stophole-topbar__t"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "stophole-topbar__r"
  }, right));
}
function LogoMark({
  size = 28
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 7,
      background: 'var(--charcoal-900)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size * 0.62,
    height: size * 0.62,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7",
    stroke: "var(--accent)",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2.6",
    fill: "var(--accent)"
  })));
}

// -----------------------------------------------------------
// Bottom tab bar
// -----------------------------------------------------------
function TabBar({
  active,
  onNav
}) {
  const items = [{
    id: 'home',
    label: 'Snap',
    icon: 'camera'
  }, {
    id: 'cases',
    label: 'Cases',
    icon: 'list'
  }, {
    id: 'vote',
    label: 'Vote',
    icon: 'vote'
  }, {
    id: 'profile',
    label: 'You',
    icon: 'user'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-tabbar"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: cn('stophole-tab', active === it.id && 'is-active'),
    onClick: () => onNav?.(it.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, it.label))));
}
Object.assign(window, {
  PhoneFrame,
  StatusBar,
  TopBar,
  LogoMark,
  TabBar,
  cn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/VoteScreen.jsx
try { (() => {
// Stophole — VoteScreen: where & when to vote (the payoff)

const VoteScreen = ({
  onBack
}) => {
  const {
    Button,
    Icon,
    Tag,
    StatTile,
    Card
  } = window.StopholeDesignSystem_1ea2d7;
  return /*#__PURE__*/React.createElement("div", {
    className: "stophole-screen"
  }, /*#__PURE__*/React.createElement(TopBar, {
    left: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      onClick: onBack,
      "aria-label": "back"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22
    })),
    title: /*#__PURE__*/React.createElement("span", null, "WHERE & WHEN"),
    right: /*#__PURE__*/React.createElement("button", {
      className: "stophole-iconbtn",
      "aria-label": "share"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "share",
      size: 18
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "stophole-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-vote__hero"
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "dark",
    style: {
      background: 'var(--charcoal-700)',
      color: 'var(--accent)',
      borderColor: 'transparent'
    }
  }, "Local Election"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stophole-vote__date"
  }, "04 NOV"), /*#__PURE__*/React.createElement("div", {
    className: "sh-data",
    style: {
      color: 'var(--grey-400)',
      fontSize: 13,
      marginTop: 4
    }
  }, "2026 \xB7 WEDNESDAY")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh-data",
    style: {
      color: 'var(--accent)',
      fontSize: 30
    }
  }, "156"), /*#__PURE__*/React.createElement("div", {
    className: "sh-data",
    style: {
      color: 'var(--grey-400)',
      fontSize: 11
    }
  }, "DAYS TO GO")))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-block",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sh-eyebrow"
  }, "Your voting station"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-station"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-station__icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stophole-person__name"
  }, "Rivonia Primary School"), /*#__PURE__*/React.createElement("div", {
    className: "stophole-person__role"
  }, "9 Mutual Rd, Rivonia \xB7 Ward 102"), /*#__PURE__*/React.createElement("div", {
    className: "sh-data",
    style: {
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "OPEN 07:00\u201321:00 \xB7 1.2KM AWAY"))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__map",
    style: {
      height: 150,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(MiniMap, {
    pinColor: "var(--status-verified)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "stophole-case__stats",
    style: {
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "You are",
    value: "Registered",
    tone: "soft",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Ward",
    value: "102",
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 18
    })
  }, "Remind me on the day"))));
};
window.VoteScreen = VoteScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/VoteScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DotScore = __ds_scope.DotScore;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.PotholeInput = __ds_scope.PotholeInput;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.VerdictBadge = __ds_scope.VerdictBadge;

})();
