import { executeQuery } from '../db/db.js';

export async function getUsers(req, res) {
    try {
        const users = await executeQuery("SELECT id, gender, birth_date FROM users");
        res.json(users);
    } catch (error) {
        console.error("Fel vid hämtning av users:", error);
        res.status(500).json({ message: "Fel vid hämtning av users" });
    }
}
