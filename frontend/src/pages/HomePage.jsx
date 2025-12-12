import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { DotLoader } from 'react-spinners'

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { url };
      if (customSlug && customSlug.trim()) {
        payload.slug = customSlug.trim();
      }
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create`, payload, {
        withCredentials: true
      });
      setShortUrl(data);
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert(error.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-4">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Shorten Your Links,
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400">
              Expand Your Reach
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Transform long URLs into powerful, shareable links in seconds. Fast, reliable, and completely free.
          </p>

          {/* URL Shortener Form */}
          <div className="max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-long-url-here.com"
                  className="flex-1 px-6 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-2xl outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 placeholder:text-gray-500"
                  required
                />
                {isAuthenticated && (
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="custom-slug (optional)"
                    className="md:w-64 px-6 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-2xl outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 placeholder:text-gray-500"
                  />
                )}
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto px-12 py-4 text-lg font-bold text-white bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 mx-auto"
              >
                {isLoading ? (
                  <>
                    <DotLoader size={24} color="#ffffff" />
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Shorten URL
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            {shortUrl && (
              <div className="mt-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl animate-fade-in">
                <p className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-3">
                  Your shortened URL:
                </p>
                <div className="flex flex-col md:flex-row gap-3 items-center p-4 bg-white/90 rounded-xl">
                  <a 
                    href={shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 text-indigo-600 font-semibold text-lg break-all hover:underline"
                  >
                    {shortUrl}
                  </a>
                  <button 
                    onClick={handleCopy}
                    className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 whitespace-nowrap ${
                      isCopied 
                        ? 'bg-green-500 text-white scale-105' 
                        : 'bg-violet-600 text-white hover:bg-violet-700 hover:scale-105'
                    }`}
                  >
                    {isCopied ? '✓ Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {!isAuthenticated && (
            <p className="text-white/70 text-lg">
              <button 
                onClick={() => navigate({ to: '/auth', search: { mode: 'signup' } })}
                className="text-violet-400 hover:text-violet-300 font-semibold underline"
              >
                Sign up
              </button>
              {' '}to create custom short links and track analytics
            </p>
          )}
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-24">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-violet-200 to-purple-200">
              Powerful Tools,
            </span>
            <br />
            Effortless Management
          </h2>
          <p className="text-center text-white/70 text-xl mb-20 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, track, and optimize your short links — all in one beautiful platform
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {/* Feature 1 - Advanced Analytics */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-emerald-400 group-hover:to-teal-400 mb-4 relative inline-block transition-all duration-300">
                Advanced Analytics
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg shadow-emerald-400/50 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Track clicks, conversions, and user behavior with detailed insights and real-time reporting
              </p>
            </div>

            {/* Feature 2 - Custom Domains */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-teal-900/30 to-cyan-900/20 border border-teal-500/30 rounded-3xl p-8 hover:border-teal-400/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6">
                <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-teal-400 group-hover:to-cyan-400 mb-4 relative inline-block transition-all duration-300">
                Custom Domains
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-teal-400 to-cyan-400 rounded-full shadow-lg shadow-teal-400/50 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Use your own branded domain to create professional short links that build trust
              </p>
            </div>

            {/* Feature 3 - Team Collaboration */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 mb-4 relative inline-block transition-all duration-300">
                Team Collaboration
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/50 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Work together with your team, manage permissions, and share link analytics
              </p>
            </div>

            {/* Feature 4 - QR Code Generation */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/30 rounded-3xl p-8 hover:border-violet-400/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6">
                <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-violet-400 group-hover:to-purple-400 mb-4 relative inline-block transition-all duration-300">
                QR Code Generation
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-violet-400 to-purple-400 rounded-full shadow-lg shadow-violet-400/50 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Generate beautiful QR codes for your links instantly and share them anywhere
              </p>
            </div>

            {/* Feature 5 - Link Expiration */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-pink-900/30 to-rose-900/20 border border-pink-500/30 rounded-3xl p-8 hover:border-pink-400/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-pink-400 group-hover:to-rose-400 mb-4 relative inline-block transition-all duration-300">
                Link Expiration
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-pink-400 to-rose-400 rounded-full shadow-lg shadow-pink-400/50 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Set expiration dates for your links and maintain control over your content
              </p>
            </div>

            {/* Feature 6 - Password Protection */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-900/30 to-blue-900/20 border border-indigo-500/30 rounded-3xl p-8 hover:border-indigo-400/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6">
                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-indigo-400 group-hover:to-blue-400 mb-4 relative inline-block transition-all duration-300">
                Password Protection
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-indigo-400 to-blue-400 rounded-full shadow-lg shadow-indigo-400/50 transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                Secure your links with password protection for sensitive content
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden mt-20 p-16">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Ready to Amplify
                <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400">
                  Your Online Presence?
                </span>
              </h2>
              
              <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Create branded links, track every click, and grow your reach
              </p>

              <div className="flex flex-col gap-6 justify-center items-center">
                <button 
                  onClick={() => navigate({ to: '/auth', search: { mode: 'signup' } })}
                  className="group px-10 py-4 text-lg font-bold text-white bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 flex items-center gap-3"
                >
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Get Started
                </button>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mt-15">
                  <div className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-violet-500/20 rounded-full flex items-center justify-center border border-violet-400/30 transition-all duration-300 group-hover:bg-violet-500/40 group-hover:border-violet-400/60 group-hover:shadow-lg group-hover:shadow-violet-400/50">
                      <svg className="w-7 h-7 text-violet-400 transition-all duration-300 group-hover:text-violet-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-medium transition-colors group-hover:text-white">Custom Domain</span>
                  </div>

                  <div className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-400/30 transition-all duration-300 group-hover:bg-purple-500/40 group-hover:border-purple-400/60 group-hover:shadow-lg group-hover:shadow-purple-400/50">
                      <svg className="w-7 h-7 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-medium transition-colors group-hover:text-white">Secure & Reliable</span>
                  </div>

                  <div className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-400/30 transition-all duration-300 group-hover:bg-indigo-500/40 group-hover:border-indigo-400/60 group-hover:shadow-lg group-hover:shadow-indigo-400/50">
                      <svg className="w-7 h-7 text-indigo-400 transition-all duration-300 group-hover:text-indigo-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-medium transition-colors group-hover:text-white">QR Codes</span>
                  </div>

                  <div className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-14 h-14 bg-violet-500/20 rounded-full flex items-center justify-center border border-violet-400/30 transition-all duration-300 group-hover:bg-violet-500/40 group-hover:border-violet-400/60 group-hover:shadow-lg group-hover:shadow-violet-400/50">
                      <svg className="w-7 h-7 text-violet-400 transition-all duration-300 group-hover:text-violet-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm font-medium transition-colors group-hover:text-white">Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage