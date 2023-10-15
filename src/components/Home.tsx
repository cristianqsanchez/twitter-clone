import { useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import appFirebase, { db } from '@config/firebase'
import { collection, getDoc, getDocs, query, doc, addDoc, onSnapshot, getFirestore, setDoc, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

function Home () {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [listUserFollow, setListUserFollow] = useState([])
  const [following, setFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const location = useLocation()
  const { state } = location

  const { fullname, id } = state

  // function for to show user list

  useEffect(() => {
    const getList = async () => {
      try {
        const idUser = id
        const usersRef = collection(db, 'users')
        const q = query(usersRef)
        const querySnapshot = await getDocs(q)
        const docs = []
        querySnapshot.forEach((doc) => {
          if (doc.id !== idUser) {
            docs.push({ ...doc.data(), id: doc.id })
          }
          // if (idUser && idUser.following && idUser.following.includes(doc.id)) {
          //   setFollowing(true)
          // } else {
          //   setFollowing(false)
          // }
        })
        setList(docs)
      } catch (error) {
        console.log(error)
      }
      try {
        const userDoc = doc(db, 'users', id)
        const userSnapshot = await getDoc(userDoc)
        const userData = userSnapshot.data()
        if (userData && userData.following) {
          setFollowingCount(userData.following.length)
        }
      } catch (error) {
        console.log(error)
      }

      try {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('following', 'array-contains', id))
        const querySnapshot = await getDocs(q)
        setFollowersCount(querySnapshot.size)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [list])

  // useEffect(() => {
  //   const getFollowersCount = async () => {
     
  //   }
  //   getFollowersCount()
  // }, [id])
  const followUser = async (userIdToFollow) => {
    const users = doc(db, 'users', id)

    if (following) {
      await updateDoc(users, {
        following: arrayRemove(userIdToFollow)
      })
    } else {
      await updateDoc(users, {
        following: arrayUnion(userIdToFollow)
      })
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <h1 className='dark:text-white'>Welcome {fullname}</h1>
        <button
          className='"text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={() => navigate('/')}>Sign Out
        </button>
        <div className="flex flex-col items-right justify-left px-6 py-8 mx-auto md:h-screen">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <a href="/home"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => followUser(list.id)}
                >Followers</a>
                <p>{followersCount}</p>
                <a href="/home"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => followUser(list.id)}
                >Following</a>
                <p>{followingCount}</p>
              </div>
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className='dark:text-white'>Who to Follow</h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {list.map(list => (
                    <tbody key={list.id}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {list.fullname}
                        </th>
                        <td className="px-6 py-4">
                          @{list.username}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a href="/home"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => followUser(list.id)}
                          >{following ? 'Unfollow' : 'Follow'}</a>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
