import svgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    svgSpritemap('./src/assets/icons/*.svg', {
      route: '__icons',
      prefix: false,
      output: {
        filename: 'icons.[hash][extname]',
        name: 'icons.svg',
        view: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
