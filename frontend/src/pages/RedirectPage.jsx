import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { DotLoader } from "react-spinners";

const RedirectPage = () => {
    const { shortUrl } = useParams({ strict: false });

    useEffect(() => {
        if (shortUrl) {
            // Use actual backend URL to avoid loop if VITE_BACKEND_URL points to the frontend
            let backendUrl = import.meta.env.VITE_BACKEND_URL || "https://linkly-mto0.onrender.com";

            // If the backendUrl is set to the frontend URL, it will loop.
            // Check if it's not a known backend domain (onrender.com or localhost:3000)
            if (!backendUrl.includes("onrender.com") && !backendUrl.includes("localhost:3000")) {
                backendUrl = "https://linkly-mto0.onrender.com";
            }

            window.location.replace(`${backendUrl}/${shortUrl}`);
        }
    }, [shortUrl]);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-4">
            <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <DotLoader size={60} color="#a78bfa" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Redirecting...</h1>
            </div>
        </div>
    );
};

export default RedirectPage;
