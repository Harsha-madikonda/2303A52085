import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy configuration for the evaluation-service API
      // This helps avoid CORS issues during development
      '/evaluation-service': {
        target: 'http://4.224.186.213',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/evaluation-service/, '/evaluation-service'),
        secure: false,
      },
    },
  },
})

