import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import Footer from './components/Footer'

const RootLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  // Pages where footer should not be displayed
  const pagesWithoutFooter = ['/auth'];
  const shouldShowFooter = !pagesWithoutFooter.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar/>}
      <main className="flex-grow">
        <Outlet/>
      </main>
      {shouldShowFooter && <Footer/>}
    </div>
  )
}

export default RootLayout;