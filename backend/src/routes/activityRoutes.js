const express = require("express");
console.log("🔥 activityRoutes.js LOADED");

const router = express.Router();

const ActivityLog = require("../models/activityLog");

// TEST ROUTE (DO NOT SKIP THIS)
router.get("/test", (req, res) => {
  res.send("ACTIVITY ROUTE WORKING");
});

// REAL ROUTE
router.get("/recent", async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
});

module.exports = router;
