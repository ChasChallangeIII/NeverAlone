import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export async function executeQuery(sql) {
    const client = await pool.connect();
    try {
        const result = await client.query(sql);
        return result.rows;
    } finally {
        client.release();
    }
}
