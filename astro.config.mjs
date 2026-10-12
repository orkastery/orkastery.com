import { defineConfig } from 'astro/config';
import { baseDoAmbiente } from './src/lib/previa.mjs';

export default defineConfig({
  site: 'https://orkastery.com',
  // Produção na raiz; prévia de release em /releasevalidation/<release>/ (SITE_BASE, ver src/lib/previa.mjs).
  base: baseDoAmbiente(),
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto'
  },
  devToolbar: { enabled: false }
});
