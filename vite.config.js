import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For a user site at https://<username>.github.io/, the site is served from the root,
// so the base path should be "/" in both dev and production.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
