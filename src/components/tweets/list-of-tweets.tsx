import Tweet from './tweet-card'
import { TweetData } from './tweets.types'

export default function ListOfTweets ({ myTweets, followedUserTweets }: { myTweets: TweetData[], followedUserTweets: TweetData[] }) {
  const tweets = myTweets.concat(followedUserTweets.flat(1))
  console.log(tweets)
  return (
    <main className='grid place-content-center'>
        <ul className='max-w-prose'>
          {tweets?.map((tweet, id) => (
            <li key={id}>
              <Tweet {...tweet} />
            </li>
          ))}
        </ul>
    </main>

  )
}
