import React, { useCallback, useEffect, useState } from 'react'
import { db } from '@config/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { TweetData } from './tweets.types'
import ListOfTweets from './list-of-tweets'
import useSessionID from '@hooks/use-auth'

export default function Tweets () {
  const { sessionID } = useSessionID()
  const [userData, setUserData] = useState({})
  const [listOfTweets, setListOfTweets] = useState<TweetData[]>([])
  const [listOfFollowedTweets, setListOfFollowedTweets] = useState([])

  const getDocReference = useCallback(() => {
    return doc(db, 'users', String(sessionID))
  }, [sessionID])

  const getUserQuery = useCallback(async () => {
    const userRef = getDocReference()
    const userDoc = await getDoc(userRef)
    return userDoc.data()
  }, [getDocReference])

  const getFollowingUsersTweets = useCallback(async () => {
    const userRef = getDocReference()
    const userDoc = await getDoc(userRef)
    const followedUsers = userDoc.data()?.following

    if (!followedUsers) {
      return []
    }

    const tweetsPromises = followedUsers.map(async followedUserID => {
      const followedUserRef = doc(db, 'users', followedUserID)
      const followedUserDoc = await getDoc(followedUserRef)
      return followedUserDoc.data()?.tweets
    })

    const tweets = await Promise.all(tweetsPromises)
    return tweets.filter(Boolean)
  }, [getDocReference])

  useEffect(() => {
    getUserQuery()
      .then(data => {
        setUserData(data)
        setListOfTweets(data?.tweets ?? [])
      })
    getFollowingUsersTweets()
      .then(data => {
        setListOfFollowedTweets(data)
      })
  }, [getFollowingUsersTweets, getUserQuery])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data = new FormData(form)

    const content = data.get('content') as string

    const tweet: TweetData = {
      author: userData.fullname,
      username: userData.username,
      content,
      date: Date.now()
    }

    setListOfTweets([...listOfTweets, tweet])
    await updateDoc(getDocReference(), {
      ...userData,
      tweets: [...userData.tweets, tweet]
    })
  }

  return (
    <>
      <form className="flex-col" onSubmit={handleSubmit}>
        <textarea className="text-gray-950 w-full py-2 px-4" name="content" minLength={1} maxLength={280} placeholder='Write something...' />
        <div className='flex justify-end'>
          <button className="bg-blue-500 py-2 px-4 rounded-lg text-white font-bold">Post</button>
        </div>
      </form>
      {listOfTweets && listOfFollowedTweets && <ListOfTweets myTweets={listOfTweets} followedUserTweets={listOfFollowedTweets} />}
    </>
  )
}
