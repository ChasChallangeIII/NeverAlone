import pool from "../../config/postgres.js";
import { sanitizeValues } from "../../utils/helpers.js";

export const createTables = async () => {
  await Promise.all([ensureReportsTable()]);
};

export const executeQuery = async (query, values = []) => {
  const sanitizedValues = sanitizeValues(values);
  const client = await pool.connect();

  try {
    const response = await client.query(query, sanitizedValues);
    return response.rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  } finally {
    client.release();
  }
};

const ensureReportsTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS reports(
            id BIGSERIAL PRIMARY KEY, 
            time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            location JSON NOT NULL, 
            cause VARCHAR(200) NOT NULL,
            text TEXT NOT NULL,
            is_handled BOOLEAN DEFAULT false
        );
    `;

    await executeQuery(query);

    console.log("✅ Reports table ensured.");
  } catch (err) {
    console.error("Error ensuring reports table", err);
  }
};
