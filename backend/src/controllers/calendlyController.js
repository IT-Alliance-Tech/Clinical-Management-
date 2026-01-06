const Booking = require("../models/booking");

/**
 * Extract phone from Calendly custom questions
 */
const extractPhoneFromQuestions = (questions = []) => {
  if (!Array.isArray(questions)) return null;
  
  // Look for phone number in questions
  for (const q of questions) {
    if (q.answer && /^\+?[\d\s\-().]+$/.test(q.answer.toString())) {
      // Basic phone format validation
      const cleaned = q.answer.toString().replace(/\D/g, '');
      if (cleaned.length >= 10) {
        return q.answer.toString();
      }
    }
  }
  return null;
};

/**
 * ✅ Handle invitee.created event
 * Stores new appointment in database
 */
const handleInviteeCreated = async (event) => {
  console.log("\n➡️  ENTERING handleInviteeCreated");
  
  const invitee = event.payload?.invitee;
  const calendarEvent = event.payload?.event;

  // ✅ Step 1: Validate required fields
  console.log("  📋 STEP 1: Validating required fields");
  console.log("     - invitee:", !!invitee);
  console.log("     - invitee.name:", invitee?.name);
  console.log("     - invitee.email:", invitee?.email);
  console.log("     - calendarEvent:", !!calendarEvent);
  console.log("     - calendarEvent.start_time:", calendarEvent?.start_time);
  
  if (!invitee || !invitee.name || !invitee.email || !calendarEvent || !calendarEvent.start_time) {
    console.error("❌ VALIDATION FAILED: Missing required Calendly fields");
    console.error("   Invitee:", invitee);
    console.error("   Event:", calendarEvent);
    throw new Error("Missing required Calendly fields");
  }
  console.log("  ✅ Validation passed");

  // ✅ Step 2: Check for duplicate
  console.log("  📋 STEP 2: Checking for duplicate booking");
  console.log("     - invitee.uri:", invitee.uri);
  
  if (invitee.uri) {
    const existingBooking = await Booking.findOne({ calendlyInviteeId: invitee.uri });
    if (existingBooking) {
      console.log(`  ⚠️  Booking already exists for invitee ${invitee.uri}`);
      console.log(`     Existing booking ID: ${existingBooking._id}`);
      return existingBooking;
    }
    console.log("  ✅ No duplicate found");
  } else {
    console.log("  ⚠️  No invitee.uri - duplicate check skipped");
  }

  // ✅ Step 3: Extract data
  console.log("  📋 STEP 3: Extracting data from payload");
  
  const durationMinutes = calendarEvent.duration ? Math.round(calendarEvent.duration / 60) : 0;
  console.log("     - duration (minutes):", durationMinutes);

  const phone = extractPhoneFromQuestions(invitee.questions);
  console.log("     - extracted phone:", phone || invitee.phone_number || "null");

  const bookingData = {
    calendlyInviteeId: invitee.uri,
    calendlyEventId: calendarEvent.uri,
    calendlyEventUri: calendarEvent.uri,
    patientName: invitee.name,
    email: invitee.email,
    phone: phone || invitee.phone_number,
    appointmentDate: new Date(calendarEvent.start_time),
    appointmentStart: new Date(calendarEvent.start_time),
    appointmentEnd: calendarEvent.end_time ? new Date(calendarEvent.end_time) : undefined,
    duration: durationMinutes,
    timezone: calendarEvent.start_time_zone || 'UTC',
    eventType: calendarEvent.name,
    doctor: calendarEvent.owner?.name || 'Unknown',
    status: "confirmed",
    source: "calendly",
  };

  console.log("  📋 STEP 3 COMPLETE: Data prepared");
  console.log("     - patientName:", bookingData.patientName);
  console.log("     - email:", bookingData.email);
  console.log("     - appointmentStart:", bookingData.appointmentStart);
  console.log("     - doctor:", bookingData.doctor);

  // ✅ Step 4: Save to database
  console.log("  📋 STEP 4: Saving to database");
  console.log("     - Collection: bookings");
  console.log("     - Operation: create");
  
  let savedBooking;
  try {
    savedBooking = await Booking.create(bookingData);
    console.log("  ✅ DATABASE SAVE SUCCESSFUL");
    console.log("     - Document ID:", savedBooking._id);
    console.log("     - Created at:", savedBooking.createdAt);
  } catch (dbError) {
    console.error("  ❌ DATABASE SAVE FAILED");
    console.error("     - Error message:", dbError.message);
    console.error("     - Error code:", dbError.code);
    console.error("     - Full error:", dbError);
    throw dbError;
  }

  console.log("✅ EXITING handleInviteeCreated - SUCCESS\n");

  return savedBooking;
};

/**
 * ✅ Handle invitee.canceled event
 * Updates appointment status to cancelled
 */
const handleInviteeCancelled = async (event) => {
  const invitee = event.payload?.invitee;

  if (!invitee || !invitee.uri) {
    console.error("❌ Missing invitee URI for cancellation");
    throw new Error("Missing invitee URI");
  }

  const booking = await Booking.findOneAndUpdate(
    { calendlyInviteeId: invitee.uri },
    {
      status: 'cancelled',
      cancelledAt: new Date(),
      cancellationReason: 'Cancelled by patient via Calendly',
    },
    { new: true }
  );

  if (!booking) {
    console.warn(`⚠️  Booking not found for cancellation: ${invitee.uri}`);
    return null;
  }

  console.log("✅ Booking cancelled:", {
    _id: booking._id,
    patientName: booking.patientName,
    appointmentStart: booking.appointmentStart,
  });

  return booking;
};

/**
 * ✅ Handle invitee.rescheduled event
 * Updates appointment date/time
 */
const handleInviteeRescheduled = async (event) => {
  const invitee = event.payload?.invitee;
  const calendarEvent = event.payload?.event;

  if (!invitee || !invitee.uri || !calendarEvent) {
    console.error("❌ Missing required fields for reschedule");
    throw new Error("Missing required reschedule fields");
  }

  const durationMinutes = calendarEvent.duration ? Math.round(calendarEvent.duration / 60) : 0;

  const booking = await Booking.findOneAndUpdate(
    { calendlyInviteeId: invitee.uri },
    {
      status: 'rescheduled',
      appointmentDate: new Date(calendarEvent.start_time),
      appointmentStart: new Date(calendarEvent.start_time),
      appointmentEnd: calendarEvent.end_time ? new Date(calendarEvent.end_time) : undefined,
      duration: durationMinutes,
      timezone: calendarEvent.start_time_zone || 'UTC',
      eventType: calendarEvent.name,
    },
    { new: true }
  );

  if (!booking) {
    console.warn(`⚠️  Booking not found for reschedule: ${invitee.uri}`);
    return null;
  }

  console.log("✅ Booking rescheduled:", {
    _id: booking._id,
    patientName: booking.patientName,
    newAppointmentStart: booking.appointmentStart,
  });

  return booking;
};

/**
 * Main webhook handler
 * Routes to specific event handlers
 */
exports.handleCalendlyWebhook = async (req, res) => {
  console.log("\n" + "=".repeat(80));
  console.log("🔔 WEBHOOK RECEIVED");
  console.log("=".repeat(80));
  
  try {
    // ✅ STEP 1: Log raw request
    console.log("📥 Raw request body type:", typeof req.body);
    console.log("📥 Is Buffer?:", Buffer.isBuffer(req.body));
    
    // Parse raw Buffer body if needed
    let event;
    if (Buffer.isBuffer(req.body)) {
      console.log("📥 Parsing Buffer...");
      event = JSON.parse(req.body.toString());
    } else {
      console.log("📥 Body is already parsed");
      event = req.body;
    }

    console.log("✅ STEP 1: Body parsed successfully");
    console.log("📋 Webhook payload:", JSON.stringify(event, null, 2).substring(0, 500) + "...");

    // ✅ STEP 2: Check event type
    const eventType = event.event;
    console.log(`✅ STEP 2: Event type = "${eventType}"`);
    
    if (!eventType) {
      console.error("❌ Missing event type in payload");
      return res.status(200).json({ success: false, error: "Missing event type" });
    }

    // ✅ STEP 3: Validate payload structure
    console.log("✅ STEP 3: Validating payload structure");
    console.log("   - Has payload?", !!event.payload);
    console.log("   - Has invitee?", !!event.payload?.invitee);
    console.log("   - Has event?", !!event.payload?.event);
    
    if (event.payload) {
      const invitee = event.payload.invitee;
      const calendarEvent = event.payload.event;
      
      console.log("   📋 Invitee data:", {
        uri: invitee?.uri,
        name: invitee?.name,
        email: invitee?.email,
        phone: invitee?.phone_number,
        has_questions: Array.isArray(invitee?.questions),
      });
      
      console.log("   📋 Event data:", {
        uri: calendarEvent?.uri,
        name: calendarEvent?.name,
        start_time: calendarEvent?.start_time,
        end_time: calendarEvent?.end_time,
        duration: calendarEvent?.duration,
        owner: calendarEvent?.owner?.name,
      });
    }

    let result;

    // ✅ STEP 4: Route to appropriate handler
    console.log(`✅ STEP 4: Routing to handler for event: ${eventType}`);
    
    switch (eventType) {
      case 'invitee.created':
        console.log("🎯 Handling invitee.created");
        result = await handleInviteeCreated(event);
        console.log("✅ invitee.created handler completed");
        break;
      case 'invitee.canceled':
        console.log("🎯 Handling invitee.canceled");
        result = await handleInviteeCancelled(event);
        console.log("✅ invitee.canceled handler completed");
        break;
      case 'invitee.rescheduled':
        console.log("🎯 Handling invitee.rescheduled");
        result = await handleInviteeRescheduled(event);
        console.log("✅ invitee.rescheduled handler completed");
        break;
      default:
        console.log(`⏭️  Ignoring event type: ${eventType}`);
        return res.status(200).json({ received: true, eventType });
    }

    // ✅ STEP 5: Return success response
    console.log("✅ STEP 5: Returning 200 response to Calendly");
    console.log("📊 Result object:", result ? { _id: result._id, email: result.email } : null);
    
    console.log("=".repeat(80) + "\n");
    
    return res.status(200).json({ 
      success: true, 
      eventType,
      bookingId: result?._id,
      message: `${eventType} processed successfully`,
    });
  } catch (error) {
    console.error("❌ ERROR in webhook handler:");
    console.error("   Error message:", error.message);
    console.error("   Error stack:", error.stack);
    console.log("=".repeat(80) + "\n");
    
    // Always return 200 to prevent Calendly from retrying
    return res.status(200).json({ 
      success: false, 
      error: error.message,
      note: 'Event received but processing failed',
    });
  }
};

/**
 * Get all bookings with filtering
 */
exports.getAllBookings = async (req, res) => {
  try {
    const { doctor, status, dateFrom, dateTo, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (doctor) filter.doctor = new RegExp(doctor, 'i');
    if (status) filter.status = status;
    if (dateFrom || dateTo) {
      filter.appointmentStart = {};
      if (dateFrom) filter.appointmentStart.$gte = new Date(dateFrom);
      if (dateTo) filter.appointmentStart.$lte = new Date(dateTo);
    }

    const skip = (page - 1) * limit;
    const bookings = await Booking.find(filter)
      .sort({ appointmentStart: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      data: bookings,
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
 * Get single booking
 */
exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
    });
  }
};

/**
 * Update booking (admin)
 */
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating critical Calendly fields
    const forbiddenFields = ['calendlyInviteeId', 'calendlyEventId', 'source'];
    forbiddenFields.forEach(field => delete updates[field]);

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

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};

/**
 * Delete booking (admin)
 */
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    console.log(`✅ Booking ${id} deleted`);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};

/**
 * Get appointments by doctor
 */
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctor } = req.params;
    const { status, dateFrom, dateTo } = req.query;

    const filter = { doctor: new RegExp(doctor, 'i') };

    if (status) filter.status = status;
    if (dateFrom || dateTo) {
      filter.appointmentStart = {};
      if (dateFrom) filter.appointmentStart.$gte = new Date(dateFrom);
      if (dateTo) filter.appointmentStart.$lte = new Date(dateTo);
    }

    const bookings = await Booking.find(filter)
      .sort({ appointmentStart: -1 })
      .lean();

    res.status(200).json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching appointments by doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
    });
  }
};

/**
 * Get dashboard statistics
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const doctorStats = await Booking.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: '$doctor', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const upcomingAppointments = await Booking.find({
      status: 'confirmed',
      appointmentStart: { $gte: new Date() },
    })
      .sort({ appointmentStart: 1 })
      .limit(5)
      .lean();

    res.status(200).json({
      success: true,
      stats: {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        completedBookings,
        doctorStats,
        upcomingAppointments,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
};
