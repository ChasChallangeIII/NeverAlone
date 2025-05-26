import { findUserInfo } from "../services/userService.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await findUserInfo();
        res.status(200).json(users);
    } catch (error) {
        console.error("Failed to fetch users", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
