/**
 * ============================================================================
 *  REAL CONTENT — fill this file in.
 * ============================================================================
 *
 * Everything the site needs from you that only you can supply lives here:
 * client logos, testimonials, case-study facts, starting prices, the team and
 * the studio location. Nothing in this file is invented: every entry starts as
 * a placeholder that begins with "TODO" (or a price written as "R__").
 *
 * How placeholders behave
 *  - `npm run dev` (your local preview): placeholders ARE shown, so you can see
 *    where real content will go.
 *  - Live site (`npm run build`): anything still marked TODO / R__ is hidden
 *    automatically. A section with no real entries disappears entirely, so the
 *    live site never shows "TODO" to a visitor.
 *  - To preview placeholders on a live build, set PUBLIC_SHOW_PLACEHOLDERS=true.
 *
 * To fill something in: replace the TODO text with the real value. That's it.
 * Only add clients, quotes and results you have permission to publish.
 */
import type { ImageMetadata } from 'astro';

// ---------------------------------------------------------------------------
// Helpers (no need to edit)
// ---------------------------------------------------------------------------
export const showPlaceholders = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_PLACEHOLDERS === 'true';

/** True while a value is still a placeholder ("TODO…" or contains "__"). */
export const isTodo = (v: string | undefined | null) => !v || /^\s*TODO\b/i.test(v) || v.includes('__');

/** The value when it's real; the placeholder in previews; undefined on the live site. */
export const filled = (v: string | undefined | null): string | undefined => {
  if (!v) return undefined;
  if (!isTodo(v)) return v;
  return showPlaceholders ? v : undefined;
};

/** Keep only entries whose key field is real (or everything, in previews). */
export const realOnly = <T>(list: T[], key: (item: T) => string | undefined) =>
  showPlaceholders ? list : list.filter((item) => !isTodo(key(item)));

// ---------------------------------------------------------------------------
// 1. Client logos (shown under "Good people. Ambitious ideas.")
//    4–8 logos work best. Add a logo by importing it from src/assets, e.g.
//      import acme from '@/assets/clients/acme.svg';
//    then set `logo: acme`. Without a logo the name is set in type.
//    Logos show in greyscale and turn to colour on hover.
// ---------------------------------------------------------------------------
export interface ClientLogo {
  name: string;
  logo?: ImageMetadata;
  url?: string;
}
export const clientLogos: ClientLogo[] = [
  { name: 'TODO: client name 1' },
  { name: 'TODO: client name 2' },
  { name: 'TODO: client name 3' },
  { name: 'TODO: client name 4' },
  { name: 'TODO: client name 5' },
  { name: 'TODO: client name 6' },
];

// ---------------------------------------------------------------------------
// 2. Testimonials (2–3 cards). Only genuine quotes, with permission.
//    `photo` is optional: import a square head shot from src/assets.
// ---------------------------------------------------------------------------
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: ImageMetadata;
}
export const testimonials: Testimonial[] = [
  {
    quote: 'TODO: replace with a real client quote (one or two sentences).',
    name: 'TODO: client full name',
    role: 'TODO: their role',
    company: 'TODO: their company',
  },
  {
    quote: 'TODO: replace with a real client quote.',
    name: 'TODO: client full name',
    role: 'TODO: their role',
    company: 'TODO: their company',
  },
  {
    quote: 'TODO: replace with a real client quote.',
    name: 'TODO: client full name',
    role: 'TODO: their role',
    company: 'TODO: their company',
  },
];

// ---------------------------------------------------------------------------
// 3. Case studies: one entry per project, keyed by the file name in
//    src/content/work/ (e.g. half-light.md → 'half-light').
//    Client name and result also appear on the work cards.
// ---------------------------------------------------------------------------
export interface CaseFacts {
  /** Who it was for (only with the client's approval). */
  client: string;
  /** The brief, in one or two lines. */
  brief: string;
  /** What we did, in one or two lines. */
  whatWeDid: string;
  /** The key result, ideally a metric, e.g. "+38% online sales in 6 weeks". */
  result: string;
}
const todoCase = (project: string): CaseFacts => ({
  client: `TODO: client name for ${project}`,
  brief: `TODO: the brief for ${project}, in one or two lines`,
  whatWeDid: `TODO: what we did on ${project}, in one or two lines`,
  result: `TODO: key result for ${project}, e.g. +__% sales`,
});
export const caseStudies: Record<string, CaseFacts> = {
  'half-light': todoCase('Half Light'),
  'loud-quiet': todoCase('Loud, Quiet'),
  'night-shift': todoCase('Night Shift'),
  'slow-pour': todoCase('Slow Pour'),
  'sit-down': todoCase('Sit Down'),
  'signal-to-noise': todoCase('Signal to Noise'),
  'after-hours': todoCase('After Hours'),
  'field-notes': todoCase('Field Notes'),
};

// ---------------------------------------------------------------------------
// 4. Starting prices, one per service (keyed by the slug in services.ts).
//    Write the amount as it should read, e.g. 'R25 000'.
// ---------------------------------------------------------------------------
export const startingFrom: Record<string, string> = {
  'brand-strategy-identity': 'R__',
  'marketing-advertising': 'R__',
  'social-media-marketing': 'R__ / month',
  'photography-film': 'R__',
  'creative-production': 'R__',
  'events-experiences': 'R__',
  'digital-design': 'R__',
};

/** A typical project starting point, used in the budget FAQ answer. */
export const typicalProjectFrom = 'R__';

// ---------------------------------------------------------------------------
// 5. The team (Studio page). Square photos work best: import from src/assets.
// ---------------------------------------------------------------------------
export interface TeamMember {
  name: string;
  role: string;
  /** One line about them. Optional. */
  line?: string;
  photo?: ImageMetadata;
}
export const team: TeamMember[] = [
  { name: 'TODO: full name', role: 'TODO: e.g. Founder & Creative Director', line: 'TODO: one line about them' },
  { name: 'TODO: full name', role: 'TODO: e.g. Head of Social', line: 'TODO: one line about them' },
  { name: 'TODO: full name', role: 'TODO: e.g. Producer', line: 'TODO: one line about them' },
];

// ---------------------------------------------------------------------------
// 6. Where the studio is (Studio page, contact details and search data).
// ---------------------------------------------------------------------------
export const studioLocation = {
  /** City and country, e.g. 'Cape Town, South Africa'. */
  city: 'TODO: city, country',
  /** One line on how/where you work, e.g. 'Studio in Woodstock. Working with brands across Africa and the UK.' */
  note: 'TODO: one line on where you work and who with',
};

/** The real city only (never a placeholder): used in search data and llms.txt. */
export const realCity = () => (isTodo(studioLocation.city) ? undefined : studioLocation.city);

// ---------------------------------------------------------------------------
// 7. Showreel. Set `showReel: true` and give a video URL (a file in /public,
//    e.g. '/showreel.mp4', or a full URL to an MP4) to turn on the
//    "Play reel" button. While false, no "Play reel" button is shown.
// ---------------------------------------------------------------------------
export const showreel = {
  showReel: false,
  /** e.g. '/showreel.mp4' */
  src: '',
  /** Optional poster image in /public, e.g. '/showreel-poster.jpg' */
  poster: '',
  /** Describe the video for people who can't watch it. */
  title: 'The Public Fiction showreel',
};
