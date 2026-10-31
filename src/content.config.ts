import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

export const workCategories = [
  'Brand Campaign',
  'Commercial Photography',
  'Product Shoot',
  'Brand Film',
  'Event Coverage',
  'Social Campaign',
  'Advertising',
  'Brand Identity',
] as const;

/**
 * Portfolio projects — one Markdown file per project in src/content/work/.
 * To add a project: copy an existing file, rename it (the file name becomes the URL),
 * swap the images and text. To remove one: delete the file.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Only name a client who has approved being listed. */
      client: z.string().optional(),
      /** true = demo/concept work. Shows a visible "Sample project" label everywhere. */
      sample: z.boolean().default(false),
      category: z.enum(workCategories),
      summary: z.string(),
      year: z.number().int().optional(),
      /** Lower numbers appear first. */
      order: z.number().default(100),
      featured: z.boolean().default(false),
      cover: image(),
      coverAlt: z.string(),
      /** Optional cover video (file in /public or a full URL). The cover image is used as its poster. */
      coverVideo: z.string().optional(),
      /** A single colour that tints the project page. */
      tone: z.string().default('#151413'),
      disciplines: z.array(z.string()).default([]),
      intro: z.string(),
      challenge: z.string(),
      direction: z.string(),
      execution: z.string(),
      deliverables: z.array(z.string()).default([]),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            /** full = edge to edge, wide = 2/3, half = 1/2, tall = portrait 1/3 */
            size: z.enum(['full', 'wide', 'half', 'tall']).default('half'),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      related: z.array(reference('work')).optional(),
    }),
});

/** Journal articles — one Markdown file per article in src/content/journal/. */
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      topic: z.enum(['Marketing', 'Branding', 'Advertising', 'Behind the Scenes', 'Production', 'Inspiration']),
      author: z.string().default('THE PUBLIC FICTION'),
      cover: image(),
      coverAlt: z.string(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work, journal };
