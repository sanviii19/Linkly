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
export const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      provider: user.provider,
    },
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
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // prevents server crash
  }
};
