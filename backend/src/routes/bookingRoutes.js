const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingHistory,
} = require("../controllers/bookingController");

/* USER */
router.post("/", createBooking);

/* ADMIN */
router.get("/admin/all", getAllBookings);
router.get("/admin/history", getBookingHistory);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
