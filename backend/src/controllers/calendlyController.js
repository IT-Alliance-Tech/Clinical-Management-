const Booking = require("../models/booking");

exports.handleCalendlyWebhook = async (req, res) => {
  try {
    // Parse raw Buffer body if needed
    let event;
    if (Buffer.isBuffer(req.body)) {
      event = JSON.parse(req.body.toString());
    } else {
      event = req.body;
    }

    console.log("📨 Calendly webhook received, event type:", event.event);

    // Only handle booking creation
    if (event.event !== "invitee.created") {
      return res.status(200).json({ received: true });
    }

    const invitee = event.payload?.invitee;
    const calendarEvent = event.payload?.event;

    // Validate required fields
    if (!invitee || !invitee.name || !invitee.email || !calendarEvent || !calendarEvent.start_time) {
      console.error("❌ Missing required Calendly fields", { invitee, calendarEvent });
      return res.status(200).json({ success: false, reason: "missing fields" });
    }

    // Extract duration in minutes
    const durationMinutes = calendarEvent.duration ? Math.round(calendarEvent.duration / 60) : 0;

    const bookingData = {
      patientName: invitee.name,
      email: invitee.email,
      appointmentDate: new Date(calendarEvent.start_time),
      appointmentStart: new Date(calendarEvent.start_time),
      appointmentEnd: calendarEvent.end_time ? new Date(calendarEvent.end_time) : undefined,
      duration: durationMinutes,
      status: "confirmed",
      source: "calendly",
    };

    const savedBooking = await Booking.create(bookingData);

    console.log("✅ Booking saved from Calendly:", {
      patientName: savedBooking.patientName,
      email: savedBooking.email,
      appointmentDate: savedBooking.appointmentDate,
      source: savedBooking.source,
    });

    // Return 200 immediately to Calendly
    return res.status(200).json({ success: true, bookingId: savedBooking._id });
  } catch (error) {
    console.error("❌ Calendly webhook error:", error.message, error.stack);
    // Always return 200 to prevent Calendly from retrying
    return res.status(200).json({ success: false, error: error.message });
  }
};
