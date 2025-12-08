import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { LogoutUser } from '../api/User.api';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Debug user data
  useEffect(() => {
    if (user) {
      console.log('NavBar - User data:', user);
      console.log('NavBar - User name:', user.name);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      // Clear localStorage immediately
      localStorage.removeItem('authState');
      
      // Call API to clear server cookie
      await LogoutUser();
    } catch (error) {
      console.error('Logout API failed:', error);
    }
    
    // Always clear Redux state and navigate
    dispatch(logout());
    setMobileMenuOpen(false);
    
    // Force a page reload to ensure clean state
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative backdrop-blur-lg bg-white/80 border border-gray-200/50 rounded-2xl shadow-lg transition-all duration-300 ${
          scrolled ? 'shadow-xl' : 'shadow-md'
        }`}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
                  L
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Linkly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user?.data?.user?.name || user?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-red-600 border-2 border-gray-200 hover:border-red-300 rounded-xl transition-all duration-200 hover:shadow-md"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    search={{ mode: 'login' }}
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-indigo-600 border-2 border-gray-200 hover:border-indigo-300 rounded-xl transition-all duration-200 hover:shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: 'register' }}
                    className="relative px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50 px-6 py-4 space-y-3 animate-fade-in">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-gray-700">
                      {user?.data?.user?.name || user?.name || 'User'}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    search={{ mode: 'login' }}
                    className="block px-4 py-3 text-center text-gray-700 hover:bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: 'register' }}
                    className="block px-4 py-3 text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;