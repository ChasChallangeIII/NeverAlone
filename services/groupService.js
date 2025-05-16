import { GroupCreationError } from "../utils/errors/dbErrors.js";
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
