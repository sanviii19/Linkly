import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/jwtHelper.js";

export const authMiddleware = async (req, res, next) => {
    console.log('----- inside authMiddleware -----');
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            isSuccess: false,
            message: 'Unauthorized : token missing',
        });
    }
    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.id);
        // console.log('----- user found in authMiddleware -----', user);
        if(!user) {
            return res.status(401).json({
                isSuccess: false,
                message: 'Unauthorized : user not found',
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

// Optional auth middleware - doesn't block if no token
export const optionalAuthMiddleware = async (req, res, next) => {
    console.log('----- inside optionalAuthMiddleware -----');
    const token = req.cookies.token;
    if(!token) {
        // No token, continue without user
        return next();
    }
    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.id);
        if(user) {
            req.user = user;
        }
        next();
    } catch (error) {
        // Invalid token, continue without user
        next();
    }
}