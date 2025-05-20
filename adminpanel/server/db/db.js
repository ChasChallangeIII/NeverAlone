import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export async function executeQuery(sql, params = []) {
    const client = await pool.connect();
    try {
        const result = await client.query(sql, params);
        return result;
    } finally {
        client.release();
    }
}

export async function getReportsFromDatabase() {
    const sql = 'SELECT * FROM reports';
    const result = await executeQuery(sql);
    return result.rows;
}

export async function getCommentsFromDatabase() {
    const sql = 'SELECT * FROM report_comments';
    const result = await executeQuery(sql);
    return result.rows;
}