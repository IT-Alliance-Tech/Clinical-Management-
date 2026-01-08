const ActivityLog = require("../models/activityLog");

exports.getAllRecentActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      total: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};
