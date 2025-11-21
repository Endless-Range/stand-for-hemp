// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering for API routes
  adapter: cloudflare(),
  site: 'https://standforhemp.com',
  trailingSlash: 'always', // Enforce trailing slashes on all URLs
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    // Enable remote image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Default image format and quality
    format: ['webp', 'avif'],
    quality: 85,
  },
});