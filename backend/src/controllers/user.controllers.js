import { getAllUserUrls, updateUserUrl } from "../dao/user.dao.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import argon2 from "argon2";

export const getAllUserUrlsController = wrapAsync(async (req, res) => {
    const { _id } = req.user;
    const urls = await getAllUserUrls(_id);
    res.status(200).json({
        isSuccess: true,
        message: 'URLs fetched successfully',
        data: {
            urls
        }
    });
});


export const updateUserUrlController = wrapAsync(async (req, res) => {
    const { _id: userId } = req.user;
    const { id: urlId } = req.params;
    const { expiresAt, isExpired, isLinkPassword, password } = req.body;

    // Build update object
    const updateData = {};
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt;
    if (isExpired !== undefined) updateData.isExpired = isExpired;

    // Handle password protection
    if (isLinkPassword !== undefined) {
        updateData.isLinkPassword = isLinkPassword;
        if (isLinkPassword === false) {
            updateData.linkPassword = null;
        } else if (isLinkPassword === true && password) {
            updateData.linkPassword = await argon2.hash(password);
        }
    }
    // can add other fields here if needed

    const updatedUrl = await updateUserUrl(userId, urlId, updateData);

    if (!updatedUrl) {
        return res.status(404).json({
            isSuccess: false,
            message: 'URL not found or not authorized'
        });
    }

    res.status(200).json({
        isSuccess: true,
        message: 'URL updated successfully',
        data: updatedUrl
    });
});