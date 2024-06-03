import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: `@import "@/assets/scss/global.scss";`,
        },
    },
},
})
