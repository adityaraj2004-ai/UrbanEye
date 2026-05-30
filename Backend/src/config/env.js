import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
    "MONGO_URI",
    // "JWT_ACCESS_SECRET",
    // "JWT_REFRESH_SECRET",
    "PORT",
    // "CLIENT_URL",
    // "CLOUDINARY_CLOUD_NAME",
    // "CLOUDINARY_API_KEY",
    // "CLOUDINARY_API_SECRET",
    // "JWT_ACCESS_EXPIRES",
    // "JWT_REFRESH_EXPIRES",
    // "JWT_RESET_PASSWORD_EXPIRES",
    // "JWT_VERIFY_EMAIL_EXPIRES",
    // "JWT_VERIFY_EMAIL_SECRET",
  ]

export const validateEnv = () => {
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      console.error(`FATAL: Missing environment variable: ${key}`);
      process.exit(1);
    }
  });
};

validateEnv();