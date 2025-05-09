import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  addUser,
  deleteAccount,
  performAdminLogin,
  performLogin,
} from "../services/authService.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const isProd = process.env.NODE_ENV;

export const signup = async (req, res, next) => {
  try {
    const newUser = await addUser(req.body);

    const accessToken = jwt.sign({ ...newUser }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ ...newUser }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 15 * 60 * 1000,
      sameSite: "Strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 30 * 24 * 60 * 60 * 1000,
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
  const { admin: isAdmin } = req.query;

  try {
    let user;

    if (isAdmin) {
      user = await performAdminLogin(req.body);
    } else {
      user = await performLogin(req.body);
    }

    const accessToken = jwt.sign({ ...user, isAdmin: !!isAdmin }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ ...user, isAdmin: !!isAdmin }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 15 * 60 * 1000,
      sameSite: "Strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  res.clearCookie("refresh_token");
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
};

export const removeAccount = async (req, res, next) => {
  const { deletecommand: deleteCommand } = req.params;
  const { id: userId } = req.user;

  try {
    await deleteAccount(userId, deleteCommand);

    res.clearCookie("refresh_token");
    res.clearCookie("access_token");

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};
