const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorController");

router.post("/", controller.addDoctor);
router.get("/admin/all", controller.getAllDoctors);
router.get("/specializations", controller.getSpecializations);
router.put("/:id", controller.updateDoctor);
router.patch("/:id/status", controller.toggleDoctorStatus);
router.delete("/:id", controller.deleteDoctor);

module.exports = router;
