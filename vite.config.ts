import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ mode }) => {
  return defineConfig({
    test: {
      testTimeout: 30_000,
      silent: false,
      globals: true,
      singleThread: false,
      globalSetup: ['./vite.setup.js'],
      environment: 'jsdom',
      exclude: ['node_modules/**/*', 'dist/**/*']
    },
    plugins: [tsconfigPaths()],
  })
}
