    import { executeQuery } from './db/db.js'

    export const findUserInfo = async () => {
    const query = `
        SELECT id, gender, birth_date FROM users
    `;

    try {
        const results = await executeQuery(query);
        return results;
    } catch (error) {
        console.error("Database query failed", error);
        throw error;
    }
    };
