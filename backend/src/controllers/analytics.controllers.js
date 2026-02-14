import ShortUrl from "../models/shorturlSchema.js";
import { getAnalyticsForLink } from "../services/analytics.services.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const getLinkAnalyticsController = wrapAsync(async (req, res) => {
  const { slug } = req.params;
  const userId = req.user._id;

  const url = await ShortUrl.findOne({ short_url: slug });

  if (!url) {
    return res.status(404).json({ message: "Link not found" });
  }

  // 🔐 OWNER CHECK (CRITICAL)
  if (url.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const analytics = await getAnalyticsForLink(url._id);

  res.status(200).json({
    link: {
      shortUrl: url.short_url,
      originalUrl: url.full_url,
      totalClicks: url.totalClicks,
      isPasswordProtected: url.isLinkPassword,
      expiresAt: url.expiresAt,
      activeFrom: url.activeFrom
    },
    analytics
  });
});
