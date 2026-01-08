const express = require("express");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
// const calendlyRoutes = require("./routes/calendlyRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

app.use(cors());

// Calendly webhook (RAW)
app.use("/api/calendly/webhook", express.raw({ type: "application/json" }));

// JSON for others
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contacts", contactRoutes);
// app.use("/api/calendly", calendlyRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/activities", activityRoutes);

app.get("/api/diagnostic", (req, res) => {
  res.json({
    message: "DIAGNOSTIC ROUTE REACHED",
    time: new Date().toISOString(),
    activityRoutesExported: !!activityRoutes,
    config: {
      hasActivity: true,
      hasActivities: true,
    },
  });
});

console.log("Activity Routes:", activityRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Clinical Management Backend is running" });
});

module.exports = app;
