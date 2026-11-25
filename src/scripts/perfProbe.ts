/**
 * On-device scroll diagnostics. Only loads with ?perf in the address.
 *
 *   /?perf                 live frame meter + a per-section report (tap the meter)
 *   /?perf&off=a,b         the same with effects switched off, to compare:
 *        images  blend  blur  shadows  willchange  css   (CSS animations)
 *        dome    tunnel  reel  cards   sda (scroll-driven animations)
 *
 * A frame counts as dropped when it takes over 1.5x the screen's normal frame
 * time (measured), so it works on 60 Hz and 120 Hz screens alike.
 */

const off = new Set((new URLSearchParams(location.search).get('off') || '').split(',').filter(Boolean));

const css: Record<string, string> = {
  images: 'img,picture,video{visibility:hidden!important}',
  blend: '*{mix-blend-mode:normal!important}',
  blur: '*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}',
  shadows: '*{box-shadow:none!important;text-shadow:none!important;filter:none!important}',
  willchange: '*{will-change:auto!important}',
  css: '*{animation:none!important;transition:none!important}',
  dome: '.xp__dome,.xp__rocket{display:none!important}',
  tunnel: '[data-tube]{display:none!important}',
  reel: '[data-reel-frame]{display:none!important}',
  cards: '[data-stack-item] .pc__media{visibility:hidden!important}',
};
const style = document.createElement('style');
style.textContent = [...off].map((k) => css[k] || '').join('\n');
document.head.appendChild(style);

// Sections to report on, top to bottom.
const SECTIONS: [string, string][] = [
  ['hero', '.hero'],
  ['about', '#about'],
  ['tunnel', '[data-tunnel]'],
  ['reel', '[data-reel]'],
  ['work', '#work'],
  ['rocket', '[data-xp]'],
  ['services', '#services'],
  ['approach', '.approach'],
  ['clients', '.clients'],
  ['reviews', '.tst'],
  ['faq', '.faq'],
  ['contact', '#contact'],
  ['footer', 'footer'],
];
let marks: [string, number][] = [];
const measure = () => {
  marks = SECTIONS.map(([n, s]) => {
    const el = document.querySelector(s);
    return el ? ([n, el.getBoundingClientRect().top + scrollY] as [string, number]) : null;
  })
    .filter((m): m is [string, number] => m !== null)
    .sort((a, b) => a[1] - b[1]);
};
measure();
addEventListener('load', measure);
setTimeout(measure, 3000);
const sectionAt = (y: number) => {
  let n = 'top';
  for (const [k, v] of marks) if (y + innerHeight / 2 >= v) n = k;
  return n;
};

// Frame log.
type Stat = { frames: number; dropped: number; worst: number };
const stats = new Map<string, Stat>();
const recent: number[] = [];
let base = 1000 / 60;
let last = 0;
let lastY = scrollY;
const tick = (now: number) => {
  if (last) {
    const dt = now - last;
    recent.push(dt);
    if (recent.length > 240) recent.shift();
    // The screen's normal frame time: a low percentile of recent frames.
    const sorted = [...recent].sort((a, b) => a - b);
    base = sorted[Math.floor(sorted.length * 0.2)] || base;
    // Only count frames while the page is actually moving.
    if (scrollY !== lastY) {
      const s = sectionAt(scrollY);
      const st = stats.get(s) ?? { frames: 0, dropped: 0, worst: 0 };
      st.frames++;
      if (dt > base * 1.5) st.dropped++;
      st.worst = Math.max(st.worst, dt);
      stats.set(s, st);
    }
  }
  lastY = scrollY;
  last = now;
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);

// UI: a pill with the live numbers; tap for the per-section report.
const box = document.createElement('div');
box.setAttribute(
  'style',
  'position:fixed;left:8px;bottom:8px;z-index:9999;max-width:calc(100vw - 16px);padding:8px 12px;border-radius:12px;background:rgba(0,0,0,.85);color:#c6f432;font:600 12px/1.45 ui-monospace,Menlo,monospace;white-space:pre;pointer-events:auto',
);
document.body.appendChild(box);
let open = false;
box.addEventListener('click', () => {
  open = !open;
  draw();
});
const draw = () => {
  const fps = Math.round(1000 / base);
  const win = recent.slice(-60);
  const drops = win.filter((d) => d > base * 1.5).length;
  let text = `${fps} Hz · dropped ${drops}/60 · ${sectionAt(scrollY)}${off.size ? ` · off: ${[...off].join(',')}` : ''}`;
  if (open) {
    text += '\n\nsection    frames  dropped  worst';
    for (const [n] of [['top', 0] as [string, number], ...marks]) {
      const st = stats.get(n);
      if (!st) continue;
      text += `\n${n.padEnd(10)} ${String(st.frames).padStart(6)}  ${`${Math.round((st.dropped / st.frames) * 100)}%`.padStart(7)}  ${String(Math.round(st.worst)).padStart(4)}ms`;
    }
    text += '\n\n(tap to close)';
  }
  box.textContent = text;
};
setInterval(draw, 500);

export {};
