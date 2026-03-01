const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const adminController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Find admin by email
      const admin = await Admin.findOne({ email: email.toLowerCase() });
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Check if admin is active
      if (!admin.isActive) {
        return res.status(403).json({
          success: false,
          message: "Admin account is inactive",
        });
      }

      // Compare passwords
      const isPasswordValid = await admin.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      // Return token and admin details
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find().select("-password");
      res.status(200).json({
        success: true,
        data: admins,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAdminById: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).select("-password");
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }
      res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  createAdmin: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and password are required",
        });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({
        email: email.toLowerCase(),
      });
      if (existingAdmin) {
        return res.status(409).json({
          success: false,
          message: "Admin with this email already exists",
        });
      }

      // Create new admin
      const newAdmin = new Admin({
        name,
        email: email.toLowerCase(),
        password,
        role: role || "admin",
      });

      await newAdmin.save();

      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { name, role, isActive } = req.body;

      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      // Update fields
      if (name) admin.name = name;
      if (role) admin.role = role;
      if (isActive !== undefined) admin.isActive = isActive;

      await admin.save();

      res.status(200).json({
        success: true,
        message: "Admin updated successfully",
        data: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          isActive: admin.isActive,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = adminController;
