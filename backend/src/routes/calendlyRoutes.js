const express = require("express");
const { handleCalendlyWebhook, getAllBookings, getDashboardStats, getAppointmentsByDoctor } = require("../controllers/calendlyController");

const router = express.Router();

// Webhook endpoint (receives raw body)
router.post("/webhook", handleCalendlyWebhook);

// Get all bookings with filters
router.get("/bookings", getAllBookings);

// Get dashboard statistics
router.get("/stats", getDashboardStats);

// Get appointments by doctor
router.get("/doctor/:doctor", getAppointmentsByDoctor);

module.exports = router;

