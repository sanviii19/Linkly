import { useState } from 'react'
import axios from 'axios';

const UrlForm = () => {
    const [url, setUrl] = useState("https://www.google.com");
    const [ShortUrl, setShortUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create`, { url });
            setShortUrl(data);
            console.log('Shortened URL:', data);
        } catch (error) {
            console.error('Error shortening URL:', error);
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
    <div className="w-full max-w-3xl mx-auto p-8">
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex gap-3 w-full flex-wrap">
                <input
                  type="url"
                  id="url"
                  className="flex-1 min-w-[250px] px-5 py-4 text-base border-2 border-gray-300 rounded-xl outline-none transition-all duration-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-400"
                  value={url}
                  onInput={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
                <button 
                  type="submit" 
                  className="px-8 py-4 text-base font-semibold text-white bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap shadow-lg shadow-indigo-200 hover:transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? 'Shortening...' : 'Shorten'}
                </button>
            </div>
        </form>
        
        {ShortUrl && (
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-fade-in">
                <p className="m-0 mb-3 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Your shortened URL:
                </p>
                <div className="flex gap-3 items-center p-4 bg-white rounded-lg border border-gray-300 flex-wrap">
                    <a 
                        href={ShortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 min-w-[200px] text-indigo-600 font-medium no-underline break-all text-base hover:underline"
                    >
                        {ShortUrl}
                    </a>
                    <button 
                        className={`px-5 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 whitespace-nowrap ${
                            isCopied 
                                ? 'bg-green-600 text-white border-2 border-green-600' 
                                : 'text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-105 active:scale-95'
                        }`}
                        onClick={handleCopy}
                    >
                        {isCopied ? '✓ Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default UrlForm