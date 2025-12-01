import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/jwtHelper.js";

export const authMiddleware = async (req, res, next) => {
    console.log('----- inside authMiddleware -----');
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            isSuccess: false,
            message: 'Unauthorized',
        });
    }
    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.id);
        if(!user) {
            return res.status(401).json({
                isSuccess: false,
                message: 'Unauthorized',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: 'Invalid token',
        });
    }
}