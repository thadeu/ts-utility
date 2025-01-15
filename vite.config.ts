import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ mode }) => {
  return defineConfig({
    test: {
      testTimeout: 30000,
      singleThread: false
    },
    plugins: [tsconfigPaths()],
  })
}
