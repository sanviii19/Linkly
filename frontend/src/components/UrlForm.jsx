import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { DotLoader } from 'react-spinners';

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [customSlug, setCustomSlug] = useState("");
  const [ShortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowQrCode(false); // Reset QR code visibility on new submission
    try {
      const payload = { url };
      if (customSlug && customSlug.trim()) {
        payload.slug = customSlug.trim();
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create`, payload, {
        withCredentials: true
      });

      // Handle different response formats
      if (typeof data === 'string') {
        // Non-authenticated user: just the URL string
        setShortUrl(data);
        setQrCode("");
      } else {
        // Authenticated user: object with shortUrl and qrCode
        setShortUrl(data.shortUrl);
        setQrCode(data.qrCode || "");
      }

      console.log('Shortened URL:', data);
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert(error.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ShortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  }

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex gap-3 w-full flex-wrap">
          <div className="relative flex-1 min-w-[250px]">
            <input
              type="url"
              id="url"
              className="w-full px-4 py-3 text-sm bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-xl outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 placeholder:text-gray-500"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          {isAuthenticated && (
            <div className="relative flex-1 min-w-[250px]">
              <input
                type="text"
                id="customSlug"
                className="w-full px-4 py-3 text-sm bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-xl outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 placeholder:text-gray-500"
                value={customSlug}
                onInput={(e) => setCustomSlug(e.target.value)}
                placeholder="custom-slug (optional)"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="px-6 py-3 text-sm font-bold text-white bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-[130px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <DotLoader size={16} color="#ffffff" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Shorten</span>
              </>
            )}
          </button>
        </div>
      </form>



      {ShortUrl && (
        <div className="mt-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="m-0 text-sm font-semibold text-white/90">
              Your link is ready!
            </p>
          </div>
          <div className="flex gap-2 items-center p-3 bg-white/90 rounded-xl flex-wrap">
            <a
              href={ShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] text-violet-600 font-semibold no-underline break-all text-sm hover:text-violet-700 hover:underline flex items-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {ShortUrl}
            </a>
            <button
              className={`px-4 py-2 text-sm font-bold rounded-lg cursor-pointer transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${isCopied
                  ? 'bg-green-500 text-white scale-105'
                  : 'text-white bg-violet-600 hover:bg-violet-700 hover:scale-105'
                }`}
              onClick={handleCopy}
            >
              {isCopied ? (
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
          </div>

          {/* QR Code Display for Authenticated Users - Hidden by default */}
          {qrCode && isAuthenticated && (
            <div className="mt-4">
              <button
                onClick={() => setShowQrCode(!showQrCode)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-violet-400 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {showQrCode ? 'Hide QR Code' : 'Show QR Code'}
              </button>
              
              {showQrCode && (
                <div className="mt-4 flex flex-col items-center animate-fadeIn">
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="w-40 h-40 rounded-lg"
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/70 text-center max-w-xs">
                    Scan this QR code to access your shortened URL
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UrlForm