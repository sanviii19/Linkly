import { getShortUrlDoc, incrementClicks } from "../dao/shorturl.dao.js";
import { createShortUrlWithoutUserService, createShortUrlWithUserService } from "../services/shorturl.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import argon2 from "argon2";

export const createShortUrlController = wrapAsync(async (req, res) => {
    console.log('----- inside createShortUrlController -----');
    const { url, slug } = req.body;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    if (req.user) {
        const result = await createShortUrlWithUserService(url, slug, req.user._id);
        return res.json({
            shortUrl: process.env.BACKEND_URL + result.shortUrl,
            qrCode: result.qrCode
        });
    } else {
        const shortUrl = await createShortUrlWithoutUserService(url);
        return res.send(process.env.BACKEND_URL + shortUrl);
    }
});

export const redirectFromShortUrlController = wrapAsync(async (req, res) => {
    console.log('----- inside redirectFromShortUrlController -----');

    const { id } = req.params;
    const url = await getShortUrlDoc(id);

    if (!url) {
        return res.status(410).json({
            message: 'This link has expired or does not exist'
        });
    }

    if (url.isLinkPassword) {
        // Redirect to frontend password entry page
        // Assuming frontend route is /protected/:shortUrl
        const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
        return res.redirect(`${frontendUrl}/protected/${url.short_url}`);
    }

    await incrementClicks(id);
    res.redirect(url.full_url);
})

export const verifyShortUrlPasswordController = wrapAsync(async (req, res) => {
    const { shortUrl, password } = req.body;
    console.log(`[VERIFY] Verifying password for shortUrl: ${shortUrl}`);

    if (!password) {
        return res.status(400).json({ isSuccess: false, message: "Password is required" });
    }

    const url = await getShortUrlDoc(shortUrl);

    if (!url) {
        console.log(`[VERIFY] Link not found: ${shortUrl}`);
        return res.status(404).json({ isSuccess: false, message: "Link not found or expired" });
    }

    // Since we filtered by isLinkPassword on setup, ensure it is protected
    if (!url.isLinkPassword || !url.linkPassword) {
        console.log(`[VERIFY] Link is not password protected: ${shortUrl}`);
        // If for some reason it's not protected, just give the url
        return res.status(200).json({ isSuccess: true, full_url: url.full_url });
    }

    console.log(`[VERIFY] Hashes - Stored: ${url.linkPassword ? 'YES' : 'NO'}, Provided: ${password ? 'YES' : 'NO'}`);

    try {
        const isValid = await argon2.verify(url.linkPassword, password);
        console.log(`[VERIFY] Verification result: ${isValid}`);

        if (!isValid) {
            return res.status(401).json({ isSuccess: false, message: "Incorrect password" });
        }

        await incrementClicks(shortUrl);

        return res.status(200).json({
            isSuccess: true,
            full_url: url.full_url
        });
    } catch (err) {
        console.error(`[VERIFY] Argon2 error:`, err);
        return res.status(500).json({ isSuccess: false, message: "Server error during verification" });
    }
});

export const createCustomShortUrlController = wrapAsync(async (req, res) => {
    console.log('----- inside createCustomShortUrlController -----');

    const { url, slug } = req.body;
    const result = await createShortUrlWithUserService(url, slug, req.user._id);
    return res.json({
        shortUrl: process.env.BACKEND_URL + result.shortUrl,
        qrCode: result.qrCode
    });
})