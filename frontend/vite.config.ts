import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-kanban/',

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
    port: 5173,
  },
})
