import type { ImageMetadata } from 'astro';
import swatches from '@/assets/img/swatches.jpg';
import fashionRed from '@/assets/img/fashion-red.jpg';
import photographer from '@/assets/img/photographer.jpg';
import clapper from '@/assets/img/clapper.jpg';
import concertOrange from '@/assets/img/concert-orange.jpg';
import uiDesign from '@/assets/img/ui-design.jpg';

export interface Service {
  slug: string;
  number: string;
  title: string;
  /** A short, opinionated line — the reason this discipline exists. */
  line: string;
  description: string;
  items: string[];
  image: ImageMetadata;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: 'brand-strategy-identity',
    number: '01',
    title: 'Brand Strategy & Identity',
    line: 'Decide who you are before deciding how you look.',
    description:
      'We find the position only you can own, then give it a name, a voice and a visual system that holds together from a business card to a billboard.',
    items: ['Brand positioning', 'Brand strategy', 'Naming', 'Logo design', 'Visual identity', 'Brand guidelines', 'Creative direction'],
    image: swatches,
    imageAlt: 'Colour swatches and printed identity studies laid out on a desk',
  },
  {
    slug: 'marketing-advertising',
    number: '02',
    title: 'Marketing & Advertising',
    line: 'Attention is rented. We help you spend it well.',
    description:
      'Campaigns built on a real idea, then planned, produced and placed where your audience actually spends its time — and measured against what you actually need.',
    items: ['Digital marketing', 'Campaign strategy', 'Social media marketing', 'Paid advertising', 'Content strategy', 'Campaign management', 'Marketing creatives'],
    image: fashionRed,
    imageAlt: 'A model in a red top photographed against a saturated teal sky',
  },
  {
    slug: 'photography-film',
    number: '03',
    title: 'Photography & Film',
    line: 'Pictures that carry the brand when no one is reading.',
    description:
      'Commercial stills, brand films and short-form content directed with the same intent as the strategy behind them. Lit properly. Cut with care.',
    items: ['Commercial photography', 'Product photography', 'Fashion and lifestyle shoots', 'Corporate films', 'Promotional videos', 'Reels and short-form content', 'Event photography and videography'],
    image: photographer,
    imageAlt: 'A photographer framing a shot on a busy city street',
  },
  {
    slug: 'creative-production',
    number: '04',
    title: 'Creative Production',
    line: 'Where the idea meets the call sheet.',
    description:
      'From the first script to the final grade, we run the production so the concept survives the journey intact — on budget, on schedule and on brand.',
    items: ['Advertising production', 'Concept development', 'Scriptwriting', 'Art direction', 'Video production', 'Editing and post-production', 'Motion graphics'],
    image: clapper,
    imageAlt: 'A film clapperboard held up on location in a desert landscape',
  },
  {
    slug: 'events-experiences',
    number: '05',
    title: 'Events & Experiences',
    line: 'The night ends. The story shouldn’t.',
    description:
      'We brand the room, shape the moment and cover it from every angle, so an event keeps working long after the lights come up.',
    items: ['Event photography', 'Event videography', 'Promotional campaigns', 'Event branding', 'Creative coverage', 'Visual documentation'],
    image: concertOrange,
    imageAlt: 'A crowd silhouetted against warm stage light at a live event',
  },
  {
    slug: 'digital-design',
    number: '06',
    title: 'Digital & Design',
    line: 'Your brand, working at screen speed.',
    description:
      'Websites, landing pages and digital creatives that look considered and perform under pressure — because a beautiful page that doesn’t convert is just decoration.',
    items: ['Website design', 'Landing pages', 'Graphic design', 'Digital creatives', 'UI/UX design', 'Marketing collateral'],
    image: uiDesign,
    imageAlt: 'A designer’s monitor showing interface layouts in progress',
  },
];

export const serviceTitles = services.map((s) => s.title);
