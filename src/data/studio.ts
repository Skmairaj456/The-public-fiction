/**
 * Approach, clients and testimonials.
 *
 * CLIENTS and TESTIMONIALS are intentionally empty. Only add real clients that
 * have agreed to be listed, and real feedback with the person's permission.
 * Sections with no entries are hidden on the live site automatically.
 */
import type { ImageMetadata } from 'astro';

/** The five-part working process (Section 05). */
export const process = [
  {
    number: '01',
    title: 'Discover',
    text: 'Understand the business, audience, objectives and challenges.',
    detail: 'Workshops, interviews, audits and a lot of listening. We leave with the problem, not just the brief.',
  },
  {
    number: '02',
    title: 'Think',
    text: 'Develop the strategy, concept and creative direction.',
    detail: 'One sharp idea, a clear rationale and a direction everyone can see before anything is made.',
  },
  {
    number: '03',
    title: 'Create',
    text: 'Produce the visuals, campaigns, content and brand assets.',
    detail: 'Design, shoots, films and copy — crafted in-house and with trusted specialists where it matters.',
  },
  {
    number: '04',
    title: 'Launch',
    text: 'Execute, publish and bring the work to its audience.',
    detail: 'Media, channels and timing planned together, so the work arrives where it can actually be seen.',
  },
  {
    number: '05',
    title: 'Evolve',
    text: 'Measure performance, learn and improve.',
    detail: 'We read what happened, keep what worked and sharpen what didn’t. Then we go again.',
  },
] as const;

/** How we work, in five plain sentences (Section 02). */
export const approach = [
  'Understand the brand',
  'Develop the idea',
  'Create the visual direction',
  'Produce the campaign',
  'Put it in front of the right audience',
] as const;

export interface Client {
  name: string;
  /** Optional logo (import from src/assets). Without one, the name is set in type. */
  logo?: ImageMetadata;
  url?: string;
}

/** Add approved clients and collaborators here. */
export const clients: Client[] = [];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

/** Add genuine, approved feedback here. */
export const testimonials: Testimonial[] = [];
