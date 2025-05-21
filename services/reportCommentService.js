import { executeQuery } from './db/db.js'
import { ReportNotFoundError } from "../utils/errors/reportErrors.js";

export const findReportCommentsByReportId = async (reportId) => {
    const query = `
        SELECT * FROM report_comments
        WHERE report_id = $1
        ORDER BY created_at DESC;
    `;

    return await executeQuery(query, [parseInt(reportId)]);
};

export const getAllComments = async () => {
  const query = `SELECT * FROM report_comments ORDER BY created_at DESC;`; 
  return await executeQuery(query); 
};


export const insertReportComment = async (reportId, adminId, comment) => {
    const query = `
        INSERT INTO report_comments (report_id, admin_id, comment, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
    `;

    const result = await executeQuery(query, [
        parseInt(reportId),
        parseInt(adminId),
        comment,
    ]);

    return result[0];
};
