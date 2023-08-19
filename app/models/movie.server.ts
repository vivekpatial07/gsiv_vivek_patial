import type { MovieDetails, MovieListItem } from '~/types'
import * as theMovieDb from '~/utils/the-movie-db.server'

export function getList ({ page }: { page: string | null }): Promise<{
  dates: string[]
  page: number
  results: MovieListItem[]
  total_pages: number
  total_results: number
}> {
  return theMovieDb.fetch(theMovieDb.getUrl('/movie/upcoming', { page }))
}

export function getMovieDetails (id: string): Promise<MovieDetails> {
  return theMovieDb.fetch(theMovieDb.getUrl(`/movie/${id}`))
}

export function searchMovies ({
  query,
  page
}: {
  query: string
  page: string | null
}): Promise<{
  dates: string[]
  page: number
  results: MovieListItem[]
  total_pages: number
  total_results: number
}> {
  return theMovieDb.fetch(theMovieDb.getUrl('/search/movie', { query, page }))
}
