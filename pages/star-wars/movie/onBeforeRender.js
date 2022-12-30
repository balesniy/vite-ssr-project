import ky from 'ky-universal'
export async function onBeforeRender(pageContext) {
  const movie = await ky(`https://star-wars.brillout.com/api/films/${pageContext.routeParams.movieId}.json`).json()

  // The page's <title>
  const { title } = movie

  return {
    pageContext: {
      pageProps: {
        movie
      },
      documentProps: {
        // The page's <title>
        title
      }
    }
  }
}
