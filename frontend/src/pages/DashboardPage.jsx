import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UrlForm from '../components/UrlForm'
import UserUrls from '../components/UserUrls'

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ totalUrls: 0, totalClicks: 0, recentUrls: 0 });

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-4">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.data?.user?.name || user?.name || 'User'}! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage your links and track their performance
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-300/50 transform hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl font-bold">
                    {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* URL Shortener Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Create New Short Link
              </h2>
            </div>
            <UrlForm />
          </div>
        </div>

        {/* URLs List Section */}
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-2xl">
            <UserUrls />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;