import {
  createSSRApp, defineComponent, h, markRaw, reactive,
} from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import LayoutDefault from './PageShell.vue'
import { setPageContext } from './usePageContext'

export { createApp }

let rootComponent
function createApp(pageContext) {
  const { Page, user } = pageContext

  let rootComponent
  const PageWithWrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {}),
      Layout: markRaw(pageContext.exports.Layout || LayoutDefault)
    }),
    created() {
      rootComponent = this
    },
    render() {
      return h(
          this.Layout,
          {},
          {
            default: () => {
              return h(this.Page, this.pageProps)
            }
          }
      )
    }
  })

  const app = createSSRApp(PageWithWrapper)
  const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    // something vue-i18n options here ...
  })
  app.use(i18n)

  const store = createPinia()
  app.use(store)

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  app.changePage = (pageContext) => {
    Object.assign(pageContextReactive, pageContext)
    rootComponent.Page = markRaw(pageContext.Page)
    rootComponent.pageProps = markRaw(pageContext.pageProps || {})
    rootComponent.Layout = markRaw(pageContext.exports.Layout || LayoutDefault)
  }

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive)

  return { app, store }
}
