import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

// Runs after any validator array
// If errors exist — stop request and return them
// If no errors — pass to controller
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return next(new ApiError(400, errorMessages[0], errorMessages));
  }

  next();
};