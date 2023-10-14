import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
