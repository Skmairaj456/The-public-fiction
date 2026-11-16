/**
 * /llms.txt: a plain-language summary of the studio for AI assistants and
 * answer engines (ChatGPT, Perplexity, Claude, Gemini), following the
 * llmstxt.org convention. Built from the same data as the site, so it never
 * drifts out of date.
 */
import type { APIRoute } from 'astro';
import { site, nav } from '@/config/site';
import { services } from '@/data/services';
import { serviceSeo } from '@/data/service-seo';
import { faqs, process } from '@/data/studio';
import { realCity } from '@/data/real-content';

export const GET: APIRoute = ({ site: base }) => {
  const url = (p: string) => new URL(p, base ?? site.url).href;
  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is an independent creative and brand agency. One team covers ${services.length} disciplines: ${services
      .map((s) => s.title.toLowerCase())
      .join(', ')}.`,
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.title}](${url(`/services/${s.slug}/`)}): ${serviceSeo[s.slug]?.answer ?? s.description} Includes: ${s.items.join(', ')}.`),
    '',
    '## How we work',
    '',
    ...process.map((p) => `- ${p.title}: ${p.text} ${p.detail}`),
    '',
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Pages',
    '',
    `- [Home](${url('/')})`,
    ...nav.map((n) => `- [${n.label}](${url(n.href)})`),
    '',
    '## Contact',
    '',
    `- Email: ${site.contact.email}`,
    `- Project enquiries: ${url('/contact/')}`,
    ...(realCity() ? [`- Location: ${realCity()}`] : []),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
