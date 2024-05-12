// Import necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

function AppRouter() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Login />} />
          {/* <Route path="/search" element={<Home />} /> */}
        </>
      }
    />
  )
}

export default AppRouter
