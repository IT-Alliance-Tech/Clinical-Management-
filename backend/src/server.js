require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

app.use("/api/admin", require("./routes/adminRoutes"));
