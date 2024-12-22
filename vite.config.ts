import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base:'/',
    server: {
      port: 3000, 
      open: true   // Opcional, abre automáticamente en el navegador cuando arranca el servidor
    }
})




