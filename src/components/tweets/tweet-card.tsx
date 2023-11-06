import { TweetData } from './tweets.types'
import { Link } from 'react-router-dom'
import { getTimeAgo } from '@utils/relative-time'

export default function Tweet ({ content, date, author, username }: TweetData) {
  return (
    <article className='flex-col bg-gray-950 w-full text-white m-2 p-4 rounded-2xl'>
      <header className='pb-2'>
        <Link className='font-bold' to={`/user/${username}`}>{author} </Link>
        <span className='opacity-30'>@{username} </span>
        <time className='opacity-30'>· {getTimeAgo(date)}</time>
      </header>
      <main>
        <p>{content}</p>
      </main>
    </article>
  )
}
