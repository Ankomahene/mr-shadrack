import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    // `npm start` serves the API on 8080; the dev server forwards to it.
    proxy: { '/api': 'http://localhost:8080' },
  },
  build: {
    target: 'es2023',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[/\\](react|react-dom|react-router|scheduler)[/\\]/ },
            { name: 'supabase', test: /node_modules[/\\]@supabase[/\\]/ },
            { name: 'motion', test: /node_modules[/\\](motion|framer-motion|motion-dom|motion-utils)[/\\]/ },
          ],
        },
      },
    },
  },
});
