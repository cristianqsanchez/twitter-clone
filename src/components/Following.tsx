import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import appFirebase, { db } from '@config/firebase'
import { collection, getDoc, getDocs, query, doc, addDoc, onSnapshot, getFirestore, setDoc, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

function Following() {
  const location = useLocation()
  const { state } = location
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const { fullname, id } = state
  const idUser = id
  useEffect(() => {
    const getList = async () => {
      try {
        // Paso 1: Consulta el arreglo 'following' para el usuario autenticado
        const userDocRef = doc(db, 'users', idUser)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userFollowingArray = userDoc.data().following

          // Establece el arreglo 'following' en el estado
          setList(userFollowingArray || [])
        } else {
          console.log('Usuario no encontrado.')
        }
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
                        <a onClick={() => navigate('/home', { state: { id: idUser, fullname: fullname } })} className="flex items-center">
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
                <section className='flex flex-col items-center justify-left px-6 py-8 '>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <h1 className='dark:text-white'>Following</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    {list.map((userId, index)=> (
                                        <tbody key={index}>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {userId}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {/* @{list.username} */}
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