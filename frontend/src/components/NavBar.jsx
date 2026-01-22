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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-gray-200 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shadow-lg" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", cursive' }}>
                L
              </div>
            </div>
            <span className="text-4xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-300 tracking-tight" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", cursive' }}>
              Linkly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-5 py-2 text-gray-800 hover:text-indigo-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/30">
                      {(user?.data?.user?.avatar || user?.avatar) ? (
                        <img 
                          src={user?.data?.user?.avatar || user?.avatar} 
                          alt="Profile"
                          className="w-8 h-8 rounded-full shadow-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                          {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-800">
                        {user?.data?.user?.name || user?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2 text-sm font-semibold text-gray-800 hover:text-red-600 bg-white/30 backdrop-blur-sm border border-white/30 hover:border-red-400/50 rounded-full transition-all duration-300 hover:scale-105"
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
                    className="px-6 py-2 text-sm font-semibold text-gray-800 hover:text-gray-200 bg-white/30 backdrop-blur-sm border border-white/30 hover:border-gray-300/50 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: 'signup' }}
                    className="relative px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
            <div className="md:hidden border-t border-white/20 px-6 py-4 space-y-2 backdrop-blur-md bg-white/10 animate-fade-in">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-3 bg-white/30 backdrop-blur-sm rounded-full border border-white/30">
                    {(user?.data?.user?.avatar || user?.avatar) ? (
                      <img 
                        src={user?.data?.user?.avatar || user?.avatar} 
                        alt="Profile"
                        className="w-10 h-10 rounded-full shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="font-medium text-gray-800">
                      {user?.data?.user?.name || user?.name || 'User'}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-gray-800 hover:bg-white/40 rounded-full font-medium transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-100/50 rounded-full font-medium transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    search={{ mode: 'login' }}
                    className="block px-4 py-3 text-center text-gray-800 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full font-semibold transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: 'signup' }}
                    className="block px-4 py-3 text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold shadow-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    
  );
};

export default NavBar;