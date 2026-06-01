import multer from "multer";
import ApiError from "../utils/ApiError.js";

// Store file in memory temporarily
// Then cloudinary.service.js will upload it to cloudinary
// and delete it from memory
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Only allow images
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only JPEG, PNG and WebP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per image
    files: 4,                   // max 4 images per incident
  },
});

// this will be used in incident routes
// upload.array("images", 4) - field name "images", max 4 files
export default upload;