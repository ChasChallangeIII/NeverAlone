import dotenv from "dotenv";
import pkg from "pg";
import { createTables, createIndexes } from "../services/db/db.js";
const { Pool } = pkg;

dotenv.config();

const POSTGRES_URL = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to Postgres");

    client.release();

    await createTables();
    await createIndexes();

    console.log("✅ All tables ensured successfully");
  } catch (err) {
    console.error("❌ Error connecting to Postgres", err);
  }
})();

export default pool;
