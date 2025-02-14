import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Evita dividir código en muchos archivos (mejor para prerenderizado)
      },
    },
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 5000,
    open: true
  }
})
