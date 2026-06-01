import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

// Upload a single image buffer to cloudinary
// Returns url and publicId
export const uploadImage = (fileBuffer, mimetype) => {
  return new Promise((resolve, reject) => {
    // Convert buffer to base64
    const base64 = fileBuffer.toString("base64");
    const dataUri = `data:${mimetype};base64,${base64}`;

    cloudinary.uploader.upload(
      dataUri,
      {
        folder: "urbaneye/incidents", // organized folder in cloudinary
        resource_type: "image",
        transformation: [
          { width: 1200, crop: "limit" }, // resize large images
          { quality: "auto" },            // auto optimize quality
          { fetch_format: "auto" },       // auto best format
        ],
      },
      (error, result) => {
        if (error) {
          reject(new ApiError(500, "Image upload failed"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );
  });
};

// Upload multiple images
// Called when incident has multiple images

export const uploadMultipleImages = async (files) => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map((file) =>
    uploadImage(file.buffer, file.mimetype)
  );

  // Upload all images simultaneously
  const uploadedImages = await Promise.all(uploadPromises);
  return uploadedImages;
};


// Delete image from cloudinary
// Called when incident is deleted or image is removed

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Log but don't throw — deletion failure shouldn't break the flow
    console.error("Cloudinary deletion failed:", error.message);
  }
};

// Delete multiple images
export const deleteMultipleImages = async (images) => {
  if (!images || images.length === 0) return;
  const deletePromises = images.map((img) => deleteImage(img.publicId));
  await Promise.all(deletePromises);
};