import jsonwebtoken from "jsonwebtoken"

export const signToken = (payload) => {
    return jsonwebtoken.sign(
        payload, 
        process.env.JWT_SECRET, 
        {expiresIn: '5h'}
    )
}

export const verifyToken = (token) => {
    const decoded = jsonwebtoken.verify(
        token,
        process.env.JWT_SECRET
    )
    return decoded;
}