import { GroupCreationError, UserAlreadyInGroupError } from "../utils/errors/dbErrors.js";
import { executeQuery } from "./db/db.js";

export const insertGroupAndAdmin = async (userId, groupName) => {
  try {
    await executeQuery("BEGIN");

    const createQuery = await executeQuery(
      `
        INSERT INTO groups (group_name) VALUES($1)
        RETURNING id
      `,
      [groupName]
    );

    const groupId = createQuery[0].id;

    await executeQuery(
      `
        INSERT INTO group_admins (group_id, user_id) VALUES ($1, $2)
      `,
      [groupId, userId]
    );

    await executeQuery("COMMIT");
    return groupId;
  } catch {
    await executeQuery("ROLLBACK");
    throw new GroupCreationError();
  }
};

export const insertNewGroupMember = async (userId, groupId) => {
  const query = `
    WITH inserted AS (
        INSERT INTO group_members (group_id, user_id)
        SELECT $1, $2
        WHERE NOT EXISTS (
            SELECT 1 FROM group_members
            WHERE user_id = $2 AND group_id = $1
        )
        AND EXISTS (
            SELECT 1 FROM groups
            WHERE id = $1
        )
        RETURNING group_id
    )
    SELECT g.group_name
    FROM inserted i 
    JOIN groups g ON g.id = $1
    WHERE i.group_id IS NOT NULL
  `;

  const result = await executeQuery(query, [groupId, userId]);

  if (result.length === 0) {
    throw new UserAlreadyInGroupError();
  }

  return result[0].group_name;
};
