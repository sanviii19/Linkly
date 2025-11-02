import { saveShortUrlToDB } from "../dao/shorturl.dao.js";
import generateNanoId from "../utils/generateId.js";

const createShortUrlWithoutUserService = async (url) => {
    console.log('-----Creating short URL WITHOUT user in service-----');

    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error('Failed to generate short URL');
    
    await saveShortUrlToDB(url, shortUrl);
    return shortUrl;
}

const createShortUrlWithUserService = async (url, userId) => {
    console.log('-----Creating short URL WITH user in service-----');

    const shortUrl = generateNanoId(7);
    await saveShortUrlToDB(url, shortUrl, userId);
    return shortUrl;
}

export { createShortUrlWithoutUserService, createShortUrlWithUserService };