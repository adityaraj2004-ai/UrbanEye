
const requiredEnvVars = [
    "MONGO_URI",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "PORT",
  ];
  
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      console.error(`FATAL: Missing environment variable: ${key}`);
      process.exit(1);
    }
  });