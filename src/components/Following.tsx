import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import appFirebase, { db } from '@config/firebase'
import { collection, getDoc, getDocs, query, doc, addDoc, onSnapshot, getFirestore, setDoc, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

function Following() {
  const location = useLocation()
  const { state } = location
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const { id } = state
  const idUser = id
  useEffect(() => {
    const getList = async () => {
      try {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('following', 'array-contains', id))
        const querySnapshot = await getDocs(q)
        const docs = []
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: idUser.following.includes(doc.id) })
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
    }
    getList()
  }, [list])

  return (
        <>
            <div className="bg-gray-50 dark:bg-gray-900 mx-auto md:h-screen">
                <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a onClick={() => navigate('/home')} className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Twitter</span>
                        </a>
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="/home" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                                </li>
                                <button
                                    className='"text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                    onClick={() => navigate('/')}>Sign Out
                                </button>
                                <li>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section className='flex flex-col items-center justify-left px-6 py-8 '>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <h1 className='dark:text-white'>Following</h1>
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
                                            // onClick={() => followUser(list.id)}
                                            >
                                                {/* {following ? 'Unfollow' : 'Follow'} */}
                                            </a>
                                        </td>
                                    </tr>
                                    </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
  )
}
export default Following