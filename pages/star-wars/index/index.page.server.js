import ky from 'ky-universal'

export async function onBeforeRender() {
  const movies = await fetchStarWarsMovies()
  return {
    pageContext: {
      pageProps: {
        // We remove data we don't need because we pass `pageContext.movies` to
        // the client; we want to minimize what is sent over the network.
        movies: filterMoviesData(movies)
      },
      // The page's <title>
      documentProps: { title: 'Star Wars Movies' }
    }
  }
}

async function fetchStarWarsMovies() {
  const response = await ky('https://star-wars.brillout.com/api/films.json').json()
  return response.results .map((movie, i) => ({
    ...movie,
    id: String(i + 1)
  }))
}

function filterMoviesData(movies) {
  return movies.map((movie) => {
    const { title, release_date, id } = movie
    return { title, release_date, id }
  })
}
