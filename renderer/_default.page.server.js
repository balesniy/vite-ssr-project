import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import ky from 'ky-universal'
import { createApp } from './app'
import logoUrl from './logo.svg'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['initialStoreState', 'pageProps', 'urlPathname', 'documentProps']

async function render(pageContext) {
  const { app, store } = createApp(pageContext)
  const appHtml = await renderToString(app)
  const initialStoreState = store.state.value


  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext // pageContext.exports // ???
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      initialStoreState,
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

export async function onBeforeRender(pageContext) {
  const { data: countriesOptions } = await ky.get('https://searadar.com/api/search/geo-suggest').json()
  return {
    pageContext: {
      serverData: {
        countriesOptions // ???
      }
    }
  }
}
