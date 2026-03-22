import ClickModel from "../models/clickSchema.js";
import { normalizeIp } from "../utils/normalizeIp.js";

export const getAnalyticsForLink = async (urlId, startDate, endDate) => {

  // 1️⃣ Total clicks
  const totalClicks = await ClickModel.countDocuments({ urlId });

  // 2️⃣ Unique visitors — use visitorId (cookie) where available, fall back to normalized IP for old records
  const clicks = await ClickModel.find({ urlId }, { visitorId: 1, ip: 1 }).lean();
  const uniqueIdentifiers = new Set(
    clicks.map(c => c.visitorId || normalizeIp(c.ip) || 'unknown')
  );
  const uniqueClicks = uniqueIdentifiers.size;

  // 3️⃣ Daily clicks - filtered by date range if provided
  const dailyClicksMatch = { urlId };
  if (startDate && endDate) {
    dailyClicksMatch.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const dailyClicks = await ClickModel.aggregate([
    { $match: dailyClicksMatch },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
            timezone: "Asia/Kolkata" // Added Timezone grouping so midnight matches local time
          }
        },
        clicks: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // 4️⃣ Device breakdown
  const deviceBreakdown = await ClickModel.aggregate([
    { $match: { urlId } },
    {
      $group: {
        _id: "$deviceType",
        count: { $sum: 1 }
      }
    }
  ]);

  return {
    totalClicks,
    uniqueClicks,
    dailyClicks,
    deviceBreakdown
  };
};
