const express = require('express');
const router = express.Router();

const { createContact, getAllContacts } = require('../controllers/contactController');

// Public: submit contact form
router.post('/', createContact);

// Admin: get all submissions (public for now - can be protected later with auth token)
router.get('/', getAllContacts);

module.exports = router;
