import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  // The shared kit ships JSX inside src/lib/motion.js. Vite's esbuild plugin
  // excludes .js from the JSX loader by default and plugin-react skips Babel
  // in production, so without BOTH include and an emptied exclude the build
  // fails to parse that file. Scoped to src/ so node_modules is untouched.
  esbuild: { include: /src[\/].*\.[jt]sx?$/, exclude: [], loader: 'jsx' },
  build: { outDir: 'dist', assetsInlineLimit: 2048, chunkSizeWarningLimit: 900 },
  server: { port: 5173, open: false },
})
