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
    var rows = raw.split(';').map(function (r) { return r.split(',').map(function (n) { return parseInt(n, 10) || 0; }); });
    var h = rows.length;
    var w = rows[0] ? rows[0].length : 0;
    var W = w * cell, H = h * cell;
    var parts = [];
    parts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" style="background:' + bg + ';display:block">');
    parts.push('<g fill="' + fg + '">');
    var rd = cell * radius;
    for (var r = 0; r < h; r++) {
      for (var c = 0; c < w; c++) {
        var id = rows[r][c];
        if (!id) continue;
        var x = c * cell, y = r * cell;
        if (id === 1) {
          parts.push('<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" rx="' + rd + '"/>');
        } else if (id === 2) {
          parts.push('<circle cx="' + (x + cell / 2) + '" cy="' + (y + cell / 2) + '" r="' + (cell / 2) + '"/>');
        } else if (id === 3) { // top-half (flat down)
          parts.push('<path d="M' + x + ' ' + (y + cell / 2) + ' a' + (cell / 2) + ' ' + (cell / 2) + ' 0 0 1 ' + cell + ' 0 z"/>');
        } else if (id === 4) { // right-half (flat left)
          parts.push('<path d="M' + (x + cell / 2) + ' ' + y + ' a' + (cell / 2) + ' ' + (cell / 2) + ' 0 0 1 0 ' + cell + ' z"/>');
        } else if (id === 5) { // bottom-half (flat up)
          parts.push('<path d="M' + x + ' ' + (y + cell / 2) + ' a' + (cell / 2) + ' ' + (cell / 2) + ' 0 0 0 ' + cell + ' 0 z"/>');
        } else if (id === 6) { // left-half (flat right)
          parts.push('<path d="M' + (x + cell / 2) + ' ' + y + ' a' + (cell / 2) + ' ' + (cell / 2) + ' 0 0 0 0 ' + cell + ' z"/>');
        } else if (id === 7) { // quarter tl
          parts.push('<path d="M' + x + ' ' + y + ' h' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 -' + cell + ' ' + cell + ' z"/>');
        } else if (id === 8) { // quarter tr
          parts.push('<path d="M' + (x + cell) + ' ' + y + ' v' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 -' + cell + ' -' + cell + ' z"/>');
        } else if (id === 9) { // quarter br
          parts.push('<path d="M' + (x + cell) + ' ' + (y + cell) + ' h-' + cell + ' a' + cell + ' ' + cell + ' 0 0 0 ' + cell + ' -' + cell + ' z"/>');
        } else if (id === 10) { // quarter bl
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
  window.StopholeGlyph = { build: build, init: init };
})();
