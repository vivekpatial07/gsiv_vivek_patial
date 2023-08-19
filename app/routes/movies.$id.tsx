import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { HomeLink } from '~/components'
import { getMovieDetails } from '~/models/movie.server'
import { getImageSrc } from '~/utils'

export async function loader({ params }: LoaderArgs) {
  const { id } = params
  invariant(id, `id is missing`)

  return { movieDetails: await getMovieDetails(id) }
}

export default function MovieDetails() {
  const { movieDetails } = useLoaderData<typeof loader>()
  return (
    <div>
      <header className='p-3 shadow flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Movie Details</h1>
        <HomeLink />
      </header>
      <div className='p-3'>
        <div className='flex gap-4 flex-col md:flex-row'>
          <img
            className='md:w-3/12 self-start'
            src={getImageSrc(movieDetails.poster_path)}
            alt={movieDetails.title}
          />
          <div className='flex gap-2 flex-col'>
            <div className='flex gap-1'>
              <h1>{movieDetails.title}</h1>
              <h1 className='text-gray-500'>({movieDetails.vote_average})</h1>
            </div>

            <p>{movieDetails.release_date.split('-')[0]} | {movieDetails.runtime} mins</p>

            <p>Description: {movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <p>Something went wrong!</p>
}
