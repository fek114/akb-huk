// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.akbuluthukuk.av.tr',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
