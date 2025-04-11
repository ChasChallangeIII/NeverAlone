import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const users = [{ username: "admin", password: "admin" }];
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
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
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
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const unhashedPassword = await bcrypt.compare(user.password, password);

    if (!unhashedPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
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
