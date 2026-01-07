const Doctor = require("../models/doctor");
const ActivityLog = require("../models/activityLog");

/* ===============================
   ADD DOCTOR (ADMIN)
   =============================== */
exports.addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `Doctor added: ${doctor.name}`,
      type: "DOCTOR",
      performedBy: "Admin",
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* ===============================
   GET ALL DOCTORS (ADMIN)
   =============================== */
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json({ success: true, data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===============================
   GET SPECIALIZATIONS
   =============================== */
exports.getSpecializations = async (req, res) => {
  try {
    const specs = await Doctor.distinct("specialization");
    res.json({ success: true, data: specs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===============================
   UPDATE DOCTOR (ADMIN)
   =============================== */
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `Doctor updated: ${doctor.name}`,
      type: "DOCTOR",
      performedBy: "Admin",
    });

    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/* ===============================
   DELETE DOCTOR (ADMIN)
   =============================== */
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `Doctor deleted: ${doctor.name}`,
      type: "DOCTOR",
      performedBy: "Admin",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===============================
   TOGGLE DOCTOR STATUS (ADMIN)
   =============================== */
exports.toggleDoctorStatus = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `Doctor ${
        doctor.isActive ? "activated" : "deactivated"
      }: ${doctor.name}`,
      type: "DOCTOR",
      performedBy: "Admin",
    });

    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
