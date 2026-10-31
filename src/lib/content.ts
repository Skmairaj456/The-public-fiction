import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'work'>;
export type Post = CollectionEntry<'journal'>;

/** All projects, in display order. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('work');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** All published journal posts, newest first. Drafts appear in development only. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('journal', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Rough reading time for a Markdown body. */
export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
