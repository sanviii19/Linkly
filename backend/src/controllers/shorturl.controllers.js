import { getShorturl } from "../dao/shorturl.dao.js";
import { createShortUrlWithoutUserService } from "../services/shorturl.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrlController = wrapAsync (async (req, res) => {
    console.log('----- inside createShortUrlController -----');

    const {url} = req.body
    const shortUrl = await createShortUrlWithoutUserService(url);
    res.send(process.env.BACKEND_URL + shortUrl);
});

export const redirectFromShortUrlController = wrapAsync (async (req, res) => {
        console.log('----- inside redirectFromShortUrlController -----');
    
        const {id} = req.params;
        const url = await getShorturl(id);
        res.redirect(url.full_url);
})