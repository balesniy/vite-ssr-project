import ky from 'ky-universal';

export async function onBeforeRender(pageContext) {
  const { data: content } = await ky.get('https://searadar.com/api/static/index').json()
  return {
    pageContext: {
      pageProps: {
        content
      },
    }
  }
}
