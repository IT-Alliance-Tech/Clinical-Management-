const Doctor = require("../models/doctor");

// ADD doctor
exports.addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET all doctors (admin)
exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.json({ success: true, data: doctors });
};

// GET specializations
exports.getSpecializations = async (req, res) => {
  const specs = await Doctor.distinct("specialization");
  res.json({ success: true, data: specs });
};

// UPDATE doctor
exports.updateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, data: doctor });
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// TOGGLE status
exports.toggleDoctorStatus = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.isActive },
    { new: true }
  );
  res.json({ success: true, data: doctor });
};
