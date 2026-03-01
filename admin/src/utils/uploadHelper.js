import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

/**
 * Upload image to Cloudinary via backend
 * @param {File} file - Image file to upload
 * @param {string} publicId - Optional public ID for the image
 * @returns {Promise} - Returns { url, publicId, format, width, height }
 */
export const uploadImage = async (file, publicId = null) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    if (publicId) {
      formData.append("public_id", publicId);
    }

    const response = await axios.post(`${API_URL}/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary via backend
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise}
 */
export const deleteImage = async (publicId) => {
  try {
    const response = await axios.post(`${API_URL}/upload/delete`, {
      publicId,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Delete failed");
    }
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

/**
 * Upload multiple images
 * @param {FileList} files - Multiple files
 * @returns {Promise} - Array of upload results
 */
export const uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = Array.from(files).map((file) =>
      uploadImage(file)
    );
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Multiple upload error:", error);
    throw error;
  }
};
