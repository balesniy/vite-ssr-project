import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'

const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}

export default {
  plugins: [
      vue({
        template: {
          ssr: true,
          compilerOptions: {
            directiveTransforms: {
              'on-clickaway': ssrTransformCustomDir,
            }
          }
        }
      }), ssr(),
      vueI18n({
        // you need to set i18n resource including paths !
        // include: resolve(dirname(fileURLToPath(import.meta.url)), './langs/*.json'),
      })
  ],
  resolve: {
    alias: {
      "@": __dirname
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`
      }
    }
  }
}
