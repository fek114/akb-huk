import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const yayinlar = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/yayinlar' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Bülten', 'Makale', 'Mevzuat Notu']),
    /** İlgili çalışma alanı numarası (01–06) */
    area: z.enum(['01', '02', '03', '04', '05', '06']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { yayinlar };
