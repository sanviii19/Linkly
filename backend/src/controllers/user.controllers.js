import { getAllUserUrls } from "../dao/user.dao.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const getAllUserUrlsController = wrapAsync(async (req, res) => {
    const {_id} = req.user;
    const urls = await getAllUserUrls(_id);
    res.status(200).json({ 
        isSuccess: true,
        message: 'URLs fetched successfully',
        data: {
            urls
        }
    });
});