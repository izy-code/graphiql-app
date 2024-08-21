import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      exclude: ['**/types.ts', '**/types/*', '**/*.d.ts', 'src/**/*/enums.ts', 'src/test/**/*'],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text'],
    },
    css: false,
    environment: 'jsdom',
    globals: true,
    maxConcurrency: 8,
    setupFiles: ['./src/test/setupTests.ts'],
  },
});
