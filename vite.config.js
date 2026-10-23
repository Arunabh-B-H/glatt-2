import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Vite 8 / Rolldown requires the function form.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Keep the whole 3D stack (three + R3F + drei + postprocessing) in
          // one chunk so three.js is never duplicated across two bundles.
          // It is loaded lazily with the hero scene, off the critical path.
          if (
            /node_modules[\\/]three[\\/]/.test(id) ||
            id.includes('@react-three') ||
            id.includes('postprocessing')
          )
            return 'three'
          if (id.includes('framer-motion') || id.includes('motion-dom'))
            return 'motion'
        }
      }
    }
  }
})
