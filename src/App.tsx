import { useState } from 'react'
import appFirebase from '@config/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import SignIn from './components/SignIn'
import Home from './components/Home'


function App () {


  // const [user, setUser] = useState(null)
  // onAuthStateChanged(auth, (userFirebase) => {
  //   if (userFirebase) {
  //     setUser(userFirebase)
  //   } else {
  //     setUser(null)
  //   }
  // })
  // return (
  //     <div>
  //       { user ? <Home email = {user.email} /> : <SignIn/>}
  //     </div>
  // )
}

export default App
