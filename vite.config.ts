import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import type { ConfigEnv } from 'vite'

export default ({ mode }: ConfigEnv) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }
  const proxyUrl = env.VITE_APP_PROXY_URL ?? ''

  return defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        [proxyUrl]: {
          target: env.VITE_APP_API_URL,
          rewrite: (path) => path.replace(new RegExp(proxyUrl), '')
        }
      },
      open: true
    }
  })
}
