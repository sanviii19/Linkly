import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";

const RedirectPage = () => {
    const { shortUrl } = useParams({ strict: false });

    useEffect(() => {
        if (shortUrl) {
            // Redirect to backend URL
            window.location.replace(`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`);
        }
    }, [shortUrl]);

    return null;
};

export default RedirectPage;
