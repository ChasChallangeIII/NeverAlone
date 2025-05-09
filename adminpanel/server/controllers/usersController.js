import { executeQuery } from '../db/index.js';

export async function getUsers(req, res) {
    try {
        const users = await executeQuery("SELECT * FROM users");
        res.json(users);
    } catch (error) {
        console.error("Fel vid hämtning av users:", error);
        res.status(500).json({ message: "Fel vid hämtning av users" });
    }
}
