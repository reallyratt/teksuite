import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

const googleDocProxyPlugin = (): Plugin => ({
  name: 'google-doc-proxy',
  configureServer(server) {
    server.middlewares.use('/api/gdoc', async (req, res) => {
      try {
        const docUrl = 'https://docs.google.com/document/d/1jJst-YDMbhZVFSPCWrEC1d0PVZl6urMaZ3xGTo7t0MA/export?format=txt';
        const response = await fetch(docUrl);
        const text = await response.text();
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(text);
      } catch (err) {
        res.statusCode = 500;
        res.end('Error fetching Google Doc text');
      }
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), googleDocProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
