import { getCollection, type CollectionEntry } from 'astro:content';

export type Yayin = CollectionEntry<'yayinlar'>;

export async function getYayinlar(): Promise<Yayin[]> {
  const all = await getCollection('yayinlar', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const fmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (d: Date) => fmt.format(d);

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
