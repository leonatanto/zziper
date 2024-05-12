// Import necessary components from react-router-dom
import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createHashRouter, RouterProvider } from 'react-router-dom' // Change BrowserRouter to HashRouter
import Home from './pages/Home'
import Login from './pages/Login'
import '../styles.css'

const router = createHashRouter([ // Change createBrowserRouter to createHashRouter
  {
    path: '',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Add RouterProvider with the hash router */}
    {/* <App /> */}
  </React.StrictMode>
)
