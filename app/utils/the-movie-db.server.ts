import { fetch as baseFetch } from '@remix-run/node'

// const { API_KEY } = process.env

const BASE_URL = 'https://api.themoviedb.org/3'

export function getUrl (endpoint: string, queryStrings: object = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  for (let [key, value] of Object.entries(queryStrings)) {
    if (value) {
      url.searchParams.set(key, value)
    }
  }
  return url
}

export function fetch (
  endpoint: Parameters<typeof baseFetch>[0],
  options: Parameters<typeof baseFetch>[1] = {}
) {
  return baseFetch(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmYxYzA2ZDg3NTExMWI5NjFiOWRkYjhjNTYyOTljYyIsInN1YiI6IjY0ZGZiOTg3YTNiNWU2MDEzOTAxNzBmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92H4nfrIRN5naliT5hD7Oo7kCE-GuQPv42z9kcVi-YE`,
      ...(options.headers || {})
    }
  }).then(res => res.json())
}
