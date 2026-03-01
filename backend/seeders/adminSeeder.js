const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../models/admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@collegeveda.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const adminUser = new Admin({
      name: "Admin",
      email: "admin@collegeveda.com",
      password: "Admin@123", // Change this to a secure password
      role: "superadmin",
    });

    await adminUser.save();
    console.log("✓ Admin user created successfully");
    console.log("Email: admin@collegeveda.com");
    console.log("Password: Admin@123");
    console.log("\n⚠️  Please change the default password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
