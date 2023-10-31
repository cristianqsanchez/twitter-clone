import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '@config/firebase'
import { collection, getDoc, getDocs, query, doc, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import useSessionID from '@hooks/use-auth'
import Tweets from './tweets/tweets'
import Navbar from './navbar/navbar'

function Home() {
  const navigate = useNavigate()
  const { sessionID } = useSessionID()
  const [list, setList] = useState<{ id: string, fullname: string, username: string }[]>([])
  const [followingUsers, setFollowingUsers] = useState<string[]>([])
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const idUser = sessionID as string
  // Pagination settings
  const itemsPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  // Get users to display for the current page
  const usersToDisplay = list.slice(startIndex, endIndex)
  // function for to show user list

  const getList = useCallback(async () => {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef)
      const querySnapshot = await getDocs(q)
      const docs = []
      querySnapshot.forEach((doc) => {
        if (doc.id !== idUser) {
          docs.push({ ...doc.data(), id: doc.id })
        }
      })
      setList(docs)
    } catch (error) {
      console.log(error)
    }
    try {
      const userDoc = doc(db, 'users', idUser)
      const userSnapshot = await getDoc(userDoc)
      const userData = userSnapshot.data()
      if (userData && userData.following) {
        setFollowingCount(userData.following.length)
        setFollowingUsers(userData.following)
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('following', 'array-contains', idUser))
      const querySnapshot = await getDocs(q)
      setFollowersCount(querySnapshot.size)
    } catch (error) {
      console.log(error)
    }
  }, [idUser])

  const followUser = async (userIdToFollow: string) => {
    console.log('Following user with ID:', userIdToFollow)
    try {
      if (!followingUsers.includes(userIdToFollow)) {
        const users = doc(db, 'users', idUser)
        await updateDoc(users, {
          following: arrayUnion(userIdToFollow)
        })
        console.log('User followed successfully.')
      } else {
        const users = doc(db, 'users', idUser)
        await updateDoc(users, {
          following: arrayRemove(userIdToFollow)
        })
        console.log(userIdToFollow)
      }
      await getList()
    } catch (error) {
      console.error('Error following/unfollowing user:', error)
    }
  }

  useEffect(() => {
    getList()
  }, [getList, idUser])
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 mx-auto md:h-screen grid grid-cols-3 gap-4">
        <div className='col-start-1 col-end-7'>
          <Navbar />
        </div>
        <div className="p-4 space-y-4 md:space-y-3 sm:p-8 col-start-1 col-end-1">
          <div className=" flex flex-row gap-4">
            <div>
              <p className='text-slate-50'>Followers</p>
              <a
                className='className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" '
                onClick={() => navigate('/followers', { state: { id: idUser } })}
              >{followersCount}</a>
            </div>
            <div>
              <p className='text-slate-50'>Following</p>
              <a
                className='className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" '
                onClick={() => navigate('/following', { state: { id: idUser } })}
              >{followingCount}</a>
            </div>
          </div>
        </div>
        <div className='col-start-2 col-end-2'>
          <Tweets />
        </div>
        <div className="p-6 space-y-2 md:space-y-3 sm:p-1 col-start-3 col-end-3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className='dark:text-white'>Who to Follow</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {usersToDisplay.map((user) => (
                <tbody key={user.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.fullname}
                    </th>
                    <td className="px-6 py-4">
                      @{user.username}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => followUser(user.id)}
                      >{followingUsers.includes(user.id) ? 'Unfollow' : 'Follow'}</a>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          {/* Pagination controls */}
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-blue-700 text-white rounded-md"
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-md"
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={endIndex >= list.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
