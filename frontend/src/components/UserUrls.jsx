import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DotLoader } from 'react-spinners';

const UserUrls = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'clicks', 'alphabetical'
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUrls = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/urls`,
          { withCredentials: true }
        );
        setUrls(data.data.urls);
      } catch (err) {
        console.error('Error fetching URLs:', err);
        setError(err.response?.data?.message || 'Failed to fetch URLs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrls();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="w-full">
        <div className="text-center p-12 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
          <svg className="w-16 h-16 mx-auto mb-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Authentication Required</h3>
          <p className="text-gray-600">Please login to view your shortened URLs</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="text-center p-12 flex flex-col items-center justify-center">
          <DotLoader size={60} color="#4F46E5" />
          <p className="mt-4 text-gray-600 font-medium">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="w-full">
        <div className="text-center p-12 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-200">
          <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">No URLs yet</h3>
          <p className="text-gray-600 text-lg">Start by shortening your first URL above! 🚀</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = async (url, id) => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/${url}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Filter and sort URLs
  const filteredAndSortedUrls = urls
    .filter(url => 
      url.full_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.short_url.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'clicks') return b.clicks - a.clicks;
      if (sortBy === 'alphabetical') return a.short_url.localeCompare(b.short_url);
      return new Date(b.createdAt) - new Date(a.createdAt); // recent
    });

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="w-full">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Links
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-semibold text-indigo-700">{urls.length} Links</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-semibold text-purple-700">{totalClicks} Total Clicks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pl-12 border-2 border-gray-300 rounded-xl outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-5 py-3 border-2 border-gray-300 rounded-xl outline-none transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 cursor-pointer bg-white"
        >
          <option value="recent">Most Recent</option>
          <option value="clicks">Most Clicks</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {/* URLs Grid */}
      {/* URLs Grid */}
      <div className="space-y-4">
        {filteredAndSortedUrls.map((url, index) => (
          <div
            key={url._id}
            className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Short URL */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="shrink-0 w-12 h-12 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-indigo-600 hover:text-indigo-700 hover:underline break-all block"
                      >
                        {import.meta.env.VITE_BACKEND_URL}/{url.short_url}
                      </a>
                      <div className="flex items-center gap-2 mt-1">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <p className="text-sm text-gray-500 truncate" title={url.full_url}>
                          {url.full_url}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm font-bold text-indigo-700">{url.clicks}</span>
                      <span className="text-sm text-gray-600">clicks</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-purple-700">{new Date(url.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:flex-col lg:items-stretch">
                  <button
                    onClick={() => copyToClipboard(url.short_url, url._id)}
                    className={`flex-1 lg:flex-none px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      copiedId === url._id
                        ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                        : 'text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-105'
                    }`}
                    title="Copy short URL"
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 lg:flex-none px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    title="Visit URL"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedUrls.length === 0 && searchTerm && (
        <div className="text-center p-8 bg-gray-50 rounded-2xl">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-600">No links found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default UserUrls;