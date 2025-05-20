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

export const signup = async (req, res, next) => {
  try {
    const newUser = await addUser(req.body);

    const token = jwt.sign({ ...newUser }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userId = newUser.id;

    const profile = {
      id: userId,
      username: user.username,
      profileImage: `https://randomuser.me/api/portraits/women/${userId}.jpg`,
    };

    res.status(201).json({
      user: newUser,
      message: "Account registered successfully",
      success: true,
      token,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { admin } = req.query;

  const isAdmin = admin === "true";

  try {
    let user;

    if (isAdmin) {
      user = await performAdminLogin(req.body);
    } else {
      user = await performLogin(req.body);
    }

    const token = jwt.sign({ ...user, isAdmin }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userId = user.id;

    const profile = {
      id: userId,
      username: user.username,
      profileImage: `https://randomuser.me/api/portraits/women/${userId}.jpg`,
    };

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const removeAccount = async (req, res, next) => {
  const { deletecommand: deleteCommand } = req.params;
  const { id: userId } = req.user;

  try {
    await deleteAccount(userId, deleteCommand);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};
