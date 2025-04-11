import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  DuplicateUserError,
  PasswordError,
  UserNotFoundError,
} from "../utils/errors/authErrors.js";

dotenv.config();

const users = [
  {
    username: "admin",
    password: "$2b$10$eVc60AJUyt0Ref64k.xzMOnNryaGRRxLPHK9305jEvqC.V7Q.tdgC",
  },
];

const JWT_SECRET = process.env.JWT_SECRET;

const isProd = process.env.NODE_ENV;

export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existingUser = users.find(
      (user) =>
        user.username.trim().toLowerCase() === username.trim().toLowerCase()
    );

    if (existingUser) {
      throw new DuplicateUserError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, password: hashedPassword };

    users.push(newUser);

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      maxAge: 3600000,
      sameSite: "Strict",
    });

    res.status(201).json({
      user: newUser,
      message: "Account registered successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = users.find(
      (user) =>
        user.username.trim().toLowerCase() === username.trim().toLowerCase()
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    const unhashedPassword = await bcrypt.compare(password, user.password);

    if (!unhashedPassword) {
      throw new PasswordError();
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      maxAge: 3600000,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
