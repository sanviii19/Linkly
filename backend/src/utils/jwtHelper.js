// import jsonwebtoken from "jsonwebtoken"

// export const signToken = (payload) => {
//     return jsonwebtoken.sign(
//         payload, 
//         process.env.JWT_SECRET, 
//         {expiresIn: '5h'}
//     )
// }

// export const verifyToken = (token) => {
//     const decoded = jsonwebtoken.verify(
//         token,
//         process.env.JWT_SECRET
//     )
//     return decoded;
// }

import jwt from "jsonwebtoken";

/**
 * Sign JWT
 * Keep payload SMALL & SAFE
 */
export const signToken = (userOrPayload) => {
  // Handle both user object and simple payload {id: userId}
  const payload = userOrPayload.id 
    ? { id: userOrPayload.id } // Simple payload from login service
    : { // Full user object from Google auth
        id: userOrPayload._id,
        email: userOrPayload.email,
        provider: userOrPayload.provider,
      };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
};

/**
 * Verify JWT safely
 */
export const verifyToken = (token) => {
  // console.log("token : ",token);
  return jwt.verify(token, process.env.JWT_SECRET);
};
