import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // relative base so the build works both on github.io/<repo>/ and a custom domain
  base: './',
  plugins: [vue()],
})
