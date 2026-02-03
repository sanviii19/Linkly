import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import Footer from './components/Footer'

const RootLayout = () => {
  const location = useLocation();
  
  // Pages where navbar and footer should not be displayed
  const pagesWithoutLayout = ['/auth', '/protected', '/link-not-active'];
  const shouldShowLayout = !pagesWithoutLayout.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowLayout && <Navbar/>}
      <main className="flex-grow">
        <Outlet/>
      </main>
      {shouldShowLayout && <Footer/>}
    </div>
  )
}

export default RootLayout;