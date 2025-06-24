/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter(), tailwindcss(), tsconfigPaths(), devtoolsJson()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', '.react-router'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['app/routes/**/*.{ts,tsx}', 'app/components/**/*.{ts,tsx}'],
      exclude: ['app/routes/**/_*.{ts,tsx}'], // naming convention to ignore layouts without testable funcionalities
    },
  },
});
