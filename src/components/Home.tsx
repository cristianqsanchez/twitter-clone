import { getAuth, signOut } from 'firebase/auth'
import appFirebase from '@config/firebase'
const auth = getAuth(appFirebase)
import { useNavigate } from 'react-router-dom'

interface HomeProps {
  fullname: string;
}

function Home (props: HomeProps) {
  const navigate = useNavigate()
  return (
        <>
            <h1>Welcome, {props.fullname}!</h1>
            <button
            className='"text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={() => navigate('/')}>Sign Out</button>
       </>
  )
}

export default Home
