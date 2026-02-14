import ClickModel from "../models/clickSchema.js";

export const getAnalyticsForLink = async (urlId) => {

  // 1️⃣ Total clicks
  const totalClicks = await ClickModel.countDocuments({ urlId });

  // 2️⃣ Unique clicks (by IP)
  const uniqueIps = await ClickModel.distinct("ip", { urlId });
  const uniqueClicks = uniqueIps.length;

  // 3️⃣ Daily clicks
  const dailyClicks = await ClickModel.aggregate([
    { $match: { urlId } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
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
