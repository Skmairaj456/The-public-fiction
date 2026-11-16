import type { ImageMetadata } from 'astro';
import swatches from '@/assets/img/swatches.jpg';
import fashionRed from '@/assets/img/yellow-wall.jpg';
import photographer from '@/assets/img/photographer-woman.jpg';
import clapper from '@/assets/img/clapper.jpg';
import stageMic from '@/assets/img/mic.jpg';
import uiDesign from '@/assets/img/retro-tech.jpg';
import ringLight from '@/assets/img/ring-light.jpg';

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
    items: ['Digital marketing', 'Campaign strategy', 'Media planning', 'Paid advertising', 'Content strategy', 'Campaign management', 'Marketing creatives'],
    image: fashionRed,
    imageAlt: 'A woman in sunglasses striking a playful pose against a yellow wall',
  },
  {
    slug: 'social-media-marketing',
    number: '03',
    title: 'Social Media Marketing',
    line: 'Show up where people actually look, every single day.',
    description:
      'Strategy, content and community for the platforms your audience scrolls. Planned in a calendar, made to stop the thumb, and measured on what it moves, not just on likes.',
    items: [
      'Social media strategy',
      'Content calendars',
      'Platform management',
      'Reels and short-form content',
      'Community management',
      'Creator and influencer partnerships',
      'Paid social',
      'Analytics and reporting',
    ],
    image: ringLight,
    imageAlt: 'A creator filming herself on a phone in front of a ring light',
  },
  {
    slug: 'photography-film',
    number: '04',
    title: 'Photography & Film',
    line: 'Pictures that carry the brand when no one is reading.',
    description:
      'Commercial stills, brand films and short-form content directed with the same intent as the strategy behind them. Lit properly. Cut with care.',
    items: ['Commercial photography', 'Product photography', 'Fashion and lifestyle shoots', 'Corporate films', 'Promotional videos', 'Reels and short-form content', 'Event photography and videography'],
    image: photographer,
    imageAlt: 'A photographer holding a camera up to her eye at dusk',
  },
  {
    slug: 'creative-production',
    number: '05',
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
    number: '06',
    title: 'Events & Experiences',
    line: 'The night ends. The story shouldn’t.',
    description:
      'We brand the room, shape the moment and cover it from every angle, so an event keeps working long after the lights come up.',
    items: ['Event photography', 'Event videography', 'Promotional campaigns', 'Event branding', 'Creative coverage', 'Visual documentation'],
    image: stageMic,
    imageAlt: 'A microphone on a stand under warm stage light, waiting for the show',
  },
  {
    slug: 'digital-design',
    number: '07',
    title: 'Digital & Design',
    line: 'Your brand, working at screen speed.',
    description:
      'Websites, landing pages and digital creatives that look considered and perform under pressure — because a beautiful page that doesn’t convert is just decoration.',
    items: ['Website design', 'Landing pages', 'Graphic design', 'Digital creatives', 'UI/UX design', 'Marketing collateral'],
    image: uiDesign,
    imageAlt: 'Retro computers and screens glowing in pink and blue light',
  },
];

export const serviceTitles = services.map((s) => s.title);
