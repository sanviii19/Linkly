import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UrlForm from '../components/UrlForm'
import UserUrls from '../components/UserUrls'

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16 px-4">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                Welcome back, <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400">{user?.data?.user?.name || user?.name || 'User'}</span>
              </h1>
              <p className="text-white/70 text-lg">
                Manage and track your shortened links
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-linear-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105">
                <span className="text-xl font-semibold">
                  {(user?.data?.user?.name || user?.name)?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* URL Shortener Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl hover:border-white/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Create Short Link
              </h2>
            </div>
            <UrlForm />
          </div>
        </div>

        {/* URLs List Section */}
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl hover:border-white/30 transition-all duration-300">
            <UserUrls />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;