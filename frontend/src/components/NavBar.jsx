import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { LogoutUser } from '../api/User.api';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

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
    setProfileDropdownOpen(false);

    // Force a page reload to ensure clean state
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-violet-950/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-15xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-2 group"
          >
            <img
              src="/logo2.png"
              alt="Linkly"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative profile-dropdown-container">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                  >
                    {(user?.data?.user?.avatar || user?.avatar) ? (
                      <img
                        src={user?.data?.user?.avatar || user?.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-inner">
                        {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-white font-medium text-sm">
                      {user?.data?.user?.name || user?.name || 'User'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-white/60 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-violet-100/95 backdrop-blur-lg rounded-xl shadow-xl border border-violet-200/50 overflow-hidden animate-fade-in origin-top-right">
                      <div className="p-4 border-b border-violet-200/50 flex items-center gap-3">
                        {(user?.data?.user?.avatar || user?.avatar) ? (
                          <img
                            src={user?.data?.user?.avatar || user?.avatar}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-linear-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-inner">
                            {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.data?.user?.name || user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.data?.user?.email || user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="p-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-violet-600 hover:bg-violet-200/50 rounded-lg transition-colors font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="text-white/70 hover:text-white font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
                <Link
                  to="/auth"
                  search={{ mode: 'login' }}
                  className="relative text-white/70 hover:text-white font-medium transition-colors group"
                >
                  Log In
                  <svg
                    className="absolute -bottom-2 left-0 w-0 group-hover:w-full transition-all duration-300 overflow-visible"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    style={{ height: '8px' }}
                  >
                    <path
                      d="M0,4 Q5,1 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4"
                      fill="none"
                      stroke="url(#silverGradient)"
                      strokeWidth="2.5"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 15px rgba(255,255,255,0.6))'
                      }}
                    />
                    <defs>
                      <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: 'signup' }}
                  className="px-5 py-2.5 text-sm font-semibold text-violet-900 bg-violet-100 hover:bg-violet-200 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 p-4 shadow-2xl animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                    {(user?.data?.user?.avatar || user?.avatar) ? (
                      <img
                        src={user?.data?.user?.avatar || user?.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{user?.data?.user?.name || user?.name || 'User'}</p>
                      <p className="text-white/50 text-xs">{user?.data?.user?.email || user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    search={{ mode: 'login' }}
                    className="block px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl text-center transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: 'signup' }}
                    className="block px-4 py-3 text-gray-900 bg-white hover:bg-gray-100 rounded-xl text-center font-bold shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;