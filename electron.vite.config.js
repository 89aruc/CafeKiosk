import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@pages': resolve('src/renderer/src/pages'), 
        '@styles': resolve('src/renderer/src/assets/styles'),
        '@components': resolve('src/renderer/src/components'),
        '@context': resolve('src/renderer/src/context'),
        '@images': resolve('public/assets/images'),
      }
    },
    plugins: [react()],
  },
  resolve: {
    alias: {
      '@images': resolve('public/assets/images'),
    },
  },
})
