import { useState } from 'react'
import appFirebase from '../src/credentials'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import SignIn from './components/SignIn'
import Home from './components/Home'
const auth = getAuth(appFirebase)

function App () {
  const [user, setUser] = useState(null)
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase)
    } else {
      setUser(null)
    }
  })
  return (
      <div>
        { user ? <Home email = {user.email} /> : <SignIn/>}
      </div>
  )
}

export default App
