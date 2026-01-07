const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String, // BOOKING, DOCTOR, CONTACT, etc.
      default: "GENERAL",
    },
    performedBy: {
      type: String, // Admin / System
      default: "System",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
