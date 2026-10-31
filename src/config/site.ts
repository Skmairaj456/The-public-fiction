/**
 * THE PUBLIC FICTION — central site settings.
 *
 * Every business detail that appears on the website lives here.
 * Change a value once and it updates everywhere (header, footer, contact page,
 * SEO tags, structured data, sitemap and robots.txt).
 *
 * Anything left as an empty string or `null` is simply not rendered —
 * the site never shows a link that goes nowhere.
 */

export const site = {
  name: 'THE PUBLIC FICTION',
  shortName: 'TPF',
  tagline: 'Making ideas visible. Making brands matter.',
  description:
    'THE PUBLIC FICTION is an independent creative and marketing company. We build brands, create campaigns and produce photography, film and experiences that make people stop, look and remember.',

  /** Production URL, no trailing slash. Used for canonical URLs, Open Graph and the sitemap. */
  url: 'https://www.thepublicfiction.com',

  /** Default social sharing image (in /public). */
  ogImage: '/og.jpg',
  locale: 'en_US',

  contact: {
    /** PLACEHOLDER — replace with the real business inbox. */
    email: 'hello@thepublicfiction.com',
    /** Optional. Shown as a tel: link when set, e.g. '+44 20 0000 0000'. */
    phone: '' as string,
    /**
     * Optional. Only add a VERIFIED WhatsApp Business number, digits only with
     * country code and no "+" (e.g. '447700900000'). Leave empty to hide WhatsApp.
     */
    whatsapp: '' as string,
    /** Optional. A city or studio address, e.g. 'London'. */
    location: '' as string,
  },

  /** Leave a URL empty to hide that network everywhere on the site. */
  social: {
    instagram: '' as string,
    linkedin: '' as string,
  },

  /**
   * Project enquiry form delivery.
   *
   * The site is static, so the form posts to a hosted form service.
   *   provider: 'web3forms' → set `accessKey` (free key from https://web3forms.com)
   *   provider: 'formspree' → set `endpoint` (e.g. https://formspree.io/f/xxxxxxx)
   *   provider: 'custom'    → set `endpoint` to any URL that accepts a JSON POST
   *                            and returns a 2xx status on success
   *   provider: 'none'      → the form validates, then opens the visitor's email
   *                            app with the enquiry pre-written to `contact.email`
   *
   * Values can also be supplied at build time with the PUBLIC_FORM_PROVIDER,
   * PUBLIC_FORM_ENDPOINT and PUBLIC_FORM_ACCESS_KEY environment variables.
   */
  form: {
    provider: (import.meta.env?.PUBLIC_FORM_PROVIDER ?? 'none') as 'web3forms' | 'formspree' | 'custom' | 'none',
    endpoint: (import.meta.env?.PUBLIC_FORM_ENDPOINT ?? '') as string,
    accessKey: (import.meta.env?.PUBLIC_FORM_ACCESS_KEY ?? '') as string,
  },

  /** Shown on the legal pages. */
  legal: {
    entityName: 'THE PUBLIC FICTION',
    lastUpdated: '31 October 2026',
  },
} as const;

export const nav = [
  { label: 'Work', href: '/work/' },
  { label: 'Services', href: '/services/' },
  { label: 'Studio', href: '/studio/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Edit freely — currency and bands are yours to set. */
export const budgetRanges = [
  'Under $5k',
  '$5k – $15k',
  '$15k – $40k',
  '$40k – $100k',
  '$100k+',
  'Not sure yet',
] as const;

export const timelines = [
  'As soon as possible',
  'Within 1 month',
  '1 – 3 months',
  '3 – 6 months',
  'Flexible',
] as const;

/** Only the social networks that have a URL configured. */
export function socialLinks() {
  const links: { label: string; href: string }[] = [];
  if (site.social.instagram) links.push({ label: 'Instagram', href: site.social.instagram });
  if (site.social.linkedin) links.push({ label: 'LinkedIn', href: site.social.linkedin });
  if (site.contact.whatsapp) links.push({ label: 'WhatsApp', href: `https://wa.me/${site.contact.whatsapp}` });
  return links;
}
