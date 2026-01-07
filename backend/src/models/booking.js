const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: String,
    reportUrl: {
  type: String,
  default: null,
},
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    rescheduleReason: {
  type: String,
},
rescheduledAt: {
  type: Date,
},


  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
