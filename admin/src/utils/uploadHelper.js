import axios from "axios";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "eduvisor";
console.log("Cloudinary Config:", { CLOUD_NAME, UPLOAD_PRESET });

export const uploadImage = async (file, publicId = null) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        
        if (publicId) {
            formData.append("public_id", publicId);
        }

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
        );

        return response.data; // Cloudinary directly returns upload data
    } catch (error) {
        console.error("Upload error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise}
 */
export const deleteImage = async (publicId) => {
    try {
        const formData = new FormData();
        formData.append("public_id", publicId);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
            formData
        );

        return response.data; // Cloudinary directly returns deletion data
    } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
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
        const uploadPromises = Array.from(files).map(file => uploadImage(file));
        const results = await Promise.all(uploadPromises);
        return results; // Array of Cloudinary upload responses
    } catch (error) {
        console.error("Multiple upload error:", error.response?.data || error.message);
        throw error;
    }
};
