export const getDeviceType = (userAgent) => {
  if (!userAgent) return "desktop";

  return /mobile/i.test(userAgent) ? "mobile" : "desktop";
};
