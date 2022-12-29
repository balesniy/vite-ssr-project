import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
// import vueI18n from '@intlify/vite-plugin-vue-i18n'

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
      // vueI18n({
      //   // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      //   // compositionOnly: false,
      //   // you need to set i18n resource including paths !
      //   include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
      // })
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
