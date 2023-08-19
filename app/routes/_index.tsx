import type {
  LoaderArgs,
  V2_MetaFunction
} from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import * as movie from '~/models/movie.server'
import type { MovieListItem } from '~/types'
import { getImageSrc } from '~/utils'
import { HomeLink } from '~/components'
import clsx from 'clsx'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export async function loader({ request }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get('s')
  const page = searchParams.get('page')
  const data = !query
    ? await movie.getList({ page })
    : await movie.searchMovies({ query, page })
  return { data, query }

}

function Card({ movie }: { movie: MovieListItem }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      prefetch='intent'
      className='flex-grow flex-shrink-1 basis-40'
    >
      <div className='shadow bg-white rounded'>
        {movie.poster_path ? (
          <img
            src={getImageSrc(movie.poster_path)}
            alt={movie.title}
            width={200}
          />
        ) : (
          <div className='bg-gray-300 h-48 w-48' />
        )}
        <div className='p-2'>
          <div className='flex justify-between text-sm'>
            <p className='w-24 truncate'>{movie.title}</p>
            <p className='text-gray-500'>{`(${movie.vote_average})`}</p>
          </div>
          {/* <div className='py-2'>
            <p className='text-gray-500 w-24 truncate-lines-2'>{`${movie.overview}`}</p>
          </div> */}
        </div>
      </div>
    </Link>
  )
}

export default function Index() {
  const { data, query } = useLoaderData<typeof loader>()
  return (
    <div>
      <header className='shadow p-3 flex justify-between items-center'>
        <Form className='w-1/2'>
          <input
            type='search'
            name='s'
            className='bg-gray-300 rounded p-2 w-full'
            placeholder='Search'
            defaultValue={''}
          />
        </Form>
        <HomeLink />
      </header>

      {!(data.results || []).length ? (
        <div>
          <p>No movies found!</p>
          <Link to='/'>Go to home page</Link>
        </div>
      ) : (
        <div className='p-3 flex flex-col gap-4'>
          <div className='flex gap-4 flex-wrap'>
            {data.results.map(movie => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
          <div className='flex justify-between items-center'>
            <span>Total results: {data.total_results}</span>
            <div className='flex gap-4'>
              <Link
                replace
                className={clsx(
                  data.page === 1 &&
                  'no-underline text-gray-400 pointer-events-none'
                )}
                to={`?page=${data.page - 1}${query ? `&s=${query}` : ''}`}
              >
                Previous
              </Link>
              <span>
                {data.page} of {data.total_pages}
              </span>
              <Link
                prefetch='intent'
                className={clsx(
                  data.page === data.total_pages &&
                  'no-underline text-gray-400 pointer-events-none'
                )}
                to={`?page=${data.page + 1}${query ? `&s=${query}` : ''}`}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ErrorBoundary() {
  return <p>Something went wrong!</p>
}
