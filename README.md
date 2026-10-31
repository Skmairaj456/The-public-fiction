# THE PUBLIC FICTION — website

Static marketing site for THE PUBLIC FICTION, built with [Astro](https://astro.build).
It ships as plain HTML with about 9 KB of gzipped JavaScript, and needs no server.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + build to dist/
npm run preview    # serve the production build
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3, …).

## Before launch — checklist

| What | Where |
| --- | --- |
| Real domain (canonical URLs, sitemap, Open Graph) | `src/config/site.ts → url` |
| Real business email (currently a placeholder) | `src/config/site.ts → contact.email` |
| Instagram / LinkedIn URLs (hidden until set) | `src/config/site.ts → social` |
| Verified WhatsApp Business number (hidden until set) | `src/config/site.ts → contact.whatsapp` |
| Connect the enquiry form | see **Contact form** below |
| Replace sample projects with real work | `src/content/work/` |
| Replace placeholder photography | `src/assets/img/` (see `CREDITS.md`) |
| Add approved clients / genuine testimonials | `src/data/studio.ts` |
| Have the privacy policy and terms reviewed | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| Regenerate the share image after changing the hero | `npm run brand-assets` |

## Where content lives

All business-specific content is kept out of the components.

- `src/config/site.ts` — brand name, tagline, description, contact details, social links, form settings, nav, budget and timeline options.
- `src/data/services.ts` — the six service categories (title, line, description, items, image).
- `src/data/studio.ts` — the five-step process, the approach list, **clients** and **testimonials**.
- `src/content/work/*.md` — one file per portfolio project. The file name becomes the URL (`/work/<file-name>/`).
- `src/content/journal/*.md` — one file per article. Set `draft: true` to hide it in production.

### Adding a project

Copy an existing file in `src/content/work/` and edit its frontmatter:

```yaml
title: Project name
client: Client Name          # only if the client has approved being named
sample: false                # true shows a visible "Sample project" label
category: Brand Campaign     # one of the categories in src/content.config.ts
summary: One-line description for cards and SEO.
year: 2026                   # optional
order: 1                     # lower = earlier
featured: true               # up to 6 featured projects appear on the home page
cover: ../../assets/img/your-cover.jpg
coverAlt: Describe the image
coverVideo: /video/cover.mp4 # optional; put the file in /public/video
tone: '#3A2817'              # dark colour for the deliverables band
intro: …
challenge: …
direction: …
execution: …
deliverables: [Key visuals, Brand film]
gallery:
  - src: ../../assets/img/shot-1.jpg
    alt: Describe the image
    size: full               # full | wide | half | tall
    caption: Optional caption
related: [other-project-file-name]
```

Images in `src/assets/` are converted to AVIF/WebP and resized automatically. Below-the-fold images are lazy-loaded.

### Clients and testimonials

Both lists start empty on purpose. Until they have entries:

- **Clients** shows only its headline and positioning statement, with no logos and no invented names.
- **Testimonials** is left out of the production build. Section numbers close up automatically.

In `npm run dev` a dashed editor note shows where each section goes.

## Contact form

The form validates inline, shows loading, success and error states, and only shows success once the form service confirms receipt. Configure it in `src/config/site.ts → form` or with environment variables (see `.env.example`):

| Provider | Setup |
| --- | --- |
| `web3forms` | Free access key from web3forms.com → `PUBLIC_FORM_ACCESS_KEY` |
| `formspree` | Form endpoint (`https://formspree.io/f/…`) → `PUBLIC_FORM_ENDPOINT` |
| `custom` | Any URL that accepts a JSON POST and returns 2xx |
| `none` (default) | The form validates, then opens the visitor's email app with the enquiry pre-written to `contact.email` |

Without JavaScript, the form posts natively to the same destination. A hidden honeypot field filters basic spam.

`/contact/?service=<service-slug>` pre-selects a service. The "Start a project like this" links use this.

## Design system

- **Palette:** paper `#ECE8E1`, ink `#141312`, one signal colour `#E2412B`. Tokens are in `src/styles/global.css`.
- **Type:** Host Grotesk (display, uppercase), Instrument Serif italic (the editorial counter-voice), Geist (body), Geist Mono (labels).
- **Headline markup:** in `SplitHeading` line strings, `*word*` sets serif italic and `^word^` sets the signal colour.
- **Motion:** add the attributes below to any element.
  - `data-reveal` fades an element up on scroll.
  - `data-reveal-img` lifts a curtain over an image.
  - `data-draw` draws a line.
  - `data-parallax="0.1"` adds parallax.

  All motion is disabled for `prefers-reduced-motion`, and content stays visible without JavaScript.
- **Page transitions:** native cross-document View Transitions in supporting browsers; other browsers navigate normally.
