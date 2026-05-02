import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  appType: 'mpa',
  plugins: [
    basicSsl(),
    {
      name: 'clean-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Rewrite clean URLs to their index.html
          if (req.url === '/about' || req.url === '/about/') {
            req.url = '/about/index.html';
          } else if (req.url === '/work' || req.url === '/work/') {
            req.url = '/work/index.html';
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about/index.html'),
        work: path.resolve(__dirname, 'work/index.html'),
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
