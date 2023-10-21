import Tweet from './tweet-card'
import { TweetData } from './tweets.types'

export default function ListOfTweets ({ myTweets, followedUserTweets = [] }: { myTweets: TweetData[], followedUserTweets: TweetData[] }) {
  const tweets = myTweets.concat(followedUserTweets.flat(1))
  const sortedTweets = tweets.sort((a, b) => b.date - a.date)
  return (
    <main className='grid place-content-center'>
        <ul className='max-w-prose'>
          {sortedTweets?.map((tweet, id) => (
            <li key={id}>
              <Tweet {...tweet} />
            </li>
          ))}
        </ul>
    </main>

  )
}
