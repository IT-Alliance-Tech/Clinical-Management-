const express = require("express");
const router = express.Router();

const { getAllRecentActivities } = require("../controllers/activityController");

// TEST ROUTE (DO NOT SKIP THIS)
router.get("/test", (req, res) => {
  res.send("ACTIVITY ROUTE WORKING");
});

// REAL ROUTE
router.get("/", getAllRecentActivities);

module.exports = router;
