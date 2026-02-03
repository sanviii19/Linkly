import ShortUrlModel from "../models/shorturlSchema.js"
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrlToDB = async (url, shortUrl, userId = null, qrCode = null) => {
    try {

        const newShortUrl = new ShortUrlModel({
            full_url: url,
            short_url: shortUrl,
        });
        if (userId) {
            newShortUrl.user = userId;
        }
        if (qrCode) {
            newShortUrl.qrCode = qrCode;
            newShortUrl.qrGenerated = true;
        }
        await newShortUrl.save();
    } catch (error) {
        console.log(`----- Error inside saveShortUrlToDB DAO: ${error} -----`);
        throw new ConflictError(error);
    }
}

export const getShorturl = async (shortUrl) => {
    const link = await ShortUrlModel.findOne({ short_url: shortUrl });

    if (!link) return null;

    // Check if link has expired
    if (link.expiresAt && new Date() > link.expiresAt) {
        // Mark as expired if not already marked
        if (!link.isExpired) {
            await ShortUrlModel.findOneAndUpdate(
                { short_url: shortUrl },
                { isExpired: true },
                { new: true }
            );
        }
        return null; // Return null for expired links
    }

    // Increment clicks for valid, non-expired links
    return await ShortUrlModel.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    );
}

// New helper to just get the document without side effects
export const getShortUrlDoc = async (shortUrl) => {
    return await ShortUrlModel.findOne({ short_url: shortUrl });
}

// New helper to increment clicks
export const incrementClicks = async (shortUrl) => {
    return await ShortUrlModel.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    );
}

export const getCustomShorturl = async (slug) => {
    return await ShortUrlModel.findOne({ short_url: slug });
}