// / <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_STRAPI_URL: string;
    readonly PUBLIC_STRAPI_TOKEN: string;
    // Add other environment variables here if you have more
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  