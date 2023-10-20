import { Route, Routes } from 'react-router'
import SignIn from './components/SignIn'
import Home from './components/Home'
import Followers from './components/Followers'
import Following from './components/Following'

function App () {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/following" element={<Following />} />
    </Routes>
  )
}
export default App
