import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    let name = await User.findOne({ username: req.body.username });
    if (name) return next(createError(400, "Username already registered!"));

    let email = await User.findOne({ email: req.body.email });
    if (email) return next(createError(400, "Email already registered!"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_KEY
    );
    const { password, isAdmin, ...otherDetails } = newUser._doc;
    res
      .header("xauthtoken", token)
      .status(200)
      .json({ ...otherDetails, xauthtoken: token });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .header("xauthtoken", token)
      .status(200)
      .json({ ...otherDetails, xauthtoken: token });
  } catch (err) {
    next(err);
  }
};
