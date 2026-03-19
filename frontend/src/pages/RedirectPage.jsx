import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";

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

    return null;
};

export default RedirectPage;
