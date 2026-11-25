/**
 * Scroll-driven animations on the page's scroll timeline.
 *
 * A scroll effect written as "styles for a given scrollY" is sampled once into
 * keyframes; the browser then plays them straight off the scroll position, in
 * step with the finger at the screen's full refresh rate, with no script
 * running while the page scrolls. On iOS this is the difference between
 * smooth and choppy: native scrolling runs separately from JavaScript, so
 * effects driven from scroll events always trail behind.
 *
 * Supported in Safari 26+ and Chrome 115+. Where it isn't, `scrollDriven` is
 * false and components keep their scroll-event fallback.
 */

type Props = Record<string, string>;

// (Not in TypeScript's DOM types yet.)
const TL = (window as unknown as { ScrollTimeline?: new (o: { source: Element; axis: string }) => AnimationTimeline })
  .ScrollTimeline;

// ?off=sda (see perfProbe.ts) forces the scroll-event fallback, for comparing.
export const scrollDriven = Boolean(TL) && !/[?&]off=[^&]*\bsda\b/.test(location.search);

let timeline: AnimationTimeline | null = null;
const pageTimeline = () => (TL ? (timeline ??= new TL({ source: document.documentElement, axis: 'block' })) : null);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const maxScroll = () => document.documentElement.scrollHeight - innerHeight;

/** An element's top in page coordinates. */
export const docTop = (el: Element) => el.getBoundingClientRect().top + scrollY;

const OPTS = { fill: 'both', duration: 'auto', easing: 'linear' } as const;

const apply = (el: Element, prev: Animation | null, kf: Keyframe[]) => {
  if (prev) {
    (prev.effect as KeyframeEffect).setKeyframes(kf);
    return prev;
  }
  return el.animate(kf, { ...OPTS, timeline: pageTimeline() } as unknown as KeyframeAnimationOptions);
};

/**
 * Sample `styles(scrollY)` between scrollY = y0 and y1 into a scroll-driven
 * animation (holding the end values outside that range). Pass the previous
 * animation back in to update it after a layout change.
 */
export function bake(el: Element, prev: Animation | null, y0: number, y1: number, styles: (y: number) => Props, samples = 120) {
  const max = maxScroll();
  if (!TL || max <= 0) return prev;
  const kf: Keyframe[] = [{ ...styles(y0), offset: 0 }];
  let last = 0;
  for (let s = 0; s <= samples; s++) {
    const y = y0 + ((y1 - y0) * s) / samples;
    const o = clamp01(y / max);
    if (o < last) continue;
    last = o;
    kf.push({ ...styles(y), offset: o });
  }
  kf.push({ ...styles(y1), offset: 1 });
  return apply(el, prev, kf);
}

/** `inside` while y0 ≤ scrollY < y1, `outside` otherwise, switching instantly. */
export function bakeStep(el: Element, prev: Animation | null, y0: number, y1: number, outside: Props, inside: Props) {
  const max = maxScroll();
  if (!TL || max <= 0) return prev;
  const o0 = clamp01(y0 / max);
  const o1 = Math.max(o0, clamp01(y1 / max));
  return apply(el, prev, [
    { ...outside, offset: 0 },
    { ...outside, offset: o0 },
    { ...inside, offset: o0 },
    { ...inside, offset: o1 },
    { ...outside, offset: o1 },
    { ...outside, offset: 1 },
  ]);
}

/**
 * Keep a section's scroll-driven animations live only while it is on or near
 * the screen. They are tied to the whole page's scroll, so otherwise the
 * browser would update every one of them on every frame of every scroll,
 * anywhere on the page. Returns a function to call after (re)baking.
 */
export function whileNear(target: Element, anims: () => (Animation | null | undefined)[]) {
  let near = false;
  const apply = () => {
    for (const a of anims()) {
      if (!a) continue;
      if (near) {
        if (a.playState !== 'running') a.play();
      } else if (a.playState !== 'idle') a.cancel();
    }
  };
  // A screen's height of margin either side: live well before it shows.
  new IntersectionObserver(
    ([e]) => {
      near = e.isIntersecting;
      apply();
    },
    { rootMargin: '100% 0px' },
  ).observe(target);
  return apply;
}

/**
 * Call `start` once the page has settled — fonts loaded and the hero's
 * doodles landed — or as soon as `target` comes within a screen, whichever
 * is first. Keeps set-up work off the main thread while the hero animates.
 */
export function whenSettledOrNear(target: Element, start: () => void) {
  let done = false;
  let near = false;
  const go = () => {
    if (done) return;
    done = true;
    io.disconnect();
    removeEventListener('scroll', onScroll);
    start();
  };
  // "Near" only counts once the page has been scrolled (or opened part-way
  // down): while it is still loading, the page is shorter than it will be,
  // so sections below the hero can look closer than they are.
  const onScroll = () => near && go();
  const io = new IntersectionObserver(
    ([e]) => {
      near = e.isIntersecting;
      if (near && scrollY > 0) go();
    },
    { rootMargin: '100% 0px' },
  );
  io.observe(target);
  addEventListener('scroll', onScroll, { passive: true });
  (document.fonts?.ready ?? Promise.resolve()).then(() => setTimeout(go, 7500));
}

/**
 * Run `cb` (see whenSettledOrNear for when it first runs, given a `target`)
 * and again, debounced, whenever the page's layout may have moved: the page
 * resized or its content changed height.
 */
export function onLayout(cb: () => void, target?: Element) {
  if (target) {
    whenSettledOrNear(target, () => onLayout(cb));
    return;
  }
  let t = 0;
  const run = () => {
    clearTimeout(t);
    t = window.setTimeout(cb, 150);
  };
  // ResizeObserver reports once straight away; cb() below already covers that.
  let first = true;
  new ResizeObserver(() => {
    if (first) first = false;
    else run();
  }).observe(document.body);
  // Phones resize the window whenever the toolbar shows or hides, i.e. on
  // every change of scroll direction. Rebuilding then would hitch mid-swipe,
  // so only a real width change (rotation, desktop resize) counts.
  let width = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === width) return;
    width = innerWidth;
    run();
  });
  // Fonts still loading change text sizes; once loaded, no need to rerun.
  if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(run);
  cb();
}
