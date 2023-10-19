import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import './index.css'
import Followers from './components/Followers'
import Following from './components/Following'
import { FirebaseAuthProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FirebaseAuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
      </Routes>
    </BrowserRouter>
  </FirebaseAuthProvider>
)
