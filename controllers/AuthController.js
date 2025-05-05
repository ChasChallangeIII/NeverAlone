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

    const token = jwt.sign({ ...newUser }, JWT_SECRET, { expiresIn: "1h" });

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
  const { admin: isAdmin } = req.query;

  try {
    let token;

    if (isAdmin) {
      const admin = await performAdminLogin(req.body);
      token = jwt.sign({ ...admin, isAdmin: true }, JWT_SECRET, {
        expiresIn: "1h",
      });
    } else {
      const user = await performLogin(req.body);
      token = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: "1h" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      maxAge: 3600000,
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
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export const removeAccount = async (req, res, next) => {
  const { deletecommand: deleteCommand } = req.params;
  const { id: userId } = req.user;

  try {
    await deleteAccount(userId, deleteCommand);

    res.clearCookie("token");
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};
