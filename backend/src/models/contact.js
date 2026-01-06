const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    // From frontend form
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    reason: { type: String }, // "Book Appointment", "General Enquiry", etc.
    message: { type: String, required: true },

    // Status tracking
    status: { type: String, default: 'new', enum: ['new', 'read', 'responded'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
