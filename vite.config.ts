import { defineConfig } from 'vitest/config';
export default defineConfig({
  base: './',
  test: { environment: 'node', pool: 'threads', include: ['tests/**/*.test.ts'] },
});
