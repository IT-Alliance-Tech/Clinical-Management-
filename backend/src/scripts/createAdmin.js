require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "admin@clinic.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new Admin({
      name: "Clinic Admin",
      email: "admin@clinic.com",
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin created successfully");
    console.log("Email: admin@clinic.com");
    console.log("Password: Admin@123");

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
