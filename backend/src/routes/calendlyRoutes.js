const express = require("express");
const { handleCalendlyWebhook } = require("../controllers/calendlyController");

const router = express.Router();

// Calendly Webhook
router.post("/webhook", handleCalendlyWebhook);

module.exports = router;
