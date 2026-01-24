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
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
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
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl outline-none transition-all duration-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-400"
                    value={url}
                    onInput={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/your-long-url"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
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
                      className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl outline-none transition-all duration-300 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 placeholder:text-gray-400"
                      value={customSlug}
                      onInput={(e) => setCustomSlug(e.target.value)}
                      placeholder="custom-slug (optional)"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                  </div>
                )}
                <button 
                  type="submit" 
                  className="px-8 py-4 text-base font-semibold text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-[140px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <DotLoader size={20} color="#ffffff" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Shorten</span>
                    </>
                  )}
                </button>
            </div>
        </form>


        
        {ShortUrl && (
            <div className="mt-8 p-6 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 animate-fade-in shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="m-0 text-sm font-bold text-gray-700 uppercase tracking-wide">
                    ✨ Your shortened URL is ready!
                  </p>
                </div>
                <div className="flex gap-3 items-center p-4 bg-white rounded-xl border-2 border-indigo-300 shadow-md flex-wrap">
                    <a 
                        href={ShortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 min-w-[200px] text-indigo-600 font-semibold no-underline break-all text-base hover:text-indigo-700 hover:underline flex items-center gap-2"
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {ShortUrl}
                    </a>
                    <button 
                        className={`px-6 py-2.5 text-sm font-bold rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                            isCopied 
                                ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200 scale-105' 
                                : 'text-white bg-linear-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:scale-105 active:scale-95'
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
                
                {/* QR Code Display for Authenticated Users */}
                {qrCode && isAuthenticated && (
                    <div className="mt-6 flex flex-col items-center">
                        <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">📱 Your QR Code</p>
                        <div className="p-4 bg-white rounded-2xl border-2 border-indigo-300 shadow-lg">
                            <img 
                                src={qrCode} 
                                alt="QR Code" 
                                className="w-48 h-48 rounded-lg"
                            />
                        </div>
                        <p className="mt-3 text-xs text-gray-500 text-center max-w-xs">
                            Scan this QR code to access your shortened URL instantly!
                        </p>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default UrlForm