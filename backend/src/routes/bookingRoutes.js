const express = require("express");
const {
  createBooking,
  getAllBookings,
  updateBooking,
} = require("../controllers/bookingController");

const { protectAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public
router.post("/", createBooking);

// Admin
router.get("/", getAllBookings);
router.put("/:id", protectAdmin, updateBooking);

module.exports = router;
