import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Home from './components/Home'
import SignIn from './components/SignIn'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Auth.tsx'
import PrivateRoute from './PrivateRoute.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: 'home',
    element: <Home />
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
