import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      exclude: [
        '**/types.ts',
        '**/types/*',
        '**/enums.ts',
        'src/test/**/*',
        ...coverageConfigDefaults.exclude,
      ],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*'],
      reporter: ['text', 'text-summary'],
    },
    environment: 'jsdom',
    globals: true,
    maxConcurrency: 8,
    setupFiles: ['./src/test/setupTests.ts'],
  },
});
