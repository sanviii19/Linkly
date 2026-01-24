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
  const [expandedQrId, setExpandedQrId] = useState(null);
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
        <div className="text-center p-10 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl">
          <svg className="w-12 h-12 mx-auto mb-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-1">Authentication Required</h3>
          <p className="text-white/70 text-sm">Please login to view your shortened URLs</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="text-center p-10 flex flex-col items-center justify-center">
          <DotLoader size={50} color="#a78bfa" />
          <p className="mt-4 text-white/70 font-medium">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center">
          <svg className="w-10 h-10 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-300 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="w-full">
        <div className="text-center p-10 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-3 bg-violet-500/20 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-1">No URLs yet</h3>
          <p className="text-white/70">Start by shortening your first URL above!</p>
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

  const toggleQrCode = (id) => {
    setExpandedQrId(expandedQrId === id ? null : id);
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Your Links
          </h2>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/20 rounded-lg border border-violet-400/30">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-semibold text-violet-300">{urls.length} Links</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-semibold text-blue-300">{totalClicks} Clicks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-xl outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 text-sm placeholder:text-gray-500"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-xl outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 cursor-pointer text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="clicks">Most Clicks</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {/* URLs Grid */}
      <div className="space-y-3">
        {filteredAndSortedUrls.map((url, index) => (
          <div
            key={url._id}
            className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:border-white/30 hover:bg-white/15 transition-all duration-300 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Short URL */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center mt-0.5">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-violet-400 hover:text-violet-300 hover:underline break-all block"
                      >
                        {import.meta.env.VITE_BACKEND_URL}/{url.short_url}
                      </a>
                      <div className="flex items-center gap-2 mt-1">
                        <svg className="w-3.5 h-3.5 text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <p className="text-sm text-white/60 truncate" title={url.full_url}>
                          {url.full_url}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-lg">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm font-semibold text-violet-300">{url.clicks}</span>
                      <span className="text-sm text-white/60">clicks</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-lg">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-white/70">{new Date(url.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(url.short_url, url._id)}
                    className={`flex-1 lg:flex-none px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[100px] ${copiedId === url._id
                        ? 'bg-green-500 text-white scale-105'
                        : 'text-white bg-violet-600 hover:bg-violet-700 hover:scale-105'
                      }`}
                    title="Copy short URL"
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                  {url.qrCode && (
                    <button
                      onClick={() => toggleQrCode(url._id)}
                      className="flex-1 lg:flex-none px-4 py-2 text-sm font-semibold text-white/90 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[100px]"
                      title="Toggle QR Code"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      QR
                    </button>
                  )}
                </div>
              </div>

              {/* QR Code Display - Hidden by default */}
              {url.qrCode && expandedQrId === url._id && (
                <div className="mt-4 pt-4 border-t border-white/20 flex flex-col items-center animate-fadeIn">
                  <div className="p-3 bg-white rounded-xl shadow-lg">
                    <img
                      src={url.qrCode}
                      alt="QR Code"
                      className="w-32 h-32 rounded"
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/70 text-center">
                    Scan to access this link
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedUrls.length === 0 && searchTerm && (
        <div className="text-center p-8 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl">
          <svg className="w-10 h-10 mx-auto mb-2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-white/70">No links found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default UserUrls;