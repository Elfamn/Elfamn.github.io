import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lab4/', // Важливо вказати правильний базовий шлях
  build: {
    outDir: 'dist'
  }
})