import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import createSVGSpritePlugin from 'vite-plugin-svg-spriter'

const SRC_PATH = path.resolve(__dirname, 'src')
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, 'assets', 'sprite')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSVGSpritePlugin({
      svgFolder: SVG_FOLDER_PATH,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    VITE_BACKEND_URL: JSON.stringify(process.env.VITE_BACKEND_URL),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/Variables.scss";
        @import "@/assets/Global.scss";
        @import "@/assets/mixins/Typography.scss";
        `,
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
