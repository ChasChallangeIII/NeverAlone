import pool from "../../config/postgres.js";
import { sanitizeValues } from "../../utils/helpers.js";

export const createTables = async () => {
  await ensureAdminsTable();
  await ensureUsersTable();
  await ensureGroupsTable();
  await ensureReportsTable();
  await ensureReportCommentsTable();
  await ensureGroupMembersTable();
  await ensureGroupAdminsTable();
  await ensureContactsTable();
  await ensurePostsTable();
  await ensurePostCommentsTable();
};

export const createIndexes = async () => {
  await ensureIndexReportsCity();
  await ensureIndexContactsUserId();
  await ensureIndexReportsStatusCity();
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

const ensureAdminsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    await executeQuery(query);

    console.log("✅ Admins table ensured.");
  } catch (err) {
    console.error("Error ensuring admins table", err);
  }
};

const ensureUsersTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        gender VARCHAR(25) NOT NULL,
        birth_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    await executeQuery(query);

    console.log("✅ Users table ensured.");
  } catch (err) {
    console.error("Error ensuring users table", err);
  }
};

const ensureGroupsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        group_name VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    await executeQuery(query);

    console.log("✅ Groups table ensured.");
  } catch (err) {
    console.error("Error ensuring groups table", err);
  }
};

const ensureGroupMembersTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS group_members (
        id SERIAL PRIMARY KEY,
        group_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;

    await executeQuery(query);

    console.log("✅ Group members table ensured.");
  } catch (err) {
    console.error("Error ensuring group members table", err);
  }
};

const ensureGroupAdminsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS group_admins (
        id SERIAL PRIMARY KEY,
        group_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;

    await executeQuery(query);

    console.log("✅ Group admins table ensured.");
  } catch (err) {
    console.error("Error ensuring group admins table", err);
  }
};

const ensureContactsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        contact_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (contact_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT unique_user_contact_pair UNIQUE (user_id, contact_id)
    );`;

    await executeQuery(query);

    console.log("✅ Contacts table ensured.");
  } catch (err) {
    console.error("Error ensuring contacts table", err);
  }
};

const ensureReportsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        location JSON NOT NULL,
        city VARCHAR(50) NOT NULL,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        cause VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) NOT NULL
    );`;

    await executeQuery(query);

    console.log("✅ Reports table ensured.");
  } catch (err) {
    console.error("Error ensuring reports table", err);
  }
};

const ensureReportCommentsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS report_comments (
        id SERIAL PRIMARY KEY,
        report_id INTEGER NOT NULL,
        admin_id INTEGER NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    );`;

    await executeQuery(query);

    console.log("✅ Report comments table ensured.");
  } catch (err) {
    console.error("Error ensuring report comments table", err);
  }
};

const ensurePostsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    await executeQuery(query);

    console.log("✅ Posts table ensured.");
  } catch (err) {
    console.error("Error ensuring posts table", err);
  }
};

const ensurePostCommentsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    await executeQuery(query);

    console.log("✅ Post comments table ensured.");
  } catch (err) {
    console.error("Error ensuring post comments table", err);
  }
};

const ensureIndexReportsCity = async () => {
  try {
    const query = `CREATE INDEX IF NOT EXISTS idx_reports_city ON reports(city);`;

    await executeQuery(query);

    console.log("✅ Index for reports city created.");
  } catch (err) {
    console.error("Error ensuring creating index for reports city", err);
  }
};

const ensureIndexContactsUserId = async () => {
  try {
    const query = `CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);`;

    await executeQuery(query);

    console.log("✅ Index for contacts userID created.");
  } catch (err) {
    console.error("Error ensuring creating index for contacts userID", err);
  }
};

const ensureIndexReportsStatusCity = async () => {
  try {
    const query = `CREATE INDEX IF NOT EXISTS idx_reports_status_city ON reports(status, city);`;

    await executeQuery(query);

    console.log("✅ Index for reports status city created.");
  } catch (err) {
    console.error("Error ensuring creating index for reports status city", err);
  }
};
