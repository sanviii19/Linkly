import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url,slug) =>{
    const {data} = await axiosInstance.post("/api/create",{url,slug})
    // Backend returns string for non-authenticated, object with shortUrl and qrCode for authenticated
    return data
}