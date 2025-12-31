const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // From Calendly invitee
    patientName: { type: String, required: true },
    email: { type: String, required: true },

    // From Calendly event
    appointmentDate: { type: Date, required: true },
    appointmentStart: { type: Date },
    appointmentEnd: { type: Date },
    duration: { type: Number }, // in minutes

    // Metadata
    status: { type: String, default: 'confirmed' },
    source: { type: String, default: 'calendly' },

    // Optional fields (not from Calendly)
    phone: { type: String },
    service: { type: String },
    doctor: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
