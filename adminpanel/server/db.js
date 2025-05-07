// db.js
require('dotenv').config();

const { Pool } = require('pg');

const postgresUrl = process.env.POSTGRES_URL;

const pool = new Pool({
    connectionString: postgresUrl,
    ssl: {
        rejectUnauthorized: false
    }
});

async function executeQuery(sql) {
    try {
        const client = await pool.connect();
        const result = await client.query(sql);
        client.release();
        return result.rows;
    } catch (error) {
        console.error("Fel vid utförande av frågan:", error);
        throw error;
    }
}

async function getComments() {
    try {
        const comments = await executeQuery("SELECT * FROM report_comments");
        console.log("comments", comments);
        return comments;
    } catch (error) {
        console.error("Fel vid hämtning av kommentarer:", error);
        return []; 
    }
}

module.exports = { getComments }; 