import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Para ter certeza que está desabilitado (comportamento padrão)
    sourcemap: false,

    // Se um dia você precisar habilitar para debugar em produção:
    // sourcemap: true,
  }
})