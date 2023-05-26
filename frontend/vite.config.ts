import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    outDir: '../dist',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      workbox: {
        globPatterns: ['**/*.{js,ts,tsx,css,html,ico,png,svg}'],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: '_tracker',
        short_name: '_tracker',
        description: 'Fitness tracker application',
        theme_color: '#00FFB2',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        scope: '/',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        orientation: 'portrait',
      },
    }),
  ],
});
