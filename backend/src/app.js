const express = require("express");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const calendlyRoutes = require("./routes/calendlyRoutes");

const app = express();

app.use(cors());

/**
 * ✅ STEP 1: RAW BODY for Calendly webhook ONLY
 * This MUST come before express.json()
 */
app.use(
  "/api/calendly/webhook",
  express.raw({ type: "application/json" })
);

/**
 * ✅ STEP 2: Normal JSON parser for rest of APIs
 */
app.use(express.json());

/**
 * ✅ STEP 3: Mount routes
 */
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/calendly", calendlyRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Clinical Management Backend is running" });
});

module.exports = app;
