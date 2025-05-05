import { executeQuery } from "../services/db/db.js";

export async function insertContact(userId, contactId) {
  const query = `
    INSERT INTO contacts (user_id, contact_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, contact_id) DO NOTHING
    RETURNING *`;
  const rows = await executeQuery(query, [userId, contactId]);
  return rows[0];
}

export async function deleteContact(userId, contactId) {
  const query = `DELETE FROM contacts WHERE user_id = $1 AND contact_id = $2`;
  await executeQuery(query, [userId, contactId]);
}

export async function selectContacts(userId) {
  const query = `
    SELECT u.id, u.name, u.email
    FROM contacts c
    JOIN users u ON c.contact_id = u.id
    WHERE c.user_id = $1`;
  return await executeQuery(query, [userId]);
}

export async function selectSearchContacts(userId, searchTerm) {
  const query = `
    SELECT u.id, u.name, u.email
    FROM contacts c
    JOIN users u ON c.contact_id = u.id
    WHERE c.user_id = $1
      AND (u.name ILIKE $2 OR u.email ILIKE $2)`;
  return await executeQuery(query, [userId, `%${searchTerm}%`]);
}
