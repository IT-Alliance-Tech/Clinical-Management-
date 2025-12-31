const Booking = require("../models/booking");

/**
 * ❌ DEPRECATED
 * Direct booking creation is disabled.
 *
 * All bookings MUST come from Calendly webhooks.
 * This endpoint exists only to avoid breaking old clients.
 */
exports.createBooking = async (req, res) => {
  console.warn("⚠️  Deprecated endpoint hit: POST /api/bookings");
  console.warn("ℹ️  Bookings are created only via Calendly webhooks");

  return res.status(403).json({
    success: false,
    message:
      "Direct booking creation is disabled. Please book via Calendly.",
    note:
      "Calendly webhook automatically stores bookings after scheduling.",
  });
};

/**
 * ✅ Admin: Get all bookings
 *
 * Data is returned EXACTLY as stored from Calendly:
 * - patientName
 * - email
 * - appointmentStart
 * - appointmentEnd
 * - duration
 * - status
 * - source
 * - timestamps
 */
exports.getAllBookings = async (req, res) => {
  try {
    // Disable caching to prevent 304 responses
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .lean();

    // Return raw Calendly fields exactly as stored
    const data = bookings.map((b) => ({
      _id: b._id,
      patientName: b.patientName,
      email: b.email,
      appointmentStart: b.appointmentStart,
      appointmentEnd: b.appointmentEnd,
      duration: b.duration,
      status: b.status,
      source: b.source,
      createdAt: b.createdAt,
    }));

    res.status(200).json({
      success: true,
      total: data.length,
      data: data,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
    });
  }
};


/**
 * ✅ Admin: Update booking
 */
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    console.log(`✅ Booking ${id} updated`);

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};
