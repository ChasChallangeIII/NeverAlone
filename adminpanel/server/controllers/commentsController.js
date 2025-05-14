import { executeQuery } from '../db/db.js';

export async function getComments(req, res) {
    try {
        const comments = await executeQuery("SELECT * FROM report_comments");
        res.json(comments);
    } catch (error) {
        console.error("Fel vid hämtning av kommentarer:", error);
        res.status(500).json({ message: "Fel vid hämtning av kommentarer" });
    }
}
export async function postComment(req, res) {
    const { report_id, comment, admin_id } = req.body;

    try {
        const query = `
            INSERT INTO report_comments (report_id, comment, admin_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const values = [report_id, comment, admin_id];

        const result = await executeQuery(
        "INSERT INTO report_comments (report_id, comment, admin_id) VALUES ($1, $2, $3) RETURNING *",
        [report_id, comment, admin_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Fel vid post av kommentar:", error);
        res.status(500).json({ message: "Fel vid post av kommentar" });
    }
}