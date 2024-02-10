import { resolve } from 'path';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [{
        src: normalizePath(resolve(__dirname, 'static/*')),
        dest: './',
      }],
    }),
  ],
  server: {
    port: 3000,
  },
});
