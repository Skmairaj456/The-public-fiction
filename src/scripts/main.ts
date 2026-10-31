import Lenis from 'lenis';

const root = document.documentElement;
const reduceMotion = root.classList.contains('reduce-motion');
const introRunning = root.classList.contains('has-intro');
const INTRO_MS = 1500;

/* ---------------------------------------------------------------------------
   Smooth scroll (skipped for reduced motion and touch-first devices keep native feel)
   --------------------------------------------------------------------------- */
let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.11, anchors: { offset: -80 }, autoRaf: true });
}

/* ---------------------------------------------------------------------------
   Scroll-triggered reveals
   --------------------------------------------------------------------------- */
const revealSelector = '[data-reveal], [data-split], [data-reveal-img], [data-draw]';
const revealTargets = document.querySelectorAll<HTMLElement>(revealSelector);

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-in'));
} else {
  const startedAt = performance.now();
  // An element fully hidden by its own clip-path never "intersects", so image
  // curtains are observed through their parent instead.
  const pending = new Map<Element, HTMLElement[]>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const els = pending.get(entry.target) ?? [];
        io.unobserve(entry.target);
        pending.delete(entry.target);
        // Hold above-the-fold reveals until the brand intro has lifted.
        const wait = introRunning ? Math.max(0, INTRO_MS - (performance.now() - startedAt)) : 0;
        const reveal = () => els.forEach((el) => el.classList.add('is-in'));
        if (wait) setTimeout(reveal, wait);
        else reveal();
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  revealTargets.forEach((el) => {
    const watched = el.hasAttribute('data-reveal-img') && el.parentElement ? el.parentElement : el;
    const list = pending.get(watched);
    if (list) list.push(el);
    else {
      pending.set(watched, [el]);
      io.observe(watched);
    }
  });
}

/* ---------------------------------------------------------------------------
   Header: solid once scrolled, hides on the way down, returns on the way up
   --------------------------------------------------------------------------- */
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = window.scrollY;
let menuOpen = false;

function onScroll() {
  const y = window.scrollY;
  if (header) {
    header.dataset.scrolled = String(y > 24);
    const goingDown = y > lastY && y > 320;
    header.dataset.hidden = String(goingDown && !menuOpen);
  }
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------------------------
   Mobile menu
   --------------------------------------------------------------------------- */
const menu = document.querySelector<HTMLElement>('[data-menu]');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');

function setMenu(open: boolean) {
  if (!menu || !openBtn) return;
  menuOpen = open;
  openBtn.setAttribute('aria-expanded', String(open));
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    closeBtn?.focus();
  } else {
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
    lenis?.start();
    const done = () => {
      if (!menuOpen) menu.hidden = true;
    };
    reduceMotion ? done() : setTimeout(done, 800);
    openBtn.focus();
  }
}

openBtn?.addEventListener('click', () => setMenu(true));
closeBtn?.addEventListener('click', () => setMenu(false));
menu?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
  if (e.key === 'Tab') {
    // Keep focus inside the open menu.
    const focusables = menu.querySelectorAll<HTMLElement>('a[href], button');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => e.matches && menuOpen && setMenu(false));

/* ---------------------------------------------------------------------------
   Back to top
   --------------------------------------------------------------------------- */
document.querySelectorAll<HTMLAnchorElement>('[data-scroll-top]').forEach((a) =>
  a.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
    (document.getElementById('main') as HTMLElement | null)?.focus({ preventScroll: true });
  }),
);

/* ---------------------------------------------------------------------------
   Cursor label for project media (fine pointers only)
   --------------------------------------------------------------------------- */
const cursor = document.querySelector<HTMLElement>('[data-cursor-el]');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursor && finePointer && !reduceMotion) {
  const label = cursor.querySelector('span')!;
  let x = 0,
    y = 0,
    cx = 0,
    cy = 0,
    raf = 0;

  const tick = () => {
    cx += (x - cx) * 0.2;
    cy += (y - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
  };
  window.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true },
  );
  document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
    el.addEventListener('pointerenter', () => {
      label.textContent = el.dataset.cursor || 'View';
      cursor.classList.add('is-active');
    });
    el.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  });
}

/* ---------------------------------------------------------------------------
   Parallax: data-parallax="0.12" moves an element against the scroll
   --------------------------------------------------------------------------- */
const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
if (parallaxEls.length && !reduceMotion) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of parallaxEls) {
      const parent = el.parentElement ?? el;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) continue;
      const speed = parseFloat(el.dataset.parallax || '0.1');
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}%, 0)`;
    }
    ticking = false;
  };
  const request = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}

export {};
