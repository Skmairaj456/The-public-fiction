/**
 * Structured data (JSON-LD) builders. Everything here describes only what the
 * site actually says: no invented ratings, addresses or numbers.
 */
import { site } from '@/config/site';
import { services } from '@/data/services';
import { realCity } from '@/data/real-content';

const abs = (path: string) => new URL(path, site.url).href;

export const orgId = `${site.url}/#organization`;

/** Topics the studio works in, used by search and AI engines to understand it. */
export const expertise = [
  'Creative agency',
  'Brand agency',
  'Branding',
  'Brand strategy',
  'Brand identity design',
  'Logo design',
  'Naming',
  'Social media marketing',
  'Social media management',
  'Instagram Reels',
  'Short-form video',
  'Content creation',
  'Influencer marketing',
  'Digital marketing',
  'Advertising',
  'Paid social',
  'Campaign strategy',
  'Commercial photography',
  'Product photography',
  'Video production',
  'Brand films',
  'Motion graphics',
  'Event photography',
  'Event videography',
  'Event branding',
  'Website design',
  'UI/UX design',
  'Graphic design',
];

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(realCity() ? { areaServed: realCity() } : {}),
    logo: abs('/favicon.svg'),
    image: abs(site.ogImage),
    knowsAbout: expertise,
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}/`) },
    })),
  };
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { '@id': orgId },
    inLanguage: 'en',
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqPage(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function service(s: (typeof services)[number], description: string, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description,
    url: abs(`/services/${s.slug}/`),
    provider: { '@id': orgId },
    ...(realCity() ? { areaServed: realCity() } : {}),
    ...(image ? { image } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.title} services`,
      itemListElement: s.items.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } })),
    },
  };
}
