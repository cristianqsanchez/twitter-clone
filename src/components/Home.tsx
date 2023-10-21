import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '@config/firebase'
import { collection, getDoc, getDocs, query, doc, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

function Home () {
  const navigate = useNavigate()
  const [list, setList] = useState<{ id: string, fullname: string, username: string }[]>([])
  const [followingUsers, setFollowingUsers] = useState<string[]>([])
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const location = useLocation()
  const { state } = location
  const { fullname, id } = state
  const idUser = id
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
      const userDoc = doc(db, 'users', id)
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
      const q = query(usersRef, where('following', 'array-contains', id))
      const querySnapshot = await getDocs(q)
      setFollowersCount(querySnapshot.size)
    } catch (error) {
      console.log(error)
    }
  }, [id, idUser])

  const followUser = async (userIdToFollow: string) => {
    console.log('Following user with ID:', userIdToFollow)
    try {
      if (!followingUsers.includes(userIdToFollow)) {
        const users = doc(db, 'users', id)
        await updateDoc(users, {
          following: arrayUnion(userIdToFollow)
        })
        console.log('User followed successfully.')
      } else {
        const users = doc(db, 'users', id)
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
  }, [getList, id, idUser])
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 mx-auto md:h-screen">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/home" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Twitter</span>
            </a>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <button
                    className='"text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={() => navigate('/')}>Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-right justify-left px-6 py-8">
          <h1 className='dark:text-white flex flex-col  items-center' >Welcome {fullname}</h1>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <p className='text-slate-50'>Followers</p>
                <a
                  className='className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" '
                  onClick={() => navigate('/followers', { state: { id: idUser, fullname } })}
                >{followersCount}</a>
                <p className='text-slate-50'>Following</p>
                <a
                  className='className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" '
                  onClick={() => navigate('/following', { state: { id: idUser, fullname } })}
                >{followingCount}</a>
              </div>
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
        </div>
      </div>
    </>
  )
}

export default Home
