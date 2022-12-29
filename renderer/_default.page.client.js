import { createApp } from './app'

export { render }

async function render(pageContext) {
  const instance = createApp(pageContext)
  instance.store.state.value = pageContext.initialStoreState
  instance.app.mount('#app')
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
