import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://orkastery.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto'
  },
  devToolbar: { enabled: false }
});
