import { useCallback, useEffect, useState } from 'react'
import { db } from '@config/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { TweetData } from './tweets/tweets.types'
import ListOfTweets from './tweets/list-of-tweets'
import { useParams } from 'react-router'
import Navbar from './navbar/navbar'

export default function TweetsByUser () {
  const { userID } = useParams()
  const [userData, setUserData] = useState({})
  const [listOfTweets, setListOfTweets] = useState<TweetData[]>([])

  const getDocReference = useCallback(async () => {
    const q = query(collection(db, 'users'), where('username', '==', userID))
    const userRef = await getDocs(q)
    const userData = userRef.docs[0].data()
    return userData
  }, [userID])

  useEffect(() => {
    getDocReference()
      .then(data => {
        console.log(data)
        setUserData(data)
        setListOfTweets(data?.tweets ?? [])
      })
  }, [getDocReference])

  return (
    <>
      <Navbar />
      <h1>{userData.username}</h1>
      {listOfTweets && <ListOfTweets myTweets={listOfTweets} />}
    </>
  )
}
