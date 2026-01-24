import { getShorturl } from "../dao/shorturl.dao.js";
import { createShortUrlWithoutUserService, createShortUrlWithUserService } from "../services/shorturl.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrlController = wrapAsync (async (req, res) => {
    console.log('----- inside createShortUrlController -----');
    const {url, slug} = req.body;
    
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    
    if(req.user){
        const result = await createShortUrlWithUserService(url, slug, req.user._id);
        return res.json({ 
            shortUrl: process.env.BACKEND_URL + result.shortUrl, 
            qrCode: result.qrCode 
        });
    }else{
        const shortUrl = await createShortUrlWithoutUserService(url);
        return res.send(process.env.BACKEND_URL + shortUrl);
    }
});

export const redirectFromShortUrlController = wrapAsync (async (req, res) => {
        console.log('----- inside redirectFromShortUrlController -----');
    
        const {id} = req.params;
        const url = await getShorturl(id);
        res.redirect(url.full_url);
})

export const createCustomShortUrlController = wrapAsync (async (req, res) => {
    console.log('----- inside createCustomShortUrlController -----');

    const {url, slug} = req.body;
    const result = await createShortUrlWithUserService(url, slug, req.user._id);
    return res.json({ 
        shortUrl: process.env.BACKEND_URL + result.shortUrl, 
        qrCode: result.qrCode 
    });
})