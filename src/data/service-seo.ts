/**
 * Search copy for each service page (/services/<slug>/), keyed by the slug in
 * services.ts. Titles and descriptions lead with the words people search for;
 * FAQs answer real questions plainly so search and AI answer engines can quote
 * them. Keep every answer true to what the studio actually offers.
 */
export interface ServiceSeo {
  /** Page <title> (the brand name is appended automatically). Aim for under 60 characters. */
  title: string;
  /** Meta description. Aim for 140–160 characters. */
  description: string;
  /** A one-paragraph, plain-language answer to "What is <service>?". */
  answer: string;
  faqs: { q: string; a: string }[];
}

export const serviceSeo: Record<string, ServiceSeo> = {
  'brand-strategy-identity': {
    title: 'Branding Agency: Brand Strategy, Logo & Identity Design',
    description:
      'Brand strategy, naming, logo design and visual identity systems from a creative branding agency that defines your position before designing your look.',
    answer:
      'Brand strategy and identity is the work of deciding what a business stands for and turning it into something people recognise. It covers positioning, naming, tone of voice, logo design and a complete visual identity system, with guidelines that keep it consistent everywhere it appears.',
    faqs: [
      {
        q: 'What does a branding agency do?',
        a: 'A branding agency defines what a business stands for and makes it recognisable: positioning, naming, a tone of voice, a logo and a visual identity system, plus guidelines so the brand stays consistent across every touchpoint.',
      },
      {
        q: 'What is included in a brand identity project?',
        a: 'Usually brand positioning and strategy, naming where needed, logo design, colour and typography, imagery direction and brand guidelines. Each project is scoped to what the brand actually needs.',
      },
      {
        q: 'Can you refresh an existing brand instead of starting over?',
        a: 'Yes. A refresh keeps what already works, fixes what does not and brings the identity up to date without losing the recognition the brand has already earned.',
      },
    ],
  },
  'marketing-advertising': {
    title: 'Marketing & Advertising Agency: Campaigns & Paid Media',
    description:
      'Campaign strategy, digital marketing, paid advertising and marketing creatives, planned, produced and placed where your audience actually spends its time.',
    answer:
      'Marketing and advertising is how a brand reaches the people it is for. It covers campaign strategy, the creative idea, the ads themselves, digital marketing and paid media, and measuring what worked so the next campaign performs better.',
    faqs: [
      {
        q: 'What does a marketing and advertising agency do?',
        a: 'It plans and runs the campaigns that bring a brand to its audience: the strategy, the creative idea, the ads and marketing creatives, and the media plan for where and when they run, followed by reporting on results.',
      },
      {
        q: 'Do you run paid ads on social media and search?',
        a: 'Yes. Paid advertising is part of our marketing work, planned alongside the creative so the ads and the idea behind them pull in the same direction.',
      },
      {
        q: 'How do you measure a campaign?',
        a: 'We agree the goals up front, such as awareness, leads or sales, and report against them. The aim is to learn what moved the numbers and sharpen the next round.',
      },
    ],
  },
  'social-media-marketing': {
    title: 'Social Media Marketing Agency: Strategy, Reels & Content',
    description:
      'Social media strategy, content calendars, Instagram Reels and short-form video, community management, creator partnerships and paid social from one team.',
    answer:
      'Social media marketing is planning, creating and publishing content on the platforms your audience uses, then growing and looking after the community around it. It covers social media strategy, content calendars, Reels and short-form video, community management, creator and influencer partnerships, paid social and analytics.',
    faqs: [
      {
        q: 'What does a social media marketing agency do?',
        a: 'It plans what a brand says on social platforms, creates the content, publishes it on a schedule, manages the community and measures the results. We handle strategy, content calendars, Reels, community management, creator partnerships, paid social and reporting.',
      },
      {
        q: 'Do you create Instagram Reels and short-form video?',
        a: 'Yes. We plan, shoot and edit Reels and short-form video for Instagram and other platforms, with the same creative direction as the rest of your brand.',
      },
      {
        q: 'Can you manage our social media accounts?',
        a: 'Yes. Platform management covers planning, publishing, replying to your community and regular reporting, so your channels stay active and on brand.',
      },
      {
        q: 'Do you work with creators and influencers?',
        a: 'Yes. Creator and influencer partnerships can be part of a social plan, from choosing the right people to briefing them and reviewing the content.',
      },
    ],
  },
  'photography-film': {
    title: 'Photography & Video Production: Brand Films, Reels & Shoots',
    description:
      'Commercial and product photography, brand films, promotional videos, Reels and short-form content, plus event photography and videography.',
    answer:
      'Photography and video production is creating the images and films a brand uses to tell its story. It covers commercial and product photography, fashion and lifestyle shoots, corporate and brand films, promotional videos, Reels and short-form content, and event photography and videography.',
    faqs: [
      {
        q: 'What kinds of photography and video do you produce?',
        a: 'Commercial and product photography, fashion and lifestyle shoots, corporate and brand films, promotional videos, Reels and short-form content, and event photography and videography.',
      },
      {
        q: 'Do you handle editing and post-production?',
        a: 'Yes. We take shoots through editing, colour and final delivery, in the formats and aspect ratios each platform needs.',
      },
    ],
  },
  'creative-production': {
    title: 'Creative Production: Advertising, Video & Motion Graphics',
    description:
      'Advertising production from concept and scriptwriting to art direction, video production, editing, post-production and motion graphics.',
    answer:
      'Creative production is turning an approved idea into finished work. It covers concept development, scriptwriting, art direction, the shoot, video production, editing, post-production and motion graphics, run on budget and on schedule.',
    faqs: [
      {
        q: 'What is creative production?',
        a: 'Turning an idea into finished work: scripts, art direction, the shoot, editing, post-production and motion graphics, managed so the concept survives the journey intact.',
      },
      {
        q: 'Can you produce an ad from a script we already have?',
        a: 'Yes. We can pick up at any stage, from an existing script or concept through to the final edit.',
      },
    ],
  },
  'events-experiences': {
    title: 'Event Branding, Photography & Videography',
    description:
      'Event branding, promotional campaigns, event photography and videography, and creative coverage that keeps working long after the event ends.',
    answer:
      'Events and experiences work covers branding an event, promoting it, and documenting it with photography and videography, then turning that coverage into content the brand can keep using after the day.',
    faqs: [
      {
        q: 'Do you cover events with photo and video?',
        a: 'Yes. We cover events with photography and videography and turn the footage into content you can use after the day.',
      },
      {
        q: 'Can you brand and promote an event too?',
        a: 'Yes. Event branding and promotional campaigns can be part of the same project, so the event feels like your brand from the invitation to the recap.',
      },
    ],
  },
  'digital-design': {
    title: 'Website Design, UI/UX & Digital Creative',
    description:
      'Website and landing page design, UI/UX, graphic design, digital creatives and marketing collateral that look considered and are built to convert.',
    answer:
      'Digital and design is the work that carries a brand on screen and in print: website and landing page design, UI/UX design, graphic design, digital creatives and marketing collateral.',
    faqs: [
      {
        q: 'Do you design websites and landing pages?',
        a: 'Yes. We design websites and landing pages, including the UI/UX, and the graphics and digital creatives that support them.',
      },
      {
        q: 'Do you design marketing collateral?',
        a: 'Yes. Graphic design for digital and print collateral is part of the same service, kept consistent with your brand identity.',
      },
    ],
  },
};
