import { Link } from '@remix-run/react'
import { FaHome } from 'react-icons/fa'

export function HomeLink () {
  return (
    <Link to='/' prefetch='intent' replace>
      <FaHome className='text-2xl' />
    </Link>
  )
}
