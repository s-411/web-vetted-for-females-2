import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
        profile: resolve(__dirname, 'profile.html'),
        greenFlags: resolve(__dirname, 'green-flags.html'),
        redFlags: resolve(__dirname, 'red-flags.html'),
        dealbreakers: resolve(__dirname, 'dealbreakers.html'),
        investment: resolve(__dirname, 'investment.html'),
        archives: resolve(__dirname, 'archives.html'),
        settings: resolve(__dirname, 'settings.html'),
        calendar: resolve(__dirname, 'calendar.html'),
        components: resolve(__dirname, 'components.html'),
      },
    },
  },
});
