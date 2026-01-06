const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("\n" + "=".repeat(80));
    console.log("🗄️  DATABASE CONNECTION ATTEMPT");
    console.log("=".repeat(80));
    console.log("📍 MongoDB URI:", process.env.MONGO_URI ? "✅ Configured" : "❌ NOT CONFIGURED");
    
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in environment variables");
    }
    
    console.log("📍 Connecting to MongoDB...");
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("✅ MongoDB connected successfully");
    console.log("📊 Connection state:", mongoose.connection.readyState);
    console.log("📊 Databases available:", mongoose.connection.db?.admin?.listDatabases ? "Yes" : "Checking...");
    console.log("=".repeat(80) + "\n");
    
  } catch (error) {
    console.error("\n" + "=".repeat(80));
    console.error("❌ MongoDB connection FAILED");
    console.error("=".repeat(80));
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);
    console.error("❌ MongoDB URI provided:", !!process.env.MONGO_URI);
    console.error("=".repeat(80) + "\n");
    
    // Don't exit immediately - might recover
    setTimeout(() => {
      console.error("❌ DATABASE CONNECTION ERROR - Exiting process");
      process.exit(1);
    }, 2000);
  }
};

module.exports = connectDB;
