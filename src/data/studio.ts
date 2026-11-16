/**
 * Process, approach and FAQs.
 *
 * Clients, testimonials, prices, the team and the location live in
 * src/data/real-content.ts, the one file to fill in with real content.
 */
import { filled, typicalProjectFrom } from './real-content';

const from = filled(typicalProjectFrom);

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
    q: 'What kind of agency is The Public Fiction?',
    a: 'An independent creative and brand agency. One team covers brand strategy and identity, marketing and advertising, social media marketing, photography and video production, creative production, events and digital design.',
  },
  {
    q: 'Do you make Reels and short-form video?',
    a: 'Yes. We plan, shoot and edit Instagram Reels and short-form video, as part of social media marketing or on their own, with the same creative direction as the rest of your brand.',
  },
  {
    q: 'Can you run our social media marketing end to end?',
    a: 'Yes. Social media strategy, content calendars, content production, publishing, community management, creator partnerships, paid social and reporting can all sit with us, or we can take on just the part you need.',
  },
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
    q: 'What does a project cost?',
    a: from
      ? `Most projects start from ${from}. Every project is then scoped to the brief, so the number fits the work. Share a budget range in your enquiry and we’ll tell you, honestly, what it buys.`
      : 'Every project is scoped individually once we understand the brief. Share a budget range in your enquiry and we’ll tell you, honestly, what it buys.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A few lines on what you’re making, who it’s for and what success looks like. Existing brand material helps, but it isn’t required — figuring that out is part of the work.',
  },
] as const;
