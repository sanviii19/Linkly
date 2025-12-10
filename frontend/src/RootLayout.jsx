import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50">
      {!isAuthPage && <Navbar/>}
      <main className={!isAuthPage ? "pt-24" : ""}>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout;