import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin'; // 👈 Agregar el plugin de SSR

export default defineConfig({
  plugins: [react(), ssr()], // 👈 Agregar ssr()
  base: '/',
  server: {
    port: 3000,
    open: true // Abre automáticamente el navegador al iniciar el servidor
  },
  build: {
    outDir: 'dist', // Asegurar que el build se genera correctamente
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
