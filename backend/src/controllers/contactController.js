const Contact = require("../models/contact");
const ActivityLog = require("../models/activityLog");

/**
 * ✅ PUBLIC: Create a contact submission
 * POST /api/contacts
 */
exports.createContact = async (req, res) => {
  try {
    const { fullName, email, phone, reason, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Create contact
    const contact = new Contact({
      fullName,
      email,
      phone: phone || undefined,
      reason: reason || undefined,
      message,
      status: "new",
    });

    const saved = await contact.save();

    // ✅ ACTIVITY LOG
    await ActivityLog.create({
      message: `New contact form submitted by ${fullName}`,
      type: "CONTACT",
      performedBy: "User",
    });

    console.log(`✅ Contact received from ${fullName} (${email})`);

    return res.status(201).json({
      success: true,
      message: "Your message has been received. We will get back to you soon!",
      data: saved,
    });
  } catch (error) {
    console.error("❌ Error creating contact:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save contact",
      error: error.message,
    });
  }
};

/**
 * ✅ ADMIN: Get all contact submissions
 * GET /api/contacts
 */
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // Newest first
      .lean();

    console.log(`📥 Admin retrieved ${contacts.length} contacts`);

    return res.status(200).json({
      success: true,
      total: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};
