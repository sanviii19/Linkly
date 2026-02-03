import { useState, useRef } from 'react'
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

  const [showCustomSlug, setShowCustomSlug] = useState(false);
  const [showScheduleActivation, setShowScheduleActivation] = useState(false);
  const [activeFrom, setActiveFrom] = useState("");
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
      if (activeFrom) {
        payload.activeFrom = activeFrom;
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create`, payload, {
        withCredentials: true
      });

      if (typeof data === 'string') {
        setShortUrl(data);
        setQrCode("");
      } else {
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input Group */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long link here..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-violet-100 rounded-2xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100/50 transition-all duration-300 font-medium text-gray-700 shadow-sm hover:border-violet-300"
            required
          />
        </div>

        {/* Custom Slug Toggle (Authenticated Only) */}
        {isAuthenticated && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowCustomSlug(!showCustomSlug)}
              className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors ml-1"
            >
              <svg className={`w-4 h-4 transition-transform duration-200 ${showCustomSlug ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Customize link (Optional)
            </button>

            {showCustomSlug && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-bold text-sm">/</span>
                  </div>
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="custom-alias"
                    className="w-full pl-8 pr-4 py-3 bg-white border-2 border-violet-100 rounded-xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100/50 transition-all duration-300 font-medium text-gray-700 text-sm shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}



        {/* Activation Time (Authenticated Only) */}
        {isAuthenticated && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowScheduleActivation(!showScheduleActivation)}
              className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors ml-1"
            >
              <svg className={`w-4 h-4 transition-transform duration-200 ${showScheduleActivation ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Schedule Activation (Optional)
            </button>

            {showScheduleActivation && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="relative group">
                  <label className="text-xs font-semibold text-gray-500 mb-1 block ml-1 uppercase tracking-wider">
                    Activation Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="datetime-local"
                      value={activeFrom}
                      onChange={(e) => setActiveFrom(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-violet-100 rounded-xl outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100/50 transition-all duration-300 font-medium text-gray-700 text-sm shadow-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}



        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-violet-500/30 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <DotLoader size={24} color="#ffffff" />
          ) : (
            <>
              <span>Shorten Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        {/* Success Result Card */}
        {ShortUrl && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-violet-100 rounded-2xl p-1 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-violet-300"></div>

              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Success! Your link is ready</p>

                <div className="flex flex-col sm:flex-row items-center gap-3 bg-violet-50 rounded-xl p-2 border border-violet-100">
                  <div className="flex-1 w-full min-w-0 px-2">
                    <a
                      href={ShortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-700 font-bold hover:underline truncate block text-lg"
                    >
                      {ShortUrl}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopy}
                      type="button"
                      className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${isCopied
                        ? 'bg-green-500 text-white shadow-green-500/30 shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-violet-300 hover:text-violet-600 shadow-sm'
                        }`}
                    >
                      {isCopied ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                          Copy
                        </>
                      )}
                    </button>

                    {qrCode && isAuthenticated && (
                      <button
                        onClick={() => setShowQrCode(!showQrCode)}
                        type="button"
                        className={`p-2.5 rounded-lg border transition-all duration-200 ${showQrCode
                          ? 'bg-violet-100 border-violet-300 text-violet-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600'
                          }`}
                        title="Toggle QR Code"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded QR Code View */}
                {showQrCode && qrCode && isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-center animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 bg-white rounded-xl shadow-md border border-gray-100">
                      <img src={qrCode} alt="QR Code" className="w-32 h-32 rounded-lg" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-gray-500">Scan to visit</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default UrlForm