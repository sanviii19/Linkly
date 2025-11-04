import ShortUrlModel from "../models/shorturlSchema.js"
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrlToDB = async (url, shortUrl, userId = null) => {
    try{

        const newShortUrl = new ShortUrlModel({
            full_url: url,
            short_url: shortUrl,
        });
        if(userId) {
            newShortUrl.user = userId;
        }
        await newShortUrl.save();
    } catch (error) {
        console.log(`----- Error inside saveShortUrlToDB DAO: ${error} -----`);
        throw new ConflictError(error);
    }
}

export const getShorturl = async (shortUrl) => {
    return await ShortUrlModel.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    );
}