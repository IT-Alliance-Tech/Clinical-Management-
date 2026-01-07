const Booking = require("../models/booking");
const sendEmail = require("../utils/sendEmail");
const ActivityLog = require("../models/activityLog");

/* ===============================
   CREATE BOOKING (USER)
   =============================== */
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, department, date, time, reason } = req.body;

    if (!name || !email || !phone || !department || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      department,
      date,
      time,
      reason,
      status: "Pending",
    });

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `New booking created for ${name}`,
      type: "BOOKING",
      performedBy: "User",
    });

    // 📧 EMAIL TO USER (PENDING)
    try {
      await sendEmail({
        to: email,
        name,
        department,
        date,
        time,
        status: "Pending",
      });
    } catch (err) {
      console.log("Email failed (booking saved):", err.message);
    }

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating booking",
    });
  }
};

/* ===============================
   ADMIN – GET ALL BOOKINGS
   =============================== */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: bookings });
  } catch {
    return res.status(500).json({ success: false });
  }
};

/* ===============================
   ADMIN – UPDATE BOOKING
   =============================== */
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rescheduleReason } = req.body;

    const oldBooking = await Booking.findById(id);
    if (!oldBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(status === "Rescheduled" && {
          rescheduledAt: new Date(),
          rescheduleReason,
        }),
      },
      { new: true }
    );

    // 📧 EMAIL WHEN STATUS CHANGES
    if (oldBooking.status !== updatedBooking.status) {
      try {
        await sendEmail({
          to: updatedBooking.email,
          name: updatedBooking.name,
          department: updatedBooking.department,
          date: updatedBooking.date,
          time: updatedBooking.time,
          status: updatedBooking.status,
          rescheduleReason:
            updatedBooking.status === "Rescheduled"
              ? updatedBooking.rescheduleReason
              : undefined,
        });
      } catch (err) {
        console.log("Email failed:", err.message);
      }

      // ✅ ACTIVITY LOG (STATUS CHANGE)
      await ActivityLog.create({
        message: `Booking status updated to ${updatedBooking.status} for ${updatedBooking.name}`,
        type: "BOOKING",
        performedBy: "Admin",
      });
    }

    return res.json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch {
    return res.status(500).json({ success: false });
  }
};

/* ===============================
   ADMIN – DELETE BOOKING
   =============================== */
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    }

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `Booking deleted for ${deleted.name}`,
      type: "BOOKING",
      performedBy: "Admin",
    });

    return res.json({
      success: true,
      message: "Booking deleted",
    });
  } catch {
    return res.status(500).json({ success: false });
  }
};

/* ===============================
   ADMIN – BOOKING HISTORY (USER)
   =============================== */
exports.getBookingHistory = async (req, res) => {
  try {
    const { email, phone, excludeId } = req.query;

    let query = email ? { email } : { phone };
    if (excludeId) query._id = { $ne: excludeId };

    const history = await Booking.find(query).sort({ createdAt: -1 });

    return res.json({ success: true, data: history });
  } catch {
    return res.status(500).json({ success: false });
  }
};
