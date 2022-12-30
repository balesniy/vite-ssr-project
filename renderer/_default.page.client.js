import { createApp } from './app'

export { render }
export const clientRouting = true
export const prefetchStaticAssets = { when: 'VIEWPORT' }

let app
async function render(pageContext) {
  if (!app) {
    const instance = createApp(pageContext)
    instance.store.state.value = pageContext.initialStoreState
    app = instance.app
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
  document.title = getPageTitle(pageContext)
}

function getPageTitle(pageContext) {
  const title =
      // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
      (pageContext.exports.documentProps || {}).title ||
      // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
      (pageContext.documentProps || {}).title ||
      'Demo'
  return title
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
