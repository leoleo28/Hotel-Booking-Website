import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.header("xauthtoken");
  if (!token) return res.status(401).send("Access denied.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return next(createError(403, "You are not authorized!"));
  next();
};
