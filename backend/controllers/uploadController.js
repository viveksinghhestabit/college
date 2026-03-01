const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const uploadController = {
  // Upload image to Cloudinary with signed authentication
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file provided",
        });
      }

      const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
      const API_KEY = process.env.CLOUDINARY_API_KEY;
      const API_SECRET = process.env.CLOUDINARY_API_SECRET;

      if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        return res.status(500).json({
          success: false,
          message: "Cloudinary credentials not configured",
        });
      }

      // Create FormData for Cloudinary API
      const formData = new FormData();
      
      // Convert buffer to blob
      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      formData.append("file", blob, req.file.originalname);
      formData.append("public_id", req.body.public_id || undefined);

      // Call Cloudinary API with authentication
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString(
            "base64"
          )}`,
        },
      });

      res.status(200).json({
        success: true,
        data: {
          url: response.data.secure_url,
          publicId: response.data.public_id,
          format: response.data.format,
          width: response.data.width,
          height: response.data.height,
        },
      });
    } catch (error) {
      console.error("Upload error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Upload failed",
      });
    }
  },

  // Delete image from Cloudinary
  deleteImage: async (req, res) => {
    try {
      const { publicId } = req.body;

      if (!publicId) {
        return res.status(400).json({
          success: false,
          message: "Public ID required",
        });
      }

      const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
      const API_KEY = process.env.CLOUDINARY_API_KEY;
      const API_SECRET = process.env.CLOUDINARY_API_SECRET;

      const formData = new FormData();
      formData.append("public_id", publicId);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;

      await axios.post(cloudinaryUrl, formData, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString(
            "base64"
          )}`,
        },
      });

      res.status(200).json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Delete failed",
      });
    }
  },
};

module.exports = uploadController;
