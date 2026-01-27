import { getCustomShorturl, saveShortUrlToDB } from "../dao/shorturl.dao.js";
import generateNanoId from "../utils/generateId.js";
import generateQRCode from "../utils/generateQrCode.js";

const createShortUrlWithoutUserService = async (url) => {
    console.log('-----Creating short URL WITHOUT user in service-----');

    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error('Failed to generate short URL');

    await saveShortUrlToDB(url, shortUrl);
    return shortUrl;
}

const createShortUrlWithUserService = async (url, slug = null, userId, expiresInDays = null, expiresAtDate = null) => {
    console.log('-----Creating short URL WITH user in service-----');

    const shortUrl = slug || generateNanoId(7);
    const exist = await getCustomShorturl(shortUrl);
    if (exist) throw new Error('Custom slug already exists');

    const fullShortUrl = process.env.BACKEND_URL + shortUrl;
    const qrCode = await generateQRCode(fullShortUrl);

    let expiresAt = null;
    if (expiresAtDate) {
        expiresAt = new Date(expiresAtDate);
    } else if (expiresInDays && expiresInDays > 0) {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays));
    }

    await saveShortUrlToDB(url, shortUrl, userId, qrCode, expiresAt);
    return { shortUrl, qrCode };
}



export { createShortUrlWithoutUserService, createShortUrlWithUserService };