export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge:5 * 60 * 60 * 1000, // 5 hours
    path: '/'
}