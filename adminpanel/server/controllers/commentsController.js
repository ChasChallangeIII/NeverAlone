import { executeQuery } from '../db/index.js';

export async function getComments(req, res) {
    try {
        const comments = await executeQuery("SELECT * FROM report_comments");
        res.json(comments);
    } catch (error) {
        console.error("Fel vid hämtning av kommentarer:", error);
        res.status(500).json({ message: "Fel vid hämtning av kommentarer" });
    }
}
