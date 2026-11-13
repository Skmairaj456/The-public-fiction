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

/** Frequently asked questions (FAQ section). Keep answers factual. */
export const faqs = [
  {
    q: 'How do we start working together?',
    a: 'Send us a project enquiry or an email. We read it properly, reply to arrange a short call, and follow up with a clear proposal: approach, timeline and cost.',
  },
  {
    q: 'Do you only do photography and film?',
    a: 'No. Production is one part of what we do. We also handle brand strategy and identity, campaigns and advertising, social, events and digital design — on their own or together.',
  },
  {
    q: 'Can you take on just one part of a project?',
    a: 'Yes. Some clients come to us for a single shoot or a logo; others for the whole journey from strategy to launch. We shape the team around what the project actually needs.',
  },
  {
    q: 'How is pricing worked out?',
    a: 'Every project is scoped individually once we understand the brief. Sharing a budget range in your enquiry helps us suggest the approach that gets the most out of it.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A few lines on what you’re making, who it’s for and what success looks like. Existing brand material helps, but it isn’t required — figuring that out is part of the work.',
  },
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
