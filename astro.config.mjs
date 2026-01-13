import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import mdx from '@astrojs/mdx';

// Firebase Hosting only supports static sites, so we remove the Node.js adapter
// and use hybrid rendering for the API route while keeping everything else static
export default defineConfig({
  integrations: [tailwind(), mdx()],
  output: 'static', // Static site generation for Firebase Hosting
  // Note: The send-email API route has prerender: false,
  // but for Firebase deployment, you'll need to move this to Cloud Functions
});